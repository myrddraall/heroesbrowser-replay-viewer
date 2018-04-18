import {
  Type,
  Component,
  ComponentFactoryResolver,
  Input,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter
} from '@angular/core';
import { snakeCase } from 'change-case';
import { Replay, ReplayMapAnalyser, IMapDescriptor, IRect, IPoint, MapNotSupportedError, IMapPOI } from '@heroesbrowser/heroprotocol';

import { MapRegion, MapCoordinateMapper, MapDebugData, MapViewMode } from '../types';
import { BattlegroundMapBGBase } from '../bg/bg-base/BattlegroundMapBGBase';
import { MapBackgroundComponentMap } from '../bg';
import * as heatmap from 'heatmapjs';
import * as linq from 'linq';
import { MapPOIIcons } from './MapPOIIcons';

@Component({
  selector: 'map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements AfterViewInit, OnChanges {

  public debugData: MapDebugData = new MapDebugData();
  private mapDescriptor: IMapDescriptor;
  private _heatmapInvalid = false;
  public regions: MapRegion[] = [];
  public regionHeatMaps: string[] = [];
  public showDebug = false;

  public mapPOIIcons = MapPOIIcons;

  @Output()
  public error: EventEmitter<Error> = new EventEmitter();

  @Input()
  public replay: Replay;

  @Input()
  public heatmap: IPoint[];

  @Input()
  public viewMode: MapViewMode = MapViewMode.MINIMAP;

  @ViewChild('mapContainerRef', { read: ViewContainerRef })
  private mapContainerRef: ViewContainerRef;

  @ViewChild('heatmapRender')
  public heatmapRenderTarget: ElementRef;

  private mapComponent: ComponentRef<BattlegroundMapBGBase>;
  private replayMapAnalyser: ReplayMapAnalyser;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) { }

  public ngAfterViewInit() {
    this.createMapComponent();
    this.renderHeatmap();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.replay) {
      if (this.replayMapAnalyser) {
        // this.replayMapAnalyser.dispose();
      }
      if (this.mapComponent) {
        this.mapComponent.destroy();
        this.mapComponent = null;
      }
      if (this.replay) {
        this.replayMapAnalyser = new ReplayMapAnalyser(this.replay);
        this.createMapComponent();
        this.renderHeatmap();
      }
    }
    if (changes.heatmap) {
      if (this.heatmap) {
        this._heatmapInvalid = true;
        this.renderHeatmap();
      }
    }
    if (changes.viewMode) {
      if (this.mapComponent) {
        this.mapComponent.instance.viewMode = this.viewMode;
      }
    }
  }

  private getMapBGComponentClass(mapId: string): Type<BattlegroundMapBGBase> {
    const build = this.mapDescriptor.build;
    const mapVersion = linq.from(MapBackgroundComponentMap[mapId])
      .where(_ => _.id === mapId && build >= _.minBuild)
      .orderByDescending(_ => _.minBuild)
      .firstOrDefault();
    return mapVersion ? mapVersion.component : undefined;
  }

  private async createMapComponent() {
    if (this.replayMapAnalyser && this.mapContainerRef) {
      const mapDesc = this.mapDescriptor = await this.replayMapAnalyser.mapDescriptor;
      const mapName = mapDesc.name;
      const mapId = snakeCase(mapName);
      const componentType = this.getMapBGComponentClass(mapId);
      if (!componentType) {
        this.showMapNotSupportedError(mapName);
      } else {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.mapComponent = this.mapContainerRef.createComponent(factory);
        this.mapComponent.instance.viewMode = this.viewMode;
        this.render();
      }
    }
  }

  private showMapNotSupportedError(mapName: string) {
    this.error.next(new MapNotSupportedError(`${this.mapDescriptor.name} is not supported... Yet`));
  }

  public updateDebugRegion(index: number, prop: string, value: number) {
    if (prop === 'ox') {
      this.regions[index].offset.x = +value;
    } else if (prop === 'oy') {
      this.regions[index].offset.y = +value;
    } else {
      this.regions[index].cropArea[prop] = +value;
    }
    this.render();
  }

  public async renderHeatmap() {
    if (this._heatmapInvalid && this.mapComponent && this.heatmapRenderTarget) {
      const regions = this.regions;
      this.regionHeatMaps = [];
      for (let i = 0; i < regions.length; i++) {
        this.renderHeatmapRegion(i);
        this._heatmapInvalid = false;
      }
    }
  }

  private renderHeatmapRegion(index: number) {
    const scaleFactor = 10;
    const region = this.regions[index];
    const heatmapRegionPoints = region.calculate(this.heatmap, scaleFactor);
     if (heatmapRegionPoints.length) {
      this.renderer.setStyle(this.heatmapRenderTarget.nativeElement, 'width', (region.cropArea.width * scaleFactor) + 'px');
      this.renderer.setStyle(this.heatmapRenderTarget.nativeElement, 'height', (region.cropArea.height * scaleFactor) + 'px');

      const inst = heatmap.create({
        container: this.heatmapRenderTarget.nativeElement,
        radius: 25,
        // blur: .999
      });

      const min = linq.from(heatmapRegionPoints).min(_ => _['value']);
      const max = linq.from(heatmapRegionPoints).max(_ => _['value']);

      inst.setData({
        min,
        max,
        data: heatmapRegionPoints
      });

      const container: HTMLElement = this.heatmapRenderTarget.nativeElement;
      const canvas = <HTMLCanvasElement>container.querySelector('.heatmap-canvas');
      this.regionHeatMaps[index] = canvas.toDataURL();
      canvas.remove();
    }
  }

  public async render() {
    const mapDesc = this.mapDescriptor;
    const regions = this.regions = this.mapComponent.instance.mapRegions;
    const locations = await this.replayMapAnalyser.getMajorLocations();

    const poi = await this.replayMapAnalyser.getPointsOfInterest();
    console.log('POI', poi);

    const debugPoints = await this.replayMapAnalyser.getMercSpawns();

    this.regions[0].mapSize = mapDesc.size;
    this.debugData.mapDescriptor = this.mapDescriptor;
    this.debugData.displayRegions = [];
    this.debugData.points = new MapCoordinateMapper(debugPoints, this.regions[0].mapRect).flip(false, true).toArray();

    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];

      this.debugData.displayRegions[i] = region.cropArea;

      region.clear();
      region.mapSize = mapDesc.size;
      region.cores = locations.cores;
      region.towers = locations.towers;
      region.towns = locations.towns;
      region.wells = locations.wells;
      region.pointsOfInterest = poi;

      region.addPointSet(debugPoints);

      region.calculatePositions();
    }

    /*const regionRects = this.mapRegionRects;

    this.debugData.mapDescriptor = mapDesc;
    this.debugData.displayRegions = regionRects;

    const mapRect = { x: 0, y: 0, width: mapDesc.size.x, height: mapDesc.size.y };
    //const locations = await this.replayMapAnalyser.getMajorLocations();

    const coordinateMapper = new MapCoordinateMapper(locations.towers, mapRect);
    this.debugData.points = coordinateMapper.flip(false, true).toArray();

    this._mapRegions = [];
    for (let i = 0; i < regionRects.length; i++) {
      const rect = regionRects[i];
      const mapRegion = new MapRegion(rect);
      mapRegion.majorLocations = {
        cores: new MapCoordinateMapper(locations.cores, mapRect),
        wells: new MapCoordinateMapper(locations.wells, mapRect),
        towers: new MapCoordinateMapper(locations.towers, mapRect),
        towns: new MapCoordinateMapper(locations.towns, mapRect)
      };
      mapRegion.addPointSet(coordinateMapper);
      mapRegion.calculatePositions();
      this._mapRegions.push(mapRegion);
    }

*/
    this.renderHeatmap();
    this.changeDetectorRef.markForCheck();
  }

  public containerClicked(event: MouseEvent) {
    if (event.ctrlKey && event.altKey) {
      this.showDebug = !this.showDebug;
      this.changeDetectorRef.markForCheck();
    }
  }

  public poiIcon(poi: IMapPOI) {
    return MapPOIIcons[poi.type] || MapPOIIcons.UNKNOWN;
  }
}
