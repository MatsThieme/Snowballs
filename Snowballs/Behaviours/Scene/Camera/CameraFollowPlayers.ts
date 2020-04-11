import { average, Behaviour, Camera, clamp, ComponentType, TileMap } from '../../../SnowballEngine/Scene.js';

export class CameraFollowPlayers extends Behaviour {
    async update() {
        const player1 = this.scene.find('Player1');
        const player2 = this.scene.find('Player2');
        const camera = this.gameObject.getComponent<Camera>(ComponentType.Camera);

        if (!player1 && !player2 || !camera) return;

        const playerPosition = player1 && !player2 ? player1.transform.position.x : !player1 && player2 ? player2.transform.position.x : average((<any>player1).transform.position.x, (<any>player2).transform.position.x);
        const cameraWidth = camera.size.x;

        const scrollThreshold = 0.05;

        if (cameraWidth && playerPosition && cameraWidth * scrollThreshold < Math.abs(playerPosition - this.gameObject.transform.relativePosition.x)) {
            if (playerPosition - this.gameObject.transform.relativePosition.x < 0) this.gameObject.transform.relativePosition.x += ((playerPosition - this.gameObject.transform.relativePosition.x) + cameraWidth * scrollThreshold) / 10;
            else this.gameObject.transform.relativePosition.x += ((playerPosition - this.gameObject.transform.relativePosition.x) - cameraWidth * scrollThreshold) / 10;
        }

        const tileMap = this.scene.find('Level')?.getComponent<TileMap>(ComponentType.TileMap);

        if (tileMap)
            this.gameObject.transform.relativePosition.x = clamp(tileMap.position.x + camera.size.x / 2, tileMap.position.x + tileMap.scaledSize.x - camera.size.x / 2, this.gameObject.transform.relativePosition.x);
    }
} 