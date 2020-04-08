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
    public readonly canvasImageSource!: HTMLCanvasElement | OffscreenCanvas | HTMLImageElement;

    /**
     * 
     * Used to load, store or create a canvas image source.
     * 
     */
    public constructor(src: string | HTMLCanvasElement | OffscreenCanvas | HTMLImageElement | ((context: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas) => void)) {
        if (typeof src === 'string') {
            this.canvasImageSource = new Image();
            this.canvasImageSource.addEventListener('load', () => {
                this.subPosition = new Vector2();
                this.subSize = new Vector2(this.canvasImageSource.width, this.canvasImageSource.height);
                this.size = new Vector2(this.canvasImageSource.width, this.canvasImageSource.height);
            });
            this.canvasImageSource.src = normalizeAssetPath(src);
        } else if (src instanceof HTMLCanvasElement || (OffscreenCanvas && src instanceof OffscreenCanvas)) {
            this.canvasImageSource = src;
        } else if (src instanceof Image) {
            this.canvasImageSource = src;
        } else if (typeof src === 'function') {
            const canvas = new OffscreenCanvas(100, 100);
            const context = <OffscreenCanvasRenderingContext2D>canvas.getContext('2d');

            src(context, canvas);

            this.canvasImageSource = canvas;
        }

        this.subPosition = new Vector2();
        this.subSize = new Vector2(this.canvasImageSource.width, this.canvasImageSource.height);
        this.size = new Vector2(this.canvasImageSource.width, this.canvasImageSource.height);
    }
}