export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { InfernalShrinesBG0Component } from './build-0/component';


export const InfernalShrinesVersions: IMapVersion[] = [
    {
        id: 'infernal_shrines',
        minBuild: 0,
        component: InfernalShrinesBG0Component
    }
];

export const InfernalShrinesCompnents: Type<BattlegroundMapBGBase>[] = [
    InfernalShrinesBG0Component
];
