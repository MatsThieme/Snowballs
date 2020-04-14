import { EnergyBoostBehaviour } from '../../../Behaviours/Scene/Items/EnergyBoostBehaviour.js';
import { CircleCollider, GameObject } from '../../../SnowballEngine/Scene.js';

export async function EnergyBoostPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.5;
        circleCollider.isTrigger = true;
    });

    await gameObject.addComponent(EnergyBoostBehaviour);
}