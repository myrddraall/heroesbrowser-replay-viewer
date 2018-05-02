import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplayViewerComponent } from './replay-viewer.component';
import { ReplayHeaderComponent } from './components/replay-header/replay-header.component';
import { HeroIconComponent } from './components/hero-icon/hero-icon.component';
import { ClipIconService } from './services/clip-icon/clip-icon.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReplayNavComponent } from './components/replay-nav/replay-nav.component';
import { NavItemComponent } from './components/replay-nav/nav-item/nav-item.component';
import { ReplayViewerRoutingModule } from './replay-viewer-routing.module';
import { ScoreScreenComponent } from './sections/score-screen/score-screen.component';
import { PlayerStatsComponent } from './sections/player-stats/player-stats.component';
import {
  MatSidenavModule,
  MatProgressBarModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatListModule,
  MatAutocompleteModule
} from '@angular/material';


import { DraftComponent } from './sections/draft/draft.component';
import { SectionNotSupportedComponent } from './components/section-not-supported/section-not-supported.component';
import { SectionLoadingComponent } from './components/section-loading/section-loading.component';
import { XpBreakdownComponent } from './sections/xp-breakdown/xp-breakdown.component';
import { GlobeMapComponent } from './sections/globe-map/globe-map.component';
import { TalentScreenComponent } from './sections/talent-screen/talent-screen.component';
import { MapsModule } from './maps/maps.module';
import { PopoverComponent, PopoverDirective } from './components/popover/popover.component';
import { TalentIconComponent } from './components/talent-icon/talent-icon.component';
import { TalentTipComponent } from './components/talent-tip/talent-tip.component';
import { DurationPipe } from './pipes/duration.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatListModule,
    MatAutocompleteModule,
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
    PlayerStatsComponent,
    DraftComponent,
    TalentScreenComponent,
    SectionNotSupportedComponent,
    SectionLoadingComponent,
    XpBreakdownComponent,
    GlobeMapComponent,
    PopoverDirective,
    PopoverComponent,
    TalentIconComponent,
    TalentTipComponent,
    DurationPipe
  ],
  providers: [ClipIconService],
  entryComponents: [
    SectionNotSupportedComponent,
    SectionLoadingComponent,
    PopoverComponent
  ]
})
export class ReplayViewerModule { }
