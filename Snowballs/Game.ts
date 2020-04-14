import { LoadingScreenPrefab } from './Prefabs/LoadingScreenPrefab.js';
import { MainCameraPrefab } from './Prefabs/Scene/Cameras/MainCameraPrefab.js';
import { FireWeakEnemyPrefab } from './Prefabs/Scene/Enemies/FireWeakEnemyPrefab.js';
import { WeakEnemyPrefab } from './Prefabs/Scene/Enemies/WeakEnemyPrefab.js';
import { LevelPrefab } from './Prefabs/Scene/Level/LevelPrefab.js';
import { Player1Prefab } from './Prefabs/Scene/Players/Player1Prefab.js';
import { Player2Prefab } from './Prefabs/Scene/Players/Player2Prefab.js';
import { PlayerPrefab } from './Prefabs/Scene/Players/PlayerPrefab.js';
import { CreditsMenuPrefab } from './Prefabs/UI/CreditsMenuPrefab.js';
import { DebugOverlayPrefab } from './Prefabs/UI/DebugOverlayPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenuPrefab.js';
import { PauseMenuPrefab } from './Prefabs/UI/PauseMenuPrefab.js';
import { SettingsMenuPrefab } from './Prefabs/UI/SettingsMenuPrefab.js';
import { FontLoader, PreloadAssets, Scene, Settings, Vector2 } from './SnowballEngine/Scene.js';

class Game {
    private scene: Scene;
    public constructor() {
        this.scene = new Scene();

        this.initialize(this.scene).then(() => this.scene.start());
    }
    private async initialize(scene: Scene): Promise<void> {
        document.body.appendChild(scene.domElement);
        scene.domElement.style.position = 'absolute';
        scene.domElement.style.left = '0px';
        scene.domElement.style.top = '0px';
        scene.domElement.style.overflow = 'hidden';

        scene.loadingScreen = LoadingScreenPrefab;

        await PreloadAssets('AssetList.json');
        await FontLoader.load('Font/JosefinSlab-Regular.ttf', Settings.mainFont);


        await scene.newGameObject('Camera', MainCameraPrefab);


        await scene.newGameObject('Level', LevelPrefab);


        await scene.newGameObject('Player1', PlayerPrefab, Player1Prefab);

        await scene.newGameObject('Player2', PlayerPrefab, Player2Prefab);

        await scene.newGameObject('Enemy Fire Weak Test', WeakEnemyPrefab, FireWeakEnemyPrefab, gO => {
            gO.transform.relativePosition = new Vector2(10, 10);
        });

        await scene.ui.addMenu('Main Menu', MainMenuPrefab);

        await scene.ui.addMenu('Pause Menu', PauseMenuPrefab);

        await scene.ui.addMenu('Settings', SettingsMenuPrefab);

        await scene.ui.addMenu('Credits', CreditsMenuPrefab);

        await scene.ui.addMenu('debug overlay', DebugOverlayPrefab);
    }
}

new Game();