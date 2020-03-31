var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Camera, FontLoader, Scene, Settings, Vector2 } from 'se';
import { LoadingScreenPrefab } from './Prefabs/LoadingScreenPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenu/MainMenuPrefab';
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
            yield FontLoader.load('Font/JosefinSlab-Regular.ttf', Settings.mainFont);
            scene.newGameObject('camera', gameObject => {
                gameObject.addComponent(Camera, camera => {
                    camera.resolution = new Vector2(1920, 1080);
                    camera.size = new Vector2(16, 9);
                });
            });
            scene.ui.addMenu('MainMenu', MainMenuPrefab);
        });
    }
}
new Game();
