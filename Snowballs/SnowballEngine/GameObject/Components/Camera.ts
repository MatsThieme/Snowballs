import { Frame } from '../../Camera/Frame.js';
import { AABB } from '../../Physics/AABB.js';
import { Vector2 } from '../../Vector2.js';
import { GameObject } from '../GameObject.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';

export class Camera extends Component {
    public resolution: Vector2;
    public size: Vector2;
    private canvas: OffscreenCanvas;
    private context: OffscreenCanvasRenderingContext2D;
    public constructor(gameObject: GameObject, resolution: Vector2 = new Vector2(), size: Vector2 = new Vector2(1, 1)) {
        super(gameObject, ComponentType.Camera);
        this.resolution = resolution;
        this.size = size;
        this.canvas = new OffscreenCanvas(this.resolution.x, this.resolution.y);
        this.context = <OffscreenCanvasRenderingContext2D>this.canvas.getContext('2d');
        this.context.imageSmoothingEnabled = false;
    }
    public get currentFrame(): OffscreenCanvas {
        return this.canvas;
    }

    /**
     * 
     * Draw active gameObjects to a canvas.
     * 
     */
    public update(frames: Frame[]) {
        this.canvas.width = this.resolution.x;
        this.canvas.height = this.resolution.y;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const frame of frames) {
            if (frame.sprite.canvasImageSource && frame.sprite.canvasImageSource.width > 0 && frame.sprite.canvasImageSource.height > 0 && this.AABBInCamera(new AABB(frame.size, frame.worldCordinates))) {
                const frameSize = this.worldToScreen(frame.size);
                const framePos = this.worldToScreenPoint(frame.worldCordinates).sub(new Vector2(0, frameSize.y));

                this.context.save();

                if (frame.rotation.radian !== 0) {
                    let rotationPoint;
                    if (frame.rotationPoint) rotationPoint = this.worldToScreenPoint(frame.rotationPoint);
                    else rotationPoint = new Vector2(framePos.x + frameSize.x / 2, framePos.y + frameSize.y / 2);

                    this.context.translate(rotationPoint.x, rotationPoint.y);

                    this.context.rotate(frame.rotation.radian);

                    this.context.translate(-rotationPoint.x, -rotationPoint.y);
                }

                this.context.globalAlpha = frame.alpha;

                this.context.filter = frame.filter;

                try {
                    //this.context.drawImage(frame.sprite.canvasImageSource, frame.sprite.subPosition.x, frame.sprite.subPosition.y, frame.sprite.subSize.x, frame.sprite.subSize.y, framePos.x, framePos.y, frameSize.x, frameSize.y);
                    if ((<any>window).chrome) this.context.drawImage(frame.sprite.canvasImageSource, frame.sprite.subPosition.x, frame.sprite.subPosition.y, frame.sprite.subSize.x, frame.sprite.subSize.y, framePos.x, framePos.y, frameSize.x, frameSize.y);
                    else this.context.drawImage(frame.sprite.canvasImageSource, Math.round(frame.sprite.subPosition.x), Math.round(frame.sprite.subPosition.y), Math.round(frame.sprite.subSize.x), Math.round(frame.sprite.subSize.y), Math.round(framePos.x), Math.round(framePos.y), Math.round(frameSize.x), Math.round(frameSize.y));
                }
                catch{
                    console.log(Math.round(frame.sprite.subPosition.x), Math.round(frame.sprite.subPosition.y), Math.round(frame.sprite.subSize.x), Math.round(frame.sprite.subSize.y), Math.round(framePos.x), Math.round(framePos.y), Math.round(frameSize.x), Math.round(frameSize.y));
                }

                this.context.filter = 'none';

                this.context.restore();
            }
        }
    }

    /**
     * 
     * Returns whether a rectangle intersects the camera AABB.
     * 
     */
    public AABBInCamera(rect: AABB): boolean {
        return rect.screenSpaceIntersects(this.AABB);
    }

    /**
     * 
     * Transforms a world point into a screen point.
     * 
     */
    public worldToScreenPoint(position: Vector2): Vector2 {
        const localPosition = new Vector2(position.x, -position.y).sub(new Vector2(this.gameObject.transform.position.x, -this.gameObject.transform.position.y)).add(this.size.clone.scale(0.5));

        return this.worldToScreen(localPosition);
    }

    /**
     *
     * Transforms a screen point into a world point.
     *
     */
    public screenToWorldPoint(position: Vector2): Vector2 {
        const x = this.screenToWorld(position).add(new Vector2(this.gameObject.transform.position.x, -this.gameObject.transform.position.y)).sub(this.size.clone.scale(0.5));
        return new Vector2(x.x, -x.y);
    }

    /**
     * 
     * Transforms a world vector into a screen vector.
     *
     */
    public worldToScreen(vector: Vector2) {
        return new Vector2(vector.x * this.resolution.x / this.size.x, vector.y * this.resolution.y / this.size.y);
    }

    /**
     *
     * Transforms a screen vector into a world vector.
     *
     */
    public screenToWorld(vector: Vector2) {
        return new Vector2(vector.x * this.size.x / this.resolution.x, vector.y * this.size.y / this.resolution.y);
    }
    public get AABB(): AABB {
        return new AABB(this.size, new Vector2(this.gameObject.transform.position.x - this.size.x / 2, this.gameObject.transform.position.y - this.size.y / 2));
    }
}