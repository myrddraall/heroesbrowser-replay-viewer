export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { DragonShireBG0Component } from './build-0/component';


export const DragonShireVersions: IMapVersion[] = [
    {
        id: 'dragon_shire',
        minBuild: 0,
        component: DragonShireBG0Component
    }
];

export const DragonShireCompnents: Type<BattlegroundMapBGBase>[] = [
    DragonShireBG0Component
];
