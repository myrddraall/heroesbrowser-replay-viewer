export * from './build-0/component';
export * from './build-1/component';

import { IMapVersion } from '../../types/IMapVersion';
import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../../bg-base/BattlegroundMapBGBase';

import { CursedHollowBG0Component } from './build-0/component';
import { CursedHollowBG1Component } from './build-1/component';

export const CursedHollowVersions: IMapVersion[] = [
    {
        id: 'cursed_hollow',
        minBuild: 0,
        component: CursedHollowBG0Component
    },
    {
        id: 'cursed_hollow',
        minBuild: 1,
        component: CursedHollowBG1Component
    }
];

export const CursedHollowCompnents: Type<BattlegroundMapBGBase>[] = [
    CursedHollowBG0Component,
    CursedHollowBG1Component
];
