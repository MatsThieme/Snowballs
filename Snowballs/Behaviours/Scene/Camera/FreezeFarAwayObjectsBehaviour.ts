import { Behaviour, Vector2 } from '../../../SnowballEngine/Scene.js';

export class FreezeFarAwayObjectsBehaviour extends Behaviour {
    async update() {
        for (const gameObject of this.scene.getAllGameObjects().filter(gO => gO.rigidbody.mass > 0)) {
            gameObject.active = Vector2.distance(gameObject.transform.position, this.gameObject.transform.position) < 15;
        }
    }
}