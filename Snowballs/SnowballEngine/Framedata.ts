export class Framedata {
    private _update: number;
    private lastTime: number;
    private avgFramesPerSecond: number;
    private avgFrameTime: number;
    private frames: number;
    public highestFt: number;
    public constructor(update = 500) {
        this._update = update;
        this.lastTime = performance.now();
        this.avgFramesPerSecond = 0;
        this.frames = 0;
        this.avgFrameTime = 0;
        this.highestFt = 0;
    }
    public update() {
        this.frames++;
        const now = performance.now();
        if (now > this.lastTime + this._update) {
            const delta = (now - this.lastTime);
            this.avgFrameTime = delta / this.frames;
            this.avgFramesPerSecond = ~~(this.frames / (delta / 1000));
            this.frames = 0;
            this.lastTime = now;

            if (this.avgFrameTime > this.highestFt) this.highestFt = this.avgFrameTime;
        }
    }
    public get fps() {
        return this.avgFramesPerSecond;
    }
    public get fts() {
        return this.avgFrameTime;
    }
}