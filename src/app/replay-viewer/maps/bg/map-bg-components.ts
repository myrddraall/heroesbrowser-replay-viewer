import { Type } from '@angular/core';
import { IMapVersion } from './types';
import { BattlegroundMapBGBase } from './bg-base/BattlegroundMapBGBase';
import { CursedHollowCompnents, CursedHollowVersions } from './battlegrounds';


export const MapBackgroundComponentMap: { [key: string]: IMapVersion[] } = {
    cursed_hollow: CursedHollowVersions
};

export const MapBackgroundComponents: Type<BattlegroundMapBGBase>[] = [
    ...CursedHollowCompnents
];
