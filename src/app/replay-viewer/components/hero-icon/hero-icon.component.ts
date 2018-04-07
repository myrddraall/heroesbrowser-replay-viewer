import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
import { ClipIconService, ClipMethod } from '../../services/clip-icon/clip-icon.service';
@Component({
  selector: 'hero-icon',
  templateUrl: './hero-icon.component.html',
  styleUrls: ['./hero-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroIconComponent implements OnChanges {


  @Input()
  private hero: string;
  private _heroImage: HTMLCanvasElement;

  public get heroImage(): HTMLCanvasElement {
    return this._heroImage;
  }

  constructor(private clipIconService: ClipIconService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hero) {
      if (this.hero) {
        this.clipHeroImage();
        console.log(this.heroImage);
      }
    }
  }


  private async clipHeroImage() {
    this._heroImage = await this.clipIconService.loadAndClip(
      '//d1i1jxrdh2kvwy.cloudfront.net/Images/Heroes/Portraits/' + this.cleanName(this.hero) + '.png',
      48, 48, ClipMethod.CIRCLE
    );
    this.renderer.appendChild(this.elementRef.nativeElement, this.heroImage);
  }

  public cleanName(name: string): string {
    return name.replace(/[^\w\dú]/g, '').replace(/ú/g, '%C3%BA');
  }

}