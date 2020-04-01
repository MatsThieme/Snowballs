import { Face } from '../../Face.js';
import { GameTime } from '../../GameTime.js';
import { AABB } from '../../Physics/AABB.js';
import { PhysicsMaterial } from '../../Physics/PhysicsMaterial.js';
import { Projection } from '../../Projection.js';
import { Vector2 } from '../../Vector2.js';
import { AlignH, AlignV } from '../Align.js';
import { GameObject } from '../GameObject.js';
import { Collider } from './Collider.js';
import { ComponentType } from './ComponentType.js';

// Polygoncollider should have a relativePosition of 0, 0
export class PolygonCollider extends Collider {
    protected _aabb: AABB;
    protected _area: number;
    public scaledSize: Vector2;
    private _vertices: Vector2[];
    private _computedVertices: Vector2[];
    public faces: Face[];
    public constructor(gameObject: GameObject, relativePosition: Vector2 = new Vector2(), material: PhysicsMaterial = new PhysicsMaterial(), density: number = 1, vertices: Vector2[] = [new Vector2(0, 0), new Vector2(1, 1), new Vector2(0, 1), new Vector2(1, 0)], alignH: AlignH = AlignH.Center, alignV: AlignV = AlignV.Center) {
        super(gameObject, ComponentType.PolygonCollider, relativePosition, material, density, alignH, alignV);

        this.scaledSize = this.computeSize(vertices);
        this._vertices = this.orderVertices(vertices);
        this.faces = this.computeFaces(this._vertices);
        this._area = this.computeArea();
        this._aabb = this.computeAABB();
        this.gameObject.rigidbody.updateInertia();
        this._computedVertices = this._vertices.map(v => v.clone.scale(this.gameObject.transform.relativeScale).rotateAroundTo(new Vector2(), this.gameObject.transform.relativeRotation).add(this.position));
    }
    public set vertices(vertices: Vector2[]) {
        this.scaledSize = this.computeSize(vertices);
        this._vertices = this.orderVertices(vertices);
        this.faces = this.computeFaces(this._vertices);
        this._area = this.computeArea();
        this._aabb = this.computeAABB();
        this.gameObject.rigidbody.updateInertia();
        this._computedVertices = this._vertices.map(v => v.clone.scale(this.gameObject.transform.relativeScale).rotateAroundTo(new Vector2(), this.gameObject.transform.relativeRotation).add(this.position));
    }
    public get vertices(): Vector2[] {
        return this._vertices.map(v => v.clone.scale(this.gameObject.transform.relativeScale).rotateAroundTo(new Vector2(), this.gameObject.transform.relativeRotation).add(this.position));
    }
    public centerPointsAt(vertices: Vector2[], center: Vector2 = new Vector2()): Vector2[] {
        const difference = Vector2.average(...vertices);

        for (const vertex of vertices) {
            vertex.sub(difference).add(center);
        }

        return vertices;
    }
    private computeSize(vertices: Vector2[]): Vector2 {
        let maxX = -Infinity, minX = Infinity, maxY = -Infinity, minY = Infinity;

        for (const vertex of vertices) {
            if (vertex.x < minX) minX = vertex.x;
            if (vertex.x > maxX) maxX = vertex.x;
            if (vertex.y < minY) minY = vertex.y;
            if (vertex.y > maxY) maxY = vertex.y;
        }

        return new Vector2(maxX - minX, maxY - minY);
    }
    private orderVertices(vertices: Vector2[]): Vector2[] {
        return this.centerPointsAt(vertices).sort((a, b) => Vector2.up.angleTo(new Vector2(), a).degree - Vector2.up.angleTo(new Vector2(), b).degree);
    }
    private computeFaces(vertices: Vector2[]): Face[] {
        const faces = [];

        for (let i = 0; i < vertices.length; i++) {
            faces.push(new Face(vertices[i], vertices[(i + 1) % vertices.length]));
        }

        return faces;
    }
    public project(axis: Vector2): Projection { // x=min, y=max
        let min = Infinity;
        let max = -Infinity;
        let minVertex!: Vector2;
        let maxVertex!: Vector2;


        for (const vertex of this.vertices) {
            const product = Vector2.dot(axis, vertex);
            if (product < min) {
                min = product;
                minVertex = vertex;
            }
            if (product > max) {
                max = product;
                maxVertex = vertex;
            }
        }

        return new Projection(min, max, minVertex, maxVertex);
    }
    private computeArea(): number {
        let area = 0;
        const vertices = this.vertices;

        for (let i = 1; i < vertices.length; i++) {
            area += (vertices[i - 1].x + vertices[i].x) * (vertices[i - 1].y - vertices[i].y);
        }

        return area / 2;
    }
    private computeAABB(): AABB {
        const topLeft = new Vector2(Infinity, -Infinity);

        const vs = this.vertices;

        for (const vertex of vs) {
            if (vertex.x < topLeft.x) topLeft.x = vertex.x;
            if (vertex.y > topLeft.y) topLeft.y = vertex.y;
        }

        return new AABB(this.scaledSize, topLeft);
    }
    public async update(gameTime: GameTime): Promise<void> {
        this.faces = this.computeFaces(this.vertices);
        this.scaledSize = this.computeSize(this.vertices);
        this._aabb = this.computeAABB();
        this._computedVertices = this._vertices.map(v => v.clone.scale(this.gameObject.transform.relativeScale).rotateAroundTo(new Vector2(), this.gameObject.transform.relativeRotation).add(this.position));
    }
    public findMostAntiParallelFace(vec: Vector2): Face {
        let ret!: Face;
        let lowestDot = Infinity;

        for (const face of this.faces) {
            const d = Vector2.dot(face.normal.perpendicularClockwise, vec);
            if (d < lowestDot) {
                ret = face;
                lowestDot = d;
            }
        }

        return ret;
    }
    public getAxis(otherColliderPosition: Vector2): Vector2[] {
        const thisPosition: Vector2 = this.position;
        const axis: Vector2[] = [];

        for (const normal of this.faces.map(f => f.normal)) {
            if (axis.findIndex(a => a.equal(normal)) === -1) axis.push(normal);
        }

        const blub: Vector2[] = [];

        for (const a of axis) {
            let foundOpposite = false;
            for (const b of axis) {
                if (Vector2.dot(a, b) === -1) foundOpposite = true;
            }

            if (foundOpposite) {
                blub.push(thisPosition.clone.add(a).distance(otherColliderPosition) > thisPosition.clone.add(a.flipped).distance(otherColliderPosition) ? a : a.flipped);
            } else blub.push(a);
        }

        return blub;
    }
}