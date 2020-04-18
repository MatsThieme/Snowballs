import { BossFireEnemyBehaviour } from '../../../Behaviours/Scene/Entities/Enemies/BossFireEnemyBehaviour.js';
import { AnimatedSprite, GameObject, PhysicsMaterial, PolygonCollider, Sprite, SpriteAnimation, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function FireBossEnemyPrefab(gameObject: GameObject) {
    await gameObject.addComponent(PolygonCollider, polygonCollider => {
        polygonCollider.material = new PhysicsMaterial(0, 1, 1);
        polygonCollider.density = 1;
        polygonCollider.vertices = [new Vector2(), new Vector2(2.8, 4), new Vector2(0, 4), new Vector2(2.8, 0)];
    });

    gameObject.rigidbody.useAutoMass = true;


    await gameObject.addComponent(AnimatedSprite, async animatedSprite => {
        animatedSprite.size = new Vector2(5, 5);
        animatedSprite.spriteAnimations['idle right'] = new SpriteAnimation([await new Sprite('Images/Enemies/Fire/Boss/idle0.png').mirrorX().load!], 0);
        animatedSprite.spriteAnimations['idle left'] = new SpriteAnimation([await new Sprite('Images/Enemies/Fire/Boss/idle0.png').load!], 0);
        animatedSprite.spriteAnimations['attack far right'] = new SpriteAnimation([await new Sprite('Images/Enemies/Fire/Boss/attack_far0.png').mirrorX().load!, await new Sprite('Images/Enemies/Fire/Boss/idle0.png').mirrorX().load!, await new Sprite('Images/Enemies/Fire/Boss/idle0.png').mirrorX().load!], 400);
        animatedSprite.spriteAnimations['attack far left'] = new SpriteAnimation([await new Sprite('Images/Enemies/Fire/Boss/attack_far0.png').load!, await new Sprite('Images/Enemies/Fire/Boss/idle0.png').load!, await new Sprite('Images/Enemies/Fire/Boss/idle0.png').load!], 400);
        animatedSprite.spriteAnimations['attack close right'] = new SpriteAnimation([await new Sprite('Images/Enemies/Fire/Boss/attack_close0.png').mirrorX().load!, await new Sprite('Images/Enemies/Fire/Boss/idle0.png').mirrorX().load!, await new Sprite('Images/Enemies/Fire/Boss/idle0.png').mirrorX().load!], 1000 / 3);
        animatedSprite.spriteAnimations['attack close left'] = new SpriteAnimation([await new Sprite('Images/Enemies/Fire/Boss/attack_close0.png').load!, await new Sprite('Images/Enemies/Fire/Boss/idle0.png').load!, await new Sprite('Images/Enemies/Fire/Boss/idle0.png').load!], 1000 / 3);
        animatedSprite.spriteAnimations['death right'] = new SpriteAnimation([await new Sprite('Images/Enemies/Fire/Boss/death0.png').mirrorX().load!], 0);
        animatedSprite.spriteAnimations['death left'] = new SpriteAnimation([await new Sprite('Images/Enemies/Fire/Boss/death0.png').load!], 0);
        animatedSprite.activeAnimation = 'idle right';
    });

    await gameObject.addComponent(BossFireEnemyBehaviour);
}