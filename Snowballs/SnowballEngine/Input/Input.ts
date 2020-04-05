import { Scene } from '../Scene.js';
import { Vector2 } from '../Vector2.js';
import { InputAxis } from './InputAxis.js';
import { InputButton } from './InputButton.js';
import { InputGamepad } from './InputGamepad.js';
import { InputKeyboard } from './InputKeyboard.js';
import { InputMapping } from './InputMapping.js';
import { InputMouse } from './InputMouse.js';
import { InputType } from './InputType.js';

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

    /**
     * 
     * Returns a InputButton object mapped to the given inputtype.
     * 
     */
    public getButton(t: InputType): InputButton {
        if (['keyboard', 'mouse', 'gamepad'].map(n => this.inputMappingButtons[n][t]).filter(x => x).length === 0) return new InputButton();

        const btns: InputButton[] = [this.keyboard.getButton(<string>this.inputMappingButtons.keyboard[t]), this.mouse.getButton(<number>this.inputMappingButtons.mouse[t]), this.gamepad.getButton(<number>this.inputMappingButtons.gamepad[t])].filter(e => e && e.down != undefined).sort((a, b) => (b.down ? b.clicked ? 2 : 1 : 0) - (a.down ? a.clicked ? 2 : 1 : 0));

        return btns[0] || new InputButton();
    }

    /**
     * 
     * Returns the axis with the largest absolute value mapped to the given inputtype.
     * 
     */
    public getAxis(t: InputType): InputAxis {
        const axes: InputAxis[] = [this.keyboard.getAxis(<string>this.inputMappingAxes.keyboard[t]), this.mouse.getAxis(<number>this.inputMappingAxes.mouse[t]), this.gamepad.getAxis(<number>this.inputMappingAxes.gamepad[t])].filter(e => e && e.value != undefined).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

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