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
import { Replay, ReplayMapAnalyser, IPoint, IUnitLifeFilter } from '@heroesbrowser/heroprotocol';
import { AbstractSectionComponent } from '../AbstractSection';
import * as linq from 'linq';
import { Subscription } from 'rxjs/Subscription';

import { MapViewMode, MapIconCategory } from '../../maps';



export interface IMinionFilter {
  type?: string;
  label: string;
  filter: IUnitLifeFilter;
}

@Component({
  selector: 'globe-map',
  templateUrl: './globe-map.component.html',
  styleUrls: ['./globe-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobeMapComponent extends AbstractSectionComponent {
  public killedByFilter: IMinionFilter[] = [
    {
      label: 'Killed By Anything',
      filter: undefined
    },
    {
      label: 'On Team 1',
      filter: {
        isOnTeam: 0
      }
    },
    {
      label: 'On Team 2',
      filter: {
        isOnTeam: 1
      }
    },
    {
      label: 'Killed By Team 1',
      filter: {
        killedByTeams: 0
      }
    },
    {
      label: 'Killed By Team 2',
      filter: {
        killedByTeams: 1
      }
    },
    {
      label: 'Killed By Players',
      filter: {
        killedByPlayers: true
      }
    },
    {
      label: 'Killed By Team 1 Players',
      filter: {
        killedByTeams: 0,
        killedByPlayers: true
      }
    },
    {
      label: 'Killed By Team 2 Players',
      filter: {
        killedByTeams: 1,
        killedByPlayers: true
      }
    },
    {
      label: 'Killed By Minions',
      filter: {
        killedByMinions: true
      }
    },
    {
      label: 'Killed By Team 1 Minions',
      filter: {
        killedByTeams: 0,
        killedByMinions: true
      }
    },
    {
      label: 'Killed By Team 2 Minions',
      filter: {
        killedByTeams: 1,
        killedByMinions: true
      }
    },
    {
      label: 'Killed By Other',
      filter: {
        killedByMinions: false,
        killedByPlayers: false
      }
    }

  ];

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
  private _currentFilter: IMinionFilter = this.killedByFilter[0];

  public get currentFilter(): IMinionFilter { return this._currentFilter; }
  public set currentFilter(value: IMinionFilter) {
    if (this._currentFilter !== value) {
      this._currentFilter = value;
      this.updateHeatmap();
    }

  }
  /*
 <mat-option [value]="1">Anything</mat-option>
          <mat-option [value]="2">Players</mat-option>
          <mat-option [value]="2">Minions</mat-option>
          <mat-option [value]="2">Team 1</mat-option>
          <mat-option [value]="3">Team 2</mat-option>
          <mat-option [value]="3">Team 1 Players</mat-option>
          <mat-option [value]="3">Team 2 Players</mat-option>
          <mat-option [value]="3">Team 1 Minions</mat-option>
          <mat-option [value]="3">Team 2 Minions</mat-option>
          <mat-option [value]="3">Other</mat-option>
*/


  constructor(
    replayViewer: ReplayViewerComponent,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(replayViewer, componentFactoryResolver, changeDetectorRef);
  }

  protected async loadReplayView() {
    this.replayMapAnalyser = new ReplayMapAnalyser(this.replay);
    await this.updateHeatmap();
  }

  private async updateHeatmap() {
    this.heatmap = await this.replayMapAnalyser.getMinionDeathHeatmap(this.currentFilter.filter);
    this.changeDetectorRef.markForCheck();
  }

  public onMapviewError(err: Error) {
    this.hasError = true;
    this.setNotSupportedMessage(err.message);
  }

  public compareFilter(filter, selected): boolean {
    return filter === selected;
  }

}
