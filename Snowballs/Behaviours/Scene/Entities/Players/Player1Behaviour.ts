import { clamp, GameTime, InputType, Vector2 } from '../../../../SnowballEngine/Scene.js';
import { PlayerBehaviour } from '../PlayerBehaviour.js';

export class Player1Behaviour extends PlayerBehaviour {
    attackDuration: number = 300;
    attackType: 'fireball' | 'snowball' | 'beat' = 'snowball';

    async update(gameTime: GameTime) {
        if (!this.colliding) this.jump();

        await super.update(gameTime);

        if (this.input.getAxis(InputType.MoveHorizontal).value !== 0) this.viewDirection = <any>Math.sign(this.input.getAxis(InputType.MoveHorizontal).value);
        else if (this.colliding || this.isAttacking) this.idle();

        if (this.input.getButton(InputType.Attack).click) await this.attack(new Vector2(5 * this.viewDirection, 2.5));
    }
    onColliding() {
        if (!this.colliding) {
            this.gameObject.rigidbody.velocity.x = clamp(-3, 3, this.gameObject.rigidbody.velocity.x);


            if (!this.isAttacking) this.run(this.input.getAxis(InputType.MoveHorizontal).value * 0.1);

            if (this.input.getButton(InputType.Jump).click && !this.isAttacking) {
                this.jump();
                this.gameObject.rigidbody.applyImpulse(new Vector2(0, 5));
            }

            if (Math.abs(this.input.getAxis(InputType.MoveHorizontal).value) < 0.01 && !this.isAttacking) this.idle();

            this.colliding = true;
        }
    }
}