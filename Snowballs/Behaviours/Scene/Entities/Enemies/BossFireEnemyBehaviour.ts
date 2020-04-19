import { BossEnemyBehaviour } from './BossEnemyBehaviour.js';
import { GameTime, Vector2 } from '../../../../SnowballEngine/Scene.js';

export class BossFireEnemyBehaviour extends BossEnemyBehaviour {
    level: number = 4;
    attackRadius: number = 6;
    initialRadius: number = 6;
    protected attackType: 'fireball' | 'snowball' | 'beat' = 'fireball';

    async update(gameTime: GameTime) {
        await super.update(gameTime);

        if (this.health === 0) return;

        if (this.isAttacking && this.attackType === 'fireball') {
            if (this.animatedSprite.activeAnimation !== 'attack far left' && this.viewDirection === -1) this.animatedSprite.activeAnimation = 'attack far left';
            else if (this.animatedSprite.activeAnimation !== 'attack far right' && this.viewDirection === 1) this.animatedSprite.activeAnimation = 'attack far right';
        } else if (this.isAttacking && this.attackType === 'beat') {
            if (this.animatedSprite.activeAnimation !== 'attack close left' && this.viewDirection === -1) this.animatedSprite.activeAnimation = 'attack close left';
            else if (this.animatedSprite.activeAnimation !== 'attack close right' && this.viewDirection === 1) this.animatedSprite.activeAnimation = 'attack close right';
        } else if (this.gameObject.rigidbody.velocity.y > 0) {
            if (this.animatedSprite.activeAnimation !== 'jump left' && this.viewDirection === -1) this.animatedSprite.activeAnimation = 'jump left';
            else if (this.animatedSprite.activeAnimation !== 'jump right' && this.viewDirection === 1) this.animatedSprite.activeAnimation = 'jump right';
        } else {
            if (this.animatedSprite.activeAnimation !== 'idle left' && this.viewDirection === -1) this.animatedSprite.activeAnimation = 'idle left';
            else if (this.animatedSprite.activeAnimation !== 'idle right' && this.viewDirection === 1) this.animatedSprite.activeAnimation = 'idle right';
        }


        const p1 = this.scene.find('Player1');
        const p2 = this.scene.find('Player2');

        const p1Dist = p1 ? this.gameObject.transform.position.distance(p1.transform.position.sub(new Vector2(0, p1.collider[0].AABB.size.y / 2))) : this.canSeePlayer + 1;
        const p2Dist = p2 ? this.gameObject.transform.position.distance(p2.transform.position.sub(new Vector2(0, p2.collider[0].AABB.size.y / 2))) : this.canSeePlayer + 1;


        if (Math.min(p1Dist, p2Dist) < this.initialRadius / 2) {
            this.attackType = 'beat';
            this.attackRadius = this.initialRadius / 2;
        } else {
            this.attackType = 'fireball';
            this.attackRadius = this.initialRadius;
        }
    }
}