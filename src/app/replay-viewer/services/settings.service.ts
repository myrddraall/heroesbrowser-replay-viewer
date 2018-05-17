import { Injectable, EventEmitter } from '@angular/core';

interface IHrsbRecentReplaySettings {
  enabled: boolean;
}

interface IHrsbSettings {
  recentReplaySettings: IHrsbRecentReplaySettings;
}


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _settingsData: IHrsbSettings = {
    recentReplaySettings: {
      enabled: true
    }
  };
  private _allowRecentReplaysChange: EventEmitter<boolean> = new EventEmitter();
  private _clearRecentReplays: EventEmitter<void> = new EventEmitter();

  public get allowRecentReplaysChange() {
    return this._allowRecentReplaysChange;
  }

  public get clearRecentReplaysEvent() {
    return this._clearRecentReplays;
  }

  constructor(

  ) {
    this.loadSettings();
  }

  private loadSettings() {
    const storedSettings = localStorage.getItem('hrsb_settings');
    if (storedSettings) {
      this._settingsData = JSON.parse(storedSettings);
    }
  }

  public clearRecentReplays() {
    this._clearRecentReplays.next();
  }

  private saveSettings() {
    localStorage.setItem('hrsb_settings', JSON.stringify(this._settingsData));
  }


  public get allowRecentReplays(): boolean {
    return this._settingsData.recentReplaySettings.enabled;
  }

  public set allowRecentReplays(value: boolean) {
    if (this._settingsData.recentReplaySettings.enabled !== value) {
      this._settingsData.recentReplaySettings.enabled = value;
      this._allowRecentReplaysChange.emit(value);
      this.saveSettings();
    }
  }
}
