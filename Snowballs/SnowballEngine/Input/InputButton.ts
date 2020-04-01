export class InputButton {
    private _down: boolean;
    private wasDown: boolean;
    private _clicked: boolean;
    public constructor() {
        this._down = false;
        this.wasDown = false;
        this._clicked = false;
    }
    public set down(val: boolean) {
        this._down = val;
    }
    public get down(): boolean {
        return this._down;
    }
    public get clicked(): boolean {
        return this._clicked;
    }
    public update(): void {
        if (!this.down) {
            this.wasDown = false;
            this._clicked = false;
            return;
        }

        if (this.down && !this.wasDown) this.wasDown = true;
        else if (this.down && this.wasDown && !this._clicked) this._clicked = true;
    }
}