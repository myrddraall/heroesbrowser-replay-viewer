import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { ReplayService } from './replay-viewer/services/replay-service/replay.service';
import { MatSidenav } from '@angular/material';
import { SettingsService } from './replay-viewer/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sideNav')
  private sideNav: MatSidenav;

  public appVersion: string = environment.appVerion;

  public lastReplaySection = '/replay';
  public loadRecentReplay: EventEmitter<string> = new EventEmitter();

  public get recentReplays() {
    return this.replayService.recentReplays;
  }
  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    router: Router,
    private replayService: ReplayService,
    private settingsService: SettingsService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.startsWith('/replay')) {
          this.lastReplaySection = event.urlAfterRedirects;
        }
      }
      console.log(event);
    });
  }

  public loadRecent(fingerPrint: string) {
    if (!this.isRecentReplayLoaded(fingerPrint)) {
      this.loadRecentReplay.next(fingerPrint);
      this.sideNav.close();
    }
  }

  public isRecentReplayLoaded(fp: string) {
    return this.replayService.replayDescription && this.replayService.replayDescription.fingerPrint === fp;
  }

  public get allowRecentReplays() {
    return this.settingsService.allowRecentReplays;
  }
}
