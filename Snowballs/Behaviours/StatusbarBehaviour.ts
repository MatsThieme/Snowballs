import { Behaviour, ComponentType, GameTime, Sprite, Texture, Vector2 } from '../SnowballEngine/Scene.js';

export class StatusbarBehaviour extends Behaviour {
    public min: number = 0;
    public max: number = 100;
    public value: number = 100;
    public color: string = '#00f';
    private texture!: Texture;
    private size!: Vector2;

    async awake() {
        const bar = <Texture>this.gameObject.getComponent<Texture>(ComponentType.Texture);
        this.size = bar.size.clone;

        this.texture = await this.gameObject.addComponent(Texture, texture => {
            texture.relativePosition = bar.relativePosition;
            texture.size = bar.size.clone;

            texture.sprite = new Sprite((context, canvas) => {
                context.fillStyle = this.color;
                context.fillRect(0, 0, canvas.width, canvas.height);
            });
        });

        (<any>this.gameObject).components.reverse();
    }
    async update(gameTime: GameTime) {
        if (this.texture.sprite) {
            const scale = this.value / (this.max - this.min);

            this.texture.size.x = this.size.x * scale;
        }
    }
}