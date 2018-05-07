import {
    ComponentFactoryResolver,
    AfterViewInit,
    ViewChild,
    ViewContainerRef,
    ComponentRef,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';
import { SectionNotSupportedComponent } from '../components/section-not-supported/section-not-supported.component';
import { SectionLoadingComponent } from '../components/section-loading/section-loading.component';
import { Subscription } from 'rxjs';
import { ReplayViewerComponent } from '../replay-viewer.component';
import { Replay } from '@heroesbrowser/heroprotocol';

export enum SectionState {
    READY,
    ERROR,
    LOADING
}


export abstract class AbstractSectionComponent implements AfterViewInit, OnDestroy {

    @ViewChild('statusRef', { read: ViewContainerRef })
    private statusRefContainer: ViewContainerRef;
    private notSupportedRef: ComponentRef<SectionNotSupportedComponent>;
    private loadingRef: ComponentRef<SectionLoadingComponent>;
    private onReplayLoadedSub: Subscription;

    public SectionState = SectionState;
    public state: SectionState = SectionState.LOADING;

    public replay: Replay;

    public constructor(
        protected replayViewer: ReplayViewerComponent,
        private componentFactoryResolver: ComponentFactoryResolver,
        protected changeDetectorRef: ChangeDetectorRef
    ) {
        this.onReplayLoadedSub = replayViewer.onReplayLoaded.subscribe(replay => {
            this.onReplayLoad();
        });
    }

    protected abstract loadReplayView(): Promise<void>;


    protected async onReplayLoad() {
        this.clearNotSupported();
        this.setLoadingMessage('Loading Data');
        this.changeDetectorRef.markForCheck();
        try {
            this.replay = this.replayViewer.replay;
            await this.loadReplayView();
            this.changeDetectorRef.markForCheck();
        } catch (e) {
            if (e.name === 'ReplayVersionOutOfRangeError') {
                this.setNotSupportedMessage(e.message);
                return;
            }
            throw e;
        } finally {
            setTimeout(() => {
                this.clearLoading();
            }, 150);
        }
    }

    public ngAfterViewInit() {
        const notSupportedFactory = this.componentFactoryResolver.resolveComponentFactory(SectionNotSupportedComponent);
        this.notSupportedRef = this.statusRefContainer.createComponent(notSupportedFactory);

        const loadingFactory = this.componentFactoryResolver.resolveComponentFactory(SectionLoadingComponent);
        this.loadingRef = this.statusRefContainer.createComponent(loadingFactory);
        this.onReplayLoad();
    }

    public ngOnDestroy(): void {
        if (this.onReplayLoadedSub) {
            this.onReplayLoadedSub.unsubscribe();
            this.onReplayLoadedSub = undefined;
        }
    }

    protected setNotSupportedMessage(message: string) {
        if (this.notSupportedRef.instance.message !== message) {
            this.state = message ? SectionState.ERROR : SectionState.READY;
            this.notSupportedRef.instance.message = message;
            this.changeDetectorRef.markForCheck();
        }
    }

    protected clearNotSupported(): void {
        this.setNotSupportedMessage(undefined);
    }

    protected setLoadingMessage(message: string) {
        if (this.loadingRef.instance.message !== message) {
            this.state = message ? SectionState.LOADING : (this.state === SectionState.ERROR ? SectionState.ERROR : SectionState.READY);
            this.loadingRef.instance.message = message;
            this.changeDetectorRef.markForCheck();
        }
    }

    protected clearLoading(): void {
        this.setLoadingMessage(undefined);
    }
}
