export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { WarheadJunctionBG0Component } from './build-0/component';


export const WarheadJunctionVersions: IMapVersion[] = [
    {
        id: 'warhead_junction',
        minBuild: 0,
        component: WarheadJunctionBG0Component
    }
];

export const WarheadJunctionCompnents: Type<BattlegroundMapBGBase>[] = [
    WarheadJunctionBG0Component
];
