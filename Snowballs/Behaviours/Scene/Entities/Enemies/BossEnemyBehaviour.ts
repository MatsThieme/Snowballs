import { LevelUpPrefab } from '../../../../Prefabs/Scene/Items/LevelUpPrefab.js';
import { AnimatedSprite, asyncTimeout, ComponentType, Vector2 } from '../../../../SnowballEngine/Scene.js';
import { LevelUpBehaviour } from '../../Items/LevelUpBehaviour.js';
import { EnemyBehaviour } from '../EnemyBehaviour.js';

export abstract class BossEnemyBehaviour extends EnemyBehaviour {
    protected abstract attackType: 'fireball' | 'snowball' | 'beat';
    level: number = 2;
    maxHealth: number = 100;
    maxEnergy: number = 100;
    attackDuration: number = 1000;
    abstract attackRadius: number;
    canSeePlayer: number = 10;
    damage: number = 13;
    protected animatedSprite: AnimatedSprite = <AnimatedSprite>this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);


    async die() {
        if (this.viewDirection === -1) this.animatedSprite.activeAnimation = 'death left';
        else if (this.viewDirection === 1) this.animatedSprite.activeAnimation = 'death right';

        this.dying = true;

        await asyncTimeout(1000);

        await this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => {
            gameObject.transform.relativePosition = this.gameObject.transform.position.add(Vector2.left.scale(0.5));
            gameObject.getComponent(LevelUpBehaviour)!.isBoss = true;
        });

        await this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => {
            gameObject.transform.relativePosition = this.gameObject.transform.position.add(Vector2.right.scale(0.5));
            gameObject.getComponent(LevelUpBehaviour)!.isBoss = true;
        });
    }
}