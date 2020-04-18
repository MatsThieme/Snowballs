import { Behaviour, Collision } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from '../Entities/EntityBehaviour.js';

export class HealthBoostBehaviour extends Behaviour {
    isBoss: boolean = false;

    onTrigger(collision: Collision) {
        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;
        const stats = otherGO.getComponent<EntityBehaviour>(<any>EntityBehaviour);

        if (stats && stats?.isPlayer) {
            const h = stats.health;
            stats.health += this.isBoss ? 100 : 10;
            if (stats.health === h) return; // ensure that the health boost had an impact on health before destroying
            this.gameObject.destroy();
        }
    }
}