import { Behaviour, InputType, Vector2 } from '../SnowballEngine/Scene.js';

export class PlayerMovementBehaviour extends Behaviour {
    public async update() {
        this.gameObject.rigidbody.force.add(new Vector2(this.input.getAxis(InputType.MoveHorizontal).value, this.input.getAxis(InputType.MoveVertical).value).scale(0.05));
    }
}