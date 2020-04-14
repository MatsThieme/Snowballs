import { AnimatedSprite, Camera, ComponentType, GameTime, PolygonCollider, Vector2 } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from './EntityBehaviour.js';

export abstract class PlayerBehaviour extends EntityBehaviour {
    maxHealth: number = 100;
    healthRegeneration: number = 0.0001;
    maxEnergy: number = 100;
    energyRegeneration: number = 0.0001;
    damage: number = 10;
    abstract attackDuration: number;
    attackRadius: number = 2;
    isPlayer: boolean = true;

    protected abstract attackType: 'fireball' | 'snowball' | 'beat';
    protected colliding: boolean = false;
    private gameTime!: GameTime;
    private animatedSprite: AnimatedSprite = <AnimatedSprite>this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);

    async update(gameTime: GameTime) {
        this.colliding = false;
        this.gameTime = gameTime;

        const camera = this.scene.find('Camera')?.getComponent<Camera>(ComponentType.Camera);
        const collider = this.gameObject.getComponent<PolygonCollider>(ComponentType.PolygonCollider);

        if (!camera || !collider) return;

        // stay in camera aabb
        if (this.gameObject.transform.position.x - collider.scaledSize.x / 2 < camera.gameObject.transform.position.x - camera.size.x / 2) this.gameObject.transform.relativePosition.x = camera.gameObject.transform.position.x - camera.size.x / 2 + collider.scaledSize.x / 2;
        else if (this.gameObject.transform.position.x + collider.scaledSize.x / 2 > camera.gameObject.transform.position.x + camera.size.x / 2) this.gameObject.transform.relativePosition.x = camera.gameObject.transform.position.x + camera.size.x / 2 - collider.scaledSize.x / 2;
    }
    run(x: number) {
        this.gameObject.rigidbody.force.add(new Vector2(x, 0));
        if (this.gameObject.rigidbody.velocity.x > 0 && this.animatedSprite.activeAnimation !== 'run right') this.animatedSprite.activeAnimation = 'run right';
        else if (this.gameObject.rigidbody.velocity.x < 0 && this.animatedSprite.activeAnimation !== 'run left') this.animatedSprite.activeAnimation = 'run left';
    }
    jump() {
        this.gameObject.rigidbody.applyImpulse(new Vector2(0, 5));
        //this.animatedSprite.activeAnimation = 'jump';
    }
    idle() {
        this.gameObject.rigidbody.velocity.x *= this.gameTime.deltaTime / 50;
        if (this.animatedSprite.activeAnimation !== 'idle') this.animatedSprite.activeAnimation = 'idle';
    }
    async attack(direction: Vector2) {
        await super.attack(direction);
        if (this.animatedSprite.activeAnimation !== 'attack') this.animatedSprite.activeAnimation = 'attack';
    }
    async die() {
        console.log('dead');
    }
}