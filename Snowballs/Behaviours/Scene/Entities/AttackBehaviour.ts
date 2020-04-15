import { Behaviour, Collision } from '../../../SnowballEngine/Scene.js';
import { EntityBehaviour } from './EntityBehaviour.js';

export class AttackBehaviour extends Behaviour {
    damage: number = 10;
    private player1ID!: number;
    private player2ID!: number;
    attackerID!: number;

    async start() {
        this.player1ID = this.scene.find('Player1')!.id;
        this.player2ID = this.scene.find('Player2')!.id;
    }
    onTrigger(collision: Collision) {
        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;

        if (this.attackerID === this.player1ID && otherGO.id === this.player2ID || this.attackerID === this.player2ID && otherGO.id === this.player1ID || otherGO.id === this.attackerID || otherGO.name.includes('Fireball') || otherGO.name.includes('Snwoball') || otherGO.name.includes('Beat Trigger')) return;

        const eb = otherGO.getComponent<EntityBehaviour>(<any>EntityBehaviour);

        if (!eb) return;

        eb.onAttack(this.gameObject, this.damage);
        this.gameObject.destroy();
    }
}