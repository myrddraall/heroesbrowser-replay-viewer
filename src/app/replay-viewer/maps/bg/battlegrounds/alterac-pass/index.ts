export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { AlteracPassBG0Component } from './build-0/component';


export const AlteracPassVersions: IMapVersion[] = [
    {
        id: 'alterac_pass',
        minBuild: 0,
        component: AlteracPassBG0Component
    }
];

export const AlteracPassCompnents: Type<BattlegroundMapBGBase>[] = [
    AlteracPassBG0Component
];
