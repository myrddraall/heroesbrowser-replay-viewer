import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { BgWrapperComponent, MapBackgroundComponents } from './bg';
import { MapControlsComponent } from './map-viewer/components/map-controls/map-controls.component';
import { MatMenuModule, MatSelectModule } from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        MatSelectModule,
        MatMenuModule
    ],
    exports: [
        MapViewerComponent,
        MapControlsComponent
    ],
    declarations: [
        MapViewerComponent,
        BgWrapperComponent,
        ...MapBackgroundComponents,
        MapControlsComponent
    ],
    providers: [],
    entryComponents: [
        ...MapBackgroundComponents
    ]
})
export class MapsModule { }
