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
import { Chart, ChartPoint, ChartOptions } from 'chart.js';
import * as zoomPlugin from 'chartjs-plugin-zoom';
import { ChartVisuals } from '../../config/charts/chart-visuals';

interface ITeamChartPoint extends ChartPoint {
  type?: string;
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

  @ViewChild('xpOverviewLineChart')
  private xpOverviewLineChartCanvas: ElementRef;
  private xpOverviewLineChart: Chart;
  @ViewChild('xpOverviewBarChart')
  private xpOverviewBarChartCanvas: ElementRef;
  private xpOverviewBarChart: Chart;

  private xpOverviewLineChartData: Array<ITeamChartPoint[]>;
  private xpOverviewBarChartData: {
    creepXP: Array<number[]>,
    heroXP: Array<number[]>,
    minionXP: Array<number[]>,
    structureXP: Array<number[]>,
    trickleXP: Array<number[]>
  };


  @ViewChild('chartTooltip')
  private chartTooltip: ElementRef;
  public toolTipData: ITeamChartPoint[];

  private tooltipOption = {
    enabled: false,
    custom: (tooltipModel) => {
      const ttElement = this.chartTooltip.nativeElement;

      if (tooltipModel.opacity === 0) {
        this.renderer.setStyle(ttElement, 'display', 'none');
      } else {
        this.renderer.setStyle(ttElement, 'display', '');
        this.renderer.setStyle(ttElement, 'top', (tooltipModel.y - 50) + 'px');
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
            data = this.xpOverviewLineChartData[0][element.index - 1];
            this.toolTipData.push(data);
            data = this.xpOverviewLineChartData[1][element.index - 1];
            this.toolTipData.push(data);
          }
          this.changeDetectorRef.markForCheck();
        }
      }
    }
  };

  private panOption = {
    enabled: true,
    rangeMin: {
      x: 0,
      y: 0
    },
  };
  private zoomOption = {
    enabled: true,
    rangeMin: {
      x: 0,
      y: 0
    },
  };


  public xpTypesChecked = {
    creepXP: true,
    heroXP: true,
    minionXP: true,
    structureXP: true,
    trickleXP: true
  };

  public xpTypesCheckedCount = 5;

  private _chartType = 'line';

  public get chartType(): string {
    return this._chartType;
  }

  public set chartType(value: string) {
    if (this._chartType !== value) {
      this._chartType = value;
      this.createChart();
      this.resetZoom();
      this.generateXPOverviewChartData();
      this.updateXPOverviewChartData();
    }

  }

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
    this.createChart();
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

  private createChart() {
    if (this.chartType === 'line' && !this.xpOverviewLineChart) {
      this.createXPOverviewLineChart();
    } else if (this.chartType === 'bar' && !this.xpOverviewBarChart) {
      this.createXPOverviewBarChart();
    }
  }

  private createXPOverviewLineChart() {
    this.xpOverviewLineChart = new Chart(this.xpOverviewLineChartCanvas.nativeElement, {
      type: 'line',
      plugins: [zoomPlugin],
      options: <Partial<ChartOptions>>{
        showLines: true,
        responsive: true,
        legend: {
          display: false
        },
        pan: this.panOption,
        zoom: this.zoomOption,
        tooltips: this.tooltipOption,
        scales: {
          xAxes: [{
            type: 'linear',
            scaleLabel: {
              labelString: 'Time (minutes)',
              display: true,
            },
            ticks: <any>{
              stepSize: 60,
              callback: function (value, index, values) {
                return (Math.round((value / 60 * 10)) / 10) + 'm';
              }
            },
            gridLines: {
              color: ChartVisuals.gridLineColor,
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
                color: ChartVisuals.gridLineColor,
              },
            }, {
              position: 'right',
              display: true,
              beforeUpdate: (scale) => {
                if (this.xpOverviewLineChart) {
                  this.xpOverviewLineChart.config.options.scales.yAxes[1].ticks.min = this.xpOverviewLineChart['scales']['y-axis-0']['min'];
                  this.xpOverviewLineChart.config.options.scales.yAxes[1].ticks.max = this.xpOverviewLineChart['scales']['y-axis-0']['max'];
                }
              },
              scaleLabel: {
                labelString: 'Level',
                display: true
              },
              gridLines: {
                color: ChartVisuals.gridLineColor,
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
        }
      }
    });
  }

  private createXPOverviewBarChart() {
    this.xpOverviewBarChart = new Chart(this.xpOverviewBarChartCanvas.nativeElement, {
      type: 'bar',
      options: <Partial<ChartOptions>>{
        showLines: true,
        responsive: true,
        legend: {
          display: false
        },
        pan: this.panOption,
        zoom: this.zoomOption,
        // tooltips: this.tooltipOption,
        scales: {
          xAxes: [{
            // type: 'linear',
            stacked: true,
            scaleLabel: {
              labelString: 'Time (minutes)',
              display: true,
            },
            /* ticks: <any>{
               stepSize: 60,
               callback: function (value, index, values) {
                 return (Math.round((value / 60 * 10)) / 10) + 'm';
               }
             },*/
            gridLines: {
              color: ChartVisuals.gridLineColor,
            },
            display: true,
          }],
          yAxes: [
            {
              type: 'linear',
              display: true,
              stacked: true,
              position: 'left',
              scaleLabel: {
                labelString: 'Experience',
                display: true
              },
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
                color: ChartVisuals.gridLineColor,
              },
            }, {
              position: 'right',
              display: true,
              beforeUpdate: (scale) => {
                if (this.xpOverviewBarChart) {
                  this.xpOverviewBarChart.config.options.scales.yAxes[1].ticks.min = this.xpOverviewBarChart['scales']['y-axis-0']['min'];
                  this.xpOverviewBarChart.config.options.scales.yAxes[1].ticks.max = this.xpOverviewBarChart['scales']['y-axis-0']['max'];
                }
              },
              scaleLabel: {
                labelString: 'Level',
                display: true
              },
              gridLines: {
                color: ChartVisuals.gridLineColor,
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
        }
      }

    });
  }

  public resetZoom() {
    if (this.chartType === 'line' && this.xpOverviewLineChart) {
      this.xpOverviewLineChart['resetZoom']();
    } else if (this.chartType === 'bar' && this.xpOverviewBarChart) {
      this.xpOverviewBarChart['resetZoom']();
    }
  }

  private generateXPOverviewChartData() {
    if (this.chartType === 'line') {
      this.generateXPOverviewLineChartData();
    } else if (this.chartType === 'bar') {
      this.generateXPOverviewBarChartData();
    }
  }
  private generateXPOverviewLineChartData() {
    this.resetZoom();
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

    this.xpOverviewLineChartData = [
      converted.where(_ => _.team === 0).toArray(),
      converted.where(_ => _.team === 1).toArray()
    ];
  }

  private generateXPOverviewBarChartData() {
    const q = linq.from(this.xpData);
    const converted = q.selectMany(_ => {
      const list: ITeamChartPoint[] = [];
      const point: ITeamChartPoint = {
        team: _.team,
        level: _.teamLevel,
        x: _.time,
      };
      list.push(Object.assign({}, point, { type: 'creepXP', y: _.creepXP }));
      list.push(Object.assign({}, point, { type: 'heroXP', y: _.heroXP }));
      list.push(Object.assign({}, point, { type: 'minionXP', y: _.minionXP }));
      list.push(Object.assign({}, point, { type: 'structureXP', y: _.structureXP }));
      list.push(Object.assign({}, point, { type: 'trickleXP', y: _.trickleXP }));
      return list;
    });

    this.xpOverviewBarChartData = {
      creepXP: [
        converted.where(_ => _.team === 0 && _.type === 'creepXP').select(_ => _.y).toArray(),
        converted.where(_ => _.team === 1 && _.type === 'creepXP').select(_ => _.y).toArray()
      ],
      heroXP: [
        converted.where(_ => _.team === 0 && _.type === 'heroXP').select(_ => _.y).toArray(),
        converted.where(_ => _.team === 1 && _.type === 'heroXP').select(_ => _.y).toArray()
      ],
      minionXP: [
        converted.where(_ => _.team === 0 && _.type === 'minionXP').select(_ => _.y).toArray(),
        converted.where(_ => _.team === 1 && _.type === 'minionXP').select(_ => _.y).toArray()
      ],
      structureXP: [
        converted.where(_ => _.team === 0 && _.type === 'structureXP').select(_ => _.y).toArray(),
        converted.where(_ => _.team === 1 && _.type === 'structureXP').select(_ => _.y).toArray()
      ],
      trickleXP: [
        converted.where(_ => _.team === 0 && _.type === 'trickleXP').select(_ => _.y).toArray(),
        converted.where(_ => _.team === 1 && _.type === 'trickleXP').select(_ => _.y).toArray()
      ],
    };
  }

  private updateXPOverviewChartData() {
    if (this.chartType === 'line') {
      this.updateXPOverviewLineChartData();
    } else if (this.chartType === 'bar') {
      this.updateXPOverviewBarChartData();
    }
  }

  private updateXPOverviewLineChartData() {
    const lCount = this.xpOverviewLineChartData[0].length + 1;
    const labels: string[] = [];
    for (let i = 0; i < lCount; i++) {
      labels.push((i) + 'm');
    }
    this.xpOverviewLineChart.data = {
      labels: labels,

      datasets: [
        {
          label: 'Team 1',
          data: [{ x: 0, y: 0 }, ...this.xpOverviewLineChartData[0]],
          borderColor: ChartVisuals.team1LineColor,
          pointBackgroundColor: ChartVisuals.team1PointColor,
          backgroundColor: ChartVisuals.areaBackgroundColor,
          borderWidth: ChartVisuals.lineWidth,
          pointRadius: ChartVisuals.pointRadius,
          cubicInterpolationMode: 'monotone'
        },
        {
          label: 'Team 2',
          data: [{ x: 0, y: 0 }, ...this.xpOverviewLineChartData[1]],
          borderColor: ChartVisuals.team2LineColor,
          pointBackgroundColor: ChartVisuals.team2PointColor,
          backgroundColor: ChartVisuals.areaBackgroundColor,
          borderWidth: ChartVisuals.lineWidth,
          pointRadius: ChartVisuals.pointRadius,
          cubicInterpolationMode: 'monotone'
        }
      ]
    };

    if (this.xpTypesCheckedCount === 5) {
      this.xpOverviewLineChart.config.options.scales.yAxes[1].display = true;
    } else {
      this.xpOverviewLineChart.config.options.scales.yAxes[1].display = false;
    }
    this.xpOverviewLineChart.update(1000);
  }

  private updateXPOverviewBarChartData() {
    const lCount = this.xpOverviewBarChartData.creepXP[0].length;
    const labels: string[] = [];
    for (let i = 0; i < lCount; i++) {
      labels.push((i + 1) + 'm');
    }
    const data = {
      labels: labels,
      datasets: []
    };

    const keys = [
      'trickleXP',
      'creepXP',
      'structureXP',
      'minionXP',
      'heroXP',
    ];

    for (const key of keys) {
      if (this.xpTypesChecked[key]) {
        const t1Set = {
          label: 'Team 1 ' + key,
          stack: 'Team 1',
          data: this.xpOverviewBarChartData[key][0],
          backgroundColor: ChartVisuals.xpStackColors[key],
          borderWidth: 2,
          borderColor: ChartVisuals.team1LineColor
        };
        data.datasets.push(t1Set);
        const t2Set = {
          label: 'Team 2 ' + key,
          stack: 'Team 2',
          data: this.xpOverviewBarChartData[key][1],
          backgroundColor: ChartVisuals.xpStackColors[key],
          borderWidth: 2,
          borderColor: ChartVisuals.team2LineColor
        };
        data.datasets.push(t2Set);
      }
    }

    this.xpOverviewBarChart.data = data;

    if (this.xpTypesCheckedCount === 5) {
      this.xpOverviewBarChart.config.options.scales.yAxes[1].display = true;
    } else {
      this.xpOverviewBarChart.config.options.scales.yAxes[1].display = false;
    }
    this.xpOverviewBarChart.update(1000);
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
    }
    if (oCount !== this.xpTypesCheckedCount) {
      this.generateXPOverviewChartData();
      this.updateXPOverviewChartData();
    }
  }

}
