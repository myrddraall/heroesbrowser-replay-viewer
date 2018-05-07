import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appVersion: string = environment.appVerion;

  public lastReplaySection = '/replay';

  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    router: Router
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
}
