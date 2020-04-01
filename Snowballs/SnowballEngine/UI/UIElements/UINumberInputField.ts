import { Input } from '../../Input/Input.js';
import { UIElementType } from '../UIElementType.js';
import { UIMenu } from '../UIMenu.js';
import { UIInputField } from './UIInputField.js';

export class UINumberInputField extends UIInputField {
    public value: number;
    public constructor(menu: UIMenu, input: Input) {
        super(menu, input, UIElementType.NumberInputField);

        this.value = 0;
    }
}