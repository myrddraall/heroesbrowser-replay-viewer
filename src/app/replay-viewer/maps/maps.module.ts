import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import {  BgWrapperComponent, MapBackgroundComponents} from './bg';
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MapViewerComponent
    ],
    declarations: [
        MapViewerComponent,
        BgWrapperComponent,
        ...MapBackgroundComponents
    ],
    providers: [],
    entryComponents: [
        ...MapBackgroundComponents
    ]
})
export class MapsModule { }
