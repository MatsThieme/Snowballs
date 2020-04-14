import { CircleCollider, CircleRenderer, Vector2, Behaviour, Texture, Sprite } from '../../../SnowballEngine/Scene.js';
import { ThrowableBehaviour } from '../ThrowableBehaviour.js';
import { EntityBehaviour } from './EntityBehaviour.js';

export class ThrowAttackBehaviour extends Behaviour {
    damage: number = 10;
    attackDuration: number = 1000;
    private attackStart: number = 0;
    private entityStats!: EntityBehaviour;
    ball: 'fire' | 'ice' = 'fire';

    async start() {
        this.entityStats = <EntityBehaviour>this.gameObject.getComponent(EntityBehaviour);
    }
    async attack(direction: Vector2) {
        if (this.isAttacking) return;

        this.entityStats.attack(this.damage);

        this.attackStart = performance.now();

        await this.scene.newGameObject(this.ball, async gameObject => {
            const circleCollider = await gameObject.addComponent(CircleCollider, circleCollider => {
                circleCollider.radius = 0.15;
                circleCollider.isTrigger = true;
                circleCollider.density = 10;
            });

            await gameObject.addComponent(Texture, texture => {
                texture.size = circleCollider.AABB.size;
                texture.sprite = new Sprite('Images/Items/snowball.png');
            });

            await gameObject.addComponent(ThrowableBehaviour, throwableBehaviour => {
                throwableBehaviour.damage = this.damage;
            });

            gameObject.rigidbody.useAutoMass = true;
            gameObject.rigidbody.applyImpulse(new Vector2(4, 2));

            gameObject.transform.relativePosition = this.gameObject.transform.position;
        });
    }
    get isAttacking(): boolean {
        return performance.now() < this.attackStart + this.attackDuration;
    }
}