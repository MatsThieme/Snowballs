import { AnimatedSprite, Behaviour, CircleCollider, clamp, ComponentType, GameObject, GameTime, PolygonCollider, PolygonRenderer, Sprite, Texture, Vector2 } from '../../../SnowballEngine/Scene.js';
import { StatusbarBehaviour } from './StatusbarBehaviour.js';
import { AttackBehaviour } from './AttackBehaviour.js';

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
            this.healtbar.color = '#f00';

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
            this.energybar.color = '#00f';

            const aS = this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);
            gameObject.transform.relativePosition.y = ((aS!.scaledSize.y || 0) / 2 + aS!.relativePosition.y) * 1.1;
        });
    }

    async update(gameTime: GameTime) {
        if (this.health === 0) {
            this.die();
            this.gameObject.destroy();
            return;
        }

        if (this._health < 100) this._health += this.healthRegeneration * gameTime.deltaTime;
        this._health = clamp(0, this.maxHealth, this._health);

        this.healtbar.max = this.maxHealth;
        this.healtbar.value = this.health;


        if (this._energy < 100) this._energy += this.energyRegeneration * gameTime.deltaTime;
        this._energy = clamp(0, this.maxEnergy, this._energy);

        this.energybar.max = this.maxEnergy;
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
                texture.sprite = new Sprite('Images/Items/snowball.png');
                await texture.sprite.load;
            });

            await gameObject.addComponent(AttackBehaviour, attackBehaviour => {
                attackBehaviour.damage = damage;
                attackBehaviour.attackerID = this.gameObject.id;
            });

            gameObject.rigidbody.useAutoMass = true;
            gameObject.rigidbody.applyImpulse(direction.clone.setLength(3.5));

            gameObject.transform.relativePosition = this.gameObject.transform.position;
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

            gameObject.transform.relativePosition = this.gameObject.transform.position;
        });
    }
    async beatAttack(direction: Vector2, damage: number) {
        await this.scene.newGameObject('Beat Trigger', async gameObject => {
            this.gameObject.addChild(gameObject);

            gameObject.transform.relativeRotation = Vector2.up.angleTo(new Vector2(), direction);
            gameObject.transform.relativePosition = Vector2.up.setLength(this.attackRadius).rotateAroundTo(new Vector2(), gameObject.transform.relativeRotation);

            await gameObject.addComponent(PolygonCollider, polygonCollider => {
                polygonCollider.isTrigger = true;
                polygonCollider.vertices = [new Vector2(0, 0), new Vector2(0, this.attackRadius), new Vector2(0.1, 0), new Vector2(0.1, this.attackRadius)];
            });

            await gameObject.addComponent(PolygonRenderer);


            await gameObject.addComponent(AttackBehaviour, attackBehaviour => {
                attackBehaviour.damage = damage;
                attackBehaviour.attackerID = this.gameObject.id;
            });
        });
    }
}