import { MainCameraPrefab } from './Prefabs/Scene/Cameras/MainCameraPrefab.js';
import { LevelPrefab } from './Prefabs/Scene/Level/LevelPrefab.js';
import { Player1Prefab } from './Prefabs/Scene/Players/Player1Prefab.js';
import { Player2Prefab } from './Prefabs/Scene/Players/Player2Prefab.js';
import { PlayerPrefab } from './Prefabs/Scene/Players/PlayerPrefab.js';
import { ControlsMenuPrefab } from './Prefabs/UI/ControlsMenuPrefab.js';
import { CreditsMenuPrefab } from './Prefabs/UI/CreditsMenuPrefab.js';
import { DebugOverlayPrefab } from './Prefabs/UI/DebugOverlayPrefab.js';
import { EndMenuPrefab } from './Prefabs/UI/EndMenuPrefab.js';
import { LoadingScreenPrefab } from './Prefabs/UI/LoadingScreenPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenuPrefab.js';
import { PauseMenuPrefab } from './Prefabs/UI/PauseMenuPrefab.js';
import { SettingsMenuPrefab } from './Prefabs/UI/SettingsMenuPrefab.js';
import { FontLoader, PreloadAssets, Scene, Settings } from './SnowballEngine/Scene.js';

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



        await scene.ui.addMenu('Main Menu', MainMenuPrefab);

        await scene.ui.addMenu('Pause Menu', PauseMenuPrefab);

        await scene.ui.addMenu('Settings', SettingsMenuPrefab);

        await scene.ui.addMenu('Credits', CreditsMenuPrefab);

        await scene.ui.addMenu('Controls', ControlsMenuPrefab);

        await scene.ui.addMenu('End Menu', EndMenuPrefab);

        await scene.ui.addMenu('debug overlay', DebugOverlayPrefab);
    }
}

new Game();