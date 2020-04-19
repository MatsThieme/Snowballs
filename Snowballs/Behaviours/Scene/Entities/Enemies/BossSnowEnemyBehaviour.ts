import { BossEnemyBehaviour } from './BossEnemyBehaviour.js';
import { GameTime } from '../../../../SnowballEngine/Scene.js';

export class BossSnowEnemyBehaviour extends BossEnemyBehaviour {
    attackRadius: number = 4;
    canSeePlayer: number = 4;
    protected attackType: 'fireball' | 'snowball' | 'beat' = 'beat';

    async update(gameTime: GameTime) {
        await super.update(gameTime);

        if (this.health === 0) return;

        if (this.isAttacking) {
            if (this.animatedSprite.activeAnimation !== 'attack left' && this.viewDirection === -1) this.animatedSprite.activeAnimation = 'attack left';
            else if (this.animatedSprite.activeAnimation !== 'attack right' && this.viewDirection === 1) this.animatedSprite.activeAnimation = 'attack right';
        } else if (this.gameObject.rigidbody.velocity.y > 0) {
            if (this.animatedSprite.activeAnimation !== 'jump left' && this.viewDirection === -1) this.animatedSprite.activeAnimation = 'jump left';
            else if (this.animatedSprite.activeAnimation !== 'jump right' && this.viewDirection === 1) this.animatedSprite.activeAnimation = 'jump right';
        } else {
            if (this.animatedSprite.activeAnimation !== 'idle left' && this.viewDirection === -1) this.animatedSprite.activeAnimation = 'idle left';
            else if (this.animatedSprite.activeAnimation !== 'idle right' && this.viewDirection === 1) this.animatedSprite.activeAnimation = 'idle right';
        }
    }
}