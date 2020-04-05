import { Angle } from '../../Angle.js';
import { Frame } from '../../Camera/Frame.js';
import { clamp } from '../../Helpers.js';
import { AABB } from '../../Physics/AABB.js';
import { PhysicsMaterial } from '../../Physics/PhysicsMaterial.js';
import { Sprite } from '../../Sprite.js';
import { Vector2 } from '../../Vector2.js';
import { Drawable } from '../Drawable.js';
import { GameObject } from '../GameObject.js';
import { Camera } from './Camera.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';

export class TileMap extends Component implements Drawable {
    public tileSize: Vector2;
    public relativePosition: Vector2;
    private tileFrames: Frame[];
    private backgroundFrames: Frame[];
    private _tileMap: (1 | 0)[][];
    public material: PhysicsMaterial;
    public backgroundLayers: { distance: number, sprite: Sprite }[];
    public backgroundMaxDistance: number;
    public constructor(gameObject: GameObject, tileSize: Vector2 = new Vector2(1, 1), relativePosition: Vector2 = new Vector2(), material: PhysicsMaterial = new PhysicsMaterial(), tileMap: string[][] = [], backgroundLayers: { distance: number, sprite: Sprite }[] = [], backgroundMaxDistance: number = 1000) {
        super(gameObject, ComponentType.TileMap);

        this.tileSize = tileSize;
        this.relativePosition = relativePosition;
        this._tileMap = [];
        this.tileFrames = [];
        this.backgroundFrames = [];
        this.tileMap = tileMap;
        this.material = material;

        this.backgroundLayers = backgroundLayers;
        this.backgroundMaxDistance = backgroundMaxDistance;

        backgroundLayers.forEach(b => console.log(b.distance / this.backgroundMaxDistance * 50));
    }
    public get currentFrame(): Frame[] {
        return [...this.tileFrames, ...this.backgroundFrames];
    }

    /**
     * 
     * Initialize the tilemap using a 2D array containing image sources.
     * 
     */
    public set tileMap(val: string[][]) {
        this._tileMap = [];
        this.tileFrames = [];
        const sprites: Map<string, Sprite> = new Map();

        for (let y = 0; y < val.length; y++) {
            this._tileMap[y] = [];
            for (let x = 0; x < val[0].length; x++) {
                if (val[y][x] === '') {
                    this._tileMap[y][x] = 0;
                    continue;
                }
                this._tileMap[y][x] = 1;

                if (!sprites.has(val[y][x])) sprites.set(val[y][x], new Sprite(val[y][x]));

                this.tileFrames.push(new Frame(new Vector2(this.position.x + x, this.position.y + this.tileSize.y * (val.length - y - 1)), this.tileSize, <Sprite>sprites.get(val[y][x]), new Angle(), this.gameObject.drawPriority, 1));
            }
        }
    }

    /**
     * 
     * Calculates positioning of backgrounds for camera.
     * 
     */
    public calculateBackgroundForCamera(camera: Camera) {
        this.backgroundFrames = [];

        const point = camera.gameObject.transform.position;
        this.backgroundLayers.sort((a, b) => b.distance - a.distance);

        for (const b of this.backgroundLayers) {
            const spriteSizeWorld = new Vector2(this.scaledSize.y * b.sprite.canvasImageSource.width / b.sprite.canvasImageSource.height, this.scaledSize.y);
            const position = new Vector2(this.position.x + (point.x - this.position.x) * (clamp(0, this.backgroundMaxDistance, b.distance) / this.backgroundMaxDistance) - spriteSizeWorld.x * 2, this.position.y);

            while (position.x + spriteSizeWorld.x < point.x + camera.size.x / 2 && position.x + spriteSizeWorld.x < this.position.x + this.scaledSize.x) {
                position.x += spriteSizeWorld.x;

                if (position.x + spriteSizeWorld.x > point.x - camera.size.x / 2) {
                    this.backgroundFrames.push(new Frame(position.clone, spriteSizeWorld, b.sprite, new Angle(), this.gameObject.drawPriority, 1));
                }
            }
        }
    }

    /**
     * 
     * Returns an array containing 1s and 0s describing the tiles which can collide.
     * 
     */
    public get collisionMap(): (1 | 0)[][] {
        return this._tileMap;
    }

    public get scaledSize(): Vector2 {
        return new Vector2(this._tileMap.length > 0 ? this._tileMap[0].length : 0, this._tileMap.length).scale(this.tileSize).scale(this.gameObject.transform.relativeScale);
    }

    public get position() {
        return Vector2.add(this.relativePosition, this.gameObject.transform.position);
    }
    public get AABB(): AABB {
        return new AABB(this.scaledSize, this.position);
    }
    public update() { }
}