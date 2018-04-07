import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeroProtocol } from '@heroesbrowser/heroprotocol';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ReplayViewerModule } from './replay-viewer/replay-viewer.module';

HeroProtocol.env = environment.production ? 'production' : 'developement';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReplayViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
