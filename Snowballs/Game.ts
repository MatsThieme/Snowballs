import { Camera, FontLoader, Scene, Settings, Vector2 } from 'se';
import { LoadingScreenPrefab } from './Prefabs/LoadingScreenPrefab.js';
import { MainMenuPrefab } from './Prefabs/UI/MainMenu/MainMenuPrefab';

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

        await FontLoader.load('Font/JosefinSlab-Regular.ttf', Settings.mainFont);

        scene.newGameObject('camera', gameObject => {
            gameObject.addComponent(Camera, camera => {
                camera.resolution = new Vector2(1920, 1080);
                camera.size = new Vector2(16, 9);
            });
        });


        scene.ui.addMenu('MainMenu', MainMenuPrefab);
    }
}

new Game();