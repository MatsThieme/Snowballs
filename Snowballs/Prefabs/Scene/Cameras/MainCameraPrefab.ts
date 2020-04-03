import { CameraFollowPlayers } from '../../../Behaviours/CameraFollowPlayers.js';
import { AudioListener, Camera, ClientInfo, GameObject, Vector2 } from '../../../SnowballEngine/Scene.js';

export function MainCameraPrefab(gameObject: GameObject) {
    gameObject.addComponent(Camera, camera => {
        camera.resolution = ClientInfo.resolution;
        camera.size = ClientInfo.aspectRatio;
    });

    gameObject.transform.relativePosition = new Vector2(0, 4.5);
    gameObject.addComponent(CameraFollowPlayers);
    gameObject.addComponent(AudioListener);
}