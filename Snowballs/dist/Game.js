var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor() {
        this.scene = new Scene();
        this.initialize(this.scene).then(() => this.scene.start());
    }
    initialize(scene) {
        return __awaiter(this, void 0, void 0, function* () {
            document.body.appendChild(scene.domElement);
            scene.loadingScreen = LoadingScreenPrefab;
            yield PreloadAssets('AssetList.json');
            yield FontLoader.load('Font/JosefinSlab-Regular.ttf', Settings.mainFont);
            yield scene.newGameObject('Camera', MainCameraPrefab);
            yield scene.newGameObject('Level', LevelPrefab);
            yield scene.newGameObject('Player1', PlayerPrefab, Player1Prefab);
            yield scene.newGameObject('Player2', PlayerPrefab, Player2Prefab);
            yield scene.newGameObject('Enemy Fire Weak Test', WeakEnemyPrefab, FireWeakEnemyPrefab, gO => {
                gO.transform.relativePosition = new Vector2(10, 10);
            });
            yield scene.ui.addMenu('Main Menu', MainMenuPrefab);
            yield scene.ui.addMenu('Pause Menu', PauseMenuPrefab);
            yield scene.ui.addMenu('Settings', SettingsMenuPrefab);
            yield scene.ui.addMenu('Credits', CreditsMenuPrefab);
            yield scene.ui.addMenu('debug overlay', DebugOverlayPrefab);
        });
    }
}
new Game();
