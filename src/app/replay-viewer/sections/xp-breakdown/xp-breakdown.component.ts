import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ComponentFactoryResolver
} from '@angular/core';

import { ReplayViewerComponent } from '../../replay-viewer.component';
import { Replay, XPAnalyser, IPeriodicXP } from '@heroesbrowser/heroprotocol';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';
import { Chart, ChartPoint } from 'chart.js';

interface ITeamChartPoint extends ChartPoint {
  team: number;
}

@Component({
  selector: 'xp-breakdown',
  templateUrl: './xp-breakdown.component.html',
  styleUrls: ['./xp-breakdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XpBreakdownComponent extends AbstractSectionComponent implements AfterViewInit {
  private replay: Replay;
  private xpAnalyser: XPAnalyser;
  private xpData: IPeriodicXP[];

  @ViewChild('xpOverviewChart')
  private xpOverviewChartCanvas: ElementRef;
  private xpOverviewChart: Chart;
  private xpOverviewChartData: Array<ITeamChartPoint[]>;

  constructor(
    private replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(componentFactoryResolver, changeDetectorRef);
    replayViewer.onReplayLoaded.subscribe(replay => {
      this.replayLoaded();
    });

  }
  public ngAfterViewInit() {
    super.ngAfterViewInit();
    this.createXPOverviewChart();
    this.replayLoaded();
  }

  private async replayLoaded() {
    try {
      this.clearNotSupported();
      this.setLoadingMessage('Loading XP Data');
      this.replay = this.replayViewer.replay;
      this.xpAnalyser = new XPAnalyser(this.replay);
      this.xpData = await this.xpAnalyser.periodicXP;
      this.generateXPOverviewChartData();
      this.updateXPOverviewChartData();
      this.changeDetectorRef.markForCheck();
    } catch (e) {
      if (e.name === 'ReplayVersionOutOfRangeError') {
        this.setNotSupportedMessage(e.message);
        return;
      }
      throw e;
    } finally {
      this.clearLoading();
    }
  }

  private createXPOverviewChart() {
    this.xpOverviewChart = new Chart(this.xpOverviewChartCanvas.nativeElement, {
      type: 'line',
      options: {
        showLines: true,
        responsive: true,
        scales: {
          xAxes: [{
            type: 'linear',
            ticks: <any>{
              stepSize: 60,
              callback: function (value, index, values) {
                console.log('==', value, index, values);
                return  index + 'm';
              }
            },
            display: true,

          }],
          yAxes: [{
            display: true
          }],
        },
        title: {
          text: 'XP Overview'
        }
      }
    });
  }

  private generateXPOverviewChartData() {
    const q = linq.from(this.xpData);
    const converted = q.select(_ => (<ITeamChartPoint>{
      team: _.team,
      x: _.time,
      y: _.creepXP + _.heroXP + _.minionXP + _.structureXP + _.trickleXP
    }));

    this.xpOverviewChartData = [
      converted.where(_ => _.team === 0).toArray(),
      converted.where(_ => _.team === 1).toArray()
    ];
  }

  private updateXPOverviewChartData() {
    const lCount = Math.max(this.xpOverviewChartData[0].length, this.xpOverviewChartData[1].length) + 1;
    const labels: string[] = [];
    for (let i = 0; i < lCount; i++) {
      labels.push((i) + 'm');
    }
    this.xpOverviewChart.data = {
      labels: labels,
      datasets: [
        {
          label: 'Team 1',
          data: [{ x: 0, y: 0 }, ...this.xpOverviewChartData[0]],
          borderColor: 'blue',
          cubicInterpolationMode: 'monotone'
        },
        {
          label: 'Team 2',
          data: [{ x: 0, y: 0 }, ...this.xpOverviewChartData[1]],
          borderColor: 'red',
          cubicInterpolationMode: 'monotone'
        }
      ]
    };
    this.xpOverviewChart.update(5);
  }

}
