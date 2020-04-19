import { AnimatedSprite, Camera, ComponentType, GameTime, PolygonCollider, Vector2 } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from './EntityBehaviour.js';

export abstract class PlayerBehaviour extends EntityBehaviour {
    maxHealth: number = 100;
    healthRegeneration: number = 0.0005;
    maxEnergy: number = 100;
    energyRegeneration: number = 0.0005;
    damage: number = 10;
    attackRadius: number = 1;
    isPlayer: boolean = true;

    protected viewDirection: -1 | 1 = 1;

    protected colliding: boolean = false;
    private gameTime!: GameTime;
    private animatedSprite: AnimatedSprite = <AnimatedSprite>this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);

    async update(gameTime: GameTime) {
        await super.update(gameTime);

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
        if (this.viewDirection === 1 && this.animatedSprite.activeAnimation !== 'run right' && !this.isAttacking) this.animatedSprite.activeAnimation = 'run right';
        else if (this.viewDirection === -1 && this.animatedSprite.activeAnimation !== 'run left' && !this.isAttacking) this.animatedSprite.activeAnimation = 'run left';
    }
    jump() {
        if (this.animatedSprite.activeAnimation !== 'jump left' && this.viewDirection === -1 && !this.isAttacking) this.animatedSprite.activeAnimation = 'jump left';
        else if (this.animatedSprite.activeAnimation !== 'jump right' && this.viewDirection === 1 && !this.isAttacking) this.animatedSprite.activeAnimation = 'jump right';
    }
    idle() {
        this.gameObject.rigidbody.velocity.x *= this.gameTime.deltaTime / 50;
        if (this.animatedSprite.activeAnimation !== 'idle left' && this.viewDirection === -1 && !this.isAttacking) this.animatedSprite.activeAnimation = 'idle left';
        else if (this.animatedSprite.activeAnimation !== 'idle right' && this.viewDirection === 1 && !this.isAttacking) this.animatedSprite.activeAnimation = 'idle right';
    }
    async attack(direction: Vector2) {
        await super.attack(direction);

        if (this.animatedSprite.activeAnimation !== 'attack left' && this.viewDirection === -1 && this.isAttacking) this.animatedSprite.activeAnimation = 'attack left';
        else if (this.animatedSprite.activeAnimation !== 'attack right' && this.viewDirection === 1 && this.isAttacking) this.animatedSprite.activeAnimation = 'attack right';
    }
    async die() {
        alert(`${this.gameObject.name} died`);
        location.reload();
    }
}