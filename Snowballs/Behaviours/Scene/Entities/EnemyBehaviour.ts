import { clamp, Collision, ComponentType, GameTime, TileMap, Vector2 } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from './EntityBehaviour.js';

export abstract class EnemyBehaviour extends EntityBehaviour {
    healthRegeneration: number = 0.0005;
    energyRegeneration: number = 0.0005;

    isPlayer: boolean = false;
    protected abstract canSeePlayer: number = 7;
    private tileMap!: TileMap;
    private grounded: boolean = false;
    private colliderSize!: Vector2;
    protected viewDirection: -1 | 1 = 1;

    async start() {
        await super.start();
        this.tileMap = <TileMap>this.scene.find('Level')!.getComponent<TileMap>(ComponentType.TileMap);
        this.colliderSize = this.gameObject.collider[0].AABB.size;
    }
    async update(gameTime: GameTime) {
        await super.update(gameTime);

        const p1 = this.scene.find('Player1');
        const p2 = this.scene.find('Player2');

        const p1ColliderSize = p1?.collider[0].AABB.size;
        const p2ColliderSize = p2?.collider[0].AABB.size;

        const p1Dist = p1 ? this.gameObject.transform.position.distance(p1.transform.position.sub(new Vector2(0, p1.collider[0].AABB.size.y / 2))) : this.canSeePlayer + 1;
        const p2Dist = p2 ? this.gameObject.transform.position.distance(p2.transform.position.sub(new Vector2(0, p2.collider[0].AABB.size.y / 2))) : this.canSeePlayer + 1;

        if (p1Dist < this.attackRadius && p1Dist <= p2Dist && !this.isAttacking && p1 && p1ColliderSize) {
            await this.attack(p1.transform.position.sub(this.gameObject.transform.position));
        } else if (p2Dist < this.attackRadius && p2Dist < p1Dist && !this.isAttacking && p2 && p2ColliderSize) {
            await this.attack(p2.transform.position.sub(this.gameObject.transform.position));
        } else if (p1Dist < this.canSeePlayer && p1Dist <= p2Dist && !this.isAttacking && p1) {
            this.walkTowards(p1.transform.position, gameTime.deltaTime);
        } else if (p2Dist < this.canSeePlayer && p2Dist < p1Dist && !this.isAttacking && p2) {
            this.walkTowards(p2.transform.position, gameTime.deltaTime);
        } else this.idle(gameTime.deltaTime);

        if (this.isAttacking) this.idle(gameTime.deltaTime);

        if (p1 && p1Dist <= p2Dist) {
            this.viewDirection = <any>Math.sign(p1.transform.position.x - this.gameObject.transform.position.x);
        } else if (p2 && p2Dist < p1Dist) {
            this.viewDirection = <any>Math.sign(p2.transform.position.x - this.gameObject.transform.position.x);
        }


        this.grounded = false;
    }
    onColliding(collision: Collision) {
        this.grounded = Vector2.average(...collision.contactPoints!).y < this.gameObject.transform.position.y;
    }
    walkTowards(pos: Vector2, dt: number) {
        if (pos.distance(this.gameObject.transform.position) > 0.1) {
            this.gameObject.rigidbody.force.add(new Vector2(0.0001 * dt * this.viewDirection, 0));
        } else this.gameObject.rigidbody.velocity.x *= dt / 50;

        this.gameObject.rigidbody.velocity.x = clamp(-2, 2, this.gameObject.rigidbody.velocity.x);


        const posOnTileMap = this.tileMap.pointToTilemapSpace(this.gameObject.transform.position);
        const left = this.tileMap.pointToTilemapSpace(this.gameObject.transform.position.clone.sub(new Vector2(this.gameObject.collider[0].AABB.size.x / 2, 0)));
        const right = this.tileMap.pointToTilemapSpace(this.gameObject.transform.position.clone.add(new Vector2(this.gameObject.collider[0].AABB.size.x / 2, 0)));

        if (left.x < 0 || posOnTileMap.y < 0 || right.x >= this.tileMap.collisionMap[0].length || posOnTileMap.y >= this.tileMap.collisionMap.length) return;

        if (this.grounded && Math.abs(this.gameObject.rigidbody.velocity.x) > 0.01) {
            if (right.x + 1 < this.tileMap.collisionMap[0].length && this.tileMap.collisionMap[posOnTileMap.y][posOnTileMap.x + 1] === 1 && this.gameObject.rigidbody.velocity.x > 0 || left.x - 1 > 0 && this.tileMap.collisionMap[posOnTileMap.y][posOnTileMap.x - 1] === 1 && this.gameObject.rigidbody.velocity.x < 0) {
                this.gameObject.rigidbody.applyImpulse(new Vector2(0, 4));
            }
        }
    }
    idle(dt: number) {
        this.gameObject.rigidbody.velocity.x *= dt / 50;
    }
}