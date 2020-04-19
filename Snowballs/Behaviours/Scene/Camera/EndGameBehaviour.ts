import { Behaviour, Camera, ComponentType, GameTime, Vector2 } from '../../../SnowballEngine/Scene.js';

export class EndGameBehaviour extends Behaviour {
    async update(gameTime: GameTime) {
        const camera = this.scene.find('Camera');

        const playerPositions = <Vector2[]>[this.scene.find('Player1')?.transform.position, this.scene.find('Player2')?.transform.position].filter(x => x);

        const playerAvgPosition = Vector2.average(...playerPositions);

        if (playerAvgPosition.x > camera!.transform.position.x + camera!.getComponent<Camera>(ComponentType.Camera)!.size.x / 4) this.scene.ui.menu('End Menu')!.active = true;
    }
}