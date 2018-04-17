import { IPoint } from '@heroesbrowser/heroprotocol';
import * as linq from 'linq';

export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}


export class MapCoordinateMapper<T extends IPoint> {

    private query: linq.IEnumerable<T>;
    private mapRect: IRect;


    public constructor(data: linq.IEnumerable<T> | T[], mapRect: IRect) {
        if (Array.isArray(data)) {
            this.mapRect = mapRect;
            this.query = linq.from(data);
        } else {
            this.query = data;
            this.mapRect = mapRect;
        }

    }

    public crop(region: IRect): MapCoordinateMapper<T> {
        const query = this.query.where(p =>
            p.x >= region.x
            && p.x <= region.x + region.width
            && p.y >= region.y
            && p.y <= region.y + region.height
        ).select(p => {
            return Object.assign({}, p, {
                x: p.x - region.x,
                y: p.y - region.y
            });
        });
        const mapRect = {
            x: 0,
            y: 0,
            width: region.width,
            height: region.height
        };
        return new MapCoordinateMapper(query, mapRect);
    }

    public scale(amount: number): MapCoordinateMapper<T> {
        const query = this.query.select(p => {
            return Object.assign({}, p, {
                x: p.x * amount,
                y: p.y * amount
            });
        });
        const mapRect = {
            x: 0,
            y: 0,
            width: this.mapRect.width * amount,
            height: this.mapRect.height * amount
        };
        return new MapCoordinateMapper(query, mapRect);
    }
    public percentize(): MapCoordinateMapper<T> {
        const query = this.query.select(p => {
            const result = Object.assign({}, p, {
                x: p.x / this.mapRect.width,
                y: p.y / this.mapRect.height
            });
            return result;
        });
        const mapRect = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        };
        return new MapCoordinateMapper(query, mapRect);
    }

    public offset(offset: IPoint): MapCoordinateMapper<T> {
        const query = this.query.select(p => {
            return Object.assign({}, p, {
                x: p.x + offset.x,
                y: p.y + offset.y
            });
        });
        const mapRect = Object.assign({}, this.mapRect);
        return new MapCoordinateMapper(query, mapRect);
    }

    public flip(flipX: boolean, flipY: boolean): MapCoordinateMapper<T> {
        const query = this.query.select(p => {
            return Object.assign({}, p, {
                x: flipX ? this.mapRect.width - p.x : p.x,
                y: flipY ? this.mapRect.height - p.y : p.y,
            });
        });
        const mapRect = Object.assign({}, this.mapRect);
        return new MapCoordinateMapper(query, mapRect);
    }

    public toArray(): T[] {
        return this.query.toArray();
    }
}
