import { UIMenu, AlignH, AlignV, AABB, Vector2, UIButton, UIText, InputType, UIFontSize } from '../../SnowballEngine/Scene.js';

export function PauseMenuPrefab(menu: UIMenu) {
    menu.alignH = AlignH.Center;
    menu.alignV = AlignV.Center;
    menu.localAlignH = AlignH.Center;
    menu.localAlignV = AlignV.Center;

    menu.aabb = new AABB(new Vector2(700, 700), new Vector2());

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Top;

        text.fontSize = UIFontSize.Large;

        text.label = 'Pause';

        text.fitContent(1.4);
    });

    menu.addUIElement(UIButton, button => {
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Top;
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;

        button.fontSize = UIFontSize.Large;

        button.label = 'Settings';

        button.aabb = new AABB(new Vector2(), new Vector2(0, 100));

        button.fitContent(1.3);

        button.cbOnInput = b => {
            menu.active = false;
            menu.ui.menus['Settings'].active = true;
        };
    });

    menu.addUIElement(UIButton, button => {
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Top;
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;

        button.fontSize = UIFontSize.Large;

        button.label = 'Back to title';

        button.aabb = new AABB(new Vector2(), new Vector2(0, 170));

        button.fitContent(1.3);

        button.cbOnInput = b => {
            menu.active = false;
            menu.ui.menus['Main Menu'].active = true;
        };
    });

    menu.addUIElement(UIButton, button => {
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Top;
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;

        button.fontSize = UIFontSize.Large;

        button.label = 'Resume';

        button.aabb = new AABB(new Vector2(), new Vector2(0, 240));

        button.fitContent(1.3);

        button.cbOnInput = b => menu.active = false;
    });

    menu.ui.updates.push(gameTime => {
        if (menu.input.getButton(InputType.TogglePauseMenu).click && (!menu.ui.pauseScene || menu.active)) {
            menu.active = !menu.active;
        }
    });
}