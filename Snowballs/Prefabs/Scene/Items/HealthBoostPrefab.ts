import { HealthBoostBehaviour } from '../../../Behaviours/Scene/Items/HealthBoostBehaviour.js';
import { CircleCollider, GameObject, Sprite, Texture, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function HealthBoostPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.1;
        circleCollider.isTrigger = true;
    });

    await gameObject.addComponent(Texture, texture => {
        texture.sprite = new Sprite('Images/Items/HealthBoost.png');
        texture.size = new Vector2(1, 1);
    });

    await gameObject.addComponent(HealthBoostBehaviour);
}