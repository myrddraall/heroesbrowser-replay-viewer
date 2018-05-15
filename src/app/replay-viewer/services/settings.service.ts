import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public allowRecentReplays = true;

  constructor() { }
}
