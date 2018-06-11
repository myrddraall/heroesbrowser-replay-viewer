import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeroProtocol } from '@heroesbrowser/heroprotocol';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import {
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatSidenavModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { ReplayViewerModule } from './replay-viewer/replay-viewer.module';
import { AppRoutingModule } from './app-routing.module';
import { SettingsService } from './replay-viewer/services/settings.service';
HeroProtocol.env = environment.production ? 'production' : 'developement';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    ReplayViewerModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
