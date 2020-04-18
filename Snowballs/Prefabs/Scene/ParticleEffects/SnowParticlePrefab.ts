import { GameObject, ParticleSystem, Sprite, Vector2 } from '../../../SnowballEngine/Scene.js';

export async function SnowParticlePrefab(gameObject: GameObject) {
    await gameObject.addComponent(ParticleSystem, particleSystem => {
        particleSystem.lifeTime = 100;
        particleSystem.sprites = [new Sprite('Images/Items/snowball.png')];
        particleSystem.distance = 50;
        particleSystem.fadeInDuration = 25;
        particleSystem.fadeOutDuration = 25;
        particleSystem.emission = 5;
        particleSystem.maxParticles = 10;
        particleSystem.speed = 0.001;
        particleSystem.size = new Vector2(0.05, 0.05);
        particleSystem.angle.degree = 359.9;
    });

    setTimeout(() => gameObject.destroy(), 200);
}