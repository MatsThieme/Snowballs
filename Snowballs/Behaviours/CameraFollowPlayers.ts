import { Behaviour, Camera, ComponentType } from '../SnowballEngine/Scene.js';

export class CameraFollowPlayers extends Behaviour {
    public async update() {
        const player1 = this.scene.find('Player1');
        const player2 = this.scene.find('Player2');
        const camera = this.gameObject.getComponent<Camera>(ComponentType.Camera);

        if (!player1 || !player2 || !camera) return;

        const playerPosition = (player1.transform.position.x + player2.transform.position.x) / 2;
        const cameraWidth = camera.size.x;

        const scrollThreshold = 0.05;

        if (cameraWidth && playerPosition && cameraWidth * scrollThreshold < Math.abs(playerPosition - this.gameObject.transform.relativePosition.x)) {
            if (playerPosition - this.gameObject.transform.relativePosition.x < 0)
                this.gameObject.transform.relativePosition.x += ((playerPosition - this.gameObject.transform.relativePosition.x) + cameraWidth * scrollThreshold) / 10;
            else
                this.gameObject.transform.relativePosition.x += ((playerPosition - this.gameObject.transform.relativePosition.x) - cameraWidth * scrollThreshold) / 10;
        }
    }
}