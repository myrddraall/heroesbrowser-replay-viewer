import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplayViewerComponent } from './replay-viewer.component';
import { ScoreScreenComponent } from './sections/score-screen/score-screen.component';
import { DraftComponent } from './sections/draft/draft.component';
import { XpBreakdownComponent } from './sections/xp-breakdown/xp-breakdown.component';
import { GlobeMapComponent } from './sections/globe-map/globe-map.component';
import { TalentScreenComponent } from './sections/talent-screen/talent-screen.component';
import { PlayerStatsComponent } from './sections/player-stats/player-stats.component';

const replayViewerRoutes: Routes = [
    {
        path: 'replay',
        component: ReplayViewerComponent,
        children: [
            {
                path: 'player-stats/:subsection',
                component: PlayerStatsComponent
            },
            {
                path: 'talents',
                component: TalentScreenComponent
            },
            {
                path: 'minion-deaths',
                component: GlobeMapComponent
            },
            {
                path: 'xp-breakdown',
                component: XpBreakdownComponent
            },
            {
                path: 'draft',
                component: DraftComponent
            },
            {
                path: 'score',
                component: ScoreScreenComponent
            },
            {

                path: '',
                redirectTo: 'score',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(replayViewerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ReplayViewerRoutingModule { }
