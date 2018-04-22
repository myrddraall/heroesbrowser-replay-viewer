export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { BraxisHoldoutBG0Component } from './build-0/component';


export const BraxisHoldoutVersions: IMapVersion[] = [
    {
        id: 'braxis_holdout',
        minBuild: 0,
        component: BraxisHoldoutBG0Component
    }
];

export const BraxisHoldoutCompnents: Type<BattlegroundMapBGBase>[] = [
    BraxisHoldoutBG0Component
];
