import { Player1Behaviour } from '../../../Behaviours/Player1Behaviour.js';
import { AnimatedSprite, GameObject, Sprite, SpriteAnimation, Vector2 } from '../../../SnowballEngine/Scene.js';

export function Player1Prefab(gameObject: GameObject) {
    gameObject.transform.relativePosition = new Vector2(5, 10);
    gameObject.addComponent(AnimatedSprite, animatedSprite => {
        animatedSprite.size = new Vector2(2, 2).scale(1.4);
        animatedSprite.spriteAnimations['idle'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/idle0.png')], 0);
        animatedSprite.spriteAnimations['run left'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/run0.png').mirrorX(), new Sprite('Images/Characters/PlayerSnow/idle0.png')], 200);
        animatedSprite.spriteAnimations['run right'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/run0.png'), new Sprite('Images/Characters/PlayerSnow/idle0.png')], 200);
        animatedSprite.activeAnimation = 'idle';
    });

    gameObject.addComponent(Player1Behaviour);
}