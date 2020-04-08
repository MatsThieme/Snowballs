import { LoadingScreenPrefab } from './Prefabs/LoadingScreenPrefab.js';
import { MainCameraPrefab } from './Prefabs/Scene/Cameras/MainCameraPrefab.js';
import { TileMapPrefab } from './Prefabs/Scene/Level/TileMapPrefab.js';
import { Player1Prefab } from './Prefabs/Scene/Players/Player1Prefab.js';
import { Player2Prefab } from './Prefabs/Scene/Players/Player2Prefab.js';
import { PlayerPrefab } from './Prefabs/Scene/Players/PlayerPrefab.js';
import { DebugOverlayPrefab } from './Prefabs/UI/DebugOverlayPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenu/MainMenuPrefab.js';
import { PreloadAssets } from './SnowballEngine/LoadAssets.js';
import { FontLoader, Scene, Settings } from './SnowballEngine/Scene.js';

class Game {
    private scene: Scene;
    public constructor() {
        this.scene = new Scene();

        this.initialize(this.scene).then(() => this.scene.start());
    }
    private async initialize(scene: Scene): Promise<void> {
        document.body.appendChild(scene.domElement);

        scene.loadingScreen = LoadingScreenPrefab;

        await PreloadAssets('AssetList.json');
        await FontLoader.load('Font/JosefinSlab-Regular.ttf', Settings.mainFont);


        await scene.newGameObject('Camera', MainCameraPrefab);

        await scene.newGameObject('TileMap', TileMapPrefab);


        await scene.newGameObject('Player1', PlayerPrefab, Player1Prefab);

        await scene.newGameObject('Player2', PlayerPrefab, Player2Prefab);

        scene.ui.addMenu('Main Menu', MainMenuPrefab);

        scene.ui.addMenu('debug overlay', DebugOverlayPrefab);
    }
}

new Game();