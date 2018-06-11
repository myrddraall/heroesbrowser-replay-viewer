import { Component, Input, HostBinding } from '@angular/core';


import {
  ITalentPick,
  IHeroTalent
} from '@heroesbrowser/heroprotocol';


@Component({
  selector: 'talent-icon',
  templateUrl: './talent-icon.component.html',
  styleUrls: ['./talent-icon.component.scss']
})
export class TalentIconComponent {

  @Input()
  public talent: IHeroTalent | ITalentPick;

  @HostBinding('class.heroic')
  public get isHeroic(): boolean {
    return this.talent && this.talent.ability ? this.talent.ability.startsWith('R') : false;
  }

  constructor() { }

  public get iconUrl(): string {
    if (!this.talent) {
      return null;
    }
    if (!this.talent.icon_url) {
      return 'assets/screens/scorescreen/awards/unknown.png';
    }
    for (const iconSize in this.talent.icon_url) {
      if (this.talent.icon_url.hasOwnProperty(iconSize)) {
        const icon = this.talent.icon_url[iconSize];
        const parts = icon.split('/');
        return '//cdn.hotstat.us/images/' + parts[parts.length - 1];
      }
    }
  }

}
