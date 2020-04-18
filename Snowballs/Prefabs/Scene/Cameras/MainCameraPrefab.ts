import { CameraFollowPlayersBehaviour } from '../../../Behaviours/Scene/Camera/CameraFollowPlayersBehaviour.js';
import { FreezeFarAwayObjectsBehaviour } from '../../../Behaviours/Scene/Camera/FreezeFarAwayObjectsBehaviour.js';
import { AudioListener, Camera, ClientInfo, GameObject, Vector2 } from '../../../SnowballEngine/Scene.js';
import { EndGameBehaviour } from '../../../Behaviours/Scene/Camera/EndGameBehaviour.js';

export async function MainCameraPrefab(gameObject: GameObject) {
    await gameObject.addComponent(Camera, camera => {
        camera.resolution = ClientInfo.resolution;
        camera.size = ClientInfo.aspectRatio;
    });

    gameObject.transform.relativePosition = new Vector2(0, 4.5);
    await gameObject.addComponent(CameraFollowPlayersBehaviour);
    await gameObject.addComponent(AudioListener);
    await gameObject.addComponent(FreezeFarAwayObjectsBehaviour);
    await gameObject.addComponent(EndGameBehaviour);
}