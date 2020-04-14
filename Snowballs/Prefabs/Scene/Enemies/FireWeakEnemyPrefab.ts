import { AnimatedSprite, GameObject, Sprite, SpriteAnimation, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function FireWeakEnemyPrefab(gameObject: GameObject) {
    await gameObject.addComponent(AnimatedSprite, animatedSprite => {
        animatedSprite.size = new Vector2(1.7, 1.7);
        animatedSprite.spriteAnimations['idle'] = new SpriteAnimation([new Sprite('Images/Enemies/Fire/Weak/idle0.png'), new Sprite('Images/Enemies/Fire/Weak/idle1.png')], 200);
        animatedSprite.activeAnimation = 'idle';
    });
}