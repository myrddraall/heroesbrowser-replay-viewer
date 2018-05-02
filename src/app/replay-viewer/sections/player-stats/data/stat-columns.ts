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
    },
    {
        id: 'SoloKill',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'Assists',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'MetaExperience',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TeamTakedowns',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'ExperienceContribution',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'Healing',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'SiegeDamage',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'StructureDamage',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'MinionDamage',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'HeroDamage',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'MercCampCaptures',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'WatchTowerCaptures',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'SelfHealing',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TimeSpentDead',
        type: StatColumnType.DURATION
    },
    {
        id: 'TimeCCdEnemyHeroes',
        type: StatColumnType.DURATION
    },
    {
        id: 'CreepDamage',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'SummonDamage',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'DamageTaken',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'DamageSoaked',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'KilledTreasureGoblin',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'HighestKillStreak',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'ProtectionGivenToAllies',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TimeSilencingEnemyHeroes',
        type: StatColumnType.DURATION
    },
    {
        id: 'TimeRootingEnemyHeroes',
        type: StatColumnType.DURATION
    },
    {
        id: 'TimeStunningEnemyHeroes',
        type: StatColumnType.DURATION
    },
    {
        id: 'ClutchHealsPerformed',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'EscapesPerformed',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'VengeancesPerformed',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TeamfightEscapesPerformed',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'OutnumberedDeaths',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TeamfightHealingDone',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TeamfightDamageTaken',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'TeamfightHeroDamage',
        type: StatColumnType.INTEGER,
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
        type: StatColumnType.DURATION
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
        format: '1.0-0'
    },
    {
        id: 'AverageDamageTakenPerLife',
        type: StatColumnType.INTEGER,
    },
    {
        id: 'KDARatio',
        type: StatColumnType.DECIMAL,
    },
    {
        id: 'KDRatio',
        type: StatColumnType.DECIMAL,
    },
    {
        id: 'ADRatio',
        type: StatColumnType.DECIMAL,
    },
    {
        id: 'PercentDamageHealed',
        type: StatColumnType.PERCENT
    }
];
