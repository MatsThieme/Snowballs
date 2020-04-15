import { GameTime } from '../../GameTime.js';
import { Input } from '../../Input/Input.js';
import { AABB } from '../../Physics/AABB.js';
import { Settings } from '../../Settings.js';
import { Vector2 } from '../../Vector2.js';
import { UIElementType } from '../UIElementType.js';
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
            this.draw();
        }
    }
    protected drawCb(context: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas): void {
        const labelSize = this.menu.font.measureText(this.label, this.menu.font.getFont(Settings.mainFont, this.fontSize));

        canvas.height = Math.min(this._aabb.size.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width), this._aabb.size.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height));
        canvas.width = canvas.height * 1.2 + labelSize.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width);

        const x = canvas.width / (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width) * 100;
        const y = canvas.height / (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height) * 100;

        this.aabb = new AABB(new Vector2(x, y), this._aabb.position);

        context.save();

        if (this.background) context.drawImage(this.background.canvasImageSource, 0, 0, canvas.height, canvas.width);

        context.strokeStyle = context.fillStyle = context.shadowColor = this.color;

        context.lineWidth = ~~(this.menu.aabb.size.magnitude / 40);
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

        if (this.textShadow > 0) {
            context.shadowBlur = context.lineWidth * 1.5 * this.textShadow;
            context.shadowOffsetX = context.lineWidth * this.textShadow;
            context.shadowOffsetY = -context.lineWidth * this.textShadow;
        }

        context.fillText(this.label, canvas.width, canvas.height / 2);

        context.restore();
    }
}