import { IStatColumnSelection } from './stat-columns';

export const DEFAULT_COL_FILTER_NAME = 'Default';

export const PrebuiltColumnFilters: { [section: string]: { [filter: string]: IStatColumnSelection[] } } = {
    tanking: {
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
            }
          ]
    },
    pve: {
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
            }
        ]
    }
};
