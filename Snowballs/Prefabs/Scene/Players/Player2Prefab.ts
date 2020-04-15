import { Player2Behaviour } from '../../../Behaviours/Scene/Entities/Players/Player2Behaviour.js';
import { AnimatedSprite, GameObject, Sprite, SpriteAnimation, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function Player2Prefab(gameObject: GameObject) {
    gameObject.transform.relativePosition = new Vector2(7, 10);
    await gameObject.addComponent(AnimatedSprite, async animatedSprite => {
        animatedSprite.size = new Vector2(2.3, 2.3);
        animatedSprite.spriteAnimations['idle left'] = new SpriteAnimation([await new Sprite('Images/Characters/PlayerFire/idle0.png').mirrorX().load!], 0);
        animatedSprite.spriteAnimations['idle right'] = new SpriteAnimation([await new Sprite('Images/Characters/PlayerFire/idle0.png').load!], 0);
        animatedSprite.spriteAnimations['run left'] = new SpriteAnimation([await new Sprite('Images/Characters/PlayerFire/run0.png').mirrorX().load!, await new Sprite('Images/Characters/PlayerFire/run1.png').mirrorX().load!], 200);
        animatedSprite.spriteAnimations['run right'] = new SpriteAnimation([await new Sprite('Images/Characters/PlayerFire/run0.png').load!, await new Sprite('Images/Characters/PlayerFire/run1.png').load!], 200);
        animatedSprite.spriteAnimations['jump left'] = new SpriteAnimation([await new Sprite('Images/Characters/PlayerFire/jump0.png').mirrorX().load!], 200);
        animatedSprite.spriteAnimations['jump right'] = new SpriteAnimation([await new Sprite('Images/Characters/PlayerFire/jump0.png').load!], 200);
        animatedSprite.activeAnimation = 'idle';
    });

    await gameObject.addComponent(Player2Behaviour);
}