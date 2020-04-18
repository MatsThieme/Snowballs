import { GameTime } from '../GameTime.js';
import { Input } from '../Input/Input.js';
import { AABB } from '../Physics/AABB.js';
import { Scene } from '../Scene.js';
import { Sprite } from '../Sprite.js';
import { Vector2 } from '../Vector2.js';
import { UIFrame } from './UIFrame.js';
import { UIMenu } from './UIMenu.js';

export class UI {
    public menus: Map<string, UIMenu>;
    /**
     * 
     * Array of functions to execute every frame.
     * 
     */
    public updates: ((gameTime: GameTime) => void | Promise<void>)[];
    private input: Input;
    private canvas: OffscreenCanvas;
    private context: OffscreenCanvasRenderingContext2D;
    private scene: Scene;
    public navigationHistory: string[];
    private lastMenusState: boolean[];
    public navigationHistoryMaxSize: number;
    public constructor(input: Input, scene: Scene) {
        this.menus = new Map();
        this.input = input;
        this.canvas = new OffscreenCanvas(scene.domElement.width, scene.domElement.height);
        this.context = <OffscreenCanvasRenderingContext2D>this.canvas.getContext('2d');
        this.scene = scene;
        this.updates = [];
        this.navigationHistory = [];
        this.lastMenusState = [];
        this.navigationHistoryMaxSize = 10;
    }

    /**
     * 
     * Add a new menu to the ui.
     * 
     */
    public async addMenu(name: string, ...cb: ((menu: UIMenu, scene: Scene) => void | Promise<void>)[]): Promise<UIMenu> {
        if (this.menus.has(name)) {
            const menu = this.menus.get(name)!;
            if (cb) cb.forEach(cb => cb(menu, this.scene));
            return menu;
        }

        const menu = new UIMenu(this.input, this.scene);
        this.menus.set(name, menu);

        if (cb) {
            for (const c of cb) {
                await c(menu, this.scene);
            }
        }

        return menu;
    }

    /**
     * 
     * Return menu of specified name if present.
     * 
     */
    public menu(name: string): UIMenu | undefined {
        return this.menus.get(name);
    }

    /**
     * 
     * Draw this.menus to canvas.
     *
     */
    public async update(gameTime: GameTime): Promise<void> {
        if (this.canvas.width !== this.scene.domElement.width) this.canvas.width = this.scene.domElement.width;
        if (this.canvas.height !== this.scene.domElement.height) this.canvas.height = this.scene.domElement.height;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const u of this.updates) {
            await u(gameTime);
        }

        for (const menu of this.menus.values()) {
            if (menu.active) {
                menu.update(gameTime);
                if (menu.currentFrame.sprite.canvasImageSource.width > 0 && menu.currentFrame.sprite.canvasImageSource.height > 0) this.context.drawImage(menu.currentFrame.sprite.canvasImageSource, Math.round(menu.aabb.position.x * this.scene.domElement.width / 100), Math.round(menu.aabb.position.y * this.scene.domElement.height / 100), Math.round(menu.aabb.size.x * this.scene.domElement.width / 100), Math.round(menu.aabb.size.y * this.scene.domElement.height / 100));
            }
        }

        let l;
        if (this.lastMenusState.length > 0) {
            l = [...this.menus.entries()];

            for (let i = 0; i < l.length; i++) {
                if (l[i][1].active && l[i][1].active !== this.lastMenusState[i] && (this.navigationHistory[0] || '') !== l[i][0]) {
                    this.navigationHistory.unshift(l[i][0]);
                }
            }

            if (this.navigationHistory.length > this.navigationHistoryMaxSize) this.navigationHistory.splice(this.navigationHistoryMaxSize);

            l = l.map(e => e[1].active);
        }

        this.lastMenusState = l || [...this.menus.values()].map(e => e.active);
    }

    /**
     * 
     * Returns the current frame of this.
     * 
     */
    public get currentFrame(): UIFrame {
        return new UIFrame(new AABB(new Vector2(this.scene.domElement.width, this.scene.domElement.height), new Vector2()), new Sprite(this.canvas));
    }

    /**
     *
     * Returns true if a menu has the pauseScene property set to true.
     * 
     */
    public get pauseScene(): boolean {
        return [...this.menus.values()].some(m => m.active && m.pauseScene);
    }
}