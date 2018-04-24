import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MapViewMode, MapIconCategory } from '../../../types';
@Component({
  selector: 'map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapControlsComponent {
  public MapViewMode = MapViewMode;
  public MapIconCategory = MapIconCategory;

  private _mapViewMode: MapViewMode = MapViewMode.MINIMAP;
  private _iconVisibility: MapIconCategory[] = [
    MapIconCategory.STRUCTURES,
    MapIconCategory.NEUTRAL,
    MapIconCategory.OBJECTIVE
  ];



  @Input()
  public get mapViewMode(): MapViewMode {
    return this._mapViewMode;
  }
  public set mapViewMode(value: MapViewMode) {
    if (this._mapViewMode !== value) {
      this._mapViewMode = value;
      this.mapViewModeChange.next(this.mapViewMode);
    }
  }

  @Input()
  public get iconVisibility(): MapIconCategory[] {
    return this._iconVisibility;
  }
  public set iconVisibility(value: MapIconCategory[]) {
    console.log('set iconVisibility');
    if (this._iconVisibility !== value) {
      console.log('changed iconVisibility');
      this._iconVisibility = value;
      this.iconVisibilityChange.next(this.iconVisibility);
    }
  }

  @Output()
  public mapViewModeChange: EventEmitter<MapViewMode> = new EventEmitter();

  @Output()
  public iconVisibilityChange: EventEmitter<MapIconCategory[]> = new EventEmitter();

  constructor() { }

}
