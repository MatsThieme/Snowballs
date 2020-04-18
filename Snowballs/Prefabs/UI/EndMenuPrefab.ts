import { AABB, AlignH, AlignV, Sprite, UIFontSize, UIMenu, UIText, Vector2, UIButton } from '../../SnowballEngine/Scene.js';

export function EndMenuPrefab(menu: UIMenu) {
    menu.aabb = new AABB(new Vector2(100, 100), new Vector2());
    menu.pauseScene = true;
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

        text.label = 'End';
        text.fontSize = UIFontSize.ExtraLarge;

        text.fitContent(1.5);

        text.aabb = new AABB(new Vector2(), new Vector2(0, 5));
    });

    menu.addUIElement(UIButton, button => {
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Center;

        button.cbOnInput = b => {
            location.reload();
        }

        button.label = 'Back to title';
        button.fontSize = UIFontSize.Large;

        button.fitContent(1.5);
    });
}