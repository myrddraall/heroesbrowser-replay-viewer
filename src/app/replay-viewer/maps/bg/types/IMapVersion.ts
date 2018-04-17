import { Type } from '@angular/core';
import { BattlegroundMapBGBase } from '../bg-base/BattlegroundMapBGBase';

export interface IMapVersion {
    id: string;
    minBuild: number;
    component: Type<BattlegroundMapBGBase>;
}
