import { clamp, GameTime, InputType, Vector2 } from '../../../../SnowballEngine/Scene.js';
import { PlayerBehaviour } from '../PlayerBehaviour.js';

export class Player2Behaviour extends PlayerBehaviour {
    attackDuration: number = 400;
    attackType: 'fireball' | 'snowball' | 'beat' = 'beat';

    async update(gameTime: GameTime) {
        if (!this.colliding) this.jump();

        await super.update(gameTime);

        if (this.input.getButton(InputType.Attack1).click && !this.isAttacking) await this.attack(new Vector2(5 * Math.sign(this.gameObject.rigidbody.velocity.x), 2.5));
    }
    onColliding() {
        if (!this.colliding) {
            this.gameObject.rigidbody.velocity.x = clamp(-3, 3, this.gameObject.rigidbody.velocity.x);


            this.run(this.input.getAxis(InputType.MoveHorizontal1).value * 0.1);

            if (this.input.getButton(InputType.Jump1).click) {
                this.jump();
                this.gameObject.rigidbody.applyImpulse(new Vector2(0, 5));
            }

            if (Math.abs(this.input.getAxis(InputType.MoveHorizontal1).value) < 0.01 && !this.isAttacking) this.idle();

            this.colliding = true;
        }
    }
}