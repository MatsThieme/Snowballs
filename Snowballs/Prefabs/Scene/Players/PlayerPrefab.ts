import { PlayerMovementBehaviour } from '../../../Behaviours/PlayerMovementBehaviour.js';
import { GameObject, PhysicsMaterial, PolygonCollider, PolygonRenderer } from '../../../SnowballEngine/Scene.js';

export function PlayerPrefab(gameObject: GameObject) {
    gameObject.addComponent(PolygonCollider, polygonCollider => {
        polygonCollider.material = new PhysicsMaterial(0, 1, 1);
        polygonCollider.density = 0.5;
    });
    gameObject.addComponent(PolygonRenderer);
    gameObject.addComponent(PlayerMovementBehaviour);

    gameObject.transform.relativePosition.y = 9;
    gameObject.transform.relativePosition.x = 2;

    gameObject.transform.relativeScale.y = 2;

    gameObject.rigidbody.useAutoMass = true;
}