import { Player1Behaviour } from '../../../Behaviours/Scene/Entities/Players/Player1Behaviour.js';
import { AnimatedSprite, GameObject, Sprite, SpriteAnimation, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function Player1Prefab(gameObject: GameObject) {
    gameObject.transform.relativePosition = new Vector2(5, 10);
    await gameObject.addComponent(AnimatedSprite, animatedSprite => {
        animatedSprite.size = new Vector2(2.3, 2.3);
        animatedSprite.spriteAnimations['idle left'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/idle0.png').mirrorX()], 0);
        animatedSprite.spriteAnimations['idle right'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/idle0.png')], 0);
        animatedSprite.spriteAnimations['run left'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/run0.png').mirrorX(), new Sprite('Images/Characters/PlayerSnow/run1.png').mirrorX()], 200);
        animatedSprite.spriteAnimations['run right'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/run0.png'), new Sprite('Images/Characters/PlayerSnow/run1.png')], 200);
        animatedSprite.spriteAnimations['jump left'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/jump0.png').mirrorX()], 200);
        animatedSprite.spriteAnimations['jump right'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/jump0.png')], 200);
        animatedSprite.spriteAnimations['attack left'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/attack0.png').mirrorX()], 200);
        animatedSprite.spriteAnimations['attack right'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/attack0.png')], 200);
        animatedSprite.activeAnimation = 'idle';
    });

    await gameObject.addComponent(Player1Behaviour);
}