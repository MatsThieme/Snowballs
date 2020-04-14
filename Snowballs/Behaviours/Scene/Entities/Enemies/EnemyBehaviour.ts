import { LevelUpPrefab } from '../../../../Prefabs/Scene/Items/LevelUpPrefab.js';
import { Behaviour, clamp, Collision, ComponentType, GameObject, GameTime, TileMap, Vector2, AnimatedSprite } from '../../../../SnowballEngine/Scene.js';
import { StatusbarBehaviour } from '../../../StatusbarBehaviour.js';
import { EntityBehaviour } from '../EntityBehaviour.js';
import { EnemyHealthbarPrefab } from '../../../../Prefabs/Scene/Enemies/EnemyHealthbarPrefab.js';

export class EnemyBehaviour extends Behaviour {
    private stats!: EntityBehaviour;
    private attackRadius: number = 1.3;
    private canSeePlayer: number = 7;
    private tileMap!: TileMap;
    private grounded: boolean = false;
    private colliderSize!: Vector2;
    private readonly attackDuration: number = 1000;
    private attackStart: number = 0;
    private statusbarBehaviour!: StatusbarBehaviour;

    async start() {
        this.stats = <EntityBehaviour>this.gameObject.getComponent(EntityBehaviour);
        this.tileMap = <TileMap>this.scene.find('Level')!.getComponent<TileMap>(ComponentType.TileMap);
        this.colliderSize = this.gameObject.collider[0].AABB.size;

        await this.scene.newGameObject('Healthbar Enemy', EnemyHealthbarPrefab, gameObject => {
            this.gameObject.addChild(gameObject);
            this.statusbarBehaviour = <StatusbarBehaviour>gameObject.getComponent(StatusbarBehaviour);
            const aS = this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);
            gameObject.transform.relativePosition.y = ((aS!.scaledSize.y || 0) / 2 + aS!.relativePosition.y) * 1.1;
        });
    }
    async update(gameTime: GameTime) {
        if (this.stats.health < (<any>this.stats).healthRegeneration * gameTime.deltaTime * 1.00000001) {
            this.scene.newGameObject('LevelUp', LevelUpPrefab, gameObject => gameObject.transform.relativePosition = this.gameObject.transform.position.clone);

            this.gameObject.destroy();
            return;
        }


        const p1 = this.scene.find('Player1');
        const p2 = this.scene.find('Player2');

        if (!p1 || !p2) return;

        const p1Dist = this.gameObject.transform.position.distance(p1.transform.position.sub(new Vector2(0, p1.collider[0].AABB.size.y / 2)));
        const p2Dist = this.gameObject.transform.position.distance(p2.transform.position.sub(new Vector2(0, p2.collider[0].AABB.size.y / 2)));

        if (p1Dist < this.attackRadius * this.colliderSize.y && p1Dist <= p2Dist && !this.isAttacking) {
            this.attack(p1);
        } else if (p2Dist < this.attackRadius * this.colliderSize.y && p2Dist < p1Dist && !this.isAttacking) {
            this.attack(p2);
        } else if (p1Dist < this.canSeePlayer * this.colliderSize.y && p1Dist <= p2Dist && !this.isAttacking) {
            this.walkTowards(p1.transform.position, gameTime.deltaTime);
        } else if (p2Dist < this.canSeePlayer * this.colliderSize.y && p2Dist < p1Dist && !this.isAttacking) {
            this.walkTowards(p2.transform.position, gameTime.deltaTime);
        } else if (!this.isAttacking) this.idle(gameTime.deltaTime);

        this.statusbarBehaviour.max = this.stats.maxHealth;
        this.statusbarBehaviour.value = this.stats.health;
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
    attack(gO: GameObject) {
        this.attackStart = performance.now();
        console.log('attack');
    }
    get isAttacking() {
        return this.attackStart + this.attackDuration > performance.now();
    }
}