import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ComponentFactoryResolver,
  Inject,
  LOCALE_ID,
  Renderer2
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DecimalPipe, PercentPipe } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';

import { ReplayViewerComponent } from '../../replay-viewer.component';
import {
  Replay,
  ReplayDescription,
  ScoreAnalyser,
  IPlayerScore,
  IPlayerScoreStats,
  IScoreScreenData,
  IPlayerStatData,
  ReplayStatSupport
} from '@heroesbrowser/heroprotocol';
import {
  MatTableDataSource,
  MatSort,
  MatSelectionList,
  MatSelectionListChange,
  MatListOption,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { StatSubsections, IStatsSection } from './data/section-columns';
import { StatColumns, StatColumnType, IStatColumn, IStatColumnSelection } from './data/stat-columns';
import { DEFAULT_COL_FILTER_NAME, PrebuiltColumnFilters } from './data/column-configs';

@Component({
  selector: 'player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerStatsComponent extends AbstractSectionComponent {
  private scoreScreenAnalyser: ScoreAnalyser;

  private subsection: string;
  private subsectionSubscription: Subscription;

  public presetControl: FormControl = new FormControl();
  private _savedFilters: { [name: string]: IStatColumnSelection[] };
  public currentFilterName: string;
  public statColumns: IStatColumn[] = StatColumns;
  public statColumnMap: { [id: string]: IStatColumn };
  public currentStatColumns: IStatColumnSelection[];
  public currentDisplayColumns: IStatColumn[];

  @ViewChild(MatSort) private sort: MatSort;
  public dataSource: MatTableDataSource<IPlayerScore> = new MatTableDataSource();
  public statData: IPlayerStatData;

  private decimalPipe: DecimalPipe;
  private percentPipe: PercentPipe;
  private durationPipe: DurationPipe;

  constructor(
    replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver,
    @Inject(LOCALE_ID) locale: string,
    private renderer: Renderer2,
    private activeRoute: ActivatedRoute
  ) {
    super(replayViewer, componentFactoryResolver, changeDetectorRef);

    this.dataSource.sortingDataAccessor = this.getSortData.bind(this);
    this.decimalPipe = new DecimalPipe(locale);
    this.percentPipe = new PercentPipe(locale);
    this.durationPipe = new DurationPipe(locale);
    this.statColumnMap = {};
    for (let i = 0; i < this.statColumns.length; i++) {
      const element = this.statColumns[i];
      this.statColumnMap[element.id] = element;
    }

    this.subsectionSubscription = activeRoute.params.subscribe(params => {
      this.subsection = params.subsection;
      this.currentFilterName = DEFAULT_COL_FILTER_NAME;
      this.handleSubsectionChanged();
      this.changeDetectorRef.markForCheck();
    });

  }

  public handleSubsectionChanged() {
    this.loadSavedFilters();
    const subsectionFilters = this.presetFilters;
    const currentFilter = subsectionFilters[this.currentFilterName];
    this.currentStatColumns = cloneDeep(currentFilter);
    this.updateDisplayColumns();
  }

  public handleColumnVisibilityChange(event: MatSelectionListChange) {
    const options = event.source.options.toArray();
    const filterQ = linq.from(this.currentStatColumns);
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const filter = filterQ.single(_ => _.id === opt.value);
      filter.selected = opt.selected;
    }
    this.handleCurrentFilterUpdated();
  }

  private handleCurrentFilterUpdated() {
    const filterName = this.getFilterName(this.currentStatColumns);
    if (!filterName) {
      this.currentFilterName = 'Custom';
    } else {
      this.currentFilterName = filterName;
    }
    this.updateDisplayColumns();
  }

  private updateDisplayColumns() {
    if (this.statData) {
      this.currentDisplayColumns = [];
      for (let i = 0; i < this.currentStatColumns.length; i++) {
        const col = this.currentStatColumns[i];
        if (col.selected) {
          const colDef = this.statColumnMap[col.id];
          const support = this.statData.statSupport[col.id];
          if (support !== ReplayStatSupport.NONE) {
            this.currentDisplayColumns.push(colDef);
          }
        }
      }
    }
  }

  public handleFilterDragStart(event: DragEvent, col: IStatColumnSelection) {
    event.dataTransfer.setData('stat-col-filter', col.id);
    event.dataTransfer.setData(col.id, '-');
    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  public handleFilterDragOver(event: DragEvent, col: IStatColumnSelection) {
    if (event.dataTransfer.types[0] === 'stat-col-filter' && event.dataTransfer.types.indexOf(col.id.toLowerCase()) === -1) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (event.layerY <= (<HTMLElement>event.currentTarget).offsetHeight / 2) {
        this.renderer.addClass(event.currentTarget, 'drop-above');
        this.renderer.removeClass(event.currentTarget, 'drop-below');
      } else {
        this.renderer.addClass(event.currentTarget, 'drop-below');
        this.renderer.removeClass(event.currentTarget, 'drop-above');
      }
    }
  }

  public handleFilterDragLeave(event: DragEvent, col: IStatColumnSelection) {
    if (event.currentTarget === event.target) {
      this.renderer.removeClass(event.currentTarget, 'drop-above');
      this.renderer.removeClass(event.currentTarget, 'drop-below');
    }
  }

  public handleFilterDrop(event: DragEvent, col: IStatColumnSelection) {
    this.renderer.removeClass(event.currentTarget, 'drop-above');
    this.renderer.removeClass(event.currentTarget, 'drop-below');
    const dropId = event.dataTransfer.getData('stat-col-filter');

    const dragIdx = this.currentStatColumns.findIndex(_ => _.id === dropId);
    const removed = this.currentStatColumns.splice(dragIdx, 1);
    let dropIdx = this.currentStatColumns.findIndex(_ => _.id === col.id);
    if (event.layerY > (<HTMLElement>event.currentTarget).offsetHeight / 2) {
      dropIdx += 1;
    }
    this.currentStatColumns.splice(dropIdx, 0, removed[0]);
    this.handleCurrentFilterUpdated();
  }

  private loadSavedFilters() {
    this._savedFilters = {};
    const savedStr = localStorage.getItem(this.getPresetSaveName());
    if (savedStr) {
      this._savedFilters = JSON.parse(savedStr);
    }
  }

  public get presetFilters() {
    return PrebuiltColumnFilters[this.subsection];
  }

  public get presetFilterArray(): string[] {
    const result: string[] = [];
    for (const key in this.presetFilters) {
      if (this.presetFilters.hasOwnProperty(key)) {
        result.push(key);
      }
    }
    return result;
  }

  public get savedFilters() {
    return this._savedFilters;
  }

  public get savedFilterArray(): string[] {
    const result: string[] = [];
    for (const key in this.savedFilters) {
      if (this.savedFilters.hasOwnProperty(key)) {
        result.push(key);
      }
    }
    return result;
  }

  public handlePresetKeyPress(event: KeyboardEvent) {
    if (this.currentFilterName !== 'Custom' && event.key.length === 1) {
      event.preventDefault();
    }
  }

  public savePreset(name: string) {
    const preset = cloneDeep(this.currentStatColumns);
    this._savedFilters[name] = preset;
    this.currentFilterName = name;
    localStorage.setItem(this.getPresetSaveName(), JSON.stringify(this._savedFilters));
  }

  public deletePreset(name: string) {
    delete this._savedFilters[name];
    localStorage.setItem(this.getPresetSaveName(), JSON.stringify(this._savedFilters));
    if (this.currentFilterName === name) {
      this.currentFilterName = 'Custom';
    }
  }

  public handlePresetSelected(event: MatAutocompleteSelectedEvent) {
    const presetName = event.option.value;
    const filters = cloneDeep(this.getFilterByName(presetName));
    this.currentStatColumns = filters;
    this.currentFilterName = presetName;
    this.updateDisplayColumns();
  }

  public getPresetSaveName() {
    return 'statFilterPresets-' + this.subsection;
  }

  private getFilterName(data: IStatColumnSelection[]): string {
    const dataStr = JSON.stringify(data);
    for (const key in this.presetFilters) {
      if (this.presetFilters.hasOwnProperty(key)) {
        const checkStr = JSON.stringify(this.presetFilters[key]);
        if (checkStr === dataStr) {
          return key;
        }
      }
    }
    for (const key in this.savedFilters) {
      if (this.savedFilters.hasOwnProperty(key)) {
        const checkStr = JSON.stringify(this.savedFilters[key]);
        if (checkStr === dataStr) {
          return key;
        }
      }
    }
    return null;
  }

  private getFilterByName(name: string): IStatColumnSelection[] {
    return this.presetFilters[name] || this.savedFilters[name] || this.presetFilters[DEFAULT_COL_FILTER_NAME];
  }

  private getSortData(data: IPlayerScore, sortHeaderId: string): string | number {
    return data.stats[sortHeaderId];
  }

  public get sorted() {
    const sortedData = this.sort && this.dataSource ? this.dataSource.sortData(this.dataSource.data, this.sort) : this.statData;
    return sortedData;
  }

  public get filterJsonString(): string {
    return JSON.stringify(this.currentStatColumns);
  }

  public getValue(player: IPlayerScore, propId: string): string {
    const def = this.statColumnMap[propId];
    const value = player.stats[propId];
    switch (def.type) {
      case StatColumnType.PERCENT:
        return this.percentPipe.transform(value, def.format || '1.2-2');
      case StatColumnType.DURATION:
        return this.durationPipe.transform(value, undefined, undefined, '0s');
      case StatColumnType.DECIMAL:
        return this.decimalPipe.transform(value, def.format || '1.2-2');
      default:
        return this.decimalPipe.transform(value, def.format || '1.0-0');
    }
  }

  public getSupportedClass(statName: string): string {
    if (this.statData && this.statData.statSupport[statName]) {
      return 'support-' + ReplayStatSupport[this.statData.statSupport[statName]].toLowerCase();
    }
    return 'support-full';
  }

  protected async loadReplayView() {
    // this.replayDescription = this.replayViewer.replayDescription;
    this.scoreScreenAnalyser = new ScoreAnalyser(this.replay);
    this.statData = await this.scoreScreenAnalyser.playerScoresFull;

    console.log('statData', this.statData);

    const statData = linq.from(this.statData.playerStats).orderBy(p => p.team).toArray();
    this.dataSource.data = statData;
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.sort.start = 'desc';
      this.updateDisplayColumns();
    });
  }
}
