import { Behaviour, ComponentType, TileMap, Camera } from '../SnowballEngine/Scene.js';

export class TileMapBackgroundBehaviour extends Behaviour {
    async update() {
        const cam = this.scene.find('Camera')?.getComponent<Camera>(ComponentType.Camera);
        if (cam) this.gameObject.getComponent<TileMap>(ComponentType.TileMap)?.calculateBackgroundForCamera(cam);
    }
}