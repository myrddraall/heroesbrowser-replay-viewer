import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { ReplayViewerComponent } from './replay-viewer/replay-viewer.component';


import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

const appRoutes: Routes = [
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: !environment.production, useHash: true } // <-- debugging purposes only
        ),
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
