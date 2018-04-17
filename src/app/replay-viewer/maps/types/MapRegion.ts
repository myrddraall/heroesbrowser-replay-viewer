import { IPoint, IRect } from '@heroesbrowser/heroprotocol';
import { MapCoordinateMapper } from './MapCoordinateMapper';

export interface ITeamPoint extends IPoint {
    team: number;
}
export interface IMajorLocations {
    cores: MapCoordinateMapper<ITeamPoint>;
    wells: MapCoordinateMapper<ITeamPoint>;
    towers: MapCoordinateMapper<ITeamPoint>;
    towns: MapCoordinateMapper<ITeamPoint>;
}

interface IMajorLocationsRendered {
    cores?: ITeamPoint[];
    wells?: ITeamPoint[];
    towers?: ITeamPoint[];
    towns?: ITeamPoint[];
}
export class MapRegion {
    private _calulatedPoints: IPoint[];
    private _calulatedWells: IPoint[];
    private _calulatedTowns: IPoint[];
    private _calulatedTowers: IPoint[];
    private _calulatedCores: IPoint[];
    private _points: IPoint[][];

    public mapSize: IPoint;
    public wells: IPoint[];
    public towns: IPoint[];
    public towers: IPoint[];
    public cores: IPoint[];

    private get mapRect() {
        if (this.mapSize) {
            return { x: 0, y: 0, width: this.mapSize.x, height: this.mapSize.y };
        }
        return undefined;
    }

    constructor(public cropArea: IRect, public offset: IPoint = { x: 0, y: 0 }) {
        this.clear();
    }

    public clear() {
        this.wells = null;
        this.towns = null;
        this.towers = null;
        this.cores = null;
        this._points = [];

        this._calulatedPoints = [];
        this._calulatedWells = [];
        this._calulatedTowns = [];
        this._calulatedTowers = [];
        this._calulatedCores = [];
    }

    public get viewBox(): string {
        if (this.cropArea) {
            return `0 0 ${this.cropArea.width} ${this.cropArea.height}`;
        }
        return `0 0 0 0`;
    }


    public addPointSet(points: IPoint[]) {
        this._points.push(points);
    }

    public setPointSet(index: number, points: IPoint[]) {
        this._points[index] = points;
    }

    public getPointSet(index: number): IPoint[] {
        return this._points[index];
    }

    public calculatePositions(): void {
        this._calulatedCores = this.calculate(this.cores);
        this._calulatedTowers = this.calculate(this.towers);
        this._calulatedTowns = this.calculate(this.towns);
        this._calulatedWells = this.calculate(this.wells);
        this._calulatedPoints = [];
        for (let i = 0; i < this._points.length; i++) {
            const cPointSet = this.calculate(this._points[i]);
            this._calulatedPoints = [...this._calulatedPoints, ...cPointSet];
        }
    }

    public calculate(source: IPoint[], scale: number = 1) {
        if (source) {
            const mapper = new MapCoordinateMapper(source, this.mapRect);
            let mapped = mapper
                .flip(false, true)
                .crop(this.cropArea)
                .offset(this.offset);
            if (scale !== 1) {
                mapped = mapped.scale(scale);
            }
            return mapped.toArray();
        }
        return [];
    }

    public get pointPositions(): IPoint[] {
        return this._calulatedPoints;
    }

    public get corePositions(): IPoint[] {
        return this._calulatedCores;
    }

    public get wellPositions(): IPoint[] {
        return this._calulatedWells;
    }

    public get towerPositions(): IPoint[] {
        return this._calulatedTowers;
    }

    public get townPositions(): IPoint[] {
        return this._calulatedTowns;
    }
}
