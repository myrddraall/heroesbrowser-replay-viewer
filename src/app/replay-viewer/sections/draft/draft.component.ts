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
import { Replay, DraftAnalyser, IHeroPick, IHeroBan } from '@heroesbrowser/heroprotocol';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftComponent extends AbstractSectionComponent implements AfterViewInit {
  private replay: Replay;
  private draftAnalyser: DraftAnalyser;
  public dataSource: Array<IHeroPick | IHeroBan> = [];

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
      this.setLoadingMessage('Loading Draft Data');
      this.replay = this.replayViewer.replay;
      this.draftAnalyser = new DraftAnalyser(this.replay);
      this.dataSource = await this.draftAnalyser.draft;
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
}
