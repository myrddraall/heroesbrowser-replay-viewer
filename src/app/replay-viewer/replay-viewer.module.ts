import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReplayViewerComponent } from './replay-viewer.component';
import { ReplayHeaderComponent } from './components/replay-header/replay-header.component';
import { HeroIconComponent } from './components/hero-icon/hero-icon.component';
import { ClipIconService } from './services/clip-icon/clip-icon.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReplayNavComponent } from './components/replay-nav/replay-nav.component';
import { NavItemComponent } from './components/replay-nav/nav-item/nav-item.component';
import { ReplayViewerRoutingModule } from './replay-viewer-routing.module';
import { ScoreScreenComponent } from './sections/score-screen/score-screen.component';
import {
  MatSidenavModule,
  MatProgressBarModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';
import { DraftComponent } from './sections/draft/draft.component';
import { SectionNotSupportedComponent } from './components/section-not-supported/section-not-supported.component';
import { SectionLoadingComponent } from './components/section-loading/section-loading.component';
import { XpBreakdownComponent } from './sections/xp-breakdown/xp-breakdown.component';
import { GlobeMapComponent } from './sections/globe-map/globe-map.component';
import { MapsModule } from './maps/maps.module';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MapsModule,
    ReplayViewerRoutingModule,
  ],
  exports: [
    ReplayViewerComponent
  ],
  declarations: [
    ReplayViewerComponent,
    ReplayHeaderComponent,
    HeroIconComponent,
    ReplayNavComponent,
    NavItemComponent,
    ScoreScreenComponent,
    DraftComponent,
    SectionNotSupportedComponent,
    SectionLoadingComponent,
    XpBreakdownComponent,
    GlobeMapComponent
  ],
  providers: [ClipIconService],
  entryComponents: [
    SectionNotSupportedComponent,
    SectionLoadingComponent
  ]
})
export class ReplayViewerModule { }
