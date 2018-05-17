import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss']
})
export class AppSettingComponent {

  constructor(
    public settingsService: SettingsService
  ) { }
}
