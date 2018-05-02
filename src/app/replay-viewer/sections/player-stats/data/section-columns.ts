
export interface IStatsSection {
    id: string;
    title: string;
    columns: string[];
}


export const StatSubsections: IStatsSection[] = [
    {
        id: 'cc',
        title: 'Crowd Control',
        columns:  [
            'TimeCCdEnemyHeroes',
            'TimeSilencingEnemyHeroes',
            'TimeRootingEnemyHeroes',
            'TimeStunningEnemyHeroes'
        ]
    },
    {
        id: 'healing',
        title: 'Healing',
        columns:  [
            'Healing',
            'SelfHealing',
            'ClutchHealsPerformed',
            'TeamfightHealingDone',
            'PercentDamageHealed'
        ]
    },
];
