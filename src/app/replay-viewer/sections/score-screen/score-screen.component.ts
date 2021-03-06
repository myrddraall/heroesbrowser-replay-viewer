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
import {
  Replay,
  ReplayDescription,
  ScoreAnalyser,
  ISimplePlayerScore,
  ISimplePlayerScoreStats,
  IScoreScreenData
} from '@heroesbrowser/heroprotocol';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';


@Component({
  selector: 'score-screen',
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreScreenComponent extends AbstractSectionComponent {
  private scoreScreenAnalyser: ScoreAnalyser;
  private highScores: {
    game: { [stat: string]: number },
    0: { [stat: string]: number },
    1: { [stat: string]: number },
  };

  public replayDescription: ReplayDescription;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<ISimplePlayerScore> = new MatTableDataSource();
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
    replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(replayViewer, componentFactoryResolver, changeDetectorRef);
    this.dataSource.sortingDataAccessor = this.getSortData.bind(this);
  }

  private getSortData(data: ISimplePlayerScore, sortHeaderId: string): string | number {
    switch (sortHeaderId) {
      case 'kills':
        return data.stats.SoloKill;
      case 'assists':
        return data.stats.Assists;
      case 'deaths':
        return data.stats.Deaths;
      case 'siegeDamage':
        return data.stats.SiegeDamage;
      case 'heroDamage':
        return data.stats.HeroDamage;
      case 'healing':
        return data.stats.Healing;
      case 'damageTaken':
        return data.stats.DamageTaken;
      case 'xp':
        return data.stats.ExperienceContribution;
      default:
        return 0;
    }
  }

  protected async loadReplayView() {
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

    this.replayDescription = this.replayViewer.replayDescription;
    this.scoreScreenAnalyser = new ScoreAnalyser(this.replay);

    // const pa = new PlayerAnalyser(this.replay);
    // await pa.testPlayerData;

    this.scoreData = await this.scoreScreenAnalyser.scoreScreenData;

    const scoreData = this.scoreData.playerScores;
    for (let i = 0; i < scoreData.length; i++) {
      const pScore = scoreData[i];

      for (const stat in pScore.stats) {
        if (pScore.stats.hasOwnProperty(stat)) {
          const value = pScore.stats[stat];
          if (stat === 'Deaths') {
            if (this.highScores.game[stat] > value) {
              this.highScores.game[stat] = value;
            }
            if (this.highScores[pScore.team][stat] > value) {
              this.highScores[pScore.team][stat] = value;
            }
          } else {
            if (this.highScores.game[stat] < value) {
              this.highScores.game[stat] = value;
            }
            if (this.highScores[pScore.team][stat] < value) {
              this.highScores[pScore.team][stat] = value;
            }
          }
        }
      }
    }
    const sorted = linq.from(scoreData).orderBy(p => p.team).toArray();
    this.dataSource.data = sorted;
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.sort.start = 'desc';
    });
  }

  public isBest(statName: string, player: ISimplePlayerScore, scope: string | number = 'game'): boolean {
    return this.highScores[scope][statName] === player.stats[statName];
  }
}
