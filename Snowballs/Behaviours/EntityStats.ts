import { GameTime, clamp } from '../SnowballEngine/Scene.js';

export class EntityStats {
    private maxHealth: number;
    public health: number;
    private healthRegeneration: number; // per ms
    private maxEnergy: number;
    public energy: number;
    private energyRegeneration: number; // per ms
    public constructor(maxHealth: number = 100, health: number = 100, healthRegeneration: number = 0.0001, maxEnergy: number = 100, energy: number = 100, energyRegeneration: number = 0.0001) {
        this.maxHealth = maxHealth;
        this.health = health;
        this.healthRegeneration = healthRegeneration;
        this.maxEnergy = maxEnergy;
        this.energy = energy;
        this.energyRegeneration = energyRegeneration;
    }
    public update(gameTime: GameTime) {
        if (this.health < 100) this.health += this.healthRegeneration * gameTime.deltaTime;
        this.health = clamp(0, this.maxHealth, this.health);

        if (this.energy < 100) this.energy += this.energyRegeneration * gameTime.deltaTime;
        this.energy = clamp(0, this.maxEnergy, this.energy);
    }
}