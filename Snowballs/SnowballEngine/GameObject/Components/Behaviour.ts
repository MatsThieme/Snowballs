import { GameTime } from '../../GameTime.js';
import { Input } from '../../Input/Input.js';
import { Collision } from '../../Physics/Collision.js';
import { Scene } from '../../Scene.js';
import { GameObject } from '../GameObject.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';

export abstract class Behaviour extends Component {
    protected input: Input;
    protected readonly scene: Scene;
    public readonly name: string;
    public constructor(gameObject: GameObject) {
        super(gameObject, ComponentType.Behaviour);
        this.input = gameObject.scene.input;
        this.scene = this.gameObject.scene;
        this.name = this.constructor.name;
        this.awake();
        if (this.gameObject.scene.isRunning) this.start();
    }
    protected awake(): void { }
    public async start(): Promise<void> { }
    public async update(gameTime: GameTime): Promise<void> { }
    public onCollision(collisions: Collision[]): void { }
}