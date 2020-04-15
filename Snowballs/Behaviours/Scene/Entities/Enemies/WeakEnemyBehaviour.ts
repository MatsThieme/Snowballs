import { LevelUpPrefab } from '../../../../Prefabs/Scene/Items/LevelUpPrefab.js';
import { EnemyBehaviour } from '../EnemyBehaviour.js';

export class WeakEnemyBehaviour extends EnemyBehaviour {
    protected attackType: "fireball" | "snowball" | "beat" = 'beat';
    maxHealth: number = 25;
    maxEnergy: number = 10;
    attackDuration: number = 1000;
    attackRadius: number = 1;
    damage: number = 1;
    async die() {
        await this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);
    }
}