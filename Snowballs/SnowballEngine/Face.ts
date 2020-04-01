import { Line } from './Line.js';
import { Vector2 } from './Vector2.js';

export class Face {
    public v1: Vector2;
    public v2: Vector2;
    public normal: Vector2;
    public line: Line;
    public constructor(v1: Vector2, v2: Vector2) {
        this.v1 = v1;
        this.v2 = v2;
        this.normal = v1.clone.sub(v2).perpendicularCounterClockwise.normalize();
        this.line = new Line(v1, v2);
    }
}