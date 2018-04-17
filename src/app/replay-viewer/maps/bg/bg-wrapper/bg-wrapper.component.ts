import { Component, Input, HostBinding } from '@angular/core';
import { MapViewMode } from '../../types';

@Component({
  selector: 'bg-wrapper',
  templateUrl: './bg-wrapper.component.html',
  styleUrls: ['./bg-wrapper.component.scss']
})
export class BgWrapperComponent {

  @Input()
  public backgroundImage: string;

  @Input()
  public viewMode: MapViewMode = MapViewMode.MINIMAP;

  @HostBinding('class')
  public get wrappeerClass(): string {
    return 'view-mode-' + this.viewMode;
  }

  public get showImage(): boolean {
    // tslint:disable-next-line:no-bitwise
    return (this.viewMode & MapViewMode.IMAGE) === MapViewMode.IMAGE;
  }
  public get showMinimap(): boolean {
    // tslint:disable-next-line:no-bitwise
    return (this.viewMode & MapViewMode.MINIMAP) === MapViewMode.MINIMAP;
  }

  constructor() { }


}
