export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { BattlefieldOfEternityBG0Component } from './build-0/component';


export const BattlefieldOfEternityVersions: IMapVersion[] = [
    {
        id: 'battlefield_of_eternity',
        minBuild: 0,
        component: BattlefieldOfEternityBG0Component
    }
];

export const BattlefieldOfEternityCompnents: Type<BattlegroundMapBGBase>[] = [
    BattlefieldOfEternityBG0Component
];
