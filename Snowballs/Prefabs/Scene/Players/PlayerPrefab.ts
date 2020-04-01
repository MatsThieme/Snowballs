import { PlayerMovementBehaviour } from '../../../Behaviours/PlayerMovementBehaviour.js';
import { GameObject, PhysicsMaterial, PolygonCollider, PolygonRenderer } from '../../../SnowballEngine/Scene.js';

export function PlayerPrefab(gameObject: GameObject) {
    gameObject.addComponent(PolygonCollider, polygonCollider => {
        polygonCollider.material = new PhysicsMaterial(0.3, 1, 1);
    });
    gameObject.addComponent(PolygonRenderer);
    gameObject.addComponent(PlayerMovementBehaviour);

    gameObject.transform.relativePosition.y = 2;
    gameObject.transform.relativePosition.x = -2;

    gameObject.rigidbody.useAutoMass = true;
}