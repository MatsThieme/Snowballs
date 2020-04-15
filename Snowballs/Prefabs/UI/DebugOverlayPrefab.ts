import { AABB, UIFontSize, UIMenu, UIText, Vector2, ClientInfo, interval, AlignH } from '../../SnowballEngine/Scene.js';

export function DebugOverlayPrefab(menu: UIMenu): void {
    menu.aabb = new AABB(new Vector2(100, 100), new Vector2());
    menu.active = true;
    menu.pauseScene = false;
    menu.addUIElement(UIText, (text, scene) => {
        interval(() => text.label = scene.framedata.fps.toString(), 500);

        text.alignH = AlignH.Right;
        text.localAlignH = AlignH.Right;
        text.fontSize = UIFontSize.Small;
        text.fitContent(1.2);
    });
}