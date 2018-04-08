import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { ReplayDescription, GameType, BasicPlayerData } from '@heroesbrowser/heroprotocol';
import { IReplayNavItem, IReplayNavItemLink, IReplayNavItemSection } from './nav-item/IReplayNavItemData';

@Component({
  selector: 'replay-nav',
  templateUrl: './replay-nav.component.html',
  styleUrls: ['./replay-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplayNavComponent implements OnChanges {

  private _replayDescription: ReplayDescription;

  public navData: IReplayNavItem[];

  @Input()
  public get replayDescription(): ReplayDescription {
    return this._replayDescription;
  }

  public set replayDescription(desc: ReplayDescription) {
    this._replayDescription = desc;
  }


  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.replayDescription) {

      if (this.replayDescription) {
        this.navData = [];
        const overview: IReplayNavItemSection = {
          type: 'section',
          label: 'Overview',
          children: []
        };
        const scoreScreen: IReplayNavItemLink = {
          type: 'link',
          label: 'Score Screen',
          path: []
        };
        overview.children.push(scoreScreen);

        const draft: IReplayNavItemLink = {
          type: 'link',
          label: 'Draft',
          path: []
        };
        overview.children.push(draft);
        this.navData.push(overview);
      } else {
        this.navData = undefined;
      }
    }
  }

}
