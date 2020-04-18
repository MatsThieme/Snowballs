import { AnimatedSprite, Behaviour, CircleCollider, clamp, ComponentType, GameTime, PolygonCollider, Sprite, Texture, Vector2, Collider, PolygonRenderer } from '../../../SnowballEngine/Scene.js';
import { AttackBehaviour } from './AttackBehaviour.js';
import { StatusbarBehaviour } from './StatusbarBehaviour.js';

export abstract class EntityBehaviour extends Behaviour {
    level: number = 1;
    abstract maxHealth: number = 100;
    private _health: number = 100;
    abstract healthRegeneration: number = 0.0001; // per ms
    abstract maxEnergy: number = 100;
    private _energy: number = 100;
    abstract energyRegeneration: number = 0.0001; // per ms

    abstract damage: number;

    abstract attackDuration: number;
    private attackStart: number = 0;
    abstract attackRadius: number;

    abstract isPlayer: boolean;

    private healtbar!: StatusbarBehaviour;
    private energybar!: StatusbarBehaviour;

    protected abstract attackType: 'fireball' | 'snowball' | 'beat';

    abstract async die(): Promise<void>;
    dying: boolean = false;

    async start() {
        await this.gameObject.scene.newGameObject(`HealthBar${this.componentId}`, async gameObject => {
            this.gameObject.addChild(gameObject);

            let texSize!: Vector2;

            await gameObject.addComponent(Texture, async texture => {
                texture.sprite = new Sprite(`Images/Characters/lifebar_${this.isPlayer ? 'player' : 'enemy'}.png`);

                texture.size = (await texture.sprite.load)!.size.clone.setLength(1);
                texSize = texture.size;
            });

            gameObject.drawPriority = 10;
            this.healtbar = await gameObject.addComponent(StatusbarBehaviour);
            this.healtbar.color = this.isPlayer ? '#ff549b' : '#ff8d31';

            const aS = this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);
            gameObject.transform.relativePosition.y = ((aS!.scaledSize.y || 0) / 2 + aS!.relativePosition.y) * 1.1 + texSize.y * 1.5;
        });

        await this.gameObject.scene.newGameObject(`EnergyBar${this.componentId}`, async gameObject => {
            this.gameObject.addChild(gameObject);

            await gameObject.addComponent(Texture, async texture => {
                texture.sprite = new Sprite(`Images/Characters/lifebar_${this.isPlayer ? 'player' : 'enemy'}.png`);

                texture.size = (await texture.sprite.load)!.size.clone.setLength(1);
            });

            gameObject.drawPriority = 10;
            this.energybar = await gameObject.addComponent(StatusbarBehaviour);
            this.energybar.color = '#30ff56';

            const aS = this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);
            gameObject.transform.relativePosition.y = ((aS!.scaledSize.y || 0) / 2 + aS!.relativePosition.y) * 1.1;
        });

        this._health = this.maxHealth;
        this._energy = this.maxEnergy;
    }

    async update(gameTime: GameTime) {
        if (this.health === 0) {
            if (!this.dying) this.die().then(() => this.gameObject.destroy());
            return;
        }

        if (this._health < 100) this._health += this.healthRegeneration * gameTime.deltaTime;
        this._health = clamp(0, this.maxHealth, this._health);

        this.healtbar.max = this.maxHealth * ~~this.level;
        this.healtbar.value = this.health;


        if (this._energy < 100) this._energy += this.energyRegeneration * gameTime.deltaTime;
        this._energy = clamp(0, this.maxEnergy, this._energy);

        this.energybar.max = this.maxEnergy * ~~this.level;
        this.energybar.value = this.energy;
    }

    get health(): number {
        return this._health * ~~this.level;
    }
    get energy(): number {
        return this._energy * ~~this.level;
    }
    set health(val: number) {
        this._health = clamp(0, this.maxHealth, val / ~~this.level);
    }
    set energy(val: number) {
        this._energy = clamp(0, this.maxEnergy, val / ~~this.level);
    }

    get isAttacking(): boolean {
        return performance.now() < this.attackStart + this.attackDuration;
    }

    onAttack(damage: number) {
        this.health -= damage;
    }
    async attack(direction: Vector2) {
        if (this.isAttacking || this.energy < this.damage / 2) return;

        this.energy -= this.damage / 2;

        if (this.attackType === 'beat') await this.beatAttack(direction, this.damage);
        else if (this.attackType === 'snowball') await this.snowballAttack(direction, this.damage);
        else if (this.attackType === 'fireball') await this.fireballAttack(direction, this.damage);

        this.attackStart = performance.now();
    }
    async fireballAttack(direction: Vector2, damage: number) {
        await this.scene.newGameObject('Fireball', async gameObject => {
            const circleCollider = await gameObject.addComponent(CircleCollider, circleCollider => {
                circleCollider.radius = 0.15;
                circleCollider.isTrigger = true;
                circleCollider.density = 3;
            });

            await gameObject.addComponent(Texture, async texture => {
                texture.size = circleCollider.AABB.size;
                texture.sprite = new Sprite('Images/Items/fireball.png');
                await texture.sprite.load;
            });

            await gameObject.addComponent(AttackBehaviour, attackBehaviour => {
                attackBehaviour.damage = damage;
                attackBehaviour.attackerID = this.gameObject.id;
            });

            gameObject.rigidbody.useAutoMass = true;
            gameObject.rigidbody.applyImpulse(direction.clone.setLength(3.5));

            const cs = this.gameObject.getComponent<Collider>(ComponentType.Collider)?.AABB.size;

            if (cs) gameObject.transform.relativePosition = this.gameObject.transform.position.add(new Vector2(0, cs.y * 0.3));
        });
    }
    async snowballAttack(direction: Vector2, damage: number) {
        await this.scene.newGameObject('Snowball', async gameObject => {
            const circleCollider = await gameObject.addComponent(CircleCollider, circleCollider => {
                circleCollider.radius = 0.15;
                circleCollider.isTrigger = true;
                circleCollider.density = 3;
            });

            await gameObject.addComponent(Texture, texture => {
                texture.size = circleCollider.AABB.size;
                texture.sprite = new Sprite('Images/Items/snowball.png');
            });

            await gameObject.addComponent(AttackBehaviour, attackBehaviour => {
                attackBehaviour.damage = damage;
                attackBehaviour.attackerID = this.gameObject.id;
            });

            gameObject.rigidbody.useAutoMass = true;

            gameObject.rigidbody.applyImpulse(direction.clone.setLength(3.5));

            const cs = this.gameObject.getComponent<Collider>(ComponentType.Collider)?.AABB.size;

            if (cs) gameObject.transform.relativePosition = this.gameObject.transform.position.add(new Vector2(0, cs.y * 0.3));
        });
    }
    async beatAttack(direction: Vector2, damage: number) {
        await this.scene.newGameObject('Beat Trigger', async gameObject => {
            this.gameObject.addChild(gameObject);

            gameObject.transform.relativePosition = direction.clone.setLength(this.attackRadius).sub(new Vector2(0, this.attackRadius / 5));

            await gameObject.addComponent(PolygonCollider, polygonCollider => {
                polygonCollider.isTrigger = true;
            });

            const colliderSize = this.gameObject.getComponent<Collider>(ComponentType.Collider)?.AABB.size;

            gameObject.transform.relativeScale = new Vector2(Math.min(colliderSize!.x, Math.abs(this.gameObject.transform.position.x - gameObject.transform.position.x)), colliderSize!.y);


            await gameObject.addComponent(AttackBehaviour, attackBehaviour => {
                attackBehaviour.damage = damage;
                attackBehaviour.attackerID = this.gameObject.id;
            });

            await gameObject.addComponent(PolygonRenderer);

            setTimeout(() => gameObject && gameObject.destroy ? gameObject.destroy() : undefined, this.attackDuration);
        });
    }
}