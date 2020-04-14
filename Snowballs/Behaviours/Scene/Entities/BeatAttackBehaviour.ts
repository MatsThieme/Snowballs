import { Behaviour, PolygonCollider, PolygonRenderer, Vector2 } from '../../../SnowballEngine/Scene.js';
import { BeatColliderBehaviour } from '../BeatColliderBehaviour.js';

export class BeatAttackBehaviour extends Behaviour {
    damage: number = 10;
    attackDuration: number = 1000;

    attack(direction: Vector2, radius: number) {
        this.scene.newGameObject('beatCollider', gameObject => {
            gameObject.transform.relativeScale = new Vector2(0.1, radius);
            gameObject.transform.relativeRotation = Vector2.up.angleTo(new Vector2(), direction);

            gameObject.addComponent(PolygonCollider);
            gameObject.addComponent(PolygonRenderer);

            gameObject.addComponent(BeatColliderBehaviour, beatColliderBehaviour => {
                beatColliderBehaviour.damage = this.damage;
                beatColliderBehaviour.attackDuration = this.attackDuration;
            });
        });
    }
}