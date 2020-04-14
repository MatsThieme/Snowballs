import { Behaviour, Collision } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from '../Entities/EntityBehaviour.js';
import { Player1Behaviour } from '../Entities/Players/Player1Behaviour.js';
import { Player2Behaviour } from '../Entities/Players/Player2Behaviour.js';

export class LevelUpBehaviour extends Behaviour {
    onTrigger(collision: Collision) {
        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;
        const stats = otherGO.getComponent(EntityBehaviour);
        const isPlayer = !!otherGO.getComponent(Player1Behaviour) || !!otherGO.getComponent(Player2Behaviour);
        if (stats && isPlayer) {
            stats.level += 0.05;
            this.gameObject.destroy();
        }
    }
}