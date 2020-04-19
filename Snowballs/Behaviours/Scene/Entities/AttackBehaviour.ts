import { FireParticlePrefab } from '../../../Prefabs/Scene/ParticleEffects/FireParticlePrefab.js';
import { SnowParticlePrefab } from '../../../Prefabs/Scene/ParticleEffects/SnowParticlePrefab.js';
import { Behaviour, Collision, Vector2 } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from './EntityBehaviour.js';

export class AttackBehaviour extends Behaviour {
    damage: number = 10;
    attackerID!: number;

    onTrigger(collision: Collision) {
        const player1ID = this.scene.find('Player1')?.id || -1;
        const player2ID = this.scene.find('Player2')?.id || -1;

        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;

        if (this.attackerID === player1ID && otherGO.id === player2ID || this.attackerID === player2ID && otherGO.id === player1ID || otherGO.id === this.attackerID) return;

        const eb = otherGO.getComponent<EntityBehaviour>(<any>EntityBehaviour);


        if (!eb && this.gameObject.name.includes('Beat Trigger')) return;

        eb?.onAttack(this.damage);


        if (this.gameObject.name.includes('Fireball')) this.scene.newGameObject('Fire Particles', FireParticlePrefab, gameObject => gameObject.transform.relativePosition = Vector2.average(...collision.contactPoints!));
        else if (this.gameObject.name.includes('Snowball')) this.scene.newGameObject('Snow Particles', SnowParticlePrefab, gameObject => gameObject.transform.relativePosition = Vector2.average(...collision.contactPoints!));


        this.gameObject.destroy();
    }
}