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
import { Subscription } from 'rxjs/Subscription';

import { MapViewMode, MapIconCategory } from '../../maps';

@Component({
  selector: 'globe-map',
  templateUrl: './globe-map.component.html',
  styleUrls: ['./globe-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobeMapComponent extends AbstractSectionComponent {

  private replayMapAnalyser: ReplayMapAnalyser;
  public MapViewMode = MapViewMode;
  public viewMode = MapViewMode.MINIMAP;
  public iconVisibility: MapIconCategory[] = [
    MapIconCategory.STRUCTURES,
    MapIconCategory.NEUTRAL,
    MapIconCategory.OBJECTIVE
  ];
  public heatmap: IPoint[];
  public hasError = false;

  constructor(
    replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(replayViewer, componentFactoryResolver, changeDetectorRef);
  }

  protected async loadReplayView() {
      this.replayMapAnalyser = new ReplayMapAnalyser(this.replay);
      this.heatmap = await this.replayMapAnalyser.getMinionDeathHeatmap();
      this.changeDetectorRef.markForCheck();
  }

  public cycleViewMode() {
    this.viewMode++;
    if (this.viewMode > 3) {
      this.viewMode = 0;
    }
    this.changeDetectorRef.markForCheck();
  }

  public onMapviewError(err: Error) {
    this.hasError = true;
    this.setNotSupportedMessage(err.message);
  }

}
