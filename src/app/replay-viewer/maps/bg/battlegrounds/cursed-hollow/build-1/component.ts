import { Component } from '@angular/core';
import { BattlegroundMapBGBase } from '../../../bg-base/BattlegroundMapBGBase';
import { minimap } from '../build-0/minimap';
import { regions } from '../build-0/regions';
import { MapRegion } from '../../../../types';

@Component({
    selector: 'cursed-hollow-bg-1',
    template:
`<bg-wrapper [backgroundImage]="backgroundImage" [viewMode]="viewMode">
  ${minimap}
</bg-wrapper>
`,
    styleUrls: [
        '../../../bg-base/battleground-map-bg-base.scss',
        '../build-0/sizes.scss'
    ]
})
export class CursedHollowBG1Component extends BattlegroundMapBGBase {
    constructor() {
        super('/assets/maps/cursedhollow.jpg');
    }

    public get mapRegions(): MapRegion[] {
        return regions;
    }
}
