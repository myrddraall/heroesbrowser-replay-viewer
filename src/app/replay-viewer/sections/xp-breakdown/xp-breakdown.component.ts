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
import * as zoomPlugin from 'chartjs-plugin-zoom';

interface ITeamChartPoint extends ChartPoint {
  team: number;
  level: number;
  x: number;
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
  @ViewChild('chartTooltip')
  private chartTooltip: ElementRef;
  public toolTipData: ITeamChartPoint[];

  public xpTypesChecked = {
    creepXP: true,
    heroXP: true,
    minionXP: true,
    structureXP: true,
    trickleXP: true
  };

  public xpTypesCheckedCount = 5;

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
      plugins: [zoomPlugin],
      options: <any>{
        showLines: true,
        responsive: true,
        legend: {
          display: false
        },
        pan: {
          enabled: false
        },
        zoom: {
          enabled: false
        },
        /* pan: {
           // Boolean to enable panning
           enabled: true,

           // Panning directions. Remove the appropriate direction to disable
           // Eg. 'y' would only allow panning in the y direction
           mode: 'xy',
           rangeMin: {
             // Format of min pan range depends on scale type
             x: null,
             y: null
           },
           rangeMax: {
             // Format of max pan range depends on scale type
             x: null,
             y: null
           }
         },

         // Container for zoom options
         zoom: {
           // Boolean to enable zooming
           enabled: true,

           // Enable drag-to-zoom behavior
           drag: true,

           // Zooming directions. Remove the appropriate direction to disable
           // Eg. 'y' would only allow zooming in the y direction
           mode: 'xy',
           rangeMin: {
             // Format of min zoom range depends on scale type
             x: null,
             y: null
           },
           rangeMax: {
             // Format of max zoom range depends on scale type
             x: null,
             y: null
           }
         },*/
        tooltips: {
          enabled: false,
          custom: (tooltipModel) => {
            console.log('tooltipModel', tooltipModel);
            const ttElement = this.chartTooltip.nativeElement;

            if (tooltipModel.opacity === 0) {
              this.renderer.setStyle(ttElement, 'display', 'none');
            } else {
              this.renderer.setStyle(ttElement, 'display', '');
              this.renderer.setStyle(ttElement, 'top', (tooltipModel.y - 100) + 'px');
              this.renderer.setStyle(ttElement, 'left', tooltipModel.x + 'px');
              this.toolTipData = [];
              if (tooltipModel.dataPoints) {
                const element = tooltipModel.dataPoints[0];
                let data: ITeamChartPoint;
                if (element.index === 0) {
                  data = { x: 0, y: 0, team: 0, level: 1 };
                  this.toolTipData.push(data);
                  data = { x: 0, y: 0, team: 1, level: 1 };
                  this.toolTipData.push(data);
                } else {
                  data = this.xpOverviewChartData[0][element.index - 1];
                  this.toolTipData.push(data);
                  data = this.xpOverviewChartData[1][element.index - 1];
                  this.toolTipData.push(data);
                }
                console.log('this.toolTipData', this.toolTipData);
                this.changeDetectorRef.markForCheck();
              }
            }
          }
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
                return (Math.round((value / 60 * 10)) / 10)  + 'm';
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
    const converted = q.select(_ => {
      let xp = 0;
      if (this.xpTypesChecked.creepXP) {
        xp += _.creepXP;
      }
      if (this.xpTypesChecked.heroXP) {
        xp += _.heroXP;
      }
      if (this.xpTypesChecked.minionXP) {
        xp += _.minionXP;
      }
      if (this.xpTypesChecked.structureXP) {
        xp += _.structureXP;
      }
      if (this.xpTypesChecked.trickleXP) {
        xp += _.trickleXP;
      }
      return <ITeamChartPoint>{
        team: _.team,
        level: _.teamLevel,
        x: _.time,
        y: xp
      };
    });

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

    if (this.xpTypesCheckedCount === 5) {
      this.xpOverviewChart.update(0, false);
      this.xpOverviewChart.config.options.scales.yAxes[1].display = true;
      this.xpOverviewChart.config.options.scales.yAxes[1].ticks.min = this.xpOverviewChart['scales']['y-axis-0']['min'];
      this.xpOverviewChart.config.options.scales.yAxes[1].ticks.max = this.xpOverviewChart['scales']['y-axis-0']['max'];
    } else {
      this.xpOverviewChart.config.options.scales.yAxes[1].display = false;
    }
    this.xpOverviewChart.update(1000);
  }

  public abs(a: number): number {
    return Math.abs(a);
  }

  public onXPTypeChange(type: string, event: MouseEvent) {
    event.preventDefault();
    const oCount = this.xpTypesCheckedCount;
    if (type === 'all') {
      this.xpTypesChecked.creepXP = true;
      this.xpTypesChecked.heroXP = true;
      this.xpTypesChecked.minionXP = true;
      this.xpTypesChecked.structureXP = true;
      this.xpTypesChecked.trickleXP = true;
      this.xpTypesCheckedCount = 5;
    } else {
      const current = this.xpTypesChecked[type];
      if (!(current && this.xpTypesCheckedCount === 1)) {
        this.xpTypesChecked[type] = !current;
        this.xpTypesCheckedCount += current ? -1 : 1;
      }
      console.log(this.xpTypesCheckedCount);
    }
    if (oCount !== this.xpTypesCheckedCount) {
      this.generateXPOverviewChartData();
      this.updateXPOverviewChartData();
    }
  }

}
