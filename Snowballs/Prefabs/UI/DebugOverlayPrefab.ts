import { AABB, UIFontSize, UIMenu, UIText, Vector2, ClientInfo, interval, AlignH } from '../../SnowballEngine/Scene.js';

export function DebugOverlayPrefab(menu: UIMenu): void {
    menu.aabb = new AABB(new Vector2(100, 100), new Vector2());
    menu.active = true;
    menu.pauseScene = false;
    menu.addUIElement(UIText, (text, scene) => {
        text.alignH = AlignH.Right;
        text.localAlignH = AlignH.Right;
        text.aabb = new AABB(new Vector2(100, 50), new Vector2());
        text.fontSize = UIFontSize.Small;
        interval(() => text.label = scene.framedata.fps.toString(), 500);
        text.fitContent(1.2);
    });
}