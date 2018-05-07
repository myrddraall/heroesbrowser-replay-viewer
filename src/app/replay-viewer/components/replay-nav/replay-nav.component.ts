import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { ReplayDescription, GameType } from '@heroesbrowser/heroprotocol';
import { IReplayNavItem, IReplayNavItemLink, IReplayNavItemSection } from './nav-item/IReplayNavItemData';
import { StatSubsections } from '../../sections/player-stats/data/section-columns';

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
          path: ['/replay', 'score']
        };
        overview.children.push(scoreScreen);


        const talents: IReplayNavItemLink = {
          type: 'link',
          label: 'Talents',
          path: ['/replay', 'talents']
        };
        overview.children.push(talents);

        const gameType = this.replayDescription.gameType;
        // tslint:disable-next-line:no-bitwise
        if ((gameType & GameType.FLAG_DRAFT) === GameType.FLAG_DRAFT) {
          const draft: IReplayNavItemLink = {
            type: 'link',
            label: 'Draft',
            path: ['/replay', 'draft']
          };
          overview.children.push(draft);
        }

        const xpBreakdown: IReplayNavItemLink = {
          type: 'link',
          label: 'Experience',
          path: ['/replay', 'xp-breakdown']
        };
        overview.children.push(xpBreakdown);

        // if (this.replayDescription.mapName === 'Cursed Hollow') {
        const globeMap: IReplayNavItemLink = {
          type: 'link',
          label: 'Minion Deaths',
          path: ['/replay', 'minion-deaths']
        };
        overview.children.push(globeMap);
        //   }

        this.navData.push(overview);


        const stats: IReplayNavItemSection = {
          type: 'section',
          label: 'Statistics',
          children: []
        };

        for (let i = 0; i < StatSubsections.length; i++) {
          const section = StatSubsections[i];
          const sectionLink: IReplayNavItemLink = {
            type: 'link',
            label: section.title,
            path: ['/replay', 'player-stats', section.id]
          };
          stats.children.push(sectionLink);
        }

        this.navData.push(stats);
      } else {
        this.navData = undefined;
      }
    }
  }

}
