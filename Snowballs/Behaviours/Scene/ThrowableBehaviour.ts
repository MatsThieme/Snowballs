import { Behaviour, Collision } from '../../SnowballEngine/Scene.js';
import { EntityBehaviour } from './Entities/EntityBehaviour.js';

export class ThrowableBehaviour extends Behaviour {
    damage: number = 10;
    private player1ID!: number;
    private player2ID!: number;

    async awake() {
        this.player1ID = this.scene.find('Player1')!.id;
        this.player2ID = this.scene.find('Player2')!.id;
    }

    onTrigger(collision: Collision) {
        const otherGO = collision.A.gameObject.id === this.gameObject.id ? collision.B.gameObject : collision.A.gameObject;

        if (otherGO.id === this.player1ID || otherGO.id === this.player2ID) return;

        otherGO.getComponent(EntityBehaviour)?.onAttack(this.gameObject, this.damage);

        this.gameObject.destroy();
    }
}