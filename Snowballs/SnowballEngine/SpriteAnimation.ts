import { GameTime } from './GameTime.js';
import { Sprite } from './Sprite.js';

export class SpriteAnimation {
    public sprites: Sprite[];
    public swapTime: number;
    private timer: number;
    public constructor(sprites: Sprite[], swapTime: number) {
        this.sprites = sprites;
        this.swapTime = swapTime || 1;
        this.timer = 0;
    }

    /*
     * 
     * Returns the current frame to render.
     * 
     */
    public get currentFrame(): Sprite {
        return this.sprites[this.currentIndex];
    }

    /**
     * 
     * Adds the deltaTime to timer property.
     * 
     */
    public update(gameTime: GameTime) {
        this.timer += gameTime.deltaTime;
        this.timer %= this.sprites.length * this.swapTime;
    }

    /**
     * 
     * Reset the animation timer.
     * 
     */
    public reset() {
        this.timer = 0;
    }
    private get currentIndex(): number {
        return Math.round(this.timer / this.swapTime) % this.sprites.length;
    }
}