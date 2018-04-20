import { Type } from '@angular/core';
import { IMapVersion } from './types';
import { BattlegroundMapBGBase } from './bg-base/BattlegroundMapBGBase';
import {
    CursedHollowCompnents, CursedHollowVersions,
    HauntedMinesCompnents, HauntedMinesVersions,
    VolskayaFoundryCompnents, VolskayaFoundryVersions
} from './battlegrounds';


export const MapBackgroundComponentMap: { [key: string]: IMapVersion[] } = {
    cursed_hollow: CursedHollowVersions,
    haunted_mines: HauntedMinesVersions,
    volskaya_foundry: VolskayaFoundryVersions
};

export const MapBackgroundComponents: Type<BattlegroundMapBGBase>[] = [
    ...CursedHollowCompnents,
    ...HauntedMinesCompnents,
    ...VolskayaFoundryCompnents
];
