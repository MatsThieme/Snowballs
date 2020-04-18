import { EnergyBoostPrefab } from '../../../../Prefabs/Scene/Items/EnergyBoostPrefab.js';
import { HealthBoostPrefab } from '../../../../Prefabs/Scene/Items/HealthBoostPrefab.js';
import { LevelUpPrefab } from '../../../../Prefabs/Scene/Items/LevelUpPrefab.js';
import { EnemyBehaviour } from '../EnemyBehaviour.js';

export abstract class WeakEnemyBehaviour extends EnemyBehaviour {
    protected abstract attackType: 'fireball' | 'snowball' | 'beat';
    maxHealth: number = 25;
    maxEnergy: number = 50;
    attackDuration: number = 1000;
    abstract attackRadius: number;
    canSeePlayer: number = 10;
    damage: number = 7;

    async die() {
        const i = ~~(Math.random() * 3);
        if (i === 0) await this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);
        else if (i === 1) await this.scene.newGameObject('HealthBoost', HealthBoostPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);
        else if (i === 2) await this.scene.newGameObject('EnergyBoost', EnergyBoostPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);
    }
}