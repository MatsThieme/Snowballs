import { clamp, GameTime, InputType, Vector2 } from '../../../../SnowballEngine/Scene.js';
import { PlayerBehaviour } from '../PlayerBehaviour.js';

export class Player1Behaviour extends PlayerBehaviour {
    attackDuration: number = 400;
    attackType: 'fireball' | 'snowball' | 'beat' = 'snowball';

    async update(gameTime: GameTime) {
        await super.update(gameTime);

        if (this.input.getButton(InputType.Attack).click && !this.isAttacking) await this.attack(Vector2.up);
    }
    onColliding() {
        if (!this.colliding) {

            this.gameObject.rigidbody.velocity.x = clamp(-3, 3, this.gameObject.rigidbody.velocity.x);

            this.run(this.input.getAxis(InputType.MoveHorizontal).value * 0.1);

            if (this.input.getButton(InputType.Jump).click) this.jump();

            if (Math.abs(this.input.getAxis(InputType.MoveHorizontal).value) < 0.01 && !this.isAttacking) this.idle();

            this.colliding = true;
        }
    }
}