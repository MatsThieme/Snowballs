import { LevelUpBehaviour } from '../../../Behaviours/Scene/Items/LevelUpBehaviour.js';
import { CircleCollider, CircleRenderer, GameObject } from '../../../SnowballEngine/Scene.js';

export async function LevelUpPrefab(gameObject: GameObject) {
    //await gameObject.addComponent(Texture, texture => {
    //    texture.sprite = new Sprite('spriteTest1.png');
    //    texture.size = new Vector2(0.5, 0.5);
    //});

    await gameObject.addComponent(CircleCollider, circleCollider => {
        circleCollider.radius = 0.25;
        circleCollider.isTrigger = true;
    });

    await gameObject.addComponent(CircleRenderer);
    await gameObject.addComponent(LevelUpBehaviour);
}