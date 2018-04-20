export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { VolskayaFoundryBG0Component } from './build-0/component';


export const VolskayaFoundryVersions: IMapVersion[] = [
    {
        id: 'volskaya_foundry',
        minBuild: 0,
        component: VolskayaFoundryBG0Component
    }
];

export const VolskayaFoundryCompnents: Type<BattlegroundMapBGBase>[] = [
    VolskayaFoundryBG0Component
];
