import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplayViewerComponent } from './replay-viewer.component';
import { ReplayHeaderComponent } from './components/replay-header/replay-header.component';
import { HeroIconComponent } from './components/hero-icon/hero-icon.component';
import { ClipIconService } from './services/clip-icon/clip-icon.service';
import { MatSidenavModule, MatProgressBarModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReplayNavComponent } from './components/replay-nav/replay-nav.component';
import { NavItemComponent } from './components/replay-nav/nav-item/nav-item.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  exports: [
    ReplayViewerComponent
  ],
  declarations: [ReplayViewerComponent, ReplayHeaderComponent, HeroIconComponent, ReplayNavComponent, NavItemComponent],
  providers: [ClipIconService]
})
export class ReplayViewerModule { }
