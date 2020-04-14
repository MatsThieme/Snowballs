import { Behaviour, Collision } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from '../Entities/EntityBehaviour.js';

export class EnergyBoostBehaviour extends Behaviour {
    onTrigger(collision: Collision) {
        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;
        const stats = otherGO.getComponent<EntityBehaviour>(<any>EntityBehaviour);

        if (stats && stats?.isPlayer) {
            const h = stats.energy;
            stats.energy += 10;
            if (stats.energy === h) return; // ensure that the energy boost had an impact on energy before destroying
            this.gameObject.destroy();
        }
    }
}