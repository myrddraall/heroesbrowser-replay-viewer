import { Component } from '@angular/core';
import { BattlegroundMapBGBase } from '../../../bg-base/BattlegroundMapBGBase';
import { minimap } from './minimap';
import { regions } from './regions';
import { MapRegion } from '../../../../types';

@Component({
    selector: 'braxis-holdout-bg-0',
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
export class BraxisHoldoutBG0Component extends BattlegroundMapBGBase {

    constructor() {
        super('assets/maps/braxis-holdout-v1.jpg');
    }

    public get mapRegions(): MapRegion[] {
        return regions;
    }
}