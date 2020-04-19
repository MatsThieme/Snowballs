import { Behaviour, Collision } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from '../Entities/EntityBehaviour.js';

export class LevelUpBehaviour extends Behaviour {
    isBoss: boolean = false;
    onTrigger(collision: Collision) {
        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;
        const stats = otherGO.getComponent<EntityBehaviour>(<any>EntityBehaviour);

        if (stats && stats.isPlayer) {
            stats.level += this.isBoss ? 1 : 0.2;
            this.gameObject.destroy();
        }
    }
}