import { StatusbarBehaviour } from '../../../Behaviours/StatusbarBehaviour.js';
import { GameObject, Sprite, Texture } from '../../../SnowballEngine/Scene.js';

export async function EnemyHealthbarPrefab(gameObject: GameObject) {
    await gameObject.addComponent(Texture, async texture => {
        texture.sprite = new Sprite('Images/Characters/lifebar_enemy.png');

        texture.size = (await texture.sprite.load)!.size.clone.setLength(1);
    });

    gameObject.drawPriority = 10;
    await gameObject.addComponent(StatusbarBehaviour);
}