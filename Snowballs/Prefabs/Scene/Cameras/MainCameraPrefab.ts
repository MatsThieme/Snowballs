import { CameraFollowPlayers } from '../../../Behaviours/Scene/Camera/CameraFollowPlayers.js';
import { FreezeFarAwayObjects } from '../../../Behaviours/Scene/Camera/FreezeFarAwayObjects.js';
import { AudioListener, Camera, ClientInfo, GameObject, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function MainCameraPrefab(gameObject: GameObject) {
    await gameObject.addComponent(Camera, camera => {
        camera.resolution = ClientInfo.resolution;
        camera.size = ClientInfo.aspectRatio;
    });

    gameObject.transform.relativePosition = new Vector2(0, 4.5);
    await gameObject.addComponent(CameraFollowPlayers);
    await gameObject.addComponent(AudioListener);
    await gameObject.addComponent(FreezeFarAwayObjects);
}