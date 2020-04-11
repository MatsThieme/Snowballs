import { EnemyBehaviour } from '../../../Behaviours/Scene/Enemies/EnemyBehaviour.js';
import { EntityStatsBehaviour } from '../../../Behaviours/EntityStatsBehaviour.js';
import { CircleCollider, GameObject, PhysicsMaterial, Vector2 } from '../../../SnowballEngine/Scene.js';

export function WeakEnemyPrefab(gameObject: GameObject) {
    gameObject.addComponent(CircleCollider, circleCollider=> {
        circleCollider.material = new PhysicsMaterial(0, 1, 1);
        circleCollider.density = 0.5;
        circleCollider.radius = 0.5;
    });

    gameObject.addComponent(EntityStatsBehaviour);

    gameObject.addComponent(EnemyBehaviour);

    gameObject.transform.relativeScale = new Vector2(0.8, 0.8);

    gameObject.rigidbody.useAutoMass = true;
}