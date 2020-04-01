import { Vector2 } from '../Vector2.js';
import { InputAxis } from './InputAxis.js';
import { InputButton } from './InputButton.js';

export class InputMouse {
    private _position: Vector2;
    private buttons: InputButton[];
    private diff: Vector2;
    public constructor() {
        this.buttons = [new InputButton(), new InputButton(), new InputButton()];
        this._position = new Vector2();
        this.diff = new Vector2();

        window.addEventListener('mousedown', this.onMouseDown.bind(this));
        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('contextmenu', e => e.preventDefault());
    }
    private onMouseMove(e: MouseEvent): void {
        e.preventDefault();
        this._position.x = e.clientX;
        this._position.y = e.clientY;
        this._position.sub(this.diff);
    }
    private onMouseUp(e: MouseEvent): void {
        e.preventDefault();
        this._position.x = e.clientX;
        this._position.y = e.clientY;
        this._position.sub(this.diff);

        this.buttons[e.button].down = false;
    }
    private onMouseDown(e: MouseEvent): void {
        e.preventDefault();
        this._position.x = e.clientX;
        this._position.y = e.clientY;
        this._position.sub(this.diff);

        this.buttons[e.button].down = true;
    }
    public getButton(index: number): InputButton {
        return this.buttons[index];
    }
    public getAxis(index: number): InputAxis {
        return new InputAxis([this._position.x, this._position.y][index]);
    }
    public update(diff: Vector2): void {
        this.diff = diff;
        this.buttons.forEach(b => b.update());
    }
}