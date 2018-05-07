import { Injectable } from '@angular/core';
import { Replay, ReplayDescription, BasicReplayAnalyser } from '@heroesbrowser/heroprotocol';
import { BehaviorSubject } from 'rxjs';

export enum ReplayState {
  NONE,
  LOADING,
  PARSING,
  INITIALIZING,
  LOADED
}

@Injectable()
export class ReplayService {
  private _replaySubject: BehaviorSubject<Replay> = new BehaviorSubject(undefined);
  private _replayDescSubject: BehaviorSubject<ReplayDescription> = new BehaviorSubject(undefined);
  private _stateSubject: BehaviorSubject<ReplayState> = new BehaviorSubject(ReplayState.NONE);

  constructor() { }

  public get stateChange(): BehaviorSubject<ReplayState> {
    return this._stateSubject;
  }

  public get state(): ReplayState {
    return this._stateSubject.value;
  }

  public get replayChange(): BehaviorSubject<Replay> {
    return this._replaySubject;
  }

  public get replay(): Replay {
    return this._replaySubject.value;
  }
  public get replayDescriptionChange(): BehaviorSubject<ReplayDescription> {
    return this._replayDescSubject;
  }

  public get replayDescription(): ReplayDescription {
    return this._replayDescSubject.value;
  }

  public async loadReplay(replayData: ArrayBuffer): Promise<Replay> {
    let replay;
    try {
      this.stateChange.next(ReplayState.LOADING);
      if (this.replay) {
        this.replay.dispose();
      }
      replay = new Replay(replayData);
      this.stateChange.next(ReplayState.INITIALIZING);
      await replay.initialize();
      this.stateChange.next(ReplayState.PARSING);
      const basicAnalyser = new BasicReplayAnalyser(replay);
      const desc = await basicAnalyser.replayDescription;
      this.replayDescriptionChange.next(desc);
      this.replayChange.next(replay);
      this.stateChange.next(ReplayState.LOADED);
      return replay;
    } catch (e) {
      if (replay) {
        replay.dispose();
      }
      this.replayDescriptionChange.next(undefined);
      this.replayChange.next(undefined);
      this.stateChange.next(ReplayState.NONE);
      throw e;
    }
  }

}
