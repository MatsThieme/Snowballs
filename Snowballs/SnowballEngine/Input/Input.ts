import { Scene } from '../Scene.js';
import { InputAxis } from './InputAxis.js';
import { InputButton } from './InputButton.js';
import { InputGamepad } from './InputGamepad.js';
import { InputKeyboard } from './InputKeyboard.js';
import { InputMapping } from './InputMapping.js';
import { InputMouse } from './InputMouse.js';
import { InputType } from './InputType.js';
import { Vector2 } from '../Vector2.js';

export class Input {
    private mouse: InputMouse;
    private keyboard: InputKeyboard;
    private gamepad: InputGamepad;
    private inputMappingButtons: InputMapping;
    private inputMappingAxes: InputMapping;
    private scene: Scene;
    public constructor(scene: Scene) {
        this.mouse = new InputMouse();
        this.keyboard = new InputKeyboard();
        this.gamepad = new InputGamepad();
        this.scene = scene;

        this.inputMappingButtons = new InputMapping('InputMappingButtons.json');
        this.inputMappingAxes = new InputMapping('InputMappingAxes.json');
    }
    public getButton(t: InputType): InputButton {
        if (['keyboard', 'mouse', 'gamepad'].map(n => this.inputMappingButtons[n][t]).filter(x => x).length === 0) return new InputButton();

        const btns: InputButton[] = [this.keyboard.getButton(<string>this.inputMappingButtons.keyboard[t]), this.mouse.getButton(<number>this.inputMappingButtons.mouse[t]), this.gamepad.getButton(<number>this.inputMappingButtons.gamepad[t])].filter(e => e && e.down != undefined);

        for (const btn of btns) {
            if (btn.down) return btn;
        }

        return btns[0] || new InputButton();
    }
    public getAxis(t: InputType): InputAxis {

        const axes: InputAxis[] = [this.keyboard.getAxis(<string>this.inputMappingAxes.keyboard[t]), this.mouse.getAxis(<number>this.inputMappingAxes.mouse[t]), this.gamepad.getAxis(<number>this.inputMappingAxes.gamepad[t])].filter(e => e && e.value != undefined).sort((a, b) => Math.abs(a.value) > Math.abs(b.value) ? -1 : 1);

        for (const axis of axes) {
            if (axis.value && axis.value != 0) return axis;
        }

        return axes[0] || new InputAxis();
    }
    public update(): void {
        const diff = new Vector2(this.scene.domElement.getBoundingClientRect().x, this.scene.domElement.getBoundingClientRect().y);
        this.mouse.update(diff);
        this.keyboard.update();
        this.gamepad.update();
    }
}