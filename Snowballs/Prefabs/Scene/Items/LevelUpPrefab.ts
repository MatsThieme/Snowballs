import { LevelUpBehaviour } from '../../../Behaviours/Scene/Items/LevelUpBehaviour.js';
import { CircleCollider, CircleRenderer, GameObject } from '../../../SnowballEngine/Scene.js';

export function LevelUpPrefab(gameObject: GameObject) {
    //gameObject.addComponent(Texture, texture => {
    //    texture.sprite = new Sprite('spriteTest1.png');
    //    texture.size = new Vector2(0.5, 0.5);
    //});

    gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.25;
        circleCollider.isTrigger = true;
    });

    gameObject.addComponent(CircleRenderer);
    gameObject.addComponent(LevelUpBehaviour);
}