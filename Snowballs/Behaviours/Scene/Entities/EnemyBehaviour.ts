import { LevelUpPrefab } from '../../../Prefabs/Scene/Items/LevelUpPrefab.js';
import { clamp, Collision, ComponentType, GameTime, TileMap, Vector2 } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from './EntityBehaviour.js';

export abstract class EnemyBehaviour extends EntityBehaviour {
    protected abstract attackType: 'fireball' | 'snowball' | 'beat';
    abstract maxHealth: number;
    healthRegeneration: number = 0.0001;
    abstract maxEnergy: number;
    energyRegeneration: number = 0.0001;
    abstract attackDuration: number;
    abstract attackRadius: number;
    abstract damage: number;

    isPlayer: boolean = false;
    private canSeePlayer: number = 7;
    private tileMap!: TileMap;
    private grounded: boolean = false;
    private colliderSize!: Vector2;

    async start() {
        await super.start();
        this.tileMap = <TileMap>this.scene.find('Level')!.getComponent<TileMap>(ComponentType.TileMap);
        this.colliderSize = this.gameObject.collider[0].AABB.size;
    }
    async update(gameTime: GameTime) {
        await super.update(gameTime);

        const p1 = this.scene.find('Player1');
        const p2 = this.scene.find('Player2');

        if (!p1 || !p2) return;

        const p1Dist = this.gameObject.transform.position.distance(p1.transform.position.sub(new Vector2(0, p1.collider[0].AABB.size.y / 2)));
        const p2Dist = this.gameObject.transform.position.distance(p2.transform.position.sub(new Vector2(0, p2.collider[0].AABB.size.y / 2)));

        if (p1Dist < this.attackRadius * this.colliderSize.y && p1Dist <= p2Dist && !this.isAttacking) {
            await this.attack(this.gameObject.transform.position.sub(p1.transform.position));
        } else if (p2Dist < this.attackRadius * this.colliderSize.y && p2Dist < p1Dist && !this.isAttacking) {
            await this.attack(this.gameObject.transform.position.sub(p2.transform.position));
        } else if (p1Dist < this.canSeePlayer * this.colliderSize.y && p1Dist <= p2Dist && !this.isAttacking) {
            this.walkTowards(p1.transform.position, gameTime.deltaTime);
        } else if (p2Dist < this.canSeePlayer * this.colliderSize.y && p2Dist < p1Dist && !this.isAttacking) {
            this.walkTowards(p2.transform.position, gameTime.deltaTime);
        } else if (!this.isAttacking) this.idle(gameTime.deltaTime);
    }
    onColliding(collision: Collision) {
        this.grounded = true;
    }
    walkTowards(pos: Vector2, dt: number) {
        const dir = Math.sign(pos.x - this.gameObject.transform.position.x);
        if (pos.distance(this.gameObject.transform.position) > 0.1) {
            this.gameObject.rigidbody.force.add(new Vector2(0.0001 * dt * dir, 0));
        } else this.gameObject.rigidbody.velocity.x *= dt / 50;

        this.gameObject.rigidbody.velocity.x = clamp(-2, 2, this.gameObject.rigidbody.velocity.x);


        const posOnTileMap = this.tileMap.pointToTilemapSpace(this.gameObject.transform.position);
        const left = this.tileMap.pointToTilemapSpace(this.gameObject.transform.position.clone.sub(new Vector2(this.gameObject.collider[0].AABB.size.x / 2, 0)));
        const right = this.tileMap.pointToTilemapSpace(this.gameObject.transform.position.clone.add(new Vector2(this.gameObject.collider[0].AABB.size.x / 2, 0)));

        if (left.x < 0 || posOnTileMap.y < 0 || right.x >= this.tileMap.collisionMap[0].length || posOnTileMap.y >= this.tileMap.collisionMap.length) return;

        if (this.grounded && Math.abs(this.gameObject.rigidbody.velocity.x) > 0.01) {
            if (right.x + 1 < this.tileMap.collisionMap[0].length && this.tileMap.collisionMap[posOnTileMap.y][posOnTileMap.x + 1] === 1 || left.x - 1 > 0 && this.tileMap.collisionMap[posOnTileMap.y][posOnTileMap.x - 1] === 1) {
                this.gameObject.rigidbody.applyImpulse(new Vector2(0, 0.2));
                this.grounded = false;
            }
        }
    }
    idle(dt: number) {
        this.gameObject.rigidbody.velocity.x *= dt / 50;
    }
    async die() {
        await this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);
    }
}