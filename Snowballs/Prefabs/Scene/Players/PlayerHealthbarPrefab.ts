import { StatusbarBehaviour } from '../../../Behaviours/StatusbarBehaviour.js';
import { GameObject, Sprite, Texture, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function PlayerHealthbarPrefab(gameObject: GameObject) {
    await gameObject.addComponent(Texture, async texture => {
        texture.sprite = new Sprite('Images/Characters/lifebar_player.png');

        texture.size = await new Promise(resolve => {
            (<HTMLImageElement>texture.sprite!.canvasImageSource).addEventListener('load', () => {
                if (texture.sprite) resolve(new Vector2(texture.sprite.canvasImageSource.width, texture.sprite.canvasImageSource.height).setLength(1));
            });
        });
    });

    gameObject.drawPriority = 10;
    gameObject.addComponent(StatusbarBehaviour);
}