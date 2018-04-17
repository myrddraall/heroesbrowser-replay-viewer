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
import { Replay, ReplayMapAnalyser, IPoint } from '@heroesbrowser/heroprotocol';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';

import { MapViewMode } from '../../maps';

@Component({
  selector: 'globe-map',
  templateUrl: './globe-map.component.html',
  styleUrls: ['./globe-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobeMapComponent extends AbstractSectionComponent implements AfterViewInit {
  private replayMapAnalyser: ReplayMapAnalyser;

  public replay: Replay;
  public MapViewMode = MapViewMode;
  public viewMode = MapViewMode.MINIMAP;
  public heatmap: IPoint[];

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
    this.replayLoaded();
  }

  private async replayLoaded() {
    try {
      this.clearNotSupported();
      this.setLoadingMessage('Loading Data');
      this.replay = this.replayViewer.replay;
      this.replayMapAnalyser = new ReplayMapAnalyser(this.replay);
      this.heatmap = await this.replayMapAnalyser.getMinionDeathHeatmap();
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

  public cycleViewMode() {
    this.viewMode++;
    if (this.viewMode > 3) {
      this.viewMode = 0;
    }
    this.changeDetectorRef.markForCheck();
  }

}
