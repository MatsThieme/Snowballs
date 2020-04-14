import { CircleCollider, GameObject, PhysicsMaterial, Vector2 } from '../../../SnowballEngine/Scene.js';
import { WeakEnemyBehaviour } from '../../../Behaviours/Scene/Entities/Enemies/WeakEnemyBehaviour.js';

export async function WeakEnemyPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.material = new PhysicsMaterial(0, 1, 1);
        circleCollider.density = 0.5;
        circleCollider.radius = 0.5;
    });

    const weakEnemyBehaviour = await gameObject.addComponent(WeakEnemyBehaviour);
    weakEnemyBehaviour.maxHealth = 30;


    gameObject.transform.relativeScale = new Vector2(0.8, 0.8);

    gameObject.rigidbody.useAutoMass = true;
}