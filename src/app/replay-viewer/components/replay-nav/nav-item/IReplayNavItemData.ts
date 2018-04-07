export interface IReplayNavItem {
    type: 'link' | 'section';
    label: string;
}

export interface IReplayNavItemLink extends IReplayNavItem {
    type: 'link';
    path: string[];
}

export interface IReplayNavItemSection extends IReplayNavItem {
    type: 'section';
    children: IReplayNavItem[];
}
