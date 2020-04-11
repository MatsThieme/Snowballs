import { Behaviour, Collision } from '../../../SnowballEngine/Scene.js';
import { EntityStatsBehaviour } from '../../EntityStatsBehaviour.js';
import { Player1Behaviour } from '../Players/Player1Behaviour.js';
import { Player2Behaviour } from '../Players/Player2Behaviour.js';

export class HealthBoostBehaviour extends Behaviour {
    onTrigger(collision: Collision) {
        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;
        const stats = otherGO.getComponent(EntityStatsBehaviour);
        const isPlayer = !!otherGO.getComponent(Player1Behaviour) || !!otherGO.getComponent(Player2Behaviour);
        if (stats && isPlayer) {
            const h = stats.health;
            stats.health += 10;
            if (stats.health === h) return; // ensure that the health boost has an impact on health
            this.gameObject.destroy();
        }
    }
}