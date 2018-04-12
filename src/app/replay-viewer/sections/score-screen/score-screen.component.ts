import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ComponentFactoryResolver
} from '@angular/core';
import { ReplayViewerComponent } from '../../replay-viewer.component';
import { Replay, ReplayDescription, ScoreAnalyser, IPlayerScores, IScoreScreenData } from '@heroesbrowser/heroprotocol';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';

interface IPlayerScoreRecord {
  hero: string;
  name: string;
  team: number;
  won: boolean;
  hasChatSilence: boolean;
  hasVoiceSilence: boolean;
  scores: IPlayerScores;
}

@Component({
  selector: 'score-screen',
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreScreenComponent extends AbstractSectionComponent implements AfterViewInit {

  private replay: Replay;
  private scoreScreenAnalyser: ScoreAnalyser;
  private highScores: {
    game: { [stat: string]: number },
    0: { [stat: string]: number },
    1: { [stat: string]: number },
  };

  public replayDescription: ReplayDescription;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<IPlayerScoreRecord> = new MatTableDataSource();
  public scoreData: IScoreScreenData;
  public displayCols: string[] = [
    'hero',
    'award',
    'kills',
    'assists',
    'deaths',
    'siegeDamage',
    'heroDamage',
    'healing',
    'damageTaken',
    'xp'
  ];

  constructor(
    private replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(componentFactoryResolver, changeDetectorRef);
    replayViewer.onReplayLoaded.subscribe(replay => {
      this.replayLoaded();
    });
    this.dataSource.sortingDataAccessor = this.getSortData.bind(this);
  }


  public ngAfterViewInit() {
    super.ngAfterViewInit();
    this.replayLoaded();
  }

  private getSortData(data: IPlayerScoreRecord, sortHeaderId: string): string | number {
    switch (sortHeaderId) {
      case 'kills':
        return data.scores.SoloKill;
      case 'assists':
        return data.scores.Assists;
      case 'deaths':
        return data.scores.Deaths;
      case 'siegeDamage':
        return data.scores.SiegeDamage;
      case 'heroDamage':
        return data.scores.HeroDamage;
      case 'healing':
        return data.scores.Healing;
      case 'damageTaken':
        return data.scores.DamageTaken;
      case 'xp':
        return data.scores.ExperienceContribution;
      default:
        return 0;
    }
  }

  private async replayLoaded() {
    try {
      this.clearNotSupported();
      this.setLoadingMessage('Loading Score Screen Data');
      this.scoreData = null;
      const hs = {
        'Takedowns': 0,
        'Deaths': Number.MAX_SAFE_INTEGER,
        'SoloKill': 0,
        'Assists': 0,
        'ExperienceContribution': 0,
        'Healing': 0,
        'SiegeDamage': 0,
        'HeroDamage': 0,
        'DamageTaken': 0
      };

      this.highScores = {
        game: Object.assign({}, hs),
        0: Object.assign({}, hs),
        1: Object.assign({}, hs)
      };

      this.replay = this.replayViewer.replay;
      this.replayDescription = this.replayViewer.replayDescription;
      this.scoreScreenAnalyser = new ScoreAnalyser(this.replay);

      // const pa = new PlayerAnalyser(this.replay);
      // await pa.testPlayerData;

      this.scoreData = await this.scoreScreenAnalyser.scoreScreenData;

      const scoreData = this.scoreData.playerScores;
      const scoreDataSet: IPlayerScoreRecord[] = [];
      for (let i = 0; i < scoreData.length; i++) {
        const player = this.replayDescription.players[i];
        const pScore = scoreData[i];
        for (const stat in pScore) {
          if (pScore.hasOwnProperty(stat)) {
            const value = pScore[stat];
            if (stat === 'Deaths') {
              if (this.highScores.game[stat] > value) {
                this.highScores.game[stat] = value;
              }
              if (this.highScores[player.team][stat] > value) {
                this.highScores[player.team][stat] = value;
              }
            } else {
              if (this.highScores.game[stat] < value) {
                this.highScores.game[stat] = value;
              }
              if (this.highScores[player.team][stat] < value) {
                this.highScores[player.team][stat] = value;
              }
            }
          }
        }

        scoreDataSet.push({
          hero: player.hero,
          name: player.name,
          team: player.team,
          won: player.won,
          hasChatSilence: player.hasChatSilence,
          hasVoiceSilence: player.hasVoiceSilence,
          scores: pScore
        });
      }

      const sorted = linq.from(scoreDataSet).orderBy(p => p.team).toArray();

      this.dataSource.data = sorted;

      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.sort.start = 'desc';
      });
      this.changeDetectorRef.markForCheck();
    } catch (e) {
      this.scoreData = null;
      if (e.name === 'ReplayVersionOutOfRangeError') {
        this.setNotSupportedMessage(e.message);
        return;
      }
      throw e;
    } finally {
      this.clearLoading();
    }
  }

  public isBest(statName: string, player: IPlayerScoreRecord, scope: string | number = 'game'): boolean {
    return this.highScores[scope][statName] === player.scores[statName];
  }
}
