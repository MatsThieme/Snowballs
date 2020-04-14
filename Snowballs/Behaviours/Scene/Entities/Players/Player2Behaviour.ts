import { PlayerHealthbarPrefab } from '../../../../Prefabs/Scene/Players/PlayerHealthbarPrefab.js';
import { AnimatedSprite, Behaviour, Camera, clamp, ComponentType, GameTime, InputType, PolygonCollider, Vector2 } from '../../../../SnowballEngine/Scene.js';
import { StatusbarBehaviour } from '../../../StatusbarBehaviour.js';
import { EntityBehaviour } from '../EntityBehaviour.js';

export class Player2Behaviour extends Behaviour {
    private colliding: boolean = false;
    private gameTime!: GameTime;
    private animatedSprite: AnimatedSprite = <AnimatedSprite>this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);
    private stats!: EntityBehaviour;
    private statusbarBehaviour!: StatusbarBehaviour;

    async awake() {
        await this.scene.newGameObject('Healthbar Player2', PlayerHealthbarPrefab, gameObject => {
            this.gameObject.addChild(gameObject);
            this.statusbarBehaviour = <StatusbarBehaviour>gameObject.getComponent(StatusbarBehaviour);
            const aS = this.gameObject.getComponent<AnimatedSprite>(ComponentType.AnimatedSprite);
            gameObject.transform.relativePosition.y = ((aS!.scaledSize.y || 0) / 2 + aS!.relativePosition.y) * 1.1;
        });
    }
    async start() {
        this.stats = <EntityBehaviour>this.gameObject.getComponent(EntityBehaviour);
    }
    async update(gameTime: GameTime) {
        this.colliding = false;
        this.gameTime = gameTime;

        const camera = this.scene.find('Camera')?.getComponent<Camera>(ComponentType.Camera);
        const collider = this.gameObject.getComponent<PolygonCollider>(ComponentType.PolygonCollider);

        if (!camera || !collider) return;

        if (this.gameObject.transform.position.x - collider.scaledSize.x / 2 < camera.gameObject.transform.position.x - camera.size.x / 2) this.gameObject.transform.relativePosition.x = camera.gameObject.transform.position.x - camera.size.x / 2 + collider.scaledSize.x / 2;
        else if (this.gameObject.transform.position.x + collider.scaledSize.x / 2 > camera.gameObject.transform.position.x + camera.size.x / 2) this.gameObject.transform.relativePosition.x = camera.gameObject.transform.position.x + camera.size.x / 2 - collider.scaledSize.x / 2;

        this.statusbarBehaviour.value = this.stats.health;
    }
    onColliding() {
        if (!this.colliding) {
            this.gameObject.rigidbody.velocity.x = clamp(-3, 3, this.gameObject.rigidbody.velocity.x);
            this.run(this.input.getAxis(InputType.MoveHorizontal1).value * 0.1);
            if (this.input.getButton(InputType.Jump1).click) this.jump();
            if (Math.abs(this.input.getAxis(InputType.MoveHorizontal1).value) < 0.01) this.idle();
            this.colliding = true;
        }
    }
    run(x: number) {
        this.gameObject.rigidbody.force.add(new Vector2(x, 0));
        if (this.gameObject.rigidbody.velocity.x > 0 && this.animatedSprite.activeAnimation !== 'run right') this.animatedSprite.activeAnimation = 'run right';
        else if (this.gameObject.rigidbody.velocity.x < 0 && this.animatedSprite.activeAnimation !== 'run left') this.animatedSprite.activeAnimation = 'run left';
    }
    jump() {
        this.gameObject.rigidbody.applyImpulse(new Vector2(0, 5));
        //this.animatedSprite.activeAnimation = 'jump';
    }
    idle() {
        this.gameObject.rigidbody.velocity.x *= this.gameTime.deltaTime / 50;
        if (this.animatedSprite.activeAnimation !== 'idle') this.animatedSprite.activeAnimation = 'idle';
    }
    attack() {


        if (this.animatedSprite.activeAnimation !== 'attack') this.animatedSprite.activeAnimation = 'attack';
    }
}