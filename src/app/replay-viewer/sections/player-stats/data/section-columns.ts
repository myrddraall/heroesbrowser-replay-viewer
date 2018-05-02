
export interface IStatsSection {
    id: string;
    title: string;
}


export const StatSubsections: IStatsSection[] = [
    {
        id: 'pvp',
        title: 'PvP Combat',
    },
   /* {
        id: 'pve',
        title: 'PvE Combat',
    },
    {
        id: 'tanking',
        title: 'Tanking',
    },*/
    {
        id: 'cc',
        title: 'Crowd Control',
    },
    {
        id: 'healing',
        title: 'Healing',
    },
];
