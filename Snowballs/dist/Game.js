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
import { TileMapPrefab } from './Prefabs/Scene/Level/TileMapPrefab.js';
import { PlayerPrefab } from './Prefabs/Scene/Players/PlayerPrefab.js';
import { DebugOverlayPrefab } from './Prefabs/UI/DebugOverlayPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenu/MainMenuPrefab.js';
import { FontLoader, Scene, Settings } from './SnowballEngine/Scene.js';
class Game {
    constructor() {
        this.scene = new Scene();
        this.initialize(this.scene).then(() => this.scene.start());
    }
    initialize(scene) {
        return __awaiter(this, void 0, void 0, function* () {
            document.body.appendChild(scene.domElement);
            scene.domElement.width = 1920;
            scene.domElement.height = 1080;
            scene.loadingScreen = LoadingScreenPrefab;
            yield FontLoader.load('/Font/JosefinSlab-Regular.ttf', Settings.mainFont);
            scene.newGameObject('Camera', MainCameraPrefab);
            scene.newGameObject('TileMap', TileMapPrefab);
            scene.newGameObject('Player1', PlayerPrefab);
            scene.ui.addMenu('Main Menu', MainMenuPrefab);
            scene.ui.addMenu('debug overlay', DebugOverlayPrefab);
        });
    }
}
new Game();
// to fix:
// aabb tilemap
