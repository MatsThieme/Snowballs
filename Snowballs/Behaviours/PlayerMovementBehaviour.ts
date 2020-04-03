import { Behaviour, clamp, GameTime, InputType, Vector2 } from '../SnowballEngine/Scene.js';

export class PlayerMovementBehaviour extends Behaviour {
    private colliding: boolean = false;
    private gameTime!: GameTime;
    public async update(gameTime: GameTime) {
        this.colliding = false;

        this.gameTime = gameTime;
    }
    public onColliding() {
        if (!this.colliding) {
            this.gameObject.rigidbody.velocity.x = clamp(-3, 3, this.gameObject.rigidbody.velocity.x);
            this.gameObject.rigidbody.force.add(new Vector2(this.input.getAxis(InputType.MoveHorizontal).value, 0).scale(0.1));
            if (this.input.getButton(InputType.Jump).click) this.gameObject.rigidbody.applyImpulse(new Vector2(0, 5), new Vector2());
            if (Math.abs(this.input.getAxis(InputType.MoveHorizontal).value) < 0.01) this.gameObject.rigidbody.velocity.x *= this.gameTime.deltaTime / 10;
            this.colliding = true;
        }
    }
}