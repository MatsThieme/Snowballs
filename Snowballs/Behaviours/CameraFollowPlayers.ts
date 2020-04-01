import { Behaviour, Camera, ComponentType } from '../SnowballEngine/Scene.js';

export class CameraFollowPlayers extends Behaviour {
    public async update() {
        const player = this.scene.find('Player1');
        const camera = this.gameObject.getComponent<Camera>(ComponentType.Camera);

        const playerPosition = player?.transform.position.x;
        const cameraWidth = camera?.size.x;

        const scrollThreshold = 0.15;

        if (cameraWidth && playerPosition && cameraWidth * scrollThreshold < Math.abs(playerPosition - this.gameObject.transform.relativePosition.x)) {
            if (playerPosition - this.gameObject.transform.relativePosition.x < 0)
                this.gameObject.transform.relativePosition.x += ((playerPosition - this.gameObject.transform.relativePosition.x) + cameraWidth * scrollThreshold) / 10;
            else
                this.gameObject.transform.relativePosition.x += ((playerPosition - this.gameObject.transform.relativePosition.x) - cameraWidth * scrollThreshold) / 10;
        }
    }
}