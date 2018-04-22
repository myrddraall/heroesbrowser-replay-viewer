import { Component } from '@angular/core';
import { BattlegroundMapBGBase } from '../../../bg-base/BattlegroundMapBGBase';
import { minimap } from './minimap';
import { regions } from './regions';
import { MapRegion } from '../../../../types';

@Component({
    selector: 'tomb-of-the-spider-queen-bg-0',
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

export class TombOfTheSpiderQueenBG0Component extends BattlegroundMapBGBase {

    constructor() {
        super('assets/maps/tomb-of-the-spider-queen-v1.jpg');
    }

    public get mapRegions(): MapRegion[] {
        return regions;
    }
}
