import { GameTime } from '../GameTime.js';
import { Input } from '../Input/Input.js';
import { AABB } from '../Physics/AABB.js';
import { Scene } from '../Scene.js';
import { Sprite } from '../Sprite.js';
import { Vector2 } from '../Vector2.js';
import { UIFrame } from './UIFrame.js';
import { UIMenu } from './UIMenu.js';

export class UI {
    private menus: Map<string, UIMenu>;
    private input: Input;
    private canvas: OffscreenCanvas;
    private context: OffscreenCanvasRenderingContext2D;
    public aabb: AABB;
    private scene: Scene;
    public constructor(input: Input, scene: Scene) {
        this.menus = new Map();
        this.input = input;
        this.aabb = new AABB(new Vector2(), new Vector2());
        this.canvas = new OffscreenCanvas(scene.domElement.width, scene.domElement.height);
        this.context = <OffscreenCanvasRenderingContext2D>this.canvas.getContext('2d');
        this.scene = scene;
    }

    /**
     * 
     * Add a new menu to the ui.
     * 
     */
    public addMenu(name: string, ...cb: ((menu: UIMenu, scene: Scene) => any)[]): UIMenu {
        if (this.menus.has(name)) {
            const menu = <UIMenu>this.menus.get(name);
            if (cb) cb.forEach(cb => cb(menu, this.scene));
            return menu;
        }

        const menu = new UIMenu(this.input, this.scene);
        this.menus.set(name, menu);

        if (cb) cb.forEach(cb => cb(menu, this.scene));

        return menu;
    }

    /**
     * 
     * Draw this.menus to canvas.
     *
     */
    public update(gameTime: GameTime): void {
        this.canvas.width = this.scene.domElement.width;
        this.canvas.height = this.scene.domElement.height;
        this.aabb = new AABB(new Vector2(this.canvas.width, this.canvas.height), new Vector2());

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const menu of this.menus.values()) {
            if (menu.active) {
                menu.update(gameTime);

                this.context.drawImage(menu.currentFrame.sprite.canvasImageSource, menu.aabb.position.x, menu.aabb.position.y, menu.aabb.size.x, menu.aabb.size.y);
            }
        }
    }

    /**
     * 
     * Returns the current frame of this.
     * 
     */
    public get currentFrame(): UIFrame {
        return new UIFrame(this.aabb, new Sprite(this.canvas));
    }

    /**
     *
     * Returns true if a menu has the pauseScene property set to true.
     * 
     */
    public get pauseScene(): boolean {
        return [...this.menus.values()].findIndex(m => m.active && m.pauseScene) !== -1;
    }
}