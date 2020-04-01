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
    }
    public get currentFrame(): CanvasImageSource {
        return this.canvas;
    }
    public update(frames: Frame[]) {
        this.canvas.width = this.resolution.x;
        this.canvas.height = this.resolution.y;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const frame of frames) {
            if (this.AABBInCamera(new AABB(frame.size, frame.worldCordinates))) {
                const frameSize = this.worldToScreen(frame.size);
                const framePos = this.worldToScreenPoint(frame.worldCordinates).sub(new Vector2(0, frameSize.y));
                let rotationPoint;
                if (frame.rotationPoint) rotationPoint = this.worldToScreenPoint(frame.rotationPoint);
                if (!rotationPoint) rotationPoint = new Vector2(framePos.x + frameSize.x / 2, framePos.y + frameSize.y / 2);

                this.context.save();

                this.context.translate(rotationPoint.x, rotationPoint.y);

                this.context.rotate(frame.rotation.radian);

                this.context.translate(-rotationPoint.x, -rotationPoint.y);

                this.context.globalAlpha = frame.alpha;

                this.context.drawImage(frame.sprite.canvasImageSource, framePos.x, framePos.y, frameSize.x, frameSize.y);

                this.context.restore();
            }
        }
    }
    public AABBInCamera(rect: AABB): boolean {
        return rect.screenSpaceIntersects(this.AABB);
    }
    public worldToScreenPoint(position: Vector2): Vector2 {
        const localPosition = new Vector2(position.x, -position.y).sub(new Vector2(this.gameObject.transform.position.x, -this.gameObject.transform.position.y)).add(this.size.clone.scale(0.5));

        return this.worldToScreen(localPosition);
    }
    public screenToWorldPoint(position: Vector2): Vector2 {
        const x = this.screenToWorld(position).add(new Vector2(this.gameObject.transform.position.x, -this.gameObject.transform.position.y)).sub(this.size.clone.scale(0.5));
        return new Vector2(x.x, -x.y);
    }
    public worldToScreen(vector: Vector2) {
        return new Vector2(vector.x * this.resolution.x / this.size.x, vector.y * this.resolution.y / this.size.y);
    }
    public screenToWorld(vector: Vector2) {
        return new Vector2(vector.x * this.size.x / this.resolution.x, vector.y * this.size.y / this.resolution.y);
    }
    private get AABB(): AABB {
        return new AABB(this.size, new Vector2(this.gameObject.transform.position.x - this.size.x / 2, this.gameObject.transform.position.y - this.size.y / 2));
    }
}