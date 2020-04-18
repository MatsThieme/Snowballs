import { Behaviour, GameTime } from '../../../SnowballEngine/Scene.js';

export class EndGameBehaviour extends Behaviour {
    async update(gameTime: GameTime) {
        let enemiesAlive = false;

        for (const gO of this.scene.getAllGameObjects()) {
            if (gO.name.includes('Enemy')) {
                enemiesAlive = true;
                continue;
            }
        }

        if (!enemiesAlive) this.scene.ui.menu('End Menu')!.active = true;
    }
}