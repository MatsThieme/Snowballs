import { clamp, GameTime, InputType, Vector2 } from '../../../../SnowballEngine/Scene.js';
import { PlayerBehaviour } from '../PlayerBehaviour.js';

export class Player2Behaviour extends PlayerBehaviour {
    attackDuration: number = 500;
    attackType: 'fireball' | 'snowball' | 'beat' = 'beat';

    async update(gameTime: GameTime) {
        await super.update(gameTime);

        if (this.input.getButton(InputType.Attack1).click && !this.isAttacking) await this.attack(Vector2.up);
    }
    onColliding() {
        if (!this.colliding) {

            this.gameObject.rigidbody.velocity.x = clamp(-3, 3, this.gameObject.rigidbody.velocity.x);

            this.run(this.input.getAxis(InputType.MoveHorizontal1).value * 0.1);

            if (this.input.getButton(InputType.Jump1).click) this.jump();

            if (Math.abs(this.input.getAxis(InputType.MoveHorizontal1).value) < 0.01 && !this.isAttacking) this.idle();

            this.colliding = true;
        }
    }
}