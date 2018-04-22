export * from './build-0/component';


import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { SkyTempleBG0Component } from './build-0/component';


export const SkyTempleVersions: IMapVersion[] = [
    {
        id: 'sky_temple',
        minBuild: 0,
        component: SkyTempleBG0Component
    }
];

export const SkyTempleCompnents: Type<BattlegroundMapBGBase>[] = [
    SkyTempleBG0Component
];
