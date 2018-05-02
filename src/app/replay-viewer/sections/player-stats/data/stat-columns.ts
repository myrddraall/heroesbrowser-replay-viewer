export enum StatColumnType {
    NUMBER = '#',
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
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'Deaths',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'TownKills',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'SoloKill',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'Assists',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'MetaExperience',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'TeamTakedowns',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'ExperienceContribution',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'Healing',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'SiegeDamage',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'StructureDamage',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'MinionDamage',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'HeroDamage',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'MercCampCaptures',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'WatchTowerCaptures',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'SelfHealing',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
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
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'SummonDamage',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'DamageTaken',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'DamageSoaked',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'KilledTreasureGoblin',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'HighestKillStreak',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'ProtectionGivenToAllies',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
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
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'EscapesPerformed',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'VengeancesPerformed',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'TeamfightEscapesPerformed',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'OutnumberedDeaths',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'TeamfightHealingDone',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'TeamfightDamageTaken',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'TeamfightHeroDamage',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'EndOfMatchAwardMostAltarDamageDone',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'EndOfMatchAwardGivenToNonwinner',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'OnFireTimeOnFire',
        type: StatColumnType.DURATION
    },
    {
        id: 'LunarNewYearSuccesfulArtifactTurnIns',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'TimeOnPoint',
        type: StatColumnType.DURATION
    },
    {
        id: 'LunarNewYearEventCompleted',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'StarcraftDailyEventCompleted',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'StarcraftPiecesCollected',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'LunarNewYearRoosterEventCompleted',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'TouchByBlightPlague',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'PachimariMania',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'DamageDoneToImmortal',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'KillParticipation',
        type: StatColumnType.PERCENT,
        format: '1.0-0'
    },
    {
        id: 'AverageDamageTakenPerLife',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'KDARatio',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'KDRatio',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'ADRatio',
        type: StatColumnType.NUMBER,
        format: '1.0-2'
    },
    {
        id: 'PercentDamageHealed',
        type: StatColumnType.PERCENT
    }
];
