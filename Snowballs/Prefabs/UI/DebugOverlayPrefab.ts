import { AABB, UIFontSize, UIMenu, UIText, Vector2 } from '../../SnowballEngine/Scene.js';

export function DebugOverlayPrefab(menu: UIMenu): void {
    menu.aabb = new AABB(new Vector2(1920, 1080), new Vector2());
    menu.active = true;
    menu.pauseScene = false;
    menu.addUIElement(UIText, (text, scene) => {
        text.aabb = new AABB(new Vector2(100, 50), new Vector2());
        text.fontSize = UIFontSize.Small;
        setInterval(() => text.label = scene.framedata.fps.toString(), 500);
    });
}