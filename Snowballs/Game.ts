import { Player1MovementBehaviour } from './Behaviours/Player1MovementBehaviour.js';
import { Player2MovementBehaviour } from './Behaviours/Player2MovementBehaviour.js';
import { LoadingScreenPrefab } from './Prefabs/LoadingScreenPrefab.js';
import { MainCameraPrefab } from './Prefabs/Scene/Cameras/MainCameraPrefab.js';
import { TileMapPrefab } from './Prefabs/Scene/Level/TileMapPrefab.js';
import { PlayerPrefab } from './Prefabs/Scene/Players/PlayerPrefab.js';
import { DebugOverlayPrefab } from './Prefabs/UI/DebugOverlayPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenu/MainMenuPrefab.js';
import { PreloadAssets } from './SnowballEngine/LoadAssets.js';
import { FontLoader, Scene, Settings, Vector2 } from './SnowballEngine/Scene.js';

class Game {
    private scene: Scene;
    public constructor() {
        this.scene = new Scene();

        this.initialize(this.scene).then(() => this.scene.start());
    }
    private async initialize(scene: Scene): Promise<void> {
        document.body.appendChild(scene.domElement);
        scene.domElement.width = innerWidth;
        scene.domElement.height = innerHeight;

        scene.loadingScreen = LoadingScreenPrefab;

        await PreloadAssets('AssetList.json');
        await FontLoader.load('Font/JosefinSlab-Regular.ttf', Settings.mainFont);


        scene.newGameObject('Camera', MainCameraPrefab);

        scene.newGameObject('TileMap', TileMapPrefab);
        scene.newGameObject('Player1', PlayerPrefab, gameObject => {
            gameObject.addComponent(Player1MovementBehaviour);
            gameObject.transform.relativePosition = new Vector2(5, 10);
        });

        scene.newGameObject('Player2', PlayerPrefab, gameObject => {
            gameObject.addComponent(Player2MovementBehaviour);
            gameObject.transform.relativePosition = new Vector2(7, 10);
        });

        scene.ui.addMenu('Main Menu', MainMenuPrefab);

        scene.ui.addMenu('debug overlay', DebugOverlayPrefab);
    }
}

new Game();