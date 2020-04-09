import { GameObject, PhysicsMaterial, PolygonCollider, Vector2 } from '../../../SnowballEngine/Scene.js';

export function PlayerPrefab(gameObject: GameObject) {
    gameObject.addComponent(PolygonCollider, polygonCollider => {
        polygonCollider.material = new PhysicsMaterial(0, 1, 1);
        polygonCollider.density = 0.5;
        polygonCollider.vertices = [new Vector2(), new Vector2(0, 2), new Vector2(0.9, 2), new Vector2(0.9, 0)];
    });

    gameObject.rigidbody.useAutoMass = true;
}