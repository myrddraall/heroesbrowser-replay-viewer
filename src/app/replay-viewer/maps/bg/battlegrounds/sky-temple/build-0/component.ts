import { Component } from '@angular/core';
import { BattlegroundMapBGBase } from '../../../bg-base/BattlegroundMapBGBase';
import { minimap } from './minimap';
import { regions } from './regions';
import { MapRegion } from '../../../../types';

@Component({
    selector: 'sky-temple-bg-0',
    template:
        `<bg-wrapper [backgroundImage]="backgroundImage" [viewMode]="viewMode" [regions]="mapRegions">
  ${minimap}
</bg-wrapper>
`,
    styleUrls: [
        '../../../bg-base/battleground-map-bg-base.scss',
        './sizes.scss'
    ]
})

export class SkyTempleBG0Component extends BattlegroundMapBGBase {

    constructor() {
        super('assets/maps/sky-temple-v1.jpg');
    }

    public get mapRegions(): MapRegion[] {
        return regions;
    }
}
