// tslint:disable:no-non-null-assertion
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  ViewContainerRef,
  ViewEncapsulation,
  HostListener,
  ViewChild,
  AfterViewInit,
  TemplateRef
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import {
  ConnectionPositionPair,
  HorizontalConnectionPos,
  OriginConnectionPosition,
  Overlay,
  ScrollDispatcher,
  OverlayConnectionPosition,
  OverlayRef,
  RepositionScrollStrategy,
  ScrollStrategy,
  VerticalConnectionPos,
  ConnectedPositionStrategy,
} from '@angular/cdk/overlay';

import {
  TooltipPosition,
  SCROLL_THROTTLE_MS,
  MatTooltipDefaultOptions,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  getMatTooltipInvalidPositionError,
  TooltipVisibility
} from '@angular/material';

import { Platform } from '@angular/cdk/platform';
import { ComponentPortal, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';

import { takeUntil } from 'rxjs/operators/takeUntil';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';

import { popoverAnimations } from './popover-animations';

@Directive({
  selector: '[popover]',
  exportAs: 'popover',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(longpress)': 'show()',
    '(keydown)': '_handleKeydown($event)',
    '(touchend)': '_handleTouchend()',
  },
})
export class PopoverDirective implements OnDestroy {
  _overlayRef: OverlayRef | null;
  _popoverInstance: PopoverComponent | null;
  private _portal: ComponentPortal<PopoverComponent>;

  private _position: TooltipPosition = 'below';
  private _disabled = false;
  private _popoverClass: string | string[] | Set<string> | { [key: string]: any };

  private _manualListeners = new Map<string, Function>();

  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  public _popoverTemplate: TemplateRef<any>;

  @Input()
  get popoverTemplate(): TemplateRef<any> { return this._popoverTemplate; }
  set popoverTemplate(value: TemplateRef<any>) {
    if (value !== this._popoverTemplate) {
      this._popoverTemplate = value;
      if (this._popoverInstance) {
        this._popoverInstance.template = value;
        this._popoverInstance._markForCheck();
      }
    }
  }

  @Input('popoverPosition')
  get position(): TooltipPosition { return this._position; }
  set position(value: TooltipPosition) {
    if (value !== this._position) {
      this._position = value;

      if (this._overlayRef) {
        // TODO(andrewjs): When the overlay's position can be
        // dynamically changed, do not destroy the tooltip.
        this._detach();
        this._updatePosition();
      }
    }
  }

  /** Disables the display of the tooltip. */
  @Input('popoverDisabled')
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);

    // If tooltip is disabled, hide immediately.
    if (this._disabled) {
      this.hide(0);
    }
  }

  /** The default delay in ms before showing the tooltip after show is called */
  // tslint:disable-next-line:no-input-rename
  @Input('popoverShowDelay') showDelay =
    this._defaultOptions ? this._defaultOptions.showDelay : 0;

  /** The default delay in ms before hiding the tooltip after hide is called */
  // tslint:disable-next-line:no-input-rename
  @Input('popoverHideDelay') hideDelay =
    this._defaultOptions ? this._defaultOptions.hideDelay : 0;


  private _data: any;




  @Input('popover')
  get data() { return this._data; }
  set data(value: any) {
    this._data = value;
    if (!this._data && this._isPopoverVisible()) {
      this.hide(0);
    } else {
      this._updatePopoverData();
    }
  }

  /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
  @Input()
  get popoverClass() { return this._popoverClass; }
  set popoverClass(value: string | string[] | Set<string> | { [key: string]: any }) {
    this._popoverClass = value;
    if (this._popoverInstance) {
      this._setPopoverClass(this._popoverClass);
    }
  }

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef,
    private _scrollDispatcher: ScrollDispatcher,
    private _viewContainerRef: ViewContainerRef,
    private _ngZone: NgZone,
    private _platform: Platform,
    private _ariaDescriber: AriaDescriber,
    private _focusMonitor: FocusMonitor,
    @Inject(MAT_TOOLTIP_SCROLL_STRATEGY) private _scrollStrategy,
    @Optional() private _dir: Directionality,
    @Optional() @Inject(MAT_TOOLTIP_DEFAULT_OPTIONS)
    private _defaultOptions?: MatTooltipDefaultOptions) {

    // TODO(crisbeto): make the `_defaultOptions` a required param next time we do breaking changes.
    // @deletion-target 6.0.0

    const element: HTMLElement = _elementRef.nativeElement;

    // The mouse events shouldn't be bound on iOS devices, because
    // they can prevent the first tap from firing its click event.
    if (!_platform.IOS) {
      this._manualListeners.set('mouseenter', () => this.show());
      this._manualListeners.set('mouseleave', () => this.hide());

      this._manualListeners
        .forEach((listener, event) => _elementRef.nativeElement.addEventListener(event, listener));
    } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
      // When we bind a gesture event on an element (in this case `longpress`), HammerJS
      // will add some inline styles by default, including `user-select: none`. This is
      // problematic on iOS, because it will prevent users from typing in inputs. If
      // we're on iOS and the tooltip is attached on an input or textarea, we clear
      // the `user-select` to avoid these issues.
      element.style.webkitUserSelect = element.style.userSelect = '';
    }

    _focusMonitor.monitor(element).pipe(takeUntil(this._destroyed)).subscribe(origin => {
      // Note that the focus monitor runs outside the Angular zone.
      if (!origin) {
        _ngZone.run(() => this.hide(0));
      } else if (origin !== 'program') {
        _ngZone.run(() => this.show());
      }
    });
  }

  /**
   * Dispose the tooltip when destroyed.
   */
  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._popoverInstance = null;
    }

    // Clean up the event listeners set in the constructor
    if (!this._platform.IOS) {
      this._manualListeners.forEach((listener, event) =>
        this._elementRef.nativeElement.removeEventListener(event, listener));

      this._manualListeners.clear();
    }

    this._destroyed.next();
    this._destroyed.complete();

    // this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.message);
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */



  @HostListener('longpress')
  public show(delay: number = this.showDelay): void {
    if (this.disabled || !this.data) { return; }

    const overlayRef = this._createOverlay();

    this._detach();
    this._portal = this._portal || new ComponentPortal(PopoverComponent, this._viewContainerRef);
    this._popoverInstance = overlayRef.attach(this._portal).instance;
    this._popoverInstance.afterHidden()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());
    this._setPopoverClass(this._popoverClass);
    this._updatePopoverData();
    // tslint:disable-next-line:no-non-null-assertion
    this._popoverInstance!.show(this._position, delay);
  }

  /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
  hide(delay: number = this.hideDelay): void {
    if (this._popoverInstance) {
      this._popoverInstance.hide(delay);
    }
  }

  /** Shows/hides the tooltip */
  toggle(): void {
    this._isPopoverVisible() ? this.hide() : this.show();
  }
  /** Returns true if the tooltip is currently visible to the user */
  _isPopoverVisible(): boolean {
    return !!this._popoverInstance && this._popoverInstance.isVisible();
  }


  /** Handles the keydown events on the host element. */
  @HostListener('keydown')
  _handleKeydown(e: KeyboardEvent) {
    if (this._isPopoverVisible() && e.keyCode === ESCAPE) {
      e.stopPropagation();
      this.hide(0);
    }
  }

  /** Handles the touchend events on the host element. */
  @HostListener('touchend')
  _handleTouchend() {
    this.hide(this._defaultOptions ? this._defaultOptions.touchendHideDelay : 1500);
  }


  /** Create the overlay config and position strategy */
  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    // Create connected position strategy that listens for scroll events to reposition.
    const strategy = this._overlay
      .position()
      .connectedTo(this._elementRef, origin.main, overlay.main)
      .withFallbackPosition(origin.fallback, overlay.fallback);

    strategy.withScrollableContainers(
      this._scrollDispatcher.getAncestorScrollContainers(this._elementRef)
    );

    strategy.onPositionChange.pipe(
      filter(() => !!this._popoverInstance),
      takeUntil(this._destroyed)
    ).subscribe(change => {
      if (change.scrollableViewProperties.isOverlayClipped && this._popoverInstance!.isVisible()) {
        // After position changes occur and the overlay is clipped by
        // a parent scrollable then close the tooltip.
        this._ngZone.run(() => this.hide(0));
      } else {
        // Otherwise recalculate the origin based on the new position.
        this._popoverInstance!._setTransformOrigin(change.connectionPair);
      }
    });

    this._overlayRef = this._overlay.create({
      direction: this._dir ? this._dir.value : 'ltr',
      positionStrategy: strategy,
      panelClass: 'popover-panel',
      scrollStrategy: this._scrollStrategy()
    });

    this._overlayRef.detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    return this._overlayRef;
  }

  /** Detaches the currently-attached tooltip. */
  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }

    this._popoverInstance = null;
  }

  /** Updates the position of the current tooltip. */
  private _updatePosition() {
    const position = this._overlayRef!.getConfig().positionStrategy as ConnectedPositionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    position
      .withPositions([])
      .withFallbackPosition(origin.main, overlay.main)
      .withFallbackPosition(origin.fallback, overlay.fallback);
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
   */
  _getOrigin(): { main: OriginConnectionPosition, fallback: OriginConnectionPosition } {
    const isDirectionLtr = !this._dir || this._dir.value === 'ltr';
    let position: OriginConnectionPosition;

    if (this.position === 'above' || this.position === 'below') {
      position = { originX: 'center', originY: this.position === 'above' ? 'top' : 'bottom' };
    } else if (this.position === 'left' ||
      this.position === 'before' && isDirectionLtr ||
      this.position === 'after' && !isDirectionLtr) {
      position = { originX: 'start', originY: 'center' };
    } else if (this.position === 'right' ||
      this.position === 'after' && isDirectionLtr ||
      this.position === 'before' && !isDirectionLtr) {
      position = { originX: 'end', originY: 'center' };
    } else {
      throw getMatTooltipInvalidPositionError(this.position);
    }

    const { x, y } = this._invertPosition(position.originX, position.originY);

    return {
      main: position,
      fallback: { originX: x, originY: y }
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  _getOverlayPosition(): { main: OverlayConnectionPosition, fallback: OverlayConnectionPosition } {
    const isLtr = !this._dir || this._dir.value === 'ltr';
    let position: OverlayConnectionPosition;

    if (this.position === 'above') {
      position = { overlayX: 'center', overlayY: 'bottom' };
    } else if (this.position === 'below') {
      position = { overlayX: 'center', overlayY: 'top' };
    } else if (this.position === 'left' ||
      this.position === 'before' && isLtr ||
      this.position === 'after' && !isLtr) {
      position = { overlayX: 'end', overlayY: 'center' };
    } else if (this.position === 'right' ||
      this.position === 'after' && isLtr ||
      this.position === 'before' && !isLtr) {
      position = { overlayX: 'start', overlayY: 'center' };
    } else {
      throw getMatTooltipInvalidPositionError(this.position);
    }

    const { x, y } = this._invertPosition(position.overlayX, position.overlayY);

    return {
      main: position,
      fallback: { overlayX: x, overlayY: y }
    };
  }

  /** Updates the tooltip message and repositions the overlay according to the new message length */
  private _updatePopoverData() {
    // Must wait for the message to be painted to the tooltip so that the overlay can properly
    // calculate the correct positioning based on the size of the text.
    if (this._popoverInstance) {
      this._popoverInstance.data = this.data;
      this._popoverInstance.template = this.popoverTemplate;
      this._popoverInstance._markForCheck();

      this._ngZone.onMicrotaskEmpty.asObservable().pipe(
        take(1),
        takeUntil(this._destroyed)
      ).subscribe(() => {
        if (this._popoverInstance) {
          this._overlayRef!.updatePosition();
        }
      });
    }
  }

  /** Updates the tooltip class */
  private _setPopoverClass(tooltipClass: string | string[] | Set<string> | { [key: string]: any }) {
    if (this._popoverInstance) {
      this._popoverInstance.popoverClass = tooltipClass;
      this._popoverInstance._markForCheck();
    }
  }

  /** Inverts an overlay position. */
  private _invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
    if (this.position === 'above' || this.position === 'below') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }
    return { x, y };
  }

}



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    // Forces the element to have a layout in IE and Edge. This fixes issues where the element
    // won't be rendered if the animations are disabled or there is no web animations polyfill.
    '[style.zoom]': '_visibility === "visible" ? 1 : null',
    '(body:click)': 'this._handleBodyInteraction()',
    'aria-hidden': 'true',
  },
  animations: [popoverAnimations.popoverState],
})
export class PopoverComponent implements OnDestroy {
  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;
  @ViewChild('defaultTemplate', { read: TemplateRef }) _defaultTplRef: TemplateRef<any>;
  private _templatePortal: TemplatePortal;
  private _template: TemplateRef<any>;


  public get template(): TemplateRef<any> { return this._template || this._defaultTplRef; }

  public set template(value: TemplateRef<any>) {
    if (this._template !== value) {
      this._template = value;
      this._markForCheck();
    }
  }

  public get popoverContext(): { data: any } {
    return {
      data: this.data
    };
  }

  data: any;
  popoverClass: string | string[] | Set<string> | { [key: string]: any };
  _showTimeoutId: number;
  _hideTimeoutId: number;
  _visibility: TooltipVisibility = 'initial';

  private _closeOnInteraction = false;
  _transformOrigin: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  private _position: TooltipPosition;
  private readonly _onHide: Subject<any> = new Subject();

  /** Stream that emits whether the user has a handset-sized display.  */
  _isHandset: Observable<BreakpointState> = this._breakpointObserver.observe(Breakpoints.Handset);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _breakpointObserver: BreakpointObserver) { }

  /**
   * Shows the tooltip with an animation originating from the provided origin
   * @param position Position of the tooltip.
   * @param delay Amount of milliseconds to the delay showing the tooltip.
   */
  show(position: TooltipPosition, delay: number): void {
    // Cancel the delayed hide if it is scheduled
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
    }

    // Body interactions should cancel the tooltip if there is a delay in showing.
    this._closeOnInteraction = true;
    this._position = position;
    this._showTimeoutId = <number><any>setTimeout(() => {
      this._visibility = 'visible';

      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this._markForCheck();
    }, delay);
  }

  /**
  * Begins the animation to hide the tooltip after the provided delay in ms.
  * @param delay Amount of milliseconds to delay showing the tooltip.
  */
  hide(delay: number): void {
    // Cancel the delayed show if it is scheduled
    if (this._showTimeoutId) {
      clearTimeout(this._showTimeoutId);
    }

    this._hideTimeoutId = <any>setTimeout(() => {
      this._visibility = 'hidden';

      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this._markForCheck();
    }, delay);
  }

  /** Returns an observable that notifies when the tooltip has been hidden from view. */
  afterHidden(): Observable<void> {
    return this._onHide.asObservable();
  }

  /** Whether the tooltip is being displayed. */
  isVisible(): boolean {
    return this._visibility === 'visible';
  }

  /** Sets the tooltip transform origin according to the position of the tooltip overlay. */
  _setTransformOrigin(overlayPosition: ConnectionPositionPair) {
    const axis = (this._position === 'above' || this._position === 'below') ? 'Y' : 'X';
    const position = axis === 'X' ? overlayPosition.overlayX : overlayPosition.overlayY;

    if (position === 'top' || position === 'bottom') {
      this._transformOrigin = position;
    } else if (position === 'start') {
      this._transformOrigin = 'left';
    } else if (position === 'end') {
      this._transformOrigin = 'right';
    } else {
      throw getMatTooltipInvalidPositionError(this._position);
    }
  }

  _animationStart() {
    this._closeOnInteraction = false;
  }

  _animationDone(event: AnimationEvent): void {
    const toState = event.toState as TooltipVisibility;

    if (toState === 'hidden' && !this.isVisible()) {
      this._onHide.next();
    }

    if (toState === 'visible' || toState === 'hidden') {
      this._closeOnInteraction = true;
    }
  }

  /**
   * Interactions on the HTML body should close the tooltip immediately as defined in the
   * material design spec.
   * https://material.google.com/components/tooltips.html#tooltips-interaction
   */
  _handleBodyInteraction(): void {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }

  /**
   * Marks that the tooltip needs to be checked in the next change detection run.
   * Mainly used for rendering the initial text before positioning a tooltip, which
   * can be problematic in components with OnPush change detection.
   */
  _markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }
  ngOnDestroy() {
  }

}



