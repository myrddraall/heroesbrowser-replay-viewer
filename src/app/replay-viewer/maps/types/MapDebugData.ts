import { IMapDescriptor, IPoint, IRect } from '@heroesbrowser/heroprotocol';

export class MapDebugData {
    public mapDescriptor: IMapDescriptor;
    public displayRegions: IRect[] = [];
    public points: IPoint[];
    public get viewBox(): string {
        if (this.mapDescriptor) {
            return `0 0 ${this.mapDescriptor.size.x} ${this.mapDescriptor.size.y}`;
        }
        return '0 0 0 0';
    }

}
