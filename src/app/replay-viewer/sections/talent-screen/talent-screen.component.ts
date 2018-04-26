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
  TalentAnalyser,
  IPlayerTalentChoices
} from '@heroesbrowser/heroprotocol';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';


@Component({
  selector: 'talent-screen',
  templateUrl: './talent-screen.component.html',
  styleUrls: ['./talent-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalentScreenComponent extends AbstractSectionComponent {
  private talentScreenAnalyser: TalentAnalyser;
  private highScores: {
    game: { [stat: string]: number },
    0: { [stat: string]: number },
    1: { [stat: string]: number },
  };

  public replayDescription: ReplayDescription;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<IPlayerTalentChoices> = new MatTableDataSource();
  public talentChoices: IPlayerTalentChoices[];
  public displayCols: string[] = [
    'hero',
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7'
  ];

  constructor(
    replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(replayViewer, componentFactoryResolver, changeDetectorRef);
    // this.dataSource.sortingDataAccessor = this.getSortData.bind(this);
  }
  /*
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
  */
  protected async loadReplayView() {


    this.replayDescription = this.replayViewer.replayDescription;
    this.talentScreenAnalyser = new TalentAnalyser(this.replay);

    // const pa = new PlayerAnalyser(this.replay);
    // await pa.testPlayerData;

    this.talentChoices = await this.talentScreenAnalyser.talents;

    console.log('TALENTS:::', this.talentChoices);
    const sorted = linq.from(this.talentChoices).orderBy(p => p.team).toArray();


    this.dataSource.data = sorted;
    /* setTimeout(() => {
       this.dataSource.sort = this.sort;
       this.sort.start = 'desc';
     });*/
  }
  /*
    public isBest(statName: string, player: ISimplePlayerScore, scope: string | number = 'game'): boolean {
      return this.highScores[scope][statName] === player.stats[statName];
    }*/

  public getTalentIcon(player: IPlayerTalentChoices, tIndex: number): string {
    const talent = player.talents[tIndex];
    if (!talent) {
      return null;
    }
    if (!talent.icon_url) {
      return 'assets/screens/scorescreen/awards/unknown.png';
    }
    for (const iconSize in talent.icon_url) {
      if (talent.icon_url.hasOwnProperty(iconSize)) {
        const icon =  talent.icon_url[iconSize];
        const parts = icon.split('/');
        return '//cdn.hotstat.us/images/' + parts[parts.length - 1];
      }
    }
  }

  public getTalentPopover(player: IPlayerTalentChoices, tIndex: number): string {
    const talent = player.talents[tIndex];
    if (!talent) {
      return '';
    }
    const popover = `
        <h4>${talent.title}</h4>
        <p>${talent.description}</p>

        <!--<pre>${JSON.stringify(talent, undefined, 4)}</pre>-->
    `;

    return popover;
  }
}
