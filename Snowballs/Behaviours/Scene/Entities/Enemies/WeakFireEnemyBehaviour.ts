import { WeakEnemyBehaviour } from './WeakEnemyBehaviour.js';

export class WeakFireEnemyBehaviour extends WeakEnemyBehaviour {
    attackRadius: number = 4.5;
    protected attackType: 'fireball' | 'snowball' | 'beat' = 'fireball';
}