import { GameTime } from '../../GameTime.js';
import { Input } from '../../Input/Input.js';
import { InputType } from '../../Input/InputType.js';
import { Settings } from '../../Settings.js';
import { Sprite } from '../../Sprite.js';
import { UIElementType } from '../UIElementType.js';
import { UIFrame } from '../UIFrame.js';
import { UIMenu } from '../UIMenu.js';
import { UIElement } from './UIElement.js';

export abstract class UIInputField extends UIElement {
    public focused: boolean;
    protected domElement: HTMLInputElement;
    public abstract value: number | string;
    public max: number;
    public constructor(menu: UIMenu, input: Input, type: UIElementType.NumberInputField | UIElementType.TextInputField) {
        super(menu, input, type);

        this.domElement = document.createElement('input');
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = '-100px';
        this.domElement.style.top = '-100px';
        this.domElement.style.display = 'block';
        this.domElement.type = type === UIElementType.TextInputField ? 'text' : UIElementType.NumberInputField ? 'number' : '';
        document.body.appendChild(this.domElement);

        this.max = 999;
        this.focused = false;
    }
    public update(gameTime: GameTime): void {
        super.update(gameTime);

        if (this.label === '') this.label = this.value.toString();

        if (this.input.getButton(InputType.Trigger).down && !this.down && this.focused) this.focused = false;
        else if (this.click) this.focused = true;

        if (this.focused) {
            this.domElement.focus();

            if (this.label !== this.domElement.value) {
                if (this.type === UIElementType.NumberInputField && typeof this.value === 'number') {
                    this.value = parseFloat(this.domElement.value) || 0;

                    if (this.value > this.max) this.value = this.max;

                    this.domElement.value = this.label = this.value.toString();
                } else if (this.type === UIElementType.TextInputField && typeof this.value === 'string') {
                    this.value = this.domElement.value;

                    if (this.value.length > this.max) this.value = this.value.substr(0, this.max);

                    this.domElement.value = this.label = this.value;
                }

                if (this.cbOnInput) this.cbOnInput(this);

                this.draw();
            }
        } else this.domElement.blur();
    }
    protected drawCb(context: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas): void {
        canvas.width = this.aabb.size.x;
        canvas.height = this.aabb.size.y;
        context.save();

        if (this.background) context.drawImage(this.background.canvasImageSource, 0, 0, canvas.width, canvas.height);

        context.strokeStyle = context.fillStyle = context.shadowColor = this.color;

        context.lineWidth = ~~(this.menu.aabb.size.magnitude / 750);
        if (this.stroke) context.strokeRect(context.lineWidth / 2, context.lineWidth / 2, canvas.width - context.lineWidth, canvas.height - context.lineWidth);

        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.font = this.menu.font.getFont(Settings.mainFont, this.fontSize);



        if (this.textShadow !== 0) {
            context.shadowBlur = context.lineWidth * 1.5 * this.textShadow;
            context.shadowOffsetX = context.lineWidth * this.textShadow;
            context.shadowOffsetY = -context.lineWidth * this.textShadow;
        }

        context.fillText(this.label, canvas.width / 2, canvas.height / 2);

        context.restore();
    }
}