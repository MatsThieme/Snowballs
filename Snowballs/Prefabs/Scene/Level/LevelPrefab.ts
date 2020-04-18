import { TileMapBackgroundBehaviour } from '../../../Behaviours/Scene/Level/TileMapBackgroundBehaviour.js';
import { GameObject, Noise, PhysicsMaterial, Sprite, TileMap, Vector2 } from '../../../SnowballEngine/Scene.js';
import { FireWeakEnemyPrefab } from '../Enemies/FireWeakEnemyPrefab.js';
import { SnowWeakEnemyPrefab } from '../Enemies/SnowWeakEnemyPrefab.js';
import { FireBossEnemyPrefab } from '../Enemies/FireBossEnemyPrefab.js';

export async function LevelPrefab(gameObject: GameObject) {
    const tiles: string[][] = [
        [
            'Images/Snow/Tiles/left_top_corner.png',
            'Images/Snow/Tiles/right_top_corner.png',
            'Images/Snow/Tiles/left_top_right_top_corner.png',
            'Images/Snow/Tiles/bottom.png',
            'Images/Snow/Tiles/top.png',
            'Images/Snow/Tiles/left.png',
            'Images/Snow/Tiles/right.png',
            'Images/Snow/Tiles/left_right.png',
            'Images/Snow/Tiles/left_top.png',
            'Images/Snow/Tiles/left_bottom.png',
            'Images/Snow/Tiles/right_top.png',
            'Images/Snow/Tiles/right_bottom.png',
            'Images/Snow/Tiles/top_bottom.png',
            'Images/Snow/Tiles/left_top_bottom.png',
            'Images/Snow/Tiles/right_top_bottom.png',
            'Images/Snow/Tiles/left_right_bottom.png',
            'Images/Snow/Tiles/left_right_top.png',
            'Images/Snow/Tiles/left_right_top_bottom.png',
            'Images/Snow/Tiles/middle.png',
        ],
        [
            'Images/Fire/Tiles/left_top_corner.png',
            'Images/Fire/Tiles/right_top_corner.png',
            'Images/Fire/Tiles/left_top_right_top_corner.png',
            'Images/Fire/Tiles/bottom.png',
            'Images/Fire/Tiles/top.png',
            'Images/Fire/Tiles/left.png',
            'Images/Fire/Tiles/right.png',
            'Images/Fire/Tiles/left_right.png',
            'Images/Fire/Tiles/left_top.png',
            'Images/Fire/Tiles/left_bottom.png',
            'Images/Fire/Tiles/right_top.png',
            'Images/Fire/Tiles/right_bottom.png',
            'Images/Fire/Tiles/top_bottom.png',
            'Images/Fire/Tiles/left_top_bottom.png',
            'Images/Fire/Tiles/right_top_bottom.png',
            'Images/Fire/Tiles/left_right_bottom.png',
            'Images/Fire/Tiles/left_right_top.png',
            'Images/Fire/Tiles/left_right_top_bottom.png',
            'Images/Fire/Tiles/middle.png',
        ],
    ];

    const backgrounds: { distance: number, sprite: Sprite }[][] = [
        [
            { distance: 1000, sprite: new Sprite('Images/Snow/Background/sky.png') },
            { distance: 800, sprite: new Sprite('Images/Snow/Background/mountains.png') },
            { distance: 820, sprite: new Sprite('Images/Snow/Background/clouds_mountains.png') },
            { distance: 725, sprite: new Sprite('Images/Snow/Background/clouds.png') },
            { distance: 400, sprite: new Sprite('Images/Snow/Background/snowhill.png') }
        ],
        [
            { distance: 1000, sprite: new Sprite('Images/Fire/Background/sky.png') },
            { distance: 850, sprite: new Sprite('Images/Fire/Background/clouds_back.png') },
            { distance: 840, sprite: new Sprite('Images/Fire/Background/hill_back.png') },
            { distance: 800, sprite: new Sprite('Images/Fire/Background/smoke.png') },
            { distance: 725, sprite: new Sprite('Images/Fire/Background/lightning_back.png') },
            { distance: 625, sprite: new Sprite('Images/Fire/Background/hill_mid.png') },
            { distance: 550, sprite: new Sprite('Images/Fire/Background/tree_back.png') },
            { distance: 525, sprite: new Sprite('Images/Fire/Background/lightning_front.png') },
            { distance: 450, sprite: new Sprite('Images/Fire/Background/hill_front.png') },
            { distance: 425, sprite: new Sprite('Images/Fire/Background/clouds_front.png') },
            { distance: 350, sprite: new Sprite('Images/Fire/Background/tree_front.png') }
        ]
    ];

    const noise = new Noise(1000);
    const levelSize = new Vector2(500, 9);
    const flatnessScalar = 0.17;
    const levels = 2;
    const maxGroundHeight = 5;
    const enemiesPerLevel = 20;

    const map: string[][] = [];

    for (let y = 0; y < levelSize.y; y++) {
        map[y] = [];
        for (let x = 0; x < levelSize.x * levels; x++) {
            const height = noise.get(x * flatnessScalar) * maxGroundHeight;
            if (y === levelSize.y - 1 || y >= levelSize.y - height) map[y][x] = 'bla';
            else map[y][x] = '';
        }
    }


    await gameObject.addComponent(TileMap, tileMap => {
        for (let level = 1; level <= levels; level++) {
            const size = levelSize.clone.scale(new Vector2(level, 1));

            for (let y = 0; y < size.y; y++) {
                for (let x = size.x - levelSize.x; x < size.x; x++) {
                    if (map[y][x] !== '') {
                        const sy = map.length;
                        const sx = map[0].length;

                        const bottom = y + 1 >= sy || map[y + 1][x] !== '';
                        const top = y - 1 < 0 || map[y - 1][x] !== '';
                        const left = x - 1 < 0 || map[y][x - 1] !== '';
                        const right = x + 1 >= sx || map[y][x + 1] !== '';

                        const topRight = y - 1 > 0 && x + 1 < sx && top && right && !map[y - 1][x + 1];
                        const bottomRight = y + 1 < sy && x + 1 < sx && bottom && right && !map[y + 1][x + 1];
                        const topLeft = y - 1 >= 0 && x - 1 >= 0 && top && left && !map[y - 1][x - 1];
                        const bottomLeft = y + 1 < sy && x - 1 >= 0 && bottom && left && !map[y + 1][x - 1];


                        if (topLeft && !topRight) map[y][x] = tiles[level - 1][0];
                        else if (!topLeft && topRight) map[y][x] = tiles[level - 1][1];
                        else if (topLeft && topRight) map[y][x] = tiles[level - 1][2];
                        else if (!bottom && top && left && right) map[y][x] = tiles[level - 1][3];
                        else if (bottom && !top && left && right) map[y][x] = tiles[level - 1][4];
                        else if (bottom && top && !left && right) map[y][x] = tiles[level - 1][5];
                        else if (bottom && top && left && !right) map[y][x] = tiles[level - 1][6];
                        else if (bottom && top && !left && !right) map[y][x] = tiles[level - 1][7];
                        else if (bottom && !top && !left && right) map[y][x] = tiles[level - 1][8];
                        else if (!bottom && top && !left && right) map[y][x] = tiles[level - 1][9];
                        else if (bottom && !top && left && !right) map[y][x] = tiles[level - 1][10];
                        else if (!bottom && top && left && !right) map[y][x] = tiles[level - 1][11];
                        else if (!bottom && !top && left && right) map[y][x] = tiles[level - 1][12];
                        else if (!bottom && !top && !left && right) map[y][x] = tiles[level - 1][13];
                        else if (!bottom && !top && left && !right) map[y][x] = tiles[level - 1][14];
                        else if (!bottom && top && !left && !right) map[y][x] = tiles[level - 1][15];
                        else if (bottom && !top && !left && !right) map[y][x] = tiles[level - 1][16];
                        else if (!bottom && !top && !left && !right) map[y][x] = tiles[level - 1][17];
                        else if (bottom && top && left && right) map[y][x] = tiles[level - 1][18];
                    }
                }
            }

            tileMap.backgroundLayers.set(size.x - levelSize.x, backgrounds[level - 1]);
        }

        tileMap.tileMap = map;
        tileMap.material = new PhysicsMaterial(0, 1, 1);
    });

    gameObject.drawPriority = -1;
    await gameObject.addComponent(TileMapBackgroundBehaviour);

    for (let level = 1; level <= levels; level++) {
        for (let i = 0; i < enemiesPerLevel; i++) {
            if (level === 1) {
                await gameObject.scene.newGameObject('Enemy Snow Weak', SnowWeakEnemyPrefab, gO => {
                    gO.transform.relativePosition = new Vector2(i * (levelSize.x / enemiesPerLevel) + levelSize.x * (level - 1), 10);
                });
            } else if (level === 2) {
                await gameObject.scene.newGameObject('Enemy Fire Weak', FireWeakEnemyPrefab, gO => {
                    gO.transform.relativePosition = new Vector2(i * (levelSize.x / enemiesPerLevel) + levelSize.x * (level - 1), 10);
                });
            }
        }

        if (level === 1) {
            await gameObject.scene.newGameObject('Enemy Fire Boss', FireBossEnemyPrefab, gO => {
                gO.transform.relativePosition = new Vector2(levelSize.x * 0.9 + levelSize.x * (level - 1), 10);
            });
        } else if (level === 2) {
            await gameObject.scene.newGameObject('Enemy Fire Boss', FireBossEnemyPrefab, gO => {
                gO.transform.relativePosition = new Vector2(levelSize.x * 0.9 + levelSize.x * (level - 1), 10);
            });
        }
    }

    await gameObject.scene.newGameObject('Enemy Fire Boss', FireBossEnemyPrefab, gO => {
        gO.transform.relativePosition = new Vector2(20, 10);
    });
}