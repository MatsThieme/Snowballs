import { AABB, AlignH, AlignV, ClientInfo, Sprite, UIButton, UIFontSize, UIMenu, Vector2, UIDropdown, UICheckbox, InputType, UIText } from '../../SnowballEngine/Scene.js';

export function MainMenuPrefab(menu: UIMenu) {
    menu.active = true;

    menu.background = new Sprite((context, canvas) => {
        canvas.width = menu.aabb.size.x;
        canvas.height = menu.aabb.size.y;

        context.fillStyle = '#fff';
        context.fillRect(0, 0, menu.aabb.size.x, menu.aabb.size.y);
    });

    menu.addUIElement(UIText, text => {
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Top;
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;

        text.label = 'Snowballs';
        text.fontSize = UIFontSize.ExtraLarge;

        text.fitContent(1.5);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 5));
    });

    menu.addUIElement(UIButton, button => {
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Center;

        button.cbOnInput = b => menu.active = false;

        button.label = 'Play';
        button.fontSize = UIFontSize.Large;

        button.aabb = new AABB(new Vector2(), new Vector2(0, -5));

        button.fitContent(1.5);
    });

    menu.addUIElement(UIButton, button => {
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Center;

        button.aabb = new AABB(new Vector2(), new Vector2(0, 10));

        button.cbOnInput = b => {
            menu.active = false;
            menu.ui.menu('Settings')!.active = true;
        };

        button.label = 'Settings';
        button.fontSize = UIFontSize.Medium;

        button.fitContent(1.3);
    });

    menu.addUIElement(UIButton, button => {
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Center;

        button.aabb = new AABB(new Vector2(), new Vector2(0, 19));

        button.cbOnInput = b => {
            menu.active = false;
            menu.ui.menu('Controls')!.active = true;
        };

        button.label = 'Controls';
        button.fontSize = UIFontSize.Medium;

        button.fitContent(1.3);
    });

    menu.addUIElement(UIButton, button => {
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Center;

        button.aabb = new AABB(new Vector2(), new Vector2(0, 28));

        button.cbOnInput = b => {
            menu.active = false;
            menu.ui.menu('Credits')!.active = true;
        };

        button.label = 'Credits';
        button.fontSize = UIFontSize.Medium;

        button.fitContent(1.3);
    });



    menu.addUIElement(UIButton, button => {
        button.localAlignH = AlignH.Right;
        button.localAlignV = AlignV.Bottom;
        button.alignH = AlignH.Right;
        button.alignV = AlignV.Bottom;

        button.cbOnInput = b => window.open('https://github.com/MatsThieme/SnowballEngine');

        button.label = 'Made with SnowballEngine';
        button.fontSize = UIFontSize.Small;

        button.fitContent(1.7);
    });

}