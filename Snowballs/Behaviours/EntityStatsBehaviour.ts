import { Behaviour, clamp, GameTime } from '../SnowballEngine/Scene.js';

export class EntityStatsBehaviour extends Behaviour {
    public level: number = 1;
    private maxHealth: number = 100;
    private _health: number = 100;
    private healthRegeneration: number = 0.0001; // per ms
    private maxEnergy: number = 100;
    private _energy: number = 100;
    private energyRegeneration: number = 0.0001; // per ms

    async update(gameTime: GameTime) {
        if (this._health < 100) this._health += this.healthRegeneration * gameTime.deltaTime;
        this._health = clamp(0, this.maxHealth, this._health);

        if (this._energy < 100) this._energy += this.energyRegeneration * gameTime.deltaTime;
        this._energy = clamp(0, this.maxEnergy, this._energy);
    }
    get health(): number {
        return this._health * ~~this.level;
    }
    get energy(): number {
        return this._energy * ~~this.level;
    }
    set health(val: number) {
        this._health = val / ~~this.level;
    }
    set energy(val: number) {
        this._energy = val / ~~this.level;
    }
}