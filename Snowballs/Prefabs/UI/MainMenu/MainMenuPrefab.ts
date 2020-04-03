import { AABB, AlignH, AlignV, ClientInfo, Sprite, UIButton, UIFontSize, UIMenu, Vector2 } from '../../../SnowballEngine/Scene.js';

export function MainMenuPrefab(menu: UIMenu) {
    menu.aabb = new AABB(ClientInfo.resolution, new Vector2());
    menu.active = true;
    menu.pauseScene = true;
    menu.background = new Sprite((context, canvas) => {
        canvas.width = menu.aabb.size.x;
        canvas.height = menu.aabb.size.y;

        context.fillStyle = '#fff';
        context.fillRect(0, 0, menu.aabb.size.x, menu.aabb.size.y);
    });

    menu.addUIElement(UIButton, button => {
        button.localAlignH = AlignH.Center;
        button.localAlignV = AlignV.Center;
        button.alignH = AlignH.Center;
        button.alignV = AlignV.Center;
        button.cbOnInput = b => menu.active = !menu.active;
        button.label = 'play';
        button.fontSize = UIFontSize.Large;

        button.fitText(1.3);
    });
}