import { AnimatedSprite } from '../GameObject/Components/AnimatedSprite.js';
import { Camera } from '../GameObject/Components/Camera.js';
import { CircleRenderer } from '../GameObject/Components/CircleRenderer.js';
import { ComponentType } from '../GameObject/Components/ComponentType.js';
import { ParticleSystem } from '../GameObject/Components/ParticleSystem.js';
import { PolygonRenderer } from '../GameObject/Components/PolygonRenderer.js';
import { Texture } from '../GameObject/Components/Texture.js';
import { TileMap } from '../GameObject/Components/TileMap.js';
import { GameObject } from '../GameObject/GameObject.js';
import { UIFrame } from '../UI/UIFrame.js';
import { Frame } from './Frame.js';

export class CameraManager {
    private context: CanvasRenderingContext2D;
    public cameras: Camera[];
    public mainCameraIndex: number;
    public constructor(domElement: HTMLCanvasElement) {
        this.cameras = [];
        this.mainCameraIndex = 0;
        this.context = <CanvasRenderingContext2D>domElement.getContext('2d');
    }
    public get mainCamera(): Camera {
        return this.cameras[this.mainCameraIndex % this.cameras.length];
    }
    public update(gameObjects: GameObject[]) {
        this.context.canvas.width = this.mainCamera.resolution.x;
        this.context.canvas.height = this.mainCamera.resolution.y;

        this.context.imageSmoothingQuality = 'high';

        let frames: (Frame | undefined)[] = [];

        for (const gameObject of gameObjects) {
            if (!gameObject.active) continue;
            frames.push(...gameObject.getComponents<PolygonRenderer>(ComponentType.PolygonRenderer).map(pR => pR.currentFrame));
            frames.push(...gameObject.getComponents<CircleRenderer>(ComponentType.CircleRenderer).map(cR => cR.currentFrame));
            frames.push(...gameObject.getComponents<AnimatedSprite>(ComponentType.AnimatedSprite).map(aS => aS.currentFrame));
            frames.push(...gameObject.getComponents<Texture>(ComponentType.Texture).map(t => t.currentFrame));
            frames.push(...gameObject.getComponents<ParticleSystem>(ComponentType.ParticleSystem).reduce((t: Frame[], c) => { t.push(...(<Frame[]>c.currentFrame)); return t; }, []));
            frames.push(...gameObject.getComponents<TileMap>(ComponentType.TileMap).reduce((t: Frame[], c) => { t.push(...(<Frame[]>c.currentFrame)); return t; }, []));
        }

        frames = frames.filter(f => f).sort((a, b) => <number>a?.drawPriority - <number>b?.drawPriority);

        this.cameras.forEach(camera => camera.update(<Frame[]>frames));

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.drawImage(this.cameras[this.mainCameraIndex].currentFrame, 0, 0);
    }
    public drawUI(ui: UIFrame) {
        this.context.drawImage(ui.sprite.canvasImageSource, ui.aabb.position.x, ui.aabb.position.y, ui.aabb.size.x, ui.aabb.size.y);
    }
}