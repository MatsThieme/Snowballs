import { Behaviour, Collision } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from '../Entities/EntityBehaviour.js';

export class LevelUpBehaviour extends Behaviour {
    onTrigger(collision: Collision) {
        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;
        const stats = otherGO.getComponent<EntityBehaviour>(<any>EntityBehaviour);

        if (stats && stats.isPlayer) {
            stats.level += 0.05;
            this.gameObject.destroy();
        }
    }

}