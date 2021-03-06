import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
import { ClipIconService, ClipMethod } from '../../services/clip-icon/clip-icon.service';
@Component({
  selector: 'hero-icon',
  templateUrl: './hero-icon.component.html',
  styleUrls: ['./hero-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroIconComponent implements OnChanges {

  private _shape: ClipMethod = ClipMethod.CIRCLE;

  @Input()
  private hero: string;
  private _heroImage: HTMLCanvasElement | HTMLImageElement;

  @Input()
  public get shape(): ClipMethod | string {
    return this._shape;
  }

  public set shape(value: ClipMethod | string) {
      this._shape = ClipMethod[value.toUpperCase()];
  }

  public get heroImage(): HTMLCanvasElement | HTMLImageElement {
    return this._heroImage;
  }

  constructor(private clipIconService: ClipIconService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hero || changes.shape) {
      if (this.hero) {
        this.clipHeroImage();
      }
    }
  }


  private async clipHeroImage() {
    this._heroImage = await this.clipIconService.loadAndClip(
      '//d1i1jxrdh2kvwy.cloudfront.net/Images/Heroes/Portraits/' + this.cleanName(this.hero) + '.png',
      75, 75, this._shape
    );
    this.renderer.appendChild(this.elementRef.nativeElement, this.heroImage);
    this.renderer.addClass(this.elementRef.nativeElement, 'shape-' + this._shape);
  }

  public cleanName(name: string): string {
    return name.replace(/[^\w\dú]/g, '').replace(/ú/g, '%C3%BA');
  }

}
