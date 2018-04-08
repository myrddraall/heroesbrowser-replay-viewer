import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplayViewerComponent } from './replay-viewer.component';
import { ScoreScreenComponent } from './sections/score-screen/score-screen.component';

const replayViewerRoutes: Routes = [
    {
        path: '',
        component: ReplayViewerComponent,
        children: [
            {
                path: '',
                component: ScoreScreenComponent
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
