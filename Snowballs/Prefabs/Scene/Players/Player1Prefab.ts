import { EntityStatsBehaviour } from '../../../Behaviours/EntityStatsBehaviour.js';
import { Player1Behaviour } from '../../../Behaviours/Scene/Players/Player1Behaviour.js';
import { AnimatedSprite, GameObject, Sprite, SpriteAnimation, Vector2 } from '../../../SnowballEngine/Scene.js';

export function Player1Prefab(gameObject: GameObject) {
    gameObject.transform.relativePosition = new Vector2(5, 10);
    gameObject.addComponent(AnimatedSprite, animatedSprite => {
        animatedSprite.size = new Vector2(260, 573).setLength(2.5);
        animatedSprite.relativePosition = new Vector2(0.08, 0.35);
        animatedSprite.spriteAnimations['idle'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/idle0.png')], 0);
        animatedSprite.spriteAnimations['run left'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/run0.png').mirrorX(), new Sprite('Images/Characters/PlayerSnow/idle0.png').mirrorX()], 200);
        animatedSprite.spriteAnimations['run right'] = new SpriteAnimation([new Sprite('Images/Characters/PlayerSnow/run0.png'), new Sprite('Images/Characters/PlayerSnow/idle0.png')], 200);
        animatedSprite.activeAnimation = 'idle';
    });

    gameObject.addComponent(Player1Behaviour);
    gameObject.addComponent(EntityStatsBehaviour);
}