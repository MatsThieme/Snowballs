import { LevelUpBehaviour } from '../../../Behaviours/Scene/Items/LevelUpBehaviour.js';
import { CircleCollider, GameObject, Sprite, Texture, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function LevelUpPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.25;
        circleCollider.isTrigger = true;
    });

    await gameObject.addComponent(Texture, texture => {
        texture.sprite = new Sprite('Images/Items/LevelUp.png');
        texture.size = new Vector2(0.9, 0.9);
    });

    await gameObject.addComponent(LevelUpBehaviour);
}