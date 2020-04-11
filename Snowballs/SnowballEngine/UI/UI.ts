import { ClientInfo } from '../ClientInfo.js';
import { GameTime } from '../GameTime.js';
import { Input } from '../Input/Input.js';
import { AABB } from '../Physics/AABB.js';
import { Scene } from '../Scene.js';
import { Sprite } from '../Sprite.js';
import { Vector2 } from '../Vector2.js';
import { UIFrame } from './UIFrame.js';
import { UIMenu } from './UIMenu.js';

export class UI {
    public menus: { [key: string]: UIMenu };
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
    public constructor(input: Input, scene: Scene) {
        this.menus = {};
        this.input = input;
        this.canvas = new OffscreenCanvas(scene.domElement.width, scene.domElement.height);
        this.context = <OffscreenCanvasRenderingContext2D>this.canvas.getContext('2d');
        this.scene = scene;
        this.updates = [];
        this.navigationHistory = [];
        this.lastMenusState = [];
    }

    /**
     * 
     * Add a new menu to the ui.
     * 
     */
    public async addMenu(name: string, ...cb: ((menu: UIMenu, scene: Scene) => void | Promise<void>)[]): Promise<UIMenu> {
        if (this.menus[name]) {
            const menu = this.menus[name];
            if (cb) cb.forEach(cb => cb(menu, this.scene));
            return menu;
        }

        const menu = new UIMenu(this.input, this.scene);
        this.menus[name] = menu;

        if (cb) {
            for (const c of cb) {
                await c(menu, this.scene);
            }
        }

        return menu;
    }

    /**
     * 
     * Draw this.menus to canvas.
     *
     */
    public async update(gameTime: GameTime): Promise<void> {
        this.canvas.width = this.scene.domElement.width;
        this.canvas.height = this.scene.domElement.height;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const u of this.updates) {
            await u(gameTime);
        }

        for (const menu of Object.values(this.menus)) {
            if (menu.active) {
                menu.update(gameTime);
                //this.context.strokeRect(menu.aabb.position.x, menu.aabb.position.y, menu.aabb.size.x, menu.aabb.size.y);
                this.context.drawImage(menu.currentFrame.sprite.canvasImageSource, menu.aabb.position.x, menu.aabb.position.y, menu.aabb.size.x, menu.aabb.size.y);
            }
        }

        let l;
        if (this.lastMenusState.length > 0) {
            l = Object.entries(this.menus);

            for (let i = 0; i < l.length; i++) {
                if (l[i][1].active && l[i][1].active !== this.lastMenusState[i] && (this.navigationHistory[0] || '') !== l[i][0]) {
                    this.navigationHistory.unshift(l[i][0]);
                }
            }

            if (this.navigationHistory.length > 100) this.navigationHistory.splice(100);

            l = l.map(e => e[1].active);
        }

        this.lastMenusState = l || Object.entries(this.menus).map(e => e[1].active);
    }

    /**
     * 
     * Returns the current frame of this.
     * 
     */
    public get currentFrame(): UIFrame {
        return new UIFrame(new AABB(ClientInfo.resolution, new Vector2()), new Sprite(this.canvas));
    }

    /**
     *
     * Returns true if a menu has the pauseScene property set to true.
     * 
     */
    public get pauseScene(): boolean {
        return [...Object.values(this.menus)].findIndex(m => m.active && m.pauseScene) !== -1;
    }
}