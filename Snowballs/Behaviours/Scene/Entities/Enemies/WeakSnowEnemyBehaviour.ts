import { AnimatedSprite, ComponentType, GameTime } from '../../../../SnowballEngine/Scene.js';
import { WeakEnemyBehaviour } from './WeakEnemyBehaviour.js';

export class WeakSnowEnemyBehaviour extends WeakEnemyBehaviour {
    attackRadius: number = 0.7;
    protected attackType: 'fireball' | 'snowball' | 'beat' = 'beat';
    private animatedSprite: AnimatedSprite = <AnimatedSprite>this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);

    async update(gameTime: GameTime) {
        await super.update(gameTime);
        if (this.gameObject.rigidbody.velocity.y > 0) {
            if (this.animatedSprite.activeAnimation !== 'jump left' && this.viewDirection === -1 && !this.isAttacking) this.animatedSprite.activeAnimation = 'jump left';
            else if (this.animatedSprite.activeAnimation !== 'jump right' && this.viewDirection === 1 && !this.isAttacking) this.animatedSprite.activeAnimation = 'jump right';
        } else {
            if (this.animatedSprite.activeAnimation !== 'idle left' && this.viewDirection === -1 && !this.isAttacking) this.animatedSprite.activeAnimation = 'idle left';
            else if (this.animatedSprite.activeAnimation !== 'idle right' && this.viewDirection === 1 && !this.isAttacking) this.animatedSprite.activeAnimation = 'idle right';
        }
    }
}