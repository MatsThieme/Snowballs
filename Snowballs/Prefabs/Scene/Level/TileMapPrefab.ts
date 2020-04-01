import { TileMapBackgroundBehaviour } from '../../../Behaviours/TileMapBackgroundBehaviour.js';
import { GameObject, PhysicsMaterial, Sprite, TileMap } from '../../../SnowballEngine/Scene.js';
import { Noise } from '../../../SnowballEngine/Noise.js';

export function TileMapPrefab(gameObject: GameObject) {
    gameObject.addComponent(TileMap, tileMap => {
        const map: string[][] = [];
        const noise = new Noise(100);

        for (let y = 0; y < 9; y++) {
            map[y] = [];
            for (let x = 0; x < 1000; x++) {
                const height = noise.get(x / 5) * 5;
                if (y === 8 || y >= 9 - height) map[y][x] = 'spriteTest1.png';
                else map[y][x] = '';
            }
        }

        tileMap.tileMap = map;
        tileMap.material = new PhysicsMaterial(0, 1, 1);
        tileMap.backgroundLayers = [{ distance: 100, sprite: new Sprite('spriteTest1.png') }];
    });

    gameObject.drawPriority = -1;
    gameObject.addComponent(TileMapBackgroundBehaviour);
}