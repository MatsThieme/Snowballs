import { AlignH, AlignV } from '../../GameObject/Align.js';
import { GameTime } from '../../GameTime.js';
import { Input } from '../../Input/Input.js';
import { InputType } from '../../Input/InputType.js';
import { AABB } from '../../Physics/AABB.js';
import { Settings } from '../../Settings.js';
import { Sprite } from '../../Sprite.js';
import { Vector2 } from '../../Vector2.js';
import { UIElementType } from '../UIElementType.js';
import { UIFontSize } from '../UIFontSize.js';
import { UIFrame } from '../UIFrame.js';
import { UIMenu } from '../UIMenu.js';

export abstract class UIElement {
    private static nextID: number = 0;
    public readonly id: number;
    public click: boolean;
    public down: boolean;
    protected _aabb: AABB;
    private _label: string;
    public active: boolean;
    public localAlignH: AlignH;
    public localAlignV: AlignV;
    public alignH: AlignH;
    public alignV: AlignV;
    public cbOnInput?: (uiElement: this) => any;
    protected sprite?: Sprite;
    private _background?: Sprite;
    private _fontSize: UIFontSize;
    protected menu: UIMenu;
    protected input: Input;
    private lastPaddingScalar: number;
    public readonly type: UIElementType;
    public color: string;
    public stroke: boolean;
    public textShadow: number;
    protected abstract drawCb(context: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas): void;
    public constructor(menu: UIMenu, input: Input, type: UIElementType) {
        this.click = false;
        this.down = false;
        this._aabb = new AABB(new Vector2(1, 1), new Vector2());
        this._label = '';
        this.active = true;
        this.localAlignH = AlignH.Left;
        this.localAlignV = AlignV.Top;
        this.alignH = AlignH.Left;
        this.alignV = AlignV.Top;
        this.menu = menu;
        this.input = input;
        this.type = type;
        this._fontSize = UIFontSize.Medium;
        this.lastPaddingScalar = -1;
        this.color = '#333';
        this.stroke = type !== UIElementType.Text;
        this.textShadow = 0;

        this.id = UIElement.nextID++;
    }

    /**
     * 
     * Draw the UIElement for the first time.
     * 
     */
    public draw(): void {
        this.sprite = new Sprite(this.drawCb.bind(this));
    }
    public update(gameTime: GameTime): void {
        if (!this.active) return;

        const trigger = this.input.getButton(InputType.Trigger);
        const pointerPosition = new Vector2(this.input.getAxis(InputType.PointerPositionHorizontal).value, this.input.getAxis(InputType.PointerPositionVertical).value);

        this.down = trigger.down && this.aabb.intersectsPoint(pointerPosition);
        this.click = trigger.click && this.aabb.intersectsPoint(pointerPosition);

        if (!this.sprite) this.draw();
    }

    /**
     * 
     * Adjusts the AABB of this to fit the contents.
     * 
     */
    public fitText(paddingScalar: number): void {
        this.lastPaddingScalar = paddingScalar;
        if (this.type === UIElementType.Dropdown) {
            if ((<any>this).values.length === 0) return;
            let size = new Vector2();

            for (const val of (<any>this).values) {
                const m = this.menu.font.measureText(val, this.menu.font.getFont(Settings.mainFont, this.fontSize));
                if (m.x > size.x) size.x = m.x;
                if (m.y > size.y) size.y = m.y;
            }

            this.aabb = new AABB(new Vector2(~~Math.max(size.x * paddingScalar, 1), ~~Math.max(size.y * paddingScalar * ((<any>this).values.length + 1), 1)), this._aabb.position);
        } else {
            if (this.label.length === 0) return;

            const m = this.menu.font.measureText(this.label, this.menu.font.getFont(Settings.mainFont, this.fontSize));
            this.aabb = new AABB(new Vector2(~~Math.max(m.x * paddingScalar, 1), ~~Math.max(m.y * paddingScalar, 1)), this._aabb.position);
        }

        this.draw();
    }

    /**
     *
     * Absolute aabb of this, align is considered in position property.
     * 
     */
    public get aabb(): AABB {
        const localAlign = new Vector2(this.localAlignH === AlignH.Left ? 0 : this.localAlignH === AlignH.Center ? - this._aabb.size.x / 2 : - this._aabb.size.x, this.localAlignV === AlignV.Top ? 0 : this.localAlignV === AlignV.Center ? - this._aabb.size.y / 2 : - this._aabb.size.y);
        const globalAlign = new Vector2(this.alignH === AlignH.Left ? 0 : this.alignH === AlignH.Center ? this.menu.aabb.size.x / 2 : this.menu.aabb.size.x, this.alignV === AlignV.Top ? 0 : this.alignV === AlignV.Center ? this.menu.aabb.size.y / 2 : this.menu.aabb.size.y);

        return new AABB(this._aabb.size, this._aabb.position.clone.add(globalAlign).add(localAlign).round());
    }
    public set aabb(val: AABB) {
        this._aabb = val;
        this.draw();
    }

    /**
     *
     * The currently drawn label.
     * 
     */
    public get label(): string {
        return this._label;
    }
    public set label(val: string) {
        this._label = val;
        if (this.lastPaddingScalar !== -1) this.fitText(this.lastPaddingScalar);
        else this.draw();
    }

    /**
     *
     * The background image of this UIElement.
     * 
     */
    public get background(): Sprite | undefined {
        return this._background;
    }
    public set background(val: Sprite | undefined) {
        this._background = val;
        if (this.lastPaddingScalar !== -1) this.fitText(this.lastPaddingScalar);
        else this.draw();
    }
    public get fontSize(): UIFontSize {
        return this._fontSize;
    }
    public set fontSize(val: UIFontSize) {
        this._fontSize = val;
        if (this.lastPaddingScalar !== -1) this.fitText(this.lastPaddingScalar);
        else this.draw();
    }

    /**
     * 
     * Remove UIElement from menu.
     * 
     */
    public remove(): void {
        this.menu.removeUIElement(this.id);
    }
    public get currentFrame(): UIFrame {
        return new UIFrame(this.aabb, this.sprite || new Sprite(() => { }));
    }
}