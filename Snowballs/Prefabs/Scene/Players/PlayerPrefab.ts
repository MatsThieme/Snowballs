import { GameObject, PhysicsMaterial, PolygonCollider, Vector2, PolygonRenderer } from '../../../SnowballEngine/Scene.js';

export async function PlayerPrefab(gameObject: GameObject) {
    await gameObject.addComponent(PolygonCollider, polygonCollider => {
        polygonCollider.material = new PhysicsMaterial(0, 1, 1);
        polygonCollider.density = 0.5;
        polygonCollider.vertices = [new Vector2(0.2), new Vector2(0, 2), new Vector2(0.9, 2), new Vector2(0.7), new Vector2(0, 0.3), new Vector2(0.9, 0.3)];
    });

    await gameObject.addComponent(PolygonRenderer);

    gameObject.rigidbody.useAutoMass = true;
}