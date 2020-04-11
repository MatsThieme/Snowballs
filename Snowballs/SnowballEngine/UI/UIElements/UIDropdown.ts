import { GameTime } from '../../GameTime.js';
import { Input } from '../../Input/Input.js';
import { InputType } from '../../Input/InputType.js';
import { AABB } from '../../Physics/AABB.js';
import { Settings } from '../../Settings.js';
import { Sprite } from '../../Sprite.js';
import { Vector2 } from '../../Vector2.js';
import { UIElementType } from '../UIElementType.js';
import { UIFrame } from '../UIFrame.js';
import { UIMenu } from '../UIMenu.js';
import { UIElement } from './UIElement.js';

export class UIDropdown extends UIElement {
    private _values: string[];
    public activeIndex: number;
    public extendUpward: boolean;
    public extended: boolean;
    public constructor(menu: UIMenu, input: Input) {
        super(menu, input, UIElementType.Dropdown);

        this._values = [];
        this.activeIndex = 0;
        this.extendUpward = false;
        this.extended = false;
    }
    public update(gameTime: GameTime): void {
        super.update(gameTime);

        if (this.click) {
            const a = this._aabb.size.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width);
            const b = this._aabb.size.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height);

            const pointerPos = new Vector2(this.input.getAxis(InputType.PointerPositionHorizontal).value, this.input.getAxis(InputType.PointerPositionVertical).value);
            const buttonSize = new Vector2(this._aabb.size.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width), (this._aabb.size.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height)) / (1 + this._values.length)).round();

            if (this.extended) {
                this.extended = false;

                for (let i = 1; i < this._values.length + 1; i++) {
                    const btnPos = new Vector2(0, this.extendUpward ? (this._aabb.size.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height)) - (i + 1) * buttonSize.y : i * buttonSize.y);

                    if (new AABB(buttonSize, btnPos.add(new Vector2(this._aabb.position.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width), this._aabb.position.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height)))).intersectsPoint(pointerPos) && this.activeIndex !== i - 1) {
                        this.activeIndex = i - 1;
                        if (this.cbOnInput) this.cbOnInput(this);
                        this.draw();
                        break;
                    }
                }
            } else if (new AABB(buttonSize, new Vector2(this._aabb.position.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width), this._aabb.position.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height))).intersectsPoint(pointerPos) && !this.extendUpward || new AABB(buttonSize, new Vector2(this._aabb.position.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width), this._aabb.position.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height)).add(new Vector2(0, buttonSize.y * this.values.length))).intersectsPoint(pointerPos) && this.extendUpward) {
                this.extended = true;
                this.draw();
            }
        } else if (this.input.getButton(InputType.Trigger).down && !this.input.getButton(InputType.Trigger).clicked) this.extended = false;
    }
    protected drawCb(context: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas): void {
        canvas.width = this._aabb.size.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width);
        canvas.height = this._aabb.size.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height);

        context.strokeStyle = context.fillStyle = context.shadowColor = this.color;

        context.lineWidth = ~~(this.menu.aabb.size.magnitude / 40);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = this.menu.font.getFont(Settings.mainFont, this.fontSize);

        const buttonSize = new Vector2(canvas.width, canvas.height / (1 + this._values.length)).round();

        for (let i = 0; i < (this.extended ? this._values.length + 1 : 1); i++) {
            const btnPos = new Vector2(0, this.extendUpward ? (this._aabb.size.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height)) - (i + 1) * buttonSize.y : i * buttonSize.y);
            if (this.background) context.drawImage(this.background.canvasImageSource, btnPos.x, btnPos.y, buttonSize.x, buttonSize.y);

            if (this.stroke) context.strokeRect(context.lineWidth / 2 + btnPos.x, context.lineWidth / 2 + btnPos.y, buttonSize.x - context.lineWidth, buttonSize.y - (i === this._values.length && !this.extendUpward || this.extendUpward && i === 0 ? context.lineWidth : 0));

            if (this.textShadow !== 0) {
                context.shadowBlur = context.lineWidth * 1.5 * this.textShadow;
                context.shadowOffsetX = context.lineWidth * this.textShadow;
                context.shadowOffsetY = -context.lineWidth * this.textShadow;
            }

            context.fillText(i === 0 ? this.value : this.values[i - 1], buttonSize.x / 2, buttonSize.y / 2 + btnPos.y);

            context.shadowBlur = context.shadowOffsetX = context.shadowOffsetY = 0;
        }
    }
    public get values(): string[] {
        return this._values;
    }
    public set values(val: string[]) {
        this._values = val;
        this.draw();
    }
    public get value(): string {
        return this._values[this.activeIndex];
    }
}