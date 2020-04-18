import { WeakSnowEnemyBehaviour } from '../../../Behaviours/Scene/Entities/Enemies/WeakSnowEnemyBehaviour.js';
import { AnimatedSprite, CircleCollider, GameObject, PhysicsMaterial, Sprite, SpriteAnimation, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function SnowWeakEnemyPrefab(gameObject: GameObject) {
    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.material = new PhysicsMaterial(0, 1, 1);
        circleCollider.density = 0.5;
        circleCollider.radius = 0.5;
    });

    gameObject.transform.relativeScale = new Vector2(0.8, 0.8);
    gameObject.rigidbody.useAutoMass = true;


    await gameObject.addComponent(AnimatedSprite, async animatedSprite => {
        animatedSprite.size = new Vector2(1.6, 1.6);
        animatedSprite.relativePosition = new Vector2(0, -0.145);

        animatedSprite.spriteAnimations['run right'] = new SpriteAnimation([await new Sprite('Images/Enemies/Snow/Weak/idle0.png').load!], 200);
        animatedSprite.spriteAnimations['run left'] = new SpriteAnimation([await new Sprite('Images/Enemies/Snow/Weak/idle0.png').mirrorX().load!], 200);
        animatedSprite.spriteAnimations['idle right'] = new SpriteAnimation([await new Sprite('Images/Enemies/Snow/Weak/idle0.png').load!], 200);
        animatedSprite.spriteAnimations['idle left'] = new SpriteAnimation([await new Sprite('Images/Enemies/Snow/Weak/idle0.png').mirrorX().load!], 200);
        animatedSprite.spriteAnimations['jump right'] = new SpriteAnimation([await new Sprite('Images/Enemies/Snow/Weak/jump0.png').load!], 200);
        animatedSprite.spriteAnimations['jump left'] = new SpriteAnimation([await new Sprite('Images/Enemies/Snow/Weak/jump0.png').mirrorX().load!], 200);
        animatedSprite.activeAnimation = 'idle right';
    });

    await gameObject.addComponent(WeakSnowEnemyBehaviour);
}