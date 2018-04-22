export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { BlackheartsBayBG0Component } from './build-0/component';


export const BlackheartsBayVersions: IMapVersion[] = [
    {
        id: 'blackheart_s_bay',
        minBuild: 0,
        component: BlackheartsBayBG0Component
    }
];

export const BlackheartsBayCompnents: Type<BattlegroundMapBGBase>[] = [
    BlackheartsBayBG0Component
];
