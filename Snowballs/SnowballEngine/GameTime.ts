export class GameTime {
    private _lastTime: number;
    private _deltaTime: number;
    public readonly start: number;
    /**
     * 
     * 0 to turn off, else time in ms.
     * 
     */
    public clampDeltatime: number;
    public constructor() {
        this._lastTime = this.now;
        this._deltaTime = 0;
        this.start = this.now;
        this.clampDeltatime = 30;
    }

    /**
     *
     * Returns duration of the last frame in milliseconds.
     * 
     */
    public get deltaTime(): number {
        return this._deltaTime;
    }

    /**
     * 
     * Calculates and clamps the delta time.
     * 
     */
    public update(): void {
        if (this._lastTime) this._deltaTime = this.clampDeltatime === 0 ? this.now - this._lastTime : Math.min(this.now - this._lastTime, this.clampDeltatime);
        this._lastTime = this.now;
    }

    /**
     *
     * Returns the current time in milliseconds since January 1, 1970 00:00:00 UTC.
     * 
     */
    public get now(): number {
        return performance.now();
    }

    /*
     *
     * Returns the elapsed time in milliseconds since initialisation.
     * 
     */
    public get sinceStart(): number {
        return this.now - this.start;
    }
}