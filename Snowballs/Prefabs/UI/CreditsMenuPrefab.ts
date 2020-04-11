import { AlignH, AlignV, UIButton, UIFontSize, UIMenu, UIText, Sprite, AABB, Vector2 } from '../../SnowballEngine/Scene.js';

export function CreditsMenuPrefab(menu: UIMenu) {
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
            menu.ui.menus[menu.ui.navigationHistory[1] || 'Main Menu'].active = true;
        };

        button.fontSize = UIFontSize.Small;

        button.fitContent(1.3);
    });


    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Top;

        text.fontSize = UIFontSize.Large;

        text.label = 'Credits';

        text.fitContent(1.4);
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Graphics design:';
        text.fitContent(1);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 200));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = '...';
        text.fitContent(1);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 250));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Programming:';
        text.fitContent(1);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 350));
    });

    menu.addUIElement(UIText, text => {
        text.alignH = AlignH.Center;
        text.alignV = AlignV.Top;
        text.localAlignH = AlignH.Center;
        text.localAlignV = AlignV.Center;

        text.label = 'Mats Thieme';
        text.fitContent(1);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 400));
    });
}