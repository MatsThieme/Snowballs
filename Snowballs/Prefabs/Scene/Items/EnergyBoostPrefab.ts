import { EnergyBoostBehaviour } from '../../../Behaviours/Scene/Items/EnergyBoostBehaviour.js';
import { CircleCollider, GameObject, Sprite, Texture, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function EnergyBoostPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.1;
        circleCollider.isTrigger = true;
    });

    await gameObject.addComponent(Texture, texture => {
        texture.sprite = new Sprite('Images/Items/EnergyBoost.png');
        texture.size = new Vector2(0.6, 0.6);
    });

    await gameObject.addComponent(EnergyBoostBehaviour);
}