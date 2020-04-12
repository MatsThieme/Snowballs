import { normalizeAssetPath } from './Helpers.js';
import { Vector2 } from './Vector2.js';

export class Sprite {
    /**
     * 
     * Size of the canvas image source in px. 
     * 
     */
    public size: Vector2;

    /**
     * 
     * Relative position on the canvasImageSource in px.
     * 
     */
    public subPosition: Vector2;

    /**
     *
     * Size of the sprite on the canvasImageSource in px.
     *
     */
    public subSize: Vector2;
    private _canvasImageSource!: HTMLCanvasElement | OffscreenCanvas | HTMLImageElement;
    public get canvasImageSource(): HTMLCanvasElement | OffscreenCanvas | HTMLImageElement {
        return this._canvasImageSource;
    }

    private mX: boolean;
    private mY: boolean;

    /**
     * 
     * Used to load, store or create a canvas image source.
     * 
     */
    public constructor(src: string | HTMLCanvasElement | OffscreenCanvas | HTMLImageElement | ((context: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas) => void)) {
        this.mX = this.mY = false;

        if (typeof src === 'string') {
            this._canvasImageSource = new Image();
            this._canvasImageSource.addEventListener('load', () => {
                this.subPosition = new Vector2();
                this.subSize = new Vector2(this._canvasImageSource.width, this._canvasImageSource.height);
                this.size = new Vector2(this._canvasImageSource.width, this._canvasImageSource.height);
                if (this.mX) this.mirrorX();
                if (this.mY) this.mirrorY();
            });
            this._canvasImageSource.src = normalizeAssetPath(src);
        } else if (src instanceof HTMLCanvasElement || (OffscreenCanvas && src instanceof OffscreenCanvas)) {
            this._canvasImageSource = src;
        } else if (src instanceof Image) {
            this._canvasImageSource = src;
        } else if (typeof src === 'function') {
            const canvas = new OffscreenCanvas(100, 100);
            const context = <OffscreenCanvasRenderingContext2D>canvas.getContext('2d');
            context.imageSmoothingEnabled = false;
            src(context, canvas);

            this._canvasImageSource = canvas;
        }

        this.subPosition = new Vector2();
        this.subSize = new Vector2(this._canvasImageSource.width, this._canvasImageSource.height);
        this.size = new Vector2(this._canvasImageSource.width, this._canvasImageSource.height);
    }

    /**
     * 
     * Mirror the canvasImageSource horizontally.
     * 
     */
    public mirrorX(): Sprite {
        if (this.canvasImageSource.width === 0 && this.canvasImageSource.height === 0) {
            this.mX = !this.mX;
            return this;
        }

        const c = new OffscreenCanvas(this._canvasImageSource.width, this._canvasImageSource.height);
        const ctx = c.getContext('2d');
        ctx!.translate(c.width, 0);
        ctx!.scale(-1, 1);
        ctx!.imageSmoothingEnabled = false;
        ctx!.drawImage(this._canvasImageSource, 0, 0);
        this._canvasImageSource = c;

        this.mX = false;

        return this;
    }

    /**
     *
     * Mirror the canvasImageSource vertically.
     *
     */
    public mirrorY() {
        if (this.canvasImageSource.width === 0 && this.canvasImageSource.height === 0) {
            this.mY = !this.mY;
            return this;
        }

        const c = new OffscreenCanvas(this._canvasImageSource.width, this._canvasImageSource.height);
        const ctx = c.getContext('2d');
        ctx!.translate(0, c.height);
        ctx!.scale(1, -1);
        ctx!.imageSmoothingEnabled = false;
        ctx!.drawImage(this._canvasImageSource, 0, 0);
        this._canvasImageSource = c;

        this.mY = false;

        return this;
    }
}