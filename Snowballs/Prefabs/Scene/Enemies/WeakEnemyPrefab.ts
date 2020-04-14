import { EnemyBehaviour } from '../../../Behaviours/Scene/Entities/Enemies/EnemyBehaviour.js';
import { EntityBehaviour } from '../../../Behaviours/Scene/Entities/EntityBehaviour.js';
import { CircleCollider, GameObject, PhysicsMaterial, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function WeakEnemyPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.material = new PhysicsMaterial(0, 1, 1);
        circleCollider.density = 0.5;
        circleCollider.radius = 0.5;
    });

    const eb = await gameObject.addComponent(EntityBehaviour);
    eb.maxHealth = 30;

    await gameObject.addComponent(EnemyBehaviour);

    gameObject.transform.relativeScale = new Vector2(0.8, 0.8);

    gameObject.rigidbody.useAutoMass = true;
}