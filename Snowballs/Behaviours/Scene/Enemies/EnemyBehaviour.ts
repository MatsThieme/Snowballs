import { LevelUpPrefab } from '../../../Prefabs/Scene/Items/LevelUpPrefab.js';
import { Behaviour } from '../../../SnowballEngine/Scene.js';
import { EntityStatsBehaviour } from '../../EntityStatsBehaviour.js';

export class EnemyBehaviour extends Behaviour {
    private stats!: EntityStatsBehaviour;

    async start() {
        this.stats = <EntityStatsBehaviour>this.gameObject.getComponent(EntityStatsBehaviour);
        setTimeout(() => this.stats.health = 0, 5000);
    }
    async update() {
        if (this.stats.health < 0.01) {
            this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);

            this.gameObject.destroy();
        }
    }
}