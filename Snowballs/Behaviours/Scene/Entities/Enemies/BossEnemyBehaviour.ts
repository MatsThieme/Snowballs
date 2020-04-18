import { EnergyBoostPrefab } from '../../../../Prefabs/Scene/Items/EnergyBoostPrefab.js';
import { HealthBoostPrefab } from '../../../../Prefabs/Scene/Items/HealthBoostPrefab.js';
import { LevelUpPrefab } from '../../../../Prefabs/Scene/Items/LevelUpPrefab.js';
import { Vector2, GameTime, AnimatedSprite, ComponentType, asyncTimeout } from '../../../../SnowballEngine/Scene.js';
import { EnergyBoostBehaviour } from '../../Items/EnergyBoostBehaviour.js';
import { HealthBoostBehaviour } from '../../Items/HealthBoostBehaviour.js';
import { LevelUpBehaviour } from '../../Items/LevelUpBehaviour.js';
import { EnemyBehaviour } from '../EnemyBehaviour.js';

export abstract class BossEnemyBehaviour extends EnemyBehaviour {
    protected abstract attackType: 'fireball' | 'snowball' | 'beat';
    maxHealth: number = 500;
    maxEnergy: number = 500;
    attackDuration: number = 1000;
    abstract attackRadius: number;
    canSeePlayer: number = 10;
    damage: number = 10;
    private animatedSprite: AnimatedSprite = <AnimatedSprite>this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);

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
    }

    async die() {
        if (this.viewDirection === -1) this.animatedSprite.activeAnimation = 'death left';
        else if (this.viewDirection === 1) this.animatedSprite.activeAnimation = 'death right';

        this.animatedSprite.relativePosition.sub(new Vector2(0, this.animatedSprite.scaledSize.y / 4));

        this.dying = true;

        await asyncTimeout(1000);

        let i = ~~(Math.random() * 3);
        if (i === 0) await this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => {
            gameObject.transform.relativePosition = this.gameObject.transform.position.add(Vector2.left.scale(0.5));
            gameObject.getComponent(LevelUpBehaviour)!.isBoss = true;
        });
        else if (i === 1) await this.scene.newGameObject('HealthBoost', HealthBoostPrefab, gameObject => {
            gameObject.transform.relativePosition = this.gameObject.transform.position.add(Vector2.left.scale(0.5));
            gameObject.getComponent(HealthBoostBehaviour)!.isBoss = true;
        });
        else if (i === 2) await this.scene.newGameObject('EnergyBoost', EnergyBoostPrefab, gameObject => {
            gameObject.transform.relativePosition = this.gameObject.transform.position.add(Vector2.left.scale(0.5));
            gameObject.getComponent(EnergyBoostBehaviour)!.isBoss = true;
        });

        i = ~~(Math.random() * 3);
        if (i === 0) await this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => {
            gameObject.transform.relativePosition = this.gameObject.transform.position.add(Vector2.right.scale(0.5));
            gameObject.getComponent(LevelUpBehaviour)!.isBoss = true;
        });
        else if (i === 1) await this.scene.newGameObject('HealthBoost', HealthBoostPrefab, gameObject => {
            gameObject.transform.relativePosition = this.gameObject.transform.position.add(Vector2.right.scale(0.5));
            gameObject.getComponent(HealthBoostBehaviour)!.isBoss = true;
        });
        else if (i === 2) await this.scene.newGameObject('EnergyBoost', EnergyBoostPrefab, gameObject => {
            gameObject.transform.relativePosition = this.gameObject.transform.position.add(Vector2.right.scale(0.5));
            gameObject.getComponent(EnergyBoostBehaviour)!.isBoss = true;
        });
    }
}