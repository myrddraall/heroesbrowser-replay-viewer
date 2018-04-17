import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplayViewerComponent } from './replay-viewer.component';
import { ScoreScreenComponent } from './sections/score-screen/score-screen.component';
import { DraftComponent } from './sections/draft/draft.component';
import { XpBreakdownComponent } from './sections/xp-breakdown/xp-breakdown.component';
import { GlobeMapComponent } from './sections/globe-map/globe-map.component';
const replayViewerRoutes: Routes = [
    {
        path: '',
        component: ReplayViewerComponent,
        children: [
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
