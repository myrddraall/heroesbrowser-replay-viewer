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
import { Replay, XPAnalyser, IPeriodicXP } from '@heroesbrowser/heroprotocol';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';
import { Chart, ChartPoint } from 'chart.js';

interface ITeamChartPoint extends ChartPoint {
  team: number;
}

const lvlXP = [
  2010,
  4164,
  6318,
  8472,
  10626,
  13929,
  17232,
  20535,
  23838,
  27141,
  31593,
  36045,
  40497,
  44949,
  49401,
  55001,
  60601,
  66201,
  71801,
  80801,
  90801,
  102301,
  115301,
  130301,
  147301,
  166801,
  188801,
  213801,
  241801,
];

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
    componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2
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
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'linear',
            scaleLabel: {
              labelString: 'Time (minutes)',
              display: true
            },
            ticks: <any>{
              stepSize: 60,
              callback: function (value, index, values) {
                return index + 'm';
              }
            },
            display: true,

          }],
          yAxes: [
            {
              display: true,
              position: 'left',
              scaleLabel: {
                labelString: 'Experience',
                display: true
              },
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            }, {
              position: 'right',
              display: true,
              scaleLabel: {
                labelString: 'Level',
                display: true
              },
              ticks: <any>{
                min: 0,
                max: 0,
                stepSize: 1,
                callback: function (value, index, values) {
                  const lvlIndex = lvlXP.indexOf(value);
                  if (lvlIndex !== -1) {
                    return 'lvl ' + (lvlIndex + 2);
                  }
                }
              }
            }
          ],
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

    console.log('++++++++++', this.xpOverviewChart['scales']['y-axis-0']['max']);
    this.xpOverviewChart.update();
    console.log('++++++++++', this.xpOverviewChart['scales']['y-axis-0']['max']);
    this.xpOverviewChart.config.options.scales.yAxes[1].ticks.max = this.xpOverviewChart['scales']['y-axis-0']['max'];
    this.xpOverviewChart.update(1000);
  }

}
