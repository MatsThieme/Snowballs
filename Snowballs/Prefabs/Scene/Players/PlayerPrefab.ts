import { GameObject, PhysicsMaterial, PolygonCollider, PolygonRenderer } from '../../../SnowballEngine/Scene.js';

export function PlayerPrefab(gameObject: GameObject) {
    gameObject.addComponent(PolygonCollider, polygonCollider => {
        polygonCollider.material = new PhysicsMaterial(0, 1, 1);
        polygonCollider.density = 0.5;
    });
    gameObject.addComponent(PolygonRenderer);

    gameObject.transform.relativeScale.y = 2;

    gameObject.rigidbody.useAutoMass = true;
}