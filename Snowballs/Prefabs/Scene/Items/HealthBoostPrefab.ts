import { HealthBoostBehaviour } from '../../../Behaviours/Scene/Items/HealthBoostBehaviour.js';
import { CircleCollider, GameObject } from '../../../SnowballEngine/Scene.js';

export async function HealthBoostPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.5;
        circleCollider.isTrigger = true;
    });

    await gameObject.addComponent(HealthBoostBehaviour);
}