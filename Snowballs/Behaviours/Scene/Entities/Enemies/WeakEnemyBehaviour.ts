import { EnemyBehaviour } from '../EnemyBehaviour.js';

export class WeakEnemyBehaviour extends EnemyBehaviour {
    protected attackType: "fireball" | "snowball" | "beat" = 'beat';
    maxHealth: number = 25;
    maxEnergy: number = 100;
    attackDuration: number = 700;
    attackRadius: number = 1;
    damage: number = 10;
}