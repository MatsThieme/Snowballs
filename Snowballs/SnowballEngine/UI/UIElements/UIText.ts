import { Input } from '../../Input/Input.js';
import { Settings } from '../../Settings.js';
import { Sprite } from '../../Sprite.js';
import { UIElementType } from '../UIElementType.js';
import { UIFrame } from '../UIFrame.js';
import { UIMenu } from '../UIMenu.js';
import { UIElement } from './UIElement.js';

export class UIText extends UIElement {
    public constructor(menu: UIMenu, input: Input) {
        super(menu, input, UIElementType.Text);
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