import { GameTime } from '../../GameTime.js';
import { Input } from '../../Input/Input.js';
import { Settings } from '../../Settings.js';
import { Sprite } from '../../Sprite.js';
import { UIElementType } from '../UIElementType.js';
import { UIFrame } from '../UIFrame.js';
import { UIMenu } from '../UIMenu.js';
import { UIElement } from './UIElement.js';

export class UICheckbox extends UIElement {
    public checked: boolean;
    public constructor(menu: UIMenu, input: Input) {
        super(menu, input, UIElementType.Checkbox);

        this.checked = false;
    }
    public update(gameTime: GameTime): void {
        super.update(gameTime);

        if (this.click) {
            this.checked = !this.checked;
            if (this.cbOnInput) this.cbOnInput(this);
            this.sprite = new Sprite(this.draw.bind(this));
        }
    }
    protected draw(context: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas): void {
        const labelSize = this.menu.font.measureText(this.label, this.menu.font.getFont(Settings.mainFont, this.fontSize));

        canvas.height = Math.min(this.aabb.size.x, this.aabb.size.y);
        canvas.width = ~~(canvas.height * 1.2 + labelSize.x);
        this._aabb.size.x = canvas.width;
        this._aabb.size.y = canvas.height;

        context.save();

        if (this.background) context.drawImage(this.background.canvasImageSource, 0, 0, canvas.height, canvas.height);

        context.strokeStyle = context.fillStyle = context.shadowColor = this.color;

        context.lineWidth = ~~(this.menu.aabb.size.magnitude / 750);
        if (this.stroke) context.strokeRect(context.lineWidth / 2, context.lineWidth / 2, canvas.height - context.lineWidth, canvas.height - context.lineWidth);

        // checkmark
        if (this.checked) {
            context.beginPath();
            context.moveTo(~~(0.12 * canvas.height), ~~(0.50 * canvas.height));
            context.lineTo(~~(0.38 * canvas.height), ~~(0.75 * canvas.height));
            context.lineTo(~~(0.88 * canvas.height), ~~(0.25 * canvas.height));
            context.stroke();
        }


        context.textAlign = 'right';
        context.textBaseline = 'middle';

        context.font = this.menu.font.getFont(Settings.mainFont, this.fontSize);

        if (this.textShadow !== 0) {
            context.shadowBlur = context.lineWidth * 1.5 * this.textShadow;
            context.shadowOffsetX = context.lineWidth * this.textShadow;
            context.shadowOffsetY = -context.lineWidth * this.textShadow;
        }

        context.fillText(this.label, canvas.width, canvas.height / 2);

        context.restore();
    }
    public get currentFrame(): UIFrame {
        return new UIFrame(this.aabb, this.sprite || new Sprite(() => { }));
    }
}