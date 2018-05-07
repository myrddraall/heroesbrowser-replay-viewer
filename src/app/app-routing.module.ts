import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { ReplayViewerComponent } from './replay-viewer/replay-viewer.component';


import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AboutComponent } from './replay-viewer/sections/about/about.component';
import { FaqComponent } from './replay-viewer/sections/faq/faq.component';

const appRoutes: Routes = [
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {

        path: '',
        redirectTo: 'replay',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false /*!environment.production*/, useHash: true } // <-- debugging purposes only
        ),
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
