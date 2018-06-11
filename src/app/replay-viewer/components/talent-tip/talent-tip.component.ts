import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, } from '@angular/platform-browser';

import {
  ITalentPick,
  IHeroTalent
} from '@heroesbrowser/heroprotocol';


@Component({
  selector: 'talent-tip',
  templateUrl: './talent-tip.component.html',
  styleUrls: ['./talent-tip.component.scss']
})
export class TalentTipComponent {

  @Input()
  public talent: IHeroTalent | ITalentPick;

  constructor(
    private domSanitizer: DomSanitizer
  ) {


  }

  public get description(): string {
    if (this.talent && this.talent.description) {
      const desc: string[] = [];
      let parts = this.talent.description.split('Quest:', 2);
      if (parts.length === 1) {
        desc.push(parts[0]);
      } else {
        while (parts.length > 1) {
          if (parts[0].trim()) {
            desc.push(parts[0]);
          }
          desc.push('<div class="quest"><label>Quest:</label> ');

          const rewardParts = parts[1].split('Reward:');
          desc.push(rewardParts[0] + '</div>');

          for (let i = 1; i < rewardParts.length; i++) {
            desc.push('<div class="reward"><label>Reward:</label> ');
            desc.push(rewardParts[i] + '</div>');
          }
          parts = parts[1].split('Quest', 2);
        }
      }

      // desc.push(`<pre>${JSON.stringify(this.talent, undefined, 2)}</pre>`);
      return this.domSanitizer.sanitize(SecurityContext.HTML, desc.join(''));
    }
    return '';
  }

}
