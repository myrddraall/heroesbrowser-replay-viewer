export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { HauntedMinesBG0Component } from './build-0/component';


export const HauntedMinesVersions: IMapVersion[] = [
    {
        id: 'haunted_mines',
        minBuild: 0,
        component: HauntedMinesBG0Component
    }
];

export const HauntedMinesCompnents: Type<BattlegroundMapBGBase>[] = [
    HauntedMinesBG0Component
];
