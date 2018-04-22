export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { TombOfTheSpiderQueenBG0Component } from './build-0/component';


export const TombOfTheSpiderQueenVersions: IMapVersion[] = [
    {
        id: 'tomb_of_the_spider_queen',
        minBuild: 0,
        component: TombOfTheSpiderQueenBG0Component
    }
];

export const TombOfTheSpiderQueenCompnents: Type<BattlegroundMapBGBase>[] = [
    TombOfTheSpiderQueenBG0Component
];
