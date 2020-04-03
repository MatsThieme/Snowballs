export class GameTime {
    private _lastTime: number;
    private _deltaTime: number;
    public readonly start: number;
    public clampDeltatime: number; // 0 to turn off, else time in ms.
    public constructor() {
        this._lastTime = this.now;
        this._deltaTime = 0;
        this.start = this.now;
        this.clampDeltatime = 30;
    }
    public get deltaTime(): number {
        return this._deltaTime;
    }
    public update(): void {
        if (this._lastTime) this._deltaTime = this.clampDeltatime === 0 ? this.now - this._lastTime : Math.min(this.now - this._lastTime, this.clampDeltatime);
        this._lastTime = this.now;
    }
    public get now(): number {
        return performance.now();
    }
    public get sinceStart(): number {
        return this.now - this.start;
    }
}