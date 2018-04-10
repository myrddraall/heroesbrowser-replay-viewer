import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplayViewerComponent } from './replay-viewer.component';
import { ScoreScreenComponent } from './sections/score-screen/score-screen.component';
import { DraftComponent } from './sections/draft/draft.component';
const replayViewerRoutes: Routes = [
    {
        path: '',
        component: ReplayViewerComponent,
        children: [
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
