import { GameTime } from '../GameTime.js';
import { Input } from '../Input/Input.js';
import { AABB } from '../Physics/AABB.js';
import { Scene } from '../Scene.js';
import { Sprite } from '../Sprite.js';
import { Vector2 } from '../Vector2.js';
import { UIElement } from './UIElements/UIElement.js';
import { UIFont } from './UIFont.js';
import { UIFrame } from './UIFrame.js';

export class UIMenu {
    /**
     * 
     * if true the menu is visible and responsive to user interaction.
     * 
     */
    public active: boolean;

    /**
     * 
     * if true and this.active the scene will be paused.
     * 
     */
    public pauseScene: boolean;

    /**
     *
     * Set priority in drawing queue.
     * 
     */
    public drawPriority: number;
    private uiElements: Map<number, UIElement>;
    public aabb: AABB;
    private input: Input;
    private canvas: OffscreenCanvas;
    private context: OffscreenCanvasRenderingContext2D;
    public font: UIFont;
    public background?: Sprite;
    private frame!: UIFrame;
    private scene: Scene;
    public constructor(input: Input, scene: Scene) {
        this.active = false;
        this.pauseScene = true;
        this.drawPriority = 0;
        this.uiElements = new Map();
        this.aabb = new AABB(new Vector2(1920, 1080), new Vector2(0, 0));
        this.input = input;
        this.scene = scene;

        this.canvas = new OffscreenCanvas(this.aabb.size.x, this.aabb.size.y);
        this.context = <OffscreenCanvasRenderingContext2D>this.canvas.getContext('2d');

        this.font = new UIFont(this);
    }

    /**
     * 
     * Add a UIElement to this. The newly created UIElement can be adjusted within the callback.
     * 
     */
    public addUIElement<T extends UIElement>(type: new (menu: UIMenu, input: Input) => T, ...cb: ((uiElement: T, scene: Scene) => any)[]): T {
        const e = new type(this, this.input);
        this.uiElements.set(e.id, e);
        if (cb) cb.forEach(cb => cb(e, this.scene));
        e.draw();
        return e;
    }

    /**
     * 
     * Removes the UIElement with the given id if present.
     * 
     */
    public removeUIElement(id: number): void {
        this.uiElements.delete(id);
    }

    /**
     *
     * Returns the current UIFrame.
     * 
     */
    public get currentFrame(): UIFrame {
        return this.frame;
    }

    /**
     * 
     * Adjusts canvas size to AABB and draws UIElements to it.
     * 
     */
    public update(gameTime: GameTime): void {
        this.canvas.width = this.aabb.size.x;
        this.canvas.height = this.aabb.size.y;

        if (this.background) this.context.drawImage(this.background.canvasImageSource, 0, 0, this.background.canvasImageSource.width, this.background.canvasImageSource.height);
        else this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const uiElement of [...this.uiElements.values()]) {
            uiElement.update(gameTime);

            const { sprite, aabb } = uiElement.currentFrame;
            this.context.drawImage(sprite.canvasImageSource, aabb.position.x, aabb.position.y, aabb.size.x, aabb.size.y);
        }

        this.frame = new UIFrame(this.aabb, new Sprite(this.canvas));
    }
}