import { Component } from '@angular/core';
import { BattlegroundMapBGBase } from '../../../bg-base/BattlegroundMapBGBase';
import { minimap } from './minimap';
import { regions } from './regions';
import { MapRegion } from '../../../../types';

@Component({
    selector: 'cursed-hollow-bg-0',
    template:
        `<bg-wrapper [backgroundImage]="backgroundImage" [viewMode]="viewMode">
  ${minimap}
</bg-wrapper>
`,
    styleUrls: [
        '../../../bg-base/battleground-map-bg-base.scss',
        './sizes.scss'
    ]
})
export class CursedHollowBG0Component extends BattlegroundMapBGBase {

    constructor() {
        super('/assets/maps/cursedhollow.jpg');
    }

    public get mapRegions(): MapRegion[] {
        return regions;
    }
}
