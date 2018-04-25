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
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';

@Component({
  selector: 'draft-view',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftComponent extends AbstractSectionComponent {
  private draftAnalyser: DraftAnalyser;
  public dataSource: Array<IHeroPick | IHeroBan>;

  constructor(
    replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(replayViewer, componentFactoryResolver, changeDetectorRef);
  }

  protected async loadReplayView() {
     this.draftAnalyser = new DraftAnalyser(this.replay);
     this.dataSource = await this.draftAnalyser.draft;
  }

}
