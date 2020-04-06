import { Behaviour, Camera, clamp, ComponentType, GameTime, InputType, PolygonCollider, Vector2 } from '../SnowballEngine/Scene.js';

export class Player2MovementBehaviour extends Behaviour {
    private colliding: boolean = false;
    private gameTime!: GameTime;
    public async update(gameTime: GameTime) {
        this.colliding = false;
        this.gameTime = gameTime;

        const camera = this.scene.find('Camera')?.getComponent<Camera>(ComponentType.Camera);
        const collider = this.gameObject.getComponent<PolygonCollider>(ComponentType.PolygonCollider);

        if (!camera || !collider) return;

        if (this.gameObject.transform.position.x - collider.scaledSize.x / 2 < camera.gameObject.transform.position.x - camera.size.x / 2) this.gameObject.transform.relativePosition.x = camera.gameObject.transform.position.x - camera.size.x / 2 + collider.scaledSize.x / 2;
        else if (this.gameObject.transform.position.x + collider.scaledSize.x / 2 > camera.gameObject.transform.position.x + camera.size.x / 2) this.gameObject.transform.relativePosition.x = camera.gameObject.transform.position.x + camera.size.x / 2 - collider.scaledSize.x / 2;
    }
    public onColliding() {
        if (!this.colliding) {
            this.gameObject.rigidbody.velocity.x = clamp(-3, 3, this.gameObject.rigidbody.velocity.x);
            this.gameObject.rigidbody.force.add(new Vector2(this.input.getAxis(InputType.MoveHorizontal1).value, 0).scale(0.1));
            if (this.input.getButton(InputType.Jump1).click) this.gameObject.rigidbody.applyImpulse(new Vector2(0, 5), new Vector2());
            if (Math.abs(this.input.getAxis(InputType.MoveHorizontal1).value) < 0.01) this.gameObject.rigidbody.velocity.x *= this.gameTime.deltaTime / 10;
            this.colliding = true;
        }
    }
}