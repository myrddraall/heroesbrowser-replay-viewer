import { Type } from '@angular/core';
import { IMapVersion } from './types';
import { BattlegroundMapBGBase } from './bg-base/BattlegroundMapBGBase';
import {
    AlteracPassCompnents, AlteracPassVersions,
    BattlefieldOfEternityCompnents, BattlefieldOfEternityVersions,
    BlackheartsBayCompnents, BlackheartsBayVersions,
    BraxisHoldoutCompnents, BraxisHoldoutVersions,
    CursedHollowCompnents, CursedHollowVersions,
    DragonShireCompnents, DragonShireVersions,
    HauntedMinesCompnents, HauntedMinesVersions,
    InfernalShrinesCompnents, InfernalShrinesVersions,
    GardenOfTerrorCompnents, GardenOfTerrorVersions,
    SkyTempleCompnents, SkyTempleVersions,
    TombOfTheSpiderQueenCompnents, TombOfTheSpiderQueenVersions,
    TowersOfDoomCompnents, TowersOfDoomVersions,
    VolskayaFoundryCompnents, VolskayaFoundryVersions,
    WarheadJunctionCompnents, WarheadJunctionVersions
} from './battlegrounds';


export const MapBackgroundComponentMap: { [key: string]: IMapVersion[] } = {
    alterac_pass: AlteracPassVersions,
    battlefield_of_eternity: BattlefieldOfEternityVersions,
    blackheart_s_bay: BlackheartsBayVersions,
    braxis_holdout: BraxisHoldoutVersions,
    cursed_hollow: CursedHollowVersions,
    dragon_shire: DragonShireVersions,
    haunted_mines: HauntedMinesVersions,
    infernal_shrines: InfernalShrinesVersions,
    garden_of_terror: GardenOfTerrorVersions,
    sky_temple: SkyTempleVersions,
    tomb_of_the_spider_queen: TombOfTheSpiderQueenVersions,
    towers_of_doom: TowersOfDoomVersions,
    volskaya_foundry: VolskayaFoundryVersions,
    warhead_junction: WarheadJunctionVersions
};

export const MapBackgroundComponents: Type<BattlegroundMapBGBase>[] = [
    ...AlteracPassCompnents,
    ...BattlefieldOfEternityCompnents,
    ...BlackheartsBayCompnents,
    ...BraxisHoldoutCompnents,
    ...CursedHollowCompnents,
    ...DragonShireCompnents,
    ...HauntedMinesCompnents,
    ...InfernalShrinesCompnents,
    ...GardenOfTerrorCompnents,
    ...SkyTempleCompnents,
    ...TombOfTheSpiderQueenCompnents,
    ...TowersOfDoomCompnents,
    ...VolskayaFoundryCompnents,
    ...WarheadJunctionCompnents
];
