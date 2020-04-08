import { CameraManager } from './Camera/CameraManager.js';
import { Framedata } from './Framedata.js';
import { Behaviour } from './GameObject/Components/Behaviour.js';
import { Collider } from './GameObject/Components/Collider.js';
import { ComponentType } from './GameObject/Components/ComponentType.js';
import { GameObject } from './GameObject/GameObject.js';
import { GameTime } from './GameTime.js';
import { awaitPromises } from './Helpers.js';
import { Input } from './Input/Input.js';
import { Collision } from './Physics/Collision.js';
import { Physics } from './Physics/Physics.js';
import { UI } from './UI/UI.js';

export class Scene {
    public readonly domElement: HTMLCanvasElement;
    private gameObjects: Map<string, GameObject>;
    public cameraManager: CameraManager;
    public gameTime: GameTime;
    public input: Input;
    public ui: UI;
    private requestAnimationFrameHandle?: number;
    public framedata: Framedata;
    public loadingScreen?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => any;
    private loadingScreenInterval?: number;
    public hasAudioListener: boolean;
    public constructor() {
        this.domElement = document.createElement('canvas');
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = '0px';
        this.domElement.style.top = '0px';
        this.domElement.style.overflow = 'hidden';

        this.gameObjects = new Map();
        this.cameraManager = new CameraManager(this.domElement);
        this.gameTime = new GameTime();
        this.input = new Input(this);
        this.ui = new UI(this.input, this);
        this.framedata = new Framedata();
        this.hasAudioListener = false;


        this.stop();
    }

    /**
     * 
     * Returns GameObject if present in Scene.
     * 
     */
    public find(name: string): GameObject | undefined {
        return this.gameObjects.get(name) || this.gameObjects.get([...this.gameObjects.keys()].find(n => (n.match(/(.*) \(\d+\)/) || '')[1] === name) || '');
    }

    /**
     * 
     * Creates new GameObject with name and executes callbacks.
     * 
     */
    public async newGameObject(name: string, ...cb: ((gameObject: GameObject) => any)[]): Promise<GameObject> {
        const gameObject = new GameObject(name, this);
        this.gameObjects.set(gameObject.name, gameObject);
        if (cb) {
            for (const c of cb) {
                await c(gameObject);
            }
        }

        return gameObject;
    }

    /**
     * 
     * Updates...
     * gameTime
     * input
     * framedata
     * collider
     * collisions
     * rigidbodies
     * gameObjects
     * ui
     * cameraManager
     * 
     */
    private async update() {
        this.gameTime.update();

        this.input.update();

        this.framedata.update();

        if (!this.ui.pauseScene) {
            const gameObjects = this.getAllGameObjects();

            gameObjects.forEach(gO => gO.getComponents<Collider>(ComponentType.Collider).forEach(c => c.update(this.gameTime)));


            const idPairs: any = [];
            const collisionPromises: Promise<Collision>[] = [];


            const gOs = gameObjects.filter(gO => gO.active && gO.hasCollider && !gO.parent);

            for (const gO1 of gOs) {
                for (const gO2 of gOs) {
                    const id = gO1.id > gO2.id ? (gO1.id << 16) + gO2.id : (gO2.id << 16) + gO1.id;

                    if (gO1.id !== gO2.id && !idPairs[id]) {
                        const collisions = Physics.collision(gO1, gO2);
                        collisionPromises.push(...collisions);
                        idPairs[id] = 1;
                    }
                }
            }



            const collisions: Collision[] = [];

            for (const c of await awaitPromises(...collisionPromises)) {
                collisions.push(c);
            }


            gOs.forEach(gO => gO.rigidbody.update(this.gameTime, collisions));


            await awaitPromises(...gameObjects.map(gameObject => gameObject.update(this.gameTime, collisions)));


            this.cameraManager.update(this.getAllGameObjects());
        }

        this.ui.update(this.gameTime);

        this.cameraManager.drawUI(this.ui.currentFrame);


        if (this.requestAnimationFrameHandle) this.requestAnimationFrameHandle = requestAnimationFrame(this.update.bind(this));
    }

    /**
     * 
     * Returns all GameObjects in this Scene.
     * 
     */
    public getAllGameObjects(): GameObject[] {
        return [...this.gameObjects.values()];
    }

    /**
     * 
     * Start scene.
     * 
     */
    public async start(): Promise<void> {
        for (const gameObject of this.getAllGameObjects()) {
            await awaitPromises(...gameObject.getComponents<Behaviour>(ComponentType.Behaviour).map(b => b.start()));
        }

        this.requestAnimationFrameHandle = requestAnimationFrame(this.update.bind(this));
    }

    /**
     *
     * Stop scene.
     *
     */
    public stop(): void {
        if (this.requestAnimationFrameHandle) cancelAnimationFrame(this.requestAnimationFrameHandle);
        this.requestAnimationFrameHandle = undefined;

        if (!this.loadingScreenInterval) this.loadingScreenInterval = setInterval(<TimerHandler>(() => {
            if (this.loadingScreen && !this.isRunning) this.loadingScreen(<CanvasRenderingContext2D>(<any>this.cameraManager).context, <HTMLCanvasElement>(<any>this.cameraManager).context.canvas);
            else if (this.isRunning && this.loadingScreenInterval) {
                clearInterval(this.loadingScreenInterval);
                this.loadingScreenInterval = undefined;
            }
        }), 100);
    }

    /**
     * 
     * Returns true if animation loop is running.
     * 
     */
    public get isRunning(): boolean {
        return typeof this.requestAnimationFrameHandle === 'number';
    }

    /**
     * 
     * Remove gameObject from scene.
     * 
     */
    public destroyGameObject(name: string): void {
        this.gameObjects.delete(name);
    }
}

/**
 * 
 * 
 * to fix:
 * collision response
 * 
 * 
 * to test:
 * child collider
 * 
 * 
 * to do:
 * camera rotation
 * TilemapCollision contact points
 * 
 * 
 * optional optimisations:
 * polygon intersection: support points
 * replace line intersection with face clipping in collisionPolygon
 * store things computed multiple times, e.g. vector2 magnitude
 * 
 * 
 * optional features:
 * continuous collision
 * joints
 * extend particlesystem
 * tilemap vertical paralax background
 * 
 * 
 * to review:
 * coordinate system, scale, rotation, position
 * polygoncollider aabb topleft???
 * gameObject.active
 * 
 * 
 */

export * from './Angle.js';
export * from './Camera/CameraManager.js';
export * from './ClientInfo.js';
export * from './Face.js';
export * from './FontLoader.js';
export * from './Framedata.js';
export * from './GameObject/Align.js';
export * from './GameObject/Components/AnimatedSprite.js';
export * from './GameObject/Components/AudioListener.js';
export * from './GameObject/Components/AudioSource.js';
export * from './GameObject/Components/Behaviour.js';
export * from './GameObject/Components/Camera.js';
export * from './GameObject/Components/CircleCollider.js';
export * from './GameObject/Components/CircleRenderer.js';
export * from './GameObject/Components/Collider.js';
export * from './GameObject/Components/Component.js';
export * from './GameObject/Components/ComponentType.js';
export * from './GameObject/Components/ParticleSystem.js';
export * from './GameObject/Components/PolygonCollider.js';
export * from './GameObject/Components/PolygonRenderer.js';
export * from './GameObject/Components/RigidBody.js';
export * from './GameObject/Components/Texture.js';
export * from './GameObject/Components/TileMap.js';
export * from './GameObject/Components/Transform.js';
export * from './GameObject/GameObject.js';
export * from './GameTime.js';
export * from './Helpers.js';
export * from './Input/Input.js';
export * from './Input/InputAxis.js';
export * from './Input/InputButton.js';
export * from './Input/InputGamepad.js';
export * from './Input/InputKeyboard.js';
export * from './Input/InputMapping.js';
export * from './Input/InputMouse.js';
export * from './Input/InputType.js';
export * from './Line.js';
export * from './Noise.js';
export * from './Particle.js';
export * from './Physics/AABB.js';
export * from './Physics/Collision.js';
export * from './Physics/Physics.js';
export * from './Physics/PhysicsMaterial.js';
export * from './Projection.js';
export * from './Settings.js';
export * from './Sprite.js';
export * from './SpriteAnimation.js';
export * from './UI/UI.js';
export * from './UI/UIElements/UIButton.js';
export * from './UI/UIElements/UICheckbox.js';
export * from './UI/UIElements/UIDropdown.js';
export * from './UI/UIElements/UIElement.js';
export * from './UI/UIElements/UIInputField.js';
export * from './UI/UIElements/UINumberInputField.js';
export * from './UI/UIElements/UIText.js';
export * from './UI/UIElements/UITextInputField.js';
export * from './UI/UIElementType.js';
export * from './UI/UIFont.js';
export * from './UI/UIFontSize.js';
export * from './UI/UIFrame.js';
export * from './UI/UIMenu.js';
export * from './Vector2.js';
export * from './Worker/AsyncWorker.js';
