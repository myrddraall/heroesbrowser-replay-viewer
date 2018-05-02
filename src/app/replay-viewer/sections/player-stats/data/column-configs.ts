import { IStatColumnSelection } from './stat-columns';

export const DEFAULT_COL_FILTER_NAME = 'Default';

export const PrebuiltColumnFilters: { [section: string]: { [filter: string]: IStatColumnSelection[] } } = {
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
