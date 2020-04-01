import { Angle } from '../../Angle.js';
import { Frame } from '../../Camera/Frame.js';
import { GameTime } from '../../GameTime.js';
import { Particle } from '../../Particle.js';
import { Sprite } from '../../Sprite.js';
import { SpriteAnimation } from '../../SpriteAnimation.js';
import { Vector2 } from '../../Vector2.js';
import { AlignH, AlignV } from '../Align.js';
import { Drawable } from '../Drawable.js';
import { GameObject } from '../GameObject.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';

export class ParticleSystem extends Component implements Drawable {
    public distance: number;
    public angle: Angle;
    public sprites: (Sprite | SpriteAnimation)[];
    public relativePosition: Vector2;
    public size: Vector2;
    public emission: number;
    public speed: number;
    public rotationSpeed: number;
    private particles: Particle[];
    private timer: number;
    public lifeTime: number;
    public fadeInDuration: number;
    public fadeOutDuration: number;
    public constructor(gameObject: GameObject, distance: number = 1, angle: Angle = new Angle(), sprites: (Sprite | SpriteAnimation)[] = [], emission: number = 100, speed: number = 0, rotationSpeed: number = 1, particleLifeTime: number = 500, fadeInDuration: number = 0, fadeOutDuration: number = 0, relativePosition: Vector2 = new Vector2(), size: Vector2 = new Vector2(1, 1), alignH: AlignH = AlignH.Center, alignV: AlignV = AlignV.Center) {
        super(gameObject, ComponentType.ParticleSystem);
        this.distance = distance;
        this.angle = angle;
        this.sprites = sprites;
        this.relativePosition = relativePosition;
        this.size = size;
        this.emission = emission;
        this.speed = speed;
        this.rotationSpeed = rotationSpeed;
        this.lifeTime = particleLifeTime;

        this.particles = [];
        this.timer = 0;

        this.fadeInDuration = fadeInDuration;
        this.fadeOutDuration = fadeOutDuration;
    }
    public get currentFrame(): Frame[] {
        return this.particles.map(p => p.currentFrame);
    }
    public update(gameTime: GameTime) {
        this.timer += gameTime.deltaTime;

        if (this.timer >= this.emission) {
            this.particles.push(new Particle(this, this.sprites[~~(Math.random() * this.sprites.length)], new Angle(Math.random() * this.angle.radian + this.gameObject.transform.rotation.radian).toVector2().scale(this.speed)));
            this.timer %= this.emission;
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(gameTime);
            if (this.particles[i].startTime + this.lifeTime < gameTime.now) this.particles.splice(i, 1);
        }
    }
    public get scaledSize(): Vector2 {
        return new Vector2(this.size.x * this.gameObject.transform.scale.x, this.size.y * this.gameObject.transform.scale.y);
    }
    public get position() {
        return Vector2.add(this.relativePosition, this.gameObject.transform.position);
    }
}