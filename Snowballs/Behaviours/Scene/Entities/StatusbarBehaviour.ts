import { Behaviour, ComponentType, GameTime, Sprite, Texture, Vector2 } from '../../../SnowballEngine/Scene.js';

export class StatusbarBehaviour extends Behaviour {
    min: number = 0;
    max: number = 100;
    value: number = 100;
    private _color: string = '#00f';
    private texture!: Texture;
    private size!: Vector2;
    private bar!: Texture;

    async start() {
        this.bar = <Texture>this.gameObject.getComponent<Texture>(ComponentType.Texture);

        this.size = this.bar.size.clone;

        this.texture = await this.gameObject.addComponent(Texture, texture => {
            texture.relativePosition = this.bar.relativePosition;
            texture.size = this.bar.size.clone;

            texture.sprite = new Sprite((context, canvas) => {
                context.fillStyle = this._color;
                context.fillRect(0, 0, canvas.width, canvas.height);
            });
        });

        (<any>this.gameObject).components.reverse();
    }
    async update(gameTime: GameTime) {
        if (this.texture.sprite) {
            const scale = this.value / (this.max - this.min) / 100 * this.max;

            this.texture.size.x = this.size.x * scale;

            this.bar.size.x = this.size.x / 100 * this.max;
        }
    }

    set color(val: string) {
        this._color = val;
        if (!this.texture) return;
        const c = (<OffscreenCanvas>this.texture.sprite?.canvasImageSource);
        const ctx = <OffscreenCanvasRenderingContext2D>c.getContext('2d');
        ctx.fillStyle = this._color;
        ctx.fillRect(0, 0, c.width, c.height);
    }
}