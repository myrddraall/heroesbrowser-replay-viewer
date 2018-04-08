import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ReplayViewerComponent } from '../../replay-viewer.component';
import { Replay, ReplayDescription, ScoreAnalyser, IPlayerScores } from '@heroesbrowser/heroprotocol';

interface IPlayerScoreRecord {
  hero: string;
  name: string;
  team: number;
  won: boolean;
  scores: IPlayerScores;
}

@Component({
  selector: 'score-screen',
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreScreenComponent implements OnInit {

  private replay: Replay;
  public replayDescription: ReplayDescription;
  private scoreScreenAnalyser: ScoreAnalyser;

  public scoreData: IPlayerScoreRecord[];
  public highScores: {
    game: { [stat: string]: number },
    0: { [stat: string]: number },
    1: { [stat: string]: number },
  };

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
    private changeDetectorRef: ChangeDetectorRef
  ) {
    replayViewer.onReplayLoaded.subscribe(replay => {
      this.replayLoaded();
    });

  }

  ngOnInit() {
    this.replayLoaded();

  }


  private async replayLoaded() {
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
    const scoreData = await this.scoreScreenAnalyser.scoreScreenData;
    this.scoreData = [];
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

      this.scoreData.push({
        hero: player.hero,
        name: player.name,
        team: player.team,
        won: player.won,
        scores: pScore
      });
    }
    this.changeDetectorRef.markForCheck();
  }

  public isBest(statName: string, player: IPlayerScoreRecord, scope: string | number = 'game'): boolean {
    console.log(
      'isBest',
      scope,
      statName,
      this.highScores[scope][statName], player.scores[statName], this.highScores[scope][statName] === player.scores[statName]
    );
    return this.highScores[scope][statName] === player.scores[statName];
  }
}
