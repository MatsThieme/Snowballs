import { TileMapBackgroundBehaviour } from '../../../Behaviours/TileMapBackgroundBehaviour.js';
import { GameObject, Noise, PhysicsMaterial, Sprite, TileMap, Vector2 } from '../../../SnowballEngine/Scene.js';

export function TileMapPrefab(gameObject: GameObject) {
    gameObject.addComponent(TileMap, tileMap => {
        const map: string[][] = [];
        const noise = new Noise(100);
        const maxGroundHeight = 5;
        const size = new Vector2(1000, 9);

        for (let y = 0; y < size.y; y++) {
            map[y] = [];
            for (let x = 0; x < size.x; x++) {
                const height = noise.get(x / 7) * maxGroundHeight;
                if (y === size.y - 1 || y >= size.y - height) map[y][x] = 'bla';
                else map[y][x] = '';
            }
        }

        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                if (map[y][x] !== '') {

                    const bottom = y + 1 >= size.y || map[y + 1][x] !== '';
                    const top = y - 1 < 0 || map[y - 1][x] !== '';
                    const left = x - 1 < 0 || map[y][x - 1] !== '';
                    const right = x + 1 >= size.x || map[y][x + 1] !== '';

                    const topRight = y - 1 > 0 && x + 1 < size.x && top && right && !map[y - 1][x + 1];
                    const bottomRight = y + 1 < size.y && x + 1 < size.x && bottom && right && !map[y + 1][x + 1];
                    const topLeft = y - 1 >= 0 && x - 1 >= 0 && top && left && !map[y - 1][x - 1];
                    const bottomLeft = y + 1 < size.y && x - 1 >= 0 && bottom && left && !map[y + 1][x - 1];


                    if (topLeft && !topRight) map[y][x] = 'Images/Snow/Tiles/left_top_corner.png';
                    else if (!topLeft && topRight) map[y][x] = 'Images/Snow/Tiles/right_top_corner.png';
                    else if (topLeft && topRight) map[y][x] = 'Images/Snow/Tiles/left_top_right_top_corner.png';
                    else if (!bottom && top && left && right) map[y][x] = 'Images/Snow/Tiles/bottom.png';
                    else if (bottom && !top && left && right) map[y][x] = 'Images/Snow/Tiles/top.png';
                    else if (bottom && top && !left && right) map[y][x] = 'Images/Snow/Tiles/left.png';
                    else if (bottom && top && left && !right) map[y][x] = 'Images/Snow/Tiles/right.png';
                    else if (bottom && top && !left && !right) map[y][x] = 'Images/Snow/Tiles/left_right.png';
                    else if (bottom && !top && !left && right) map[y][x] = 'Images/Snow/Tiles/left_top.png';
                    else if (!bottom && top && !left && right) map[y][x] = 'Images/Snow/Tiles/left_bottom.png';
                    else if (bottom && !top && left && !right) map[y][x] = 'Images/Snow/Tiles/right_top.png';
                    else if (!bottom && top && left && !right) map[y][x] = 'Images/Snow/Tiles/right_bottom.png';
                    else if (!bottom && !top && left && right) map[y][x] = 'Images/Snow/Tiles/top_bottom.png';
                    else if (!bottom && !top && !left && right) map[y][x] = 'Images/Snow/Tiles/left_top_bottom.png';
                    else if (!bottom && !top && left && !right) map[y][x] = 'Images/Snow/Tiles/right_top_bottom.png';
                    else if (!bottom && top && !left && !right) map[y][x] = 'Images/Snow/Tiles/left_right_bottom.png';
                    else if (bottom && !top && !left && !right) map[y][x] = 'Images/Snow/Tiles/left_right_top.png';
                    else if (!bottom && !top && !left && !right) map[y][x] = 'Images/Snow/Tiles/left_right_top_bottom.png';
                    else if (bottom && top && left && right) map[y][x] = 'Images/Snow/Tiles/middle.png';
                }
            }
        }

        tileMap.tileMap = map;
        tileMap.material = new PhysicsMaterial(0, 1, 1);
        //tileMap.backgroundLayers = [
        //    { distance: 1000, sprite: new Sprite('Images/Snow/Background/sky.png') },
        //    { distance: 800, sprite: new Sprite('Images/Snow/Background/mountains.png') },
        //    { distance: 820, sprite: new Sprite('Images/Snow/Background/clouds_mountains.png') },
        //    { distance: 725, sprite: new Sprite('Images/Snow/Background/clouds.png') },
        //    { distance: 400, sprite: new Sprite('Images/Snow/Background/snowhill.png') }];


        tileMap.backgroundLayers = [
            { distance: 1000, sprite: new Sprite('Images/Fire/Background/sky.png') },
            { distance: 850, sprite: new Sprite('Images/Fire/Background/hill_back.png') },
            { distance: 849, sprite: new Sprite('Images/Fire/Background/lightning.png') },
            { distance: 800, sprite: new Sprite('Images/Fire/Background/clouds_back.png') },
            { distance: 725, sprite: new Sprite('Images/Fire/Background/clouds.png') },
            { distance: 625, sprite: new Sprite('Images/Fire/Background/hill_mid.png') },   
            { distance: 550, sprite: new Sprite('Images/Fire/Background/lightning_mid.png') },
            { distance: 525, sprite: new Sprite('Images/Fire/Background/hill_front.png') }];
    });

    gameObject.drawPriority = -1;
    gameObject.addComponent(TileMapBackgroundBehaviour);
}