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
    itemType!: 'LevelUp' | 'HealthBoost' | 'EnergyBoost';

    async die() {
        if (this.itemType === 'LevelUp') await this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);
        else if (this.itemType === 'HealthBoost') await this.scene.newGameObject('HealthBoost', HealthBoostPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);
        else if (this.itemType === 'EnergyBoost') await this.scene.newGameObject('EnergyBoost', EnergyBoostPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);
    }
}