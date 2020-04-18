import { AABB, AlignH, AlignV, Sprite, UIButton, UIFontSize, UIMenu, UINumberInputField, UIText, Vector2, Settings, UIDropdown, UICheckbox } from '../../SnowballEngine/Scene.js';
import { PlayerPrefab } from '../Scene/Players/PlayerPrefab.js';
import { Player1Prefab } from '../Scene/Players/Player1Prefab.js';
import { Player2Prefab } from '../Scene/Players/Player2Prefab.js';

export function SettingsMenuPrefab(menu: UIMenu) {
    menu.background = new Sprite((context, canvas) => {
        canvas.width = menu.aabb.size.x;
        canvas.height = menu.aabb.size.y;

        context.fillStyle = '#fff';
        context.fillRect(0, 0, menu.aabb.size.x, menu.aabb.size.y);
    });

    menu.addUIElement(UIButton, button => {
        button.label = 'back';

        button.cbOnInput = b => {
            menu.active = false;
            menu.ui.menu(menu.ui.navigationHistory[1] || 'Main Menu')!.active = true;
        };

        button.fontSize = UIFontSize.Small;

        button.fitContent(1.5);
    });


    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Top;

        text.fontSize = UIFontSize.ExtraLarge;

        text.label = 'Settings';

        text.fitContent(1.4);
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Volume:';
        text.fitContent(1);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 25));
    });

    menu.addUIElement(UINumberInputField, numberInputField => {
        numberInputField.alignH = AlignH.Center;
        numberInputField.alignV = AlignV.Top;
        numberInputField.localAlignH = AlignH.Center;
        numberInputField.localAlignV = AlignV.Center;

        numberInputField.max = 5;

        numberInputField.value = 1;

        numberInputField.cbOnInput = numberInputField => Settings.volume = numberInputField.value;

        numberInputField.aabb = new AABB(new Vector2(5, 7), new Vector2(0, 33));
    });

    menu.addUIElement(UICheckbox, checkbox => {
        checkbox.alignH = AlignH.Center;
        checkbox.alignV = AlignV.Top;
        checkbox.localAlignH = AlignH.Center;
        checkbox.localAlignV = AlignV.Center;

        checkbox.label = 'Player 1';
        checkbox.fitContent(1);

        checkbox.cbOnInput = async c => {
            if (c.checked) {
                if (!menu.scene.find('Player1')) await menu.scene.newGameObject('Player1', PlayerPrefab, Player1Prefab);
            } else menu.scene.find('Player1')?.destroy();
        };

        checkbox.checked = true;

        checkbox.aabb = new AABB(new Vector2(), new Vector2(-15, 50));
    });

    menu.addUIElement(UICheckbox, checkbox => {
        checkbox.alignH = AlignH.Center;
        checkbox.alignV = AlignV.Top;
        checkbox.localAlignH = AlignH.Center;
        checkbox.localAlignV = AlignV.Center;

        checkbox.label = 'Player 2';
        checkbox.fitContent(1);

        checkbox.cbOnInput = async c => {
            if (c.checked) {
                if (!menu.scene.find('Player2')) await menu.scene.newGameObject('Player2', PlayerPrefab, Player2Prefab);
            } else menu.scene.find('Player2')?.destroy();
        };

        checkbox.checked = true;

        checkbox.aabb = new AABB(new Vector2(), new Vector2(15, 50));
    });
}