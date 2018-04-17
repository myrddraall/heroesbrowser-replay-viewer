import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ReplayDescription, GameType, IPlayerSlot } from '@heroesbrowser/heroprotocol';
import * as linq from 'linq';
import { paramCase } from 'change-case';
import { duration } from 'moment';

@Component({
  selector: 'replay-header',
  templateUrl: './replay-header.component.html',
  styleUrls: ['./replay-header.component.scss']
})
export class ReplayHeaderComponent implements OnInit {
  private _replayDescription: ReplayDescription;
  public gameMode: string;
  public gameDuration: string;
  public team1Players: IPlayerSlot[];
  public team2Players: IPlayerSlot[];
  @HostBinding('class')
  private mapClass: string[] = [];

  @Input()
  public get replayDescription(): ReplayDescription {
    return this._replayDescription;
  }
  public set replayDescription(desc: ReplayDescription) {
    this._replayDescription = desc;

    this.mapClass = [paramCase(desc.mapName)];
    this.gameMode = GameType[desc.gameType];

    const dur = duration(desc.gameDuration, 's');
    const min = Math.floor(dur.asMinutes());
    const sec = ('' + Math.floor(dur.subtract(min, 'm').asSeconds())).padStart(2, '0');
    this.gameDuration = min + 'm ' + sec + 's';

    this.team1Players = linq.from(desc.players).where(p => p.team === 0).toArray();
    this.team2Players = linq.from(desc.players).where(p => p.team === 1).toArray();
  }

  public cleanName(name: string): string {
    if (name) {
      return name.replace(/[^\w\d]/g, '');
    }
    return undefined;
  }


  constructor() { }

  ngOnInit() {
  }

}
