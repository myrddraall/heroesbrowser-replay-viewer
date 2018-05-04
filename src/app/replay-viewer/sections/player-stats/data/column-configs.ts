import { IStatColumnSelection } from './stat-columns';

export const DEFAULT_COL_FILTER_NAME = 'Default';

export const PrebuiltColumnFilters: { [section: string]: { [filter: string]: IStatColumnSelection[] } } = {
    tanking: {
        [DEFAULT_COL_FILTER_NAME]: [
            {
                id: 'AverageDamageTakenPerLife',
                selected: true
            },
            {
                id: 'DamageTaken',
                selected: true
            },
            {
                id: 'DamageSoaked',
                selected: true
            },
            {
                id: 'TeamfightDamageTaken',
                selected: true
            },
            {
                id: 'KillParticipation',
                selected: true
            },
            {
                id: 'TimeSpentDead',
                selected: true
            },
            {
                id: 'Deaths',
                selected: true
            },
            {
                id: 'AverageTeamfightDamageTakenPerLife',
                selected: true
            },
            {
                id: 'PercentDamageTaken',
                selected: true
            },
            {
                id: 'PercentTeamfightDamageTaken',
                selected: true
            },
            {
                id: 'PercentGameSpentDead',
                selected: true
            }
        ]
    },
    pvp: {
        [DEFAULT_COL_FILTER_NAME]: [
            {
                id: 'KillParticipation',
                selected: true
            },
            {
                id: 'AverageDamageTakenPerLife',
                selected: true
            },
            {
                id: 'KDARatio',
                selected: true
            },
            {
                id: 'HighestKillStreak',
                selected: true
            },
            {
                id: 'Takedowns',
                selected: true
            },
            {
                id: 'Deaths',
                selected: true
            },
            {
                id: 'Assists',
                selected: true
            },
            {
                id: 'SoloKill',
                selected: true
            },
            {
                id: 'TimeSpentDead',
                selected: true
            },
            {
                id: 'OutnumberedDeaths',
                selected: true
            },
            {
                id: 'HeroDamage',
                selected: true
            },
            {
                id: 'DamageTaken',
                selected: true
            },
            {
                id: 'TeamfightDamageTaken',
                selected: true
            },
            {
                id: 'SummonDamage',
                selected: false
            },
            {
                id: 'KDRatio',
                selected: false
            },
            {
                id: 'ADRatio',
                selected: false
            },
            {
                id: 'EscapesPerformed',
                selected: false
            },
            {
                id: 'VengeancesPerformed',
                selected: false
            },
            {
                id: 'TeamfightEscapesPerformed',
                selected: false
            },
            {
                id: 'AverageHeroDamagePerLife',
                selected: false
            },
            {
                id: 'AverageTeamfightHeroDamagePerLife',
                selected: false
            },
            {
                id: 'AverageTeamfightDamageTakenPerLife',
                selected: false
            },
            {
                id: 'PercentHeroDamage',
                selected: false
            },
            {
                id: 'PercentTeamfightHeroDamage',
                selected: false
            },
            {
                id: 'PercentDamageTaken',
                selected: false
            },
            {
                id: 'PercentTeamfightDamageTaken',
                selected: false
            },
            {
                id: 'PercentGameSpentDead',
                selected: false
            },
            {
                id: 'PercentTimeOnFire',
                selected: false
            }
        ]
    },
    pve: {
        [DEFAULT_COL_FILTER_NAME]: [
            {
                id: 'ExperienceContribution',
                selected: true
            },
            {
                id: 'SiegeDamage',
                selected: true
            },
            {
                id: 'StructureDamage',
                selected: true
            },
            {
                id: 'MinionDamage',
                selected: true
            },
            {
                id: 'MercCampCaptures',
                selected: true
            },
            {
                id: 'WatchTowerCaptures',
                selected: true
            },
            {
                id: 'CreepDamage',
                selected: true
            },
            {
                id: 'AverageSiegeDamagePerLife',
                selected: true
            },
            {
                id: 'PercentSiegeDamage',
                selected: true
            },
            {
                id: 'PercentStructureDamage',
                selected: true
            },
            {
                id: 'PercentMinionDamage',
                selected: true
            },
            {
                id: 'PercentCreepDamage',
                selected: true
            },
            {
                id: 'PercentXPContribution',
                selected: true
            }
        ]
    },
    cc: {
        [DEFAULT_COL_FILTER_NAME]: [
            {
                id: 'TimeCCdEnemyHeroes',
                selected: true
            },
            {
                id: 'TimeRootingEnemyHeroes',
                selected: true
            },
            {
                id: 'TimeSilencingEnemyHeroes',
                selected: true
            },
            {
                id: 'TimeStunningEnemyHeroes',
                selected: true
            }
        ]
    },
    healing: {
        [DEFAULT_COL_FILTER_NAME]: [
            {
                id: 'Healing',
                selected: true
            },
            {
                id: 'SelfHealing',
                selected: true
            },
            {
                id: 'ClutchHealsPerformed',
                selected: true
            },
            {
                id: 'TeamfightHealingDone',
                selected: true
            },
            {
                id: 'PercentDamageHealed',
                selected: true
            },
            {
                id: 'ProtectionGivenToAllies',
                selected: true
            },
            {
                id: 'AverageHealingPerLife',
                selected: true
            },
            {
                id: 'AverageTeamfightHealingPerLife',
                selected: true
            },
            {
                id: 'PercentHealing',
                selected: true
            },
            {
                id: 'PercentProtection',
                selected: true
            },
            {
                id: 'PercentTeamfightHealing',
                selected: true
            }
        ]
    },
    misc: {
        [DEFAULT_COL_FILTER_NAME]: [
            {
                id: 'Disconnects',
                selected: true
            },
            {
                id: 'Reconnects',
                selected: true
            },
            {
                id: 'TimeDisconnected',
                selected: true
            },
            {
                id: 'PercentOfGameDisconnected',
                selected: true
            }
        ]
    },
};
