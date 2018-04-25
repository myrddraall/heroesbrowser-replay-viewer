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


/*@Component({
  selector: 'stub-stub',
  templateUrl: './stub.component.html',
  styleUrls: ['./stub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})*/
export class StubComponent extends AbstractSectionComponent implements AfterViewInit {

  constructor(
    replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(replayViewer, componentFactoryResolver, changeDetectorRef);
  }
  public ngAfterViewInit() {
    super.ngAfterViewInit();
    this.loadReplayView();
  }

  protected async loadReplayView() {
  }

}
