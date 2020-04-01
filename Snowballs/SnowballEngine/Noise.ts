import { lerp } from './Helpers.js';

export class Noise {
    private vs: number[];
    public constructor(maxVertices: number) {
        this.vs = [];

        for (let i = 0; i < maxVertices; i++) {
            this.vs[i] = Math.random();
        }
    }
    public get(x: number): number {
        let xi = Math.floor(x) - (x < 0 && x !== Math.floor(x) ? 1 : 0);
        let t = x - xi;
        let xMin = xi % this.vs.length;
        let xMax = (xMin + 1) % this.vs.length;

        return lerp(this.vs[xMin], this.vs[xMax], t);
    }
}