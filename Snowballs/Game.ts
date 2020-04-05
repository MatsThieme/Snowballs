import { LoadingScreenPrefab } from './Prefabs/LoadingScreenPrefab.js';
import { MainCameraPrefab } from './Prefabs/Scene/Cameras/MainCameraPrefab.js';
import { TileMapPrefab } from './Prefabs/Scene/Level/TileMapPrefab.js';
import { PlayerPrefab } from './Prefabs/Scene/Players/PlayerPrefab.js';
import { DebugOverlayPrefab } from './Prefabs/UI/DebugOverlayPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenu/MainMenuPrefab.js';
import { FontLoader, Scene, Settings } from './SnowballEngine/Scene.js';

class Game {
    private scene: Scene;
    public constructor() {
        this.scene = new Scene();

        this.initialize(this.scene).then(() => this.scene.start());
    }
    private async initialize(scene: Scene): Promise<void> {
        document.body.appendChild(scene.domElement);
        scene.domElement.width = 1920;
        scene.domElement.height = 1080;

        scene.loadingScreen = LoadingScreenPrefab;

        await FontLoader.load('/Font/JosefinSlab-Regular.ttf', Settings.mainFont);

        scene.newGameObject('Camera', MainCameraPrefab);

        scene.newGameObject('TileMap', TileMapPrefab);
        scene.newGameObject('Player1', PlayerPrefab);

        scene.ui.addMenu('Main Menu', MainMenuPrefab);

        scene.ui.addMenu('debug overlay', DebugOverlayPrefab);
    }
}

new Game();