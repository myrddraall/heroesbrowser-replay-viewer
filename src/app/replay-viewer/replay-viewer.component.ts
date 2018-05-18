import {
  Component,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter
} from '@angular/core';

import { Router } from '@angular/router';
import { Angulartics2 } from 'angulartics2';
import { Replay, BasicReplayAnalyser, ReplayDescription, GameType, UnitAnalyser } from '@heroesbrowser/heroprotocol';
import * as linq from 'linq';
import { ReplayService, ReplayState } from './services/replay-service/replay.service';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';

enum FileState {
  NONE,
  DRAGGING,
  INITIALIZING,
  LOADING,
  PARSING,
  LOADED,
  ERROR
}

@Component({
  selector: 'replay-viewer',
  templateUrl: './replay-viewer.component.html',
  styleUrls: ['./replay-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplayViewerComponent implements OnDestroy {
  public FileState = FileState;
  private _fileState: FileState = FileState.NONE;

  private _subscriptions: Subscription[] = [];
  public onReplayLoaded: EventEmitter<Replay> = new EventEmitter();
  public loadError: Error;
  public replay: Replay;
  // private basicReplayAnalyser: BasicReplayAnalyser;

  @ViewChild('fileInput')
  private fileInputRef: ElementRef;


  public replayDescription: ReplayDescription;

  constructor(
    private renderer: Renderer2,
    private elmRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private angulartics2: Angulartics2,
    private replayService: ReplayService,
    private app: AppComponent
  ) {

    this._subscriptions.push(app.loadRecentReplay.subscribe(fp => {
      replayService.loadRecentReplay(fp);
    }));
    this._subscriptions.push(replayService.stateChange.subscribe(state => {
      switch (state) {
        case ReplayState.NONE:
          this.fileState = FileState.NONE;
          break;
        case ReplayState.INITIALIZING:
          this.fileState = FileState.INITIALIZING;
          break;
        case ReplayState.LOADING:
          this.fileState = FileState.LOADING;
          break;
        case ReplayState.PARSING:
          this.fileState = FileState.PARSING;
          break;
        case ReplayState.LOADED:
          this.fileState = FileState.LOADED;
          break;
      }
    }));

    this._subscriptions.push(replayService.replayDescriptionChange.subscribe(replayDesc => {
      this.replayDescription = replayDesc;
      this.changeDetectorRef.markForCheck();
    }));

    this._subscriptions.push(replayService.replayChange.subscribe(replay => {
      this.replay = replay;
      this.onReplayLoaded.next(replay);
      if (replay) {
        this.logGameData();
      }
      this.changeDetectorRef.markForCheck();
    }));

  }

  public get fileState(): FileState {
    return this._fileState;
  }

  public set fileState(value: FileState) {
    if (this._fileState !== value) {
      this._fileState = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  @HostListener('dragstart', ['$event'])
  public handleDragStart(event: DragEvent) {
    return false;
  }

  @HostListener('dragover', ['$event'])
  public handleDragOver(event: DragEvent) {
    if (event.dataTransfer.types[0] === 'Files') {
      event.preventDefault();
    }
  }

  @HostListener('dragleave', ['$event'])
  public handleDragLeave(event: DragEvent) {
    if (!(<HTMLElement>this.elmRef.nativeElement).contains(event.fromElement)) {
      this.fileState = this.replay ? FileState.LOADED : FileState.NONE;
      return false;
    }
  }

  @HostListener('dragenter', ['$event'])
  public handleDragEnter(event: DragEvent) {
    console.log(event.dataTransfer.types.length, event.dataTransfer.types.join(','));
    if (event.dataTransfer.types[0] === 'Files') {
      this.fileState = FileState.DRAGGING;
    }
  }

  @HostListener('drop', ['$event'])
  public handleDrop(event: DragEvent) {
    this.renderer.setProperty(this.fileInputRef.nativeElement, 'files', event.dataTransfer.files);
    return false;
  }

  public handleFileSelected(event: Event) {
    const fileList = (<HTMLInputElement>event.target).files;
    const file = fileList[0];
    if (file) {
      if (file.name.endsWith('.StormReplay')) {
        const fileReader = new FileReader();
        fileReader.onload = (evt: ProgressEvent) => {
          this.handleReplayLoaded(fileReader.result);
        };
        fileReader.onerror = (evt) => {
          console.log('onerror', evt);
        };
        fileReader.onabort = (evt: ProgressEvent) => {
          console.log('onabort', evt);
        };
        fileReader.onloadstart = (evt: ProgressEvent) => {
          this.fileState = FileState.LOADING;
        };
        fileReader.onloadend = (evt: ProgressEvent) => {
          this.renderer.setProperty(this.fileInputRef.nativeElement, 'value', '');
        };
        fileReader.readAsArrayBuffer(file);
      }
    }
  }

  public async handleReplayLoaded(replayData: ArrayBuffer) {
    try {
      this.replayService.loadReplay(replayData);

    } catch (e) {
      console.error(e);
      this.loadError = e;
      this.fileState = FileState.ERROR;
    }
    /*this.fileState = FileState.PARSING;
    if (this.replay) {
      this.replay.dispose();
    }
    try {
      // await this.router.navigate(['/']);
      this.replay = new Replay(replayData);
      await this.replay.initialize();

      this.basicReplayAnalyser = new BasicReplayAnalyser(this.replay);
      this.replayDescription = await this.basicReplayAnalyser.replayDescription;

      this.angulartics2.eventTrack.next({
        action: 'replayLoaded',
        properties: {
          category: this.replayDescription.mapName,
          label: GameType[this.replayDescription.gameType] + '(' + this.replayDescription.fingerPrint + ')'
        },
      });

      setTimeout(() => {
        this.fileState = FileState.LOADED;
        this.onReplayLoaded.next(this.replay);
        this.logGameData();
      }, 0);

    } catch (e) {
      console.error(e);
      this.loadError = e;
      this.fileState = FileState.ERROR;
      this.replay.dispose();
      this.replay = undefined;
    }*/
  }

  private async logGameData() {
    // console.log('header', await this.replay.header);
    // console.log('initData', await this.replay.initData);
    // console.log('details', await this.replay.details);
    // console.log('attributeEvents', await this.replay.attributeEvents);
    // console.log('messageEvents', await this.replay.messageEvents);
    console.log('trackerEvents', await this.replay.trackerEvents);
    console.log('gameEvents', await this.replay.gameEvents);
    // console.log('this.replayDescription', this.replayDescription);


     // const uan = new UnitAnalyser(this.replay);

    // console.log('unitSpawns', await uan.unitSpawns);
   /* const deaths = await uan.unitLives;
    const heroDeaths = linq.from(deaths).where(_ => _.isHero === true).toArray();
    console.log('heroDeaths', heroDeaths);
    /*const start = new Date().getTime();
    let last = start;
    let now = start;
    console.log(await uan.getMinionsKilledByPlayerCount(0));
    now = new Date().getTime();
    console.log('t', now - last);
    last = now;
    console.log(await uan.getMinionsKilledByPlayerCount(1));
    now = new Date().getTime();
    console.log('t', now - last);
    last = now;
    console.log(await uan.getMinionsKilledByPlayerCount(2));
    now = new Date().getTime();
    console.log('t', now - last);
    last = now;
    console.log(await uan.getMinionsKilledByPlayerCount(3));
    now = new Date().getTime();
    console.log('t', now - last);
    last = now;
    console.log(await uan.getMinionsKilledByPlayerCount(4));
    now = new Date().getTime();
    console.log('t', now - last);
    last = now;
    console.log('total', now - start);*/
  }

  public ngOnDestroy() {
    for (let i = 0; i < this._subscriptions.length; i++) {
      const sub = this._subscriptions[i];
      sub.unsubscribe();
    }
    this._subscriptions = undefined;
  }

}
