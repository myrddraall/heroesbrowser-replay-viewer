export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { GardenOfTerrorBG0Component } from './build-0/component';


export const GardenOfTerrorVersions: IMapVersion[] = [
    {
        id: 'garden_of_terror',
        minBuild: 0,
        component: GardenOfTerrorBG0Component
    }
];

export const GardenOfTerrorCompnents: Type<BattlegroundMapBGBase>[] = [
    GardenOfTerrorBG0Component
];
