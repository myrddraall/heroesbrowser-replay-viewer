export enum StatColumnType {
    INTEGER = '#',
    DECIMAL = '#.#',
    PERCENT = '%',
    DURATION = 'd'
}

export interface IStatColumn {
    id: string;
    type: StatColumnType;
    format?: string;
    label?: string;
    description?: string;
    substats?: string[];
}

export interface IStatColumnSelection {
    id: string;
    selected: boolean;
}

export const StatColumns: IStatColumn[] = [
    {
        id: 'Takedowns',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'Deaths',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TownKills',
        type: StatColumnType.INTEGER,
        label: 'Town Kills'
    },
    {
        id: 'MinionsKilled',
        type: StatColumnType.INTEGER,
        label: 'Minion Kills'
    },
    {
        id: 'Kills',
        type: StatColumnType.INTEGER,
        label: 'Kills'
    },
    {
        id: 'SoloKill',
        type: StatColumnType.INTEGER,
        label: 'Solo Kills',
        description: 'Number of Player kills without the assistance of team mates'
    },
    {
        id: 'Assists',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'MetaExperience',
        type: StatColumnType.INTEGER,
        label: 'Total Team XP'
    },
    /*{
        id: 'TeamTakedowns',
        type: StatColumnType.INTEGER,
    },*/
    {
        id: 'ExperienceContribution',
        type: StatColumnType.INTEGER,
        label: 'XP'
    },
    {
        id: 'Healing',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'SiegeDamage',
        type: StatColumnType.INTEGER,
        label: 'Siege Damage'
    },
    {
        id: 'StructureDamage',
        type: StatColumnType.INTEGER,
        label: 'Structure Damage'
    },
    {
        id: 'MinionDamage',
        type: StatColumnType.INTEGER,
        label: 'Minion Damage'
    },
    {
        id: 'HeroDamage',
        type: StatColumnType.INTEGER,
        label: 'Hero Damage'
    },
    {
        id: 'MercCampCaptures',
        type: StatColumnType.INTEGER,
        label: 'Merc Camps Taken'
    },
    {
        id: 'WatchTowerCaptures',
        type: StatColumnType.INTEGER,
        label: 'Watch Towers Taken'
    },
    {
        id: 'SelfHealing',
        type: StatColumnType.INTEGER,
        label: 'Self Healing'
    },
    {
        id: 'TimeSpentDead',
        type: StatColumnType.DURATION,
        label: 'Time Dead'
    },
    {
        id: 'TimeCCdEnemyHeroes',
        type: StatColumnType.DURATION,
        label: 'Total CC'
    },
    {
        id: 'CreepDamage',
        type: StatColumnType.INTEGER,
        label: 'Merc Damage'
    },
    {
        id: 'SummonDamage',
        type: StatColumnType.INTEGER,
        label: 'Summon Damage'
    },
    {
        id: 'DamageTaken',
        type: StatColumnType.INTEGER,
        label: 'Damage Taken'
    },
    {
        id: 'DamageSoaked',
        type: StatColumnType.INTEGER,
        label: 'Hero Damage Taken'
    },
    {
        id: 'KilledTreasureGoblin',
        type: StatColumnType.INTEGER,
        label: 'Treasure Goblin Kills'
    },
    {
        id: 'HighestKillStreak',
        type: StatColumnType.INTEGER,
        label: 'Highest Kill Streak'
    },
    {
        id: 'ProtectionGivenToAllies',
        type: StatColumnType.INTEGER,
        label: 'Protection'
    },
    {
        id: 'TimeSilencingEnemyHeroes',
        type: StatColumnType.DURATION,
        label: 'Silence'
    },
    {
        id: 'TimeRootingEnemyHeroes',
        type: StatColumnType.DURATION,
        label: 'Roots'
    },
    {
        id: 'TimeStunningEnemyHeroes',
        type: StatColumnType.DURATION,
        label: 'Stuns'
    },
    {
        id: 'ClutchHealsPerformed',
        type: StatColumnType.INTEGER,
        label: 'Clutch Heals'
    },
    {
        id: 'EscapesPerformed',
        type: StatColumnType.INTEGER,
        label: 'Escapes'
    },
    {
        id: 'VengeancesPerformed',
        type: StatColumnType.INTEGER,
        label: 'Vengeances'
    },
    {
        id: 'TeamfightEscapesPerformed',
        type: StatColumnType.INTEGER,
        label: 'Teamfight Escapes'
    },
    {
        id: 'OutnumberedDeaths',
        type: StatColumnType.INTEGER,
        label: 'Outnumbered Deaths'
    },
    {
        id: 'TeamfightHealingDone',
        type: StatColumnType.INTEGER,
        label: 'Teamfight Healing'
    },
    {
        id: 'TeamfightDamageTaken',
        type: StatColumnType.INTEGER,
        label: 'Teamfight Damage Taken'
    },
    {
        id: 'TeamfightHeroDamage',
        type: StatColumnType.INTEGER,
        label: 'Teamfight Hero Damage'
    },
    {
        id: 'EndOfMatchAwardMostAltarDamageDone',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'EndOfMatchAwardGivenToNonwinner',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'OnFireTimeOnFire',
        type: StatColumnType.DURATION,
        label: 'Time On Fire'
    },
    {
        id: 'LunarNewYearSuccesfulArtifactTurnIns',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TimeOnPoint',
        type: StatColumnType.DURATION
    },
    {
        id: 'LunarNewYearEventCompleted',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'StarcraftDailyEventCompleted',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'StarcraftPiecesCollected',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'LunarNewYearRoosterEventCompleted',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TouchByBlightPlague',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'PachimariMania',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'DamageDoneToImmortal',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'KillParticipation',
        type: StatColumnType.PERCENT,
        format: '1.0-0',
        label: 'Kill Participation'
    },
    {
        id: 'KDARatio',
        type: StatColumnType.DECIMAL,
        label: 'KDA'
    },
    {
        id: 'KDRatio',
        type: StatColumnType.DECIMAL,
        label: 'Kills to Deaths'
    },
    {
        id: 'ADRatio',
        type: StatColumnType.DECIMAL,
        label: 'Assists to Deaths'
    },
    {
        id: 'AverageHeroDamagePerLife',
        type: StatColumnType.INTEGER,
        label: 'Hero Damage / Life'
    },
    {
        id: 'AverageTeamfightHeroDamagePerLife',
        type: StatColumnType.INTEGER,
        label: 'Teamfight Hero Damage / Life'
    },
    {
        id: 'AverageSiegeDamagePerLife',
        type: StatColumnType.INTEGER,
        label: 'Siege Damage / Life'
    },
    {
        id: 'AverageHealingPerLife',
        type: StatColumnType.INTEGER,
        label: 'Healing / Life'
    },
    {
        id: 'AverageTeamfightHealingPerLife',
        type: StatColumnType.INTEGER,
        label: 'Teamfight Healing / Life'
    },
    {
        id: 'AverageDamageTakenPerLife',
        type: StatColumnType.INTEGER,
        label: 'Damage Taken / Life'
    },
    {
        id: 'AverageDamageSoakedPerLife',
        type: StatColumnType.INTEGER,
        label: 'Hero Damage Taken / Life'
    },
    {
        id: 'AverageTeamfightDamageTakenPerLife',
        type: StatColumnType.INTEGER,
        label: 'Teamfight Damage Taken / Life'
    },
    {
        id: 'PercentHeroDamage',
        type: StatColumnType.PERCENT,
        label: 'Hero Damage %'
    },
    {
        id: 'PercentTeamfightHeroDamage',
        type: StatColumnType.PERCENT,
        label: 'Teamfight Hero Damage %'
    },
    {
        id: 'PercentSiegeDamage',
        type: StatColumnType.PERCENT,
        label: 'Siege Damage %'
    },
    {
        id: 'PercentStructureDamage',
        type: StatColumnType.PERCENT,
        label: 'Structure Damage %'
    },
    {
        id: 'PercentMinionDamage',
        type: StatColumnType.PERCENT,
        label: 'Minion Damage %'
    },
    {
        id: 'PercentCreepDamage',
        type: StatColumnType.PERCENT,
        label: 'Merc Damage %'
    },
    {
        id: 'PercentHealing',
        type: StatColumnType.PERCENT,
        label: 'Healing %'
    },
    {
        id: 'PercentProtection',
        type: StatColumnType.PERCENT,
        label: 'Protection %'
    },
    {
        id: 'PercentTeamfightHealing',
        type: StatColumnType.PERCENT,
        label: 'Teamfight Healing %'
    },
    {
        id: 'PercentDamageTaken',
        type: StatColumnType.PERCENT,
        label: 'Damage Taken %'
    },
    {
        id: 'PercentDamageSoaked',
        type: StatColumnType.PERCENT,
        label: 'Hero Damage Taken %'
    },
    {
        id: 'PercentTeamfightDamageTaken',
        type: StatColumnType.PERCENT,
        label: 'Teamfight Damage Taken %'
    },
    {
        id: 'PercentXPContribution',
        type: StatColumnType.PERCENT,
        label: 'XP %'
    },
    {
        id: 'PercentGameSpentDead',
        type: StatColumnType.PERCENT,
        label: 'Time Dead %'
    },
    {
        id: 'PercentTimeOnFire',
        type: StatColumnType.PERCENT,
        label: 'Time On Fire %'
    },
    {
        id: 'PercentDamageHealed',
        type: StatColumnType.PERCENT,
        label: 'Damage Healed %'
    },
    {
        id: 'Disconnects',
        type: StatColumnType.INTEGER
    },
    {
        id: 'Reconnects',
        type: StatColumnType.INTEGER
    },
    {
        id: 'TimeDisconnected',
        type: StatColumnType.DURATION,
        label: 'Time Disconnected'
    },
    {
        id: 'PercentOfGameDisconnected',
        type: StatColumnType.PERCENT,
        label: 'Time Disconnected %'
    }
];
