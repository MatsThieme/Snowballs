import { EnergyBoostBehaviour } from '../../../Behaviours/Scene/Items/EnergyBoostBehaviour.js';
import { CircleCollider, GameObject } from '../../../SnowballEngine/Scene.js';

export function EnergyBoostPrefab(gameObject: GameObject) {
    gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.5;
        circleCollider.isTrigger = true;
    });

    gameObject.addComponent(EnergyBoostBehaviour);
}