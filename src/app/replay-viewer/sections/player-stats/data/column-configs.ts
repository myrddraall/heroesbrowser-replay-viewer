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
                id: 'AverageDamageSoakedPerLife',
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
                id: 'PercentDamageSoaked',
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
                'id': 'KDARatio',
                'selected': true
            },
            {
                'id': 'KDRatio',
                'selected': false
            },
            {
                'id': 'ADRatio',
                'selected': false
            },
            {
                'id': 'KillParticipation',
                'selected': true
            },
            {
                'id': 'HighestKillStreak',
                'selected': true
            },
            {
                'id': 'Deaths',
                'selected': true
            },
            {
                'id': 'Takedowns',
                'selected': true
            },
            {
                'id': 'Assists',
                'selected': true
            },
            {
                'id': 'Kills',
                'selected': true
            },
            {
                'id': 'SoloKill',
                'selected': true
            },
            {
                'id': 'TimeSpentDead',
                'selected': true
            },
            {
                'id': 'PercentGameSpentDead',
                'selected': false
            },
            {
                'id': 'HeroDamage',
                'selected': true
            },
            {
                'id': 'AverageHeroDamagePerLife',
                'selected': false
            },
            {
                'id': 'PercentHeroDamage',
                'selected': false
            },
            {
                'id': 'AverageTeamfightHeroDamagePerLife',
                'selected': false
            },
            {
                'id': 'PercentTeamfightHeroDamage',
                'selected': false
            },
            {
                'id': 'SummonDamage',
                'selected': false
            },
            {
                'id': 'DamageSoaked',
                'selected': true
            },
            {
                'id': 'AverageDamageSoakedPerLife',
                'selected': false
            },
            {
                'id': 'PercentDamageSoaked',
                'selected': false
            },
            {
                'id': 'DamageTaken',
                'selected': true
            },
            {
                'id': 'AverageDamageTakenPerLife',
                'selected': false
            },
            {
                'id': 'PercentDamageTaken',
                'selected': false
            },
            {
                'id': 'TeamfightDamageTaken',
                'selected': false
            },
            {
                'id': 'AverageTeamfightDamageTakenPerLife',
                'selected': false
            },
            {
                'id': 'PercentTeamfightDamageTaken',
                'selected': false
            },
            {
                'id': 'OutnumberedDeaths',
                'selected': false
            },
            {
                'id': 'EscapesPerformed',
                'selected': false
            },
            {
                'id': 'TeamfightEscapesPerformed',
                'selected': false
            },
            {
                'id': 'VengeancesPerformed',
                'selected': false
            },
            {
                'id': 'OnFireTimeOnFire',
                'selected': true
            },
            {
                'id': 'PercentTimeOnFire',
                'selected': false
            }
        ],
        'Per Life Stats': [
            {
                'id': 'KDARatio',
                'selected': true
            },
            {
                'id': 'KDRatio',
                'selected': false
            },
            {
                'id': 'ADRatio',
                'selected': false
            },
            {
                'id': 'KillParticipation',
                'selected': true
            },
            {
                'id': 'HighestKillStreak',
                'selected': true
            },
            {
                'id': 'Deaths',
                'selected': true
            },
            {
                'id': 'Takedowns',
                'selected': true
            },
            {
                'id': 'Assists',
                'selected': false
            },
            {
                'id': 'Kills',
                'selected': false
            },
            {
                'id': 'SoloKill',
                'selected': false
            },
            {
                'id': 'TimeSpentDead',
                'selected': false
            },
            {
                'id': 'PercentGameSpentDead',
                'selected': false
            },
            {
                'id': 'HeroDamage',
                'selected': true
            },
            {
                'id': 'AverageHeroDamagePerLife',
                'selected': true
            },
            {
                'id': 'PercentHeroDamage',
                'selected': false
            },
            {
                'id': 'AverageTeamfightHeroDamagePerLife',
                'selected': false
            },
            {
                'id': 'PercentTeamfightHeroDamage',
                'selected': false
            },
            {
                'id': 'SummonDamage',
                'selected': false
            },
            {
                'id': 'DamageSoaked',
                'selected': true
            },
            {
                'id': 'AverageDamageSoakedPerLife',
                'selected': true
            },
            {
                'id': 'PercentDamageSoaked',
                'selected': false
            },
            {
                'id': 'DamageTaken',
                'selected': true
            },
            {
                'id': 'AverageDamageTakenPerLife',
                'selected': true
            },
            {
                'id': 'PercentDamageTaken',
                'selected': false
            },
            {
                'id': 'TeamfightDamageTaken',
                'selected': false
            },
            {
                'id': 'AverageTeamfightDamageTakenPerLife',
                'selected': false
            },
            {
                'id': 'PercentTeamfightDamageTaken',
                'selected': false
            },
            {
                'id': 'OutnumberedDeaths',
                'selected': false
            },
            {
                'id': 'EscapesPerformed',
                'selected': false
            },
            {
                'id': 'TeamfightEscapesPerformed',
                'selected': false
            },
            {
                'id': 'VengeancesPerformed',
                'selected': false
            },
            {
                'id': 'OnFireTimeOnFire',
                'selected': false
            },
            {
                'id': 'PercentTimeOnFire',
                'selected': false
            }
        ],
        'Percent Stats': [
            {
              'id': 'KDARatio',
              'selected': true
            },
            {
              'id': 'KDRatio',
              'selected': false
            },
            {
              'id': 'ADRatio',
              'selected': false
            },
            {
              'id': 'KillParticipation',
              'selected': true
            },
            {
              'id': 'HighestKillStreak',
              'selected': true
            },
            {
              'id': 'Deaths',
              'selected': true
            },
            {
              'id': 'Takedowns',
              'selected': true
            },
            {
              'id': 'Assists',
              'selected': false
            },
            {
              'id': 'Kills',
              'selected': false
            },
            {
                'id': 'SoloKill',
                'selected': false
            },
            {
              'id': 'TimeSpentDead',
              'selected': true
            },
            {
              'id': 'PercentGameSpentDead',
              'selected': true
            },
            {
              'id': 'HeroDamage',
              'selected': true
            },
            {
              'id': 'AverageHeroDamagePerLife',
              'selected': false
            },
            {
              'id': 'PercentHeroDamage',
              'selected': true
            },
            {
              'id': 'AverageTeamfightHeroDamagePerLife',
              'selected': false
            },
            {
              'id': 'PercentTeamfightHeroDamage',
              'selected': false
            },
            {
              'id': 'SummonDamage',
              'selected': false
            },
            {
              'id': 'DamageSoaked',
              'selected': true
            },
            {
              'id': 'AverageDamageSoakedPerLife',
              'selected': false
            },
            {
              'id': 'PercentDamageSoaked',
              'selected': true
            },
            {
              'id': 'DamageTaken',
              'selected': true
            },
            {
              'id': 'AverageDamageTakenPerLife',
              'selected': false
            },
            {
              'id': 'PercentDamageTaken',
              'selected': true
            },
            {
              'id': 'TeamfightDamageTaken',
              'selected': false
            },
            {
              'id': 'AverageTeamfightDamageTakenPerLife',
              'selected': false
            },
            {
              'id': 'PercentTeamfightDamageTaken',
              'selected': false
            },
            {
              'id': 'OutnumberedDeaths',
              'selected': false
            },
            {
              'id': 'EscapesPerformed',
              'selected': false
            },
            {
              'id': 'TeamfightEscapesPerformed',
              'selected': false
            },
            {
              'id': 'VengeancesPerformed',
              'selected': false
            },
            {
              'id': 'OnFireTimeOnFire',
              'selected': true
            },
            {
              'id': 'PercentTimeOnFire',
              'selected': true
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
                id: 'MinionsKilled',
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
            },
            {
                id: 'DeathsToNPCs',
                selected: true
            },
        ]
    },
    cc: {
        [DEFAULT_COL_FILTER_NAME]: [
            {
                id: 'TimeStunningEnemyHeroes',
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
                id: 'TimeSlowedEnemyHeroes',
                selected: true
            },
            {
                id: 'TimeCCdEnemyHeroes',
                selected: true
            },
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
            },
            {
                id: 'VotesReceived',
                selected: true
            },
        ]
    },
};
