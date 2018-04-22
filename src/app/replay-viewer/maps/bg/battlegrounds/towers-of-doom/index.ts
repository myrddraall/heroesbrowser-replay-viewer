export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { TowersOfDoomBG0Component } from './build-0/component';


export const TowersOfDoomVersions: IMapVersion[] = [
    {
        id: 'towers_of_doom',
        minBuild: 0,
        component: TowersOfDoomBG0Component
    }
];

export const TowersOfDoomCompnents: Type<BattlegroundMapBGBase>[] = [
    TowersOfDoomBG0Component
];
