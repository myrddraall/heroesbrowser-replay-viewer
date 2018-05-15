import { Component, Input } from '@angular/core';
import { IRecentReplayDescription } from '../../db/RecentReplayDB';
import { GameType } from '@heroesbrowser/heroprotocol';

@Component({
  selector: 'recent-replay-tooltip',
  templateUrl: './recent-replay-tooltip.component.html',
  styleUrls: ['./recent-replay-tooltip.component.scss']
})
export class RecentReplayTooltipComponent {
  public GameType = GameType;
  @Input()
  public replayDescription: IRecentReplayDescription;

  constructor() { }


}
