import { HealthBoostBehaviour } from '../../../Behaviours/Scene/Items/HealthBoostBehaviour.js';
import { CircleCollider, GameObject } from '../../../SnowballEngine/Scene.js';

export function HealthBoostPrefab(gameObject: GameObject) {
    gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.5;
        circleCollider.isTrigger = true;
    });

    gameObject.addComponent(HealthBoostBehaviour);
}