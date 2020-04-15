import { UIMenu, AlignH, AlignV, AABB, Vector2, UIButton, UIText, InputType, UIFontSize, Sprite } from '../../SnowballEngine/Scene.js';

export function PauseMenuPrefab(menu: UIMenu) {
    menu.alignH = AlignH.Center;
    menu.alignV = AlignV.Center;
    menu.localAlignH = AlignH.Center;
    menu.localAlignV = AlignV.Center;

    const color = '#fff';

    menu.background = new Sprite((context, canvas) => {
        context.fillStyle = '#333';
        context.globalAlpha = 0.2;
        context.fillRect(0, 0, canvas.width, canvas.height);
    });

    menu.aabb = new AABB(new Vector2(50, 60), new Vector2());

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Top;

        text.fontSize = UIFontSize.Large;

        text.label = 'Pause';

        text.fitContent(1.4);

        text.color = color;
    });

    menu.addUIElement(UIButton, button => {
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Top;
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;

        button.fontSize = UIFontSize.Small;

        button.label = 'Settings';

        button.aabb = new AABB(new Vector2(), new Vector2(0, 35));

        button.fitContent(1.4);

        button.cbOnInput = b => {
            menu.active = false;
            menu.ui.menu('Settings')!.active = true;
        };

        button.color = color;
    });

    menu.addUIElement(UIButton, button => {
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Top;
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;

        button.fontSize = UIFontSize.Small;

        button.label = 'Back to title';

        button.aabb = new AABB(new Vector2(), new Vector2(0, 55));

        button.fitContent(1.4);

        button.cbOnInput = b => {
            menu.active = false;
            menu.ui.menu('Main Menu')!.active = true;
        };

        button.color = color;
    });

    menu.addUIElement(UIButton, button => {
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Top;
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;

        button.fontSize = UIFontSize.Small;

        button.label = 'Resume';

        button.aabb = new AABB(new Vector2(), new Vector2(0, 75));

        button.fitContent(1.4);

        button.cbOnInput = b => menu.active = false;

        button.color = color;
    });

    menu.ui.updates.push(gameTime => {
        if (menu.input.getButton(InputType.TogglePauseMenu).click && (!menu.ui.pauseScene || menu.active)) {
            menu.active = !menu.active;
        }
    });
}