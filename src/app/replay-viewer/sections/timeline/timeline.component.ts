import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ComponentFactoryResolver,
  Renderer2
} from '@angular/core';

import { ReplayViewerComponent } from '../../replay-viewer.component';
import {
  Replay,
  TimelineAnalyser,
  TimelineEvent,
  isTimelinePlayerEvent,
  IPlayerSlot,
  TimelinePlayerEvent
} from '@heroesbrowser/heroprotocol';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';
import { Timeline, DataSet, TimelineItem, DataGroup } from 'vis';
import { range } from 'rxjs';

interface PlayerGroup extends DataGroup {
  playerIndex: number;
  team: number;
}

@Component({
  selector: 'timeline-section',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent extends AbstractSectionComponent implements AfterViewInit {
  private timelineAnalyser: TimelineAnalyser;
  public _rawTimelineData: TimelineEvent[];
  private _timelineDataSet: DataSet<TimelineItem>;
  private _timelineDatGroups: DataGroup[];
  private _timelineComponent: Timeline;

  @ViewChild('timelineContainer')
  private _timelineContainer: ElementRef<HTMLDivElement>;

  constructor(
    replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {
    super(replayViewer, componentFactoryResolver, changeDetectorRef);
  }


  public ngAfterViewInit() {
    super.ngAfterViewInit();
    this.createTimeline();
  }

  private createTimeline() {
    if (
      this._timelineContainer &&
      this._timelineDataSet &&
      this._timelineDatGroups
    ) {
      const gameDurationMS = this.replayViewer.replayDescription.gameDuration * 1000;
      this._timelineComponent = new Timeline(this._timelineContainer.nativeElement, this._timelineDataSet, this._timelineDatGroups, {
        timeAxis: { scale: 'second', step: 60 },
        stack: false,
        showCurrentTime: false,
        start: 0,
        end: gameDurationMS,
        showMajorLabels: false,
        selectable: false,
        min: 0,
        max: gameDurationMS,
        zoomMin: 5 * 60 * 1000,
        zoomMax: gameDurationMS,
        format: {
          majorLabels: (date, scale, step): string => {
            return '';
          },
          minorLabels: (date, scale, step): string => {
            const delta = (<any>date).toDate().getTime() / 1000;
            const min = Math.floor(delta / 60);
            return min + 'm';
          }
        }
      });
      this._timelineComponent.on('itemover', (props) => {
        console.log(props);
      });
    }
  }

  private createTimelineDataSet() {
    let idNum = 0;
    const dataGroups: PlayerGroup[] = [];
    const dataGroupById: { [id: string]: PlayerGroup } = {};
    const data = linq.from(this._rawTimelineData).select((_): TimelineItem => {
      let player: IPlayerSlot;
      let team = -1;
      let dgId = '';
      if (isTimelinePlayerEvent(_)) {
        player = this.replayViewer.replayDescription.players[_.playerIndex];
        team = player.team;
        dgId = _.eventGroup + _.playerIndex;
        if (!dataGroupById[dgId]) {
          dataGroupById[dgId] = {
            id: dgId,
            content: player.hero + '<br/>' + player.name + ' ' + _.playerIndex,
            playerIndex: _.playerIndex,
            team: team
          };
          dataGroups.push(dataGroupById[dgId]);
        }
      }


      const start = this.replayViewer.replayDescription.playedOn.getTime();

      const item: TimelineItem = this.buildTimlineItem(idNum++, dataGroupById[dgId], _);
      /* const item: TimelineItem = {
         id: idNum++,
         group: dgId,
         type: 'range',
         className: (_.eventType === 'spawn' ? 'alive' : 'dead') + (team === -1 ? '' : (' team' + (team + 1))),
         content: _.eventType === 'spawn' ? '' : '',
         start: new Date(start + (_.start / 16 * 1000)),
         end: new Date(start + (_.end / 16 * 1000))
       };*/

      return item;
    }).toArray();

    console.log(data);
    this._timelineDataSet = new DataSet(data);
    this._timelineDatGroups = dataGroups.sort((a, b) => {
      if (a.team > b.team) {
        return 1;
      } else if (a.team < b.team) {
        return -1;
      } else {
        if (a.playerIndex > b.playerIndex) {
          return 1;
        } else if (a.playerIndex < b.playerIndex) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  private buildBaseEvent(id: number, group: PlayerGroup, event: TimelineEvent): Partial<TimelineItem> {
    const start = 0;
    const item: Partial<TimelineItem> = {
      id,
      group: group.id,
      start: (event.start / 16 * 1000),
      end: event.end ? (event.end / 16 * 1000) : undefined
    };
    return item;
  }
  private buildTimlineItem(id: number, group: PlayerGroup, event: TimelineEvent): TimelineItem {
    const item = this.buildBaseEvent(id, group, event);

    switch (event.eventType) {
      case 'player_alive':
      case 'player_dead':
        this.buildPlayerLifeSpanItem(<TimelinePlayerEvent>event, item, group);
        break;
      case 'player_death':
      case 'player_level':
      case 'player_talent':
        this.buildPlayerDeathItem(<TimelinePlayerEvent>event, item, group);
        break;
    }
    return <TimelineItem>item;
  }

  private buildPlayerLifeSpanItem(event: TimelinePlayerEvent, timelineItem: Partial<TimelineItem>, group: PlayerGroup): void {
    timelineItem.type = 'background';
    timelineItem.className = `player-life-span team${group.team + 1} ${event.eventType}`;
    timelineItem.content = '';
  }

  private buildPlayerDeathItem(event: TimelinePlayerEvent, timelineItem: Partial<TimelineItem>, group: PlayerGroup): void {
    timelineItem.type = 'point';
    timelineItem.className = `team${group.team + 1} ${event.eventType}`;
    timelineItem.content = `<div class="evt-icon-wrapper ${timelineItem.className}"><div class="evt-icon-container"></div></div>`;
  }

  protected async loadReplayView(): Promise<void> {
    this.timelineAnalyser = new TimelineAnalyser(this.replay);
    this._rawTimelineData = await this.timelineAnalyser.getTimlineEvents();
    if (this._timelineComponent) {
      this._timelineComponent.destroy();
    }
    this.createTimelineDataSet();
    this.createTimeline();
  }
}
