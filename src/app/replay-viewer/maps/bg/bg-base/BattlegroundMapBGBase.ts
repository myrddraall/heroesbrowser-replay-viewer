import { Input } from '@angular/core';
import { MapViewMode, MapRegion } from '../../types';

export abstract class BattlegroundMapBGBase {
    @Input()
    public viewMode: MapViewMode = MapViewMode.BOTH;

    constructor(public backgroundImage: string) { }

    public abstract get mapRegions(): MapRegion[];
}
