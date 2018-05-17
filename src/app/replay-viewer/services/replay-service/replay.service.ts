import { Injectable } from '@angular/core';
import { Replay, ReplayDescription, BasicReplayAnalyser } from '@heroesbrowser/heroprotocol';
import { BehaviorSubject } from 'rxjs';
import { RecentReplayDB, IRecentReplayData, IRecentReplayDescription } from '../../db/RecentReplayDB';
import { SettingsService } from '../settings.service';


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
  private _recentReplaySubject: BehaviorSubject<IRecentReplayDescription[]> = new BehaviorSubject([]);
  private _recentReplayDB = new RecentReplayDB();
  private _recentReplaysPromise: Promise<IRecentReplayDescription[]>;

  constructor(
    private settingsService: SettingsService
  ) {
    this.init();
  }

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

  public get recentReplays(): BehaviorSubject<IRecentReplayDescription[]> {
    return this._recentReplaySubject;
  }

  private get recentReplayList(): Promise<ReplayDescription[]> {
    if (!this._recentReplaysPromise) {
      this.loadRecentReplays();
    }
    return this._recentReplaysPromise;
  }

  private async init() {
    await this.recentReplayList;
    this.settingsService.allowRecentReplaysChange.subscribe(async (value) => {
      if (!value) {
        await this.truncateReplays(0);
        this._recentReplayDB.delete();
      }
    });
    this.settingsService.clearRecentReplaysEvent.subscribe(() => {
        this.truncateReplays(0);
    });
  }

  private loadRecentReplays() {
    this._recentReplaysPromise = new Promise(async (res, rej) => {
      try {
        const db = this._recentReplayDB;
        let recentReplays: IRecentReplayDescription[];
        await db.transaction(async () => {
          recentReplays = await db.recentReplayStore.getAll();
          res(recentReplays);
          this._recentReplaySubject.next(recentReplays);
        });
      } catch (e) {
        rej(e);
      }
    });
    return this._recentReplaysPromise;
  }

  public async loadReplay(replayData: ArrayBuffer): Promise<Replay> {
    const data = replayData.slice(0);
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
      if (this.settingsService.allowRecentReplays) {
        const maxRecentReplays = 5;
        try {
          const db = this._recentReplayDB;
          await db.transaction(async () => {
            const replayRecord = Object.assign({}, desc, { lastAccessed: new Date() });
            await db.recentReplayStore.put(replayRecord);
            await db.recentReplayDataStore.put({
              fingerPrint: replayRecord.fingerPrint,
              data: data
            });
            // recentCount = await db.recentReplayStore.count();
          }, 'readwrite');

          /*if (recentCount > maxRecentReplays) {
            this.loadRecentReplays();
            const recent = await this.recentReplayList;
            await db.transaction(async () => {
              for (let i = 0; i < recentCount - maxRecentReplays; i++) {
                const element = recent[i];
                await db.recentReplayStore.delete(element.fingerPrint);
                await db.recentReplayDataStore.delete(element.fingerPrint);
              }
            }, 'readwrite');
          }
          this.loadRecentReplays();*/
          await this.truncateReplays(maxRecentReplays);
        } catch (e) {
          console.error(e);
        }
      }


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

  public get isDBSupported() {
    return 'indexedDB' in window;
  }

  public async truncateReplays(max: number) {
    const db = this._recentReplayDB;
    const recent = await this.loadRecentReplays();
    const recentCount = recent.length;

    await db.transaction(async () => {
      for (let i = 0; i < recentCount - max; i++) {
        const element = recent[i];
        await db.recentReplayStore.delete(element.fingerPrint);
        await db.recentReplayDataStore.delete(element.fingerPrint);
      }
    }, 'readwrite');
    await this.loadRecentReplays();
  }

  public async loadRecentReplay(fingerPrint: string): Promise<Replay> {
    const db = this._recentReplayDB;
    let replayDataRecord: IRecentReplayData;
    await db.transaction(async () => {
      replayDataRecord = await db.recentReplayDataStore.get(fingerPrint);
    });
    return await this.loadReplay(replayDataRecord.data);
  }

}
