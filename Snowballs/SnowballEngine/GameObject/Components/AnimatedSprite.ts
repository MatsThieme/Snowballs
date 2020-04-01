import { Frame } from '../../Camera/Frame.js';
import { GameTime } from '../../GameTime.js';
import { SpriteAnimation } from '../../SpriteAnimation.js';
import { Vector2 } from '../../Vector2.js';
import { AlignH, AlignV } from '../Align.js';
import { Alignable } from '../Alignable.js';
import { Drawable } from '../Drawable.js';
import { GameObject } from '../GameObject.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';

export class AnimatedSprite extends Component implements Drawable, Alignable {
    public spriteAnimations: SpriteAnimation[];
    public msbetweenSwitch: number;
    private _activeAnimation: number;
    public relativePosition: Vector2;
    public size: Vector2;
    public alignH: AlignH;
    public alignV: AlignV;
    public constructor(gameObject: GameObject, spriteAnimations: SpriteAnimation[] = [], relativePosition: Vector2 = new Vector2(), size: Vector2 = new Vector2(1, 1), alignH: AlignH = AlignH.Center, alignV: AlignV = AlignV.Center) {
        super(gameObject, ComponentType.AnimatedSprite);
        this.spriteAnimations = spriteAnimations;
        this.msbetweenSwitch = this._activeAnimation = 0;
        this.relativePosition = relativePosition;
        this.size = size;
        this.alignH = alignH;
        this.alignV = alignV;
    }
    public get currentFrame(): Frame | undefined {
        return new Frame(this.position, this.scaledSize, this.spriteAnimations[this._activeAnimation].currentFrame, this.gameObject.transform.rotation, this.gameObject.drawPriority, 1);
    }
    public update(gameTime: GameTime) {
        if (this.spriteAnimations.length === 0) console.error('spriteAnimations empty, gameObject name:', this.gameObject.name);
        this.spriteAnimations[this._activeAnimation].update(gameTime);
    }
    public set activeAnimation(val: number) {
        this._activeAnimation = val % this.spriteAnimations.length;
        this.spriteAnimations[this._activeAnimation].reset();
    }
    public get scaledSize(): Vector2 {
        return new Vector2(this.size.x * this.gameObject.transform.scale.x, this.size.y * this.gameObject.transform.scale.y);
    }
    public get position() {
        return Vector2.add(this.relativePosition, this.gameObject.transform.position, this.align);
    }
    public get align(): Vector2 {
        return new Vector2(this.alignH === AlignH.Right ? -this.scaledSize.x : this.alignH === AlignH.Center ? -this.scaledSize.x / 2 : 0, this.alignV === AlignV.Top ? -this.scaledSize.y : this.alignV === AlignV.Center ? -this.scaledSize.y / 2 : 0);
    }
}