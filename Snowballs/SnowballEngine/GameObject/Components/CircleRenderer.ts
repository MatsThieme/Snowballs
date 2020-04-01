import { Frame } from '../../Camera/Frame.js';
import { Sprite } from '../../Sprite.js';
import { Vector2 } from '../../Vector2.js';
import { GameObject } from '../GameObject.js';
import { CircleCollider } from './CircleCollider.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';


// for debugging
export class CircleRenderer extends Component {
    private canvas: OffscreenCanvas;
    private context: OffscreenCanvasRenderingContext2D;
    private circleCollider: CircleCollider;
    private sprite: Sprite;
    private _position: Vector2;
    private size: Vector2;
    public constructor(gameObject: GameObject) {
        super(gameObject, ComponentType.CircleRenderer);

        this.circleCollider = <CircleCollider>this.gameObject.getComponent<CircleCollider>(ComponentType.CircleCollider);

        this.canvas = new OffscreenCanvas(this.circleCollider.radius * 2 * 100, this.circleCollider.radius * 2 * 100);
        this.context = <OffscreenCanvasRenderingContext2D>this.canvas.getContext('2d');
        this.sprite = new Sprite(this.canvas);

        this.size = new Vector2(this.circleCollider.radius * 2, this.circleCollider.radius * 2);
        this._position = new Vector2();

        setTimeout(() => {
            this.context.fillStyle = '#' + (~~(0xdddddd * Math.random()) + 0x111111).toString(16);
            this.context.translate(0, this.canvas.height);
            this.context.scale(1, -1);

            this.context.beginPath();

            const topLeft = new Vector2(this.circleCollider.position.x - this.circleCollider.radius, this.circleCollider.position.y + this.circleCollider.radius);

            this.size = new Vector2(this.circleCollider.radius * 2, this.circleCollider.radius * 2);
            this._position = new Vector2(topLeft.x, topLeft.y - this.circleCollider.radius * 2).sub(this.gameObject.transform.position).sub(this.circleCollider.align);


            this.context.arc(this.canvas.width / 2, this.canvas.height / 2, this.canvas.height / 2, 0, Math.PI * 2);

            this.context.closePath();
            this.context.fill();

            this.sprite = new Sprite(this.canvas);
        }, 100);
    }
    private get position(): Vector2 {
        return this._position.clone.add(this.circleCollider.position).sub(this.circleCollider.relativePosition);
    }
    public get currentFrame(): Frame | undefined {
        return new Frame(this.position, this.size, this.sprite, this.gameObject.transform.rotation, this.gameObject.drawPriority, 1, this.circleCollider.position);
    }
}