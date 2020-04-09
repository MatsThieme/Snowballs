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
import { LevelPrefab } from './Prefabs/Scene/Level/LevelPrefab.js';
import { Player1Prefab } from './Prefabs/Scene/Players/Player1Prefab.js';
import { Player2Prefab } from './Prefabs/Scene/Players/Player2Prefab.js';
import { PlayerPrefab } from './Prefabs/Scene/Players/PlayerPrefab.js';
import { DebugOverlayPrefab } from './Prefabs/UI/DebugOverlayPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenu/MainMenuPrefab.js';
import { PreloadAssets } from './SnowballEngine/LoadAssets.js';
import { FontLoader, Scene, Settings } from './SnowballEngine/Scene.js';
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
            scene.ui.addMenu('Main Menu', MainMenuPrefab);
            scene.ui.addMenu('debug overlay', DebugOverlayPrefab);
        });
    }
}
new Game();
