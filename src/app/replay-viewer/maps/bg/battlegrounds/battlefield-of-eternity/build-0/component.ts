import { Component } from '@angular/core';
import { BattlegroundMapBGBase } from '../../../bg-base/BattlegroundMapBGBase';
import { minimap } from './minimap';
import { regions } from './regions';
import { MapRegion } from '../../../../types';

@Component({
    selector: 'battlefield-of-eternity-bg-0',
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

export class BattlefieldOfEternityBG0Component extends BattlegroundMapBGBase {

    constructor() {
        super('assets/maps/battlefield-of-eternity-v1.jpg');
    }

    public get mapRegions(): MapRegion[] {
        return regions;
    }
}
