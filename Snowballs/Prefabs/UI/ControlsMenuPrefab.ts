import { AlignH, AlignV, UIButton, UIFontSize, UIMenu, UIText, Sprite, AABB, Vector2 } from '../../SnowballEngine/Scene.js';

export function ControlsMenuPrefab(menu: UIMenu) {
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

        text.label = 'Controls';

        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 3));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Player 1:';

        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 25));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Move left: a';

        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 30));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Move right: d';

        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 34));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Jump: spacebar';

        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 38));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Attack: e';

        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 42));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Player 2:';

        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 55));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Move left: arrow left';

        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 60));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Move right: arrow right';

        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 64));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Jump: numpad 0';

        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 68));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Attack: numpad 1';

        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 72));
    });

}