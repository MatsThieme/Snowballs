import { Collider } from '../GameObject/Components/Collider.js';
import { Vector2 } from '../Vector2.js';

export class AABB {
    public readonly size: Vector2;
    public readonly position: Vector2;
    public constructor(size: Vector2, position: Vector2) {
        this.size = size;
        this.position = position;
    }
    public intersects(other: AABB): boolean {
        return this.position.x < other.position.x + other.size.x && this.position.x + this.size.x > other.position.x && this.position.y > other.position.y - other.size.y && this.position.y - this.size.y < other.position.y;
    }
    public screenSpaceIntersects(other: AABB): boolean {
        return this.position.x < other.position.x + other.size.x && this.position.x + this.size.x > other.position.x && this.position.y < other.position.y + other.size.y && this.position.y + this.size.y > other.position.y;
    }
    public static intersects(collider1: Collider, collider2: Collider): boolean {
        return collider1.AABB.intersects(collider2.AABB);
    }
    public intersectsPoint(point: Vector2): boolean {
        return point.x > this.position.x && point.x < this.position.x + this.size.x && point.y > this.position.y && point.y < this.position.y + this.size.y;
    }
}