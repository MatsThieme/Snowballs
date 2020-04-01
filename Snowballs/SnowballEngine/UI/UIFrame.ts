import { AABB } from '../Physics/AABB.js';
import { Sprite } from '../Sprite.js';

export class UIFrame {
    public readonly aabb: AABB;
    public readonly sprite: Sprite;
    public constructor(aabb: AABB, sprite: Sprite) {
        this.aabb = aabb;
        this.sprite = sprite;
    }
}