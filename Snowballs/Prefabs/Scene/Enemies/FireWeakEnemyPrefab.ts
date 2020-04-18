import { WeakFireEnemyBehaviour } from '../../../Behaviours/Scene/Entities/Enemies/WeakFireEnemyBehaviour.js';
import { AnimatedSprite, CircleCollider, GameObject, PhysicsMaterial, Sprite, SpriteAnimation, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function FireWeakEnemyPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.material = new PhysicsMaterial(0, 1, 1);
        circleCollider.density = 0.5;
        circleCollider.radius = 0.5;
    });

    gameObject.transform.relativeScale = new Vector2(0.8, 0.8);
    gameObject.rigidbody.useAutoMass = true;


    await gameObject.addComponent(AnimatedSprite, animatedSprite => {
        animatedSprite.size = new Vector2(1.7, 1.7);
        animatedSprite.spriteAnimations['idle'] = new SpriteAnimation([new Sprite('Images/Enemies/Fire/Weak/idle0.png'), new Sprite('Images/Enemies/Fire/Weak/idle1.png')], 200);
        animatedSprite.activeAnimation = 'idle';
    });

    await gameObject.addComponent(WeakFireEnemyBehaviour);
}