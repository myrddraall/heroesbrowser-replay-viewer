import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter
} from '@angular/core';

import { Replay, BasicReplayAnalyser, ReplayDescription } from '@heroesbrowser/heroprotocol';

enum FileState {
  NONE,
  DRAGGING,
  LOADING,
  PARSING,
  LOADED
}

@Component({
  selector: 'replay-viewer',
  templateUrl: './replay-viewer.component.html',
  styleUrls: ['./replay-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplayViewerComponent implements OnInit {
  public FileState = FileState;
  private _fileState: FileState = FileState.NONE;
  public onReplayLoaded: EventEmitter<Replay> = new EventEmitter();

  public replay: Replay;
  private basicReplayAnalyser: BasicReplayAnalyser;

  @ViewChild('fileInput')
  private fileInputRef: ElementRef;


  public replayDescription: ReplayDescription;

  constructor(
    private renderer: Renderer2,
    private elmRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public get fileState(): FileState {
    return this._fileState;
  }

  public set fileState(value: FileState) {
    if (this._fileState !== value) {
      this._fileState = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  ngOnInit() {
  }

  @HostListener('dragstart', ['$event'])
  public handleDragStart(event: DragEvent) {
    return false;
  }

  @HostListener('dragover', ['$event'])
  public handleDragOver(event: DragEvent) {
    return false;
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
    this.fileState = FileState.DRAGGING;
    return false;
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
    this.fileState = FileState.PARSING;
    if (this.replay) {
      this.replay.dispose();
    }
    this.replay = new Replay(replayData);
    this.basicReplayAnalyser = new BasicReplayAnalyser(this.replay);
    this.replayDescription = await this.basicReplayAnalyser.replayDescription;
    setTimeout(() => {
      this.fileState = FileState.LOADED;
      this.onReplayLoaded.next(this.replay);
      this.logGameData();
    }, 0);
  }

  private async logGameData() {
    // console.log('header', await this.replay.header);
    // console.log('initData', await this.replay.initData);
    // console.log('details', await this.replay.details);
    // console.log('attributeEvents', await this.replay.attributeEvents);
    // console.log('messageEvents', await this.replay.messageEvents);
     console.log('trackerEvents', await this.replay.trackerEvents);
    // console.log('gameEvents', await this.replay.gameEvents);
  }

}
