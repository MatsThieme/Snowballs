import { Collider } from '../GameObject/Components/Collider.js';
import { Vector2 } from '../Vector2.js';
import { TileMap } from '../GameObject/Components/TileMap.js';
import { ComponentType } from '../GameObject/Components/ComponentType.js';

export class Collision {
    public readonly A: Collider | TileMap;
    public readonly B: Collider | TileMap;
    public readonly normal: Vector2 | undefined;
    public readonly penetrationDepth: number | undefined;
    public readonly contactPoints: Vector2[] | undefined;
    public readonly solved: Solved | undefined;
    public readonly e: number;
    public readonly df: number;
    public readonly sf: number;

    public constructor(colliderA: Collider | TileMap, colliderB: Collider | TileMap, normal?: Vector2, penetrationDepth?: number, contactPoints?: Vector2[]) {
        this.A = colliderA;
        this.B = colliderB;
        this.normal = normal?.normalized;
        this.penetrationDepth = penetrationDepth;
        this.contactPoints = contactPoints;

        this.e = (this.A.material.bounciness + this.B.material.bounciness) / 2;

        this.sf = (this.A.material.staticFriction + this.B.material.staticFriction) / 2;
        this.df = (this.A.material.dynamicFriction + this.B.material.dynamicFriction) / 2;


        if (colliderA.type !== ComponentType.TileMap && colliderB.type !== ComponentType.TileMap && this.normal && this.B.position.lowestDist(this.A.position.clone.add(this.normal), this.A.position.clone.add(this.normal.flipped)) === 1) this.normal.flip(); // always point from A to B


        this.solved = this.solve();
    }
    private solve(): Solved | undefined {
        if (!this.normal) return;
        const rbA = this.A.gameObject.rigidbody;
        const rbB = this.B.gameObject.rigidbody;

        if (rbA.mass === 0 && rbB.mass === 0 || !this.normal || !this.contactPoints || !this.penetrationDepth) return;

        const impulsesA: { impulse: Vector2, at: Vector2 }[] = [];
        const impulsesB: { impulse: Vector2, at: Vector2 }[] = [];


        // project out of collision
        const project = this.normal.clone.setLength(this.penetrationDepth / 2);
        if (rbA.mass > 0) this.A.gameObject.transform.relativePosition.add((rbB.mass === 0 ? project.clone.scale(2) : project).flipped);
        if (rbB.mass > 0) this.B.gameObject.transform.relativePosition.add(rbA.mass === 0 ? project.clone.scale(2) : project);


        //const contact = Vector2.average(...this.contactPoints);
        //const ra: Vector2 = this.A.position.clone.sub(contact);
        //const rb: Vector2 = this.B.position.clone.sub(contact);


        //const vpA = rbA.velocity.clone.add(Vector2.cross1(rbA.angularVelocity, ra));
        //const vpB = rbB.velocity.clone.add(Vector2.cross1(rbB.angularVelocity, rb));

        //const rv = vpB.clone.sub(vpA);


        //if (Vector2.dot(rv, this.normal) > 0) return;


        const j = (-(1 + this.e) * Vector2.dot(rbB.velocity.clone.sub(rbA.velocity), this.normal)) / (rbA.invMass + rbB.invMass/* + Vector2.dot(Vector2.cross1(rbA.invInertia * Vector2.cross(ra, this.normal), ra).add(Vector2.cross1(rbB.invInertia * Vector2.cross(rb, this.normal), rb)), this.normal)*/);
        const impulse = this.normal.normalized.scale(j);


        //const t = rv.clone.sub(this.normal.clone.scale(Vector2.dot(rv, this.normal))).normalize();
        //const jt = -Vector2.dot(rv, t) / (rbA.invMass + rbB.invMass + Vector2.dot(Vector2.cross1(rbA.invInertia * Vector2.cross(ra, this.normal), ra).add(Vector2.cross1(rbB.invInertia * Vector2.cross(rb, this.normal), rb)), this.normal));
        //const tangentImpulse = Math.abs(jt) < j * this.sf ? t.clone.scale(jt) : t.clone.scale(-j).scale(this.df);


        //rbA.applyImpulse(impulse.flipped, ra);
        //rbB.applyImpulse(impulse, rb);

        //rbA.applyImpulse(tangentImpulse.flipped, ra);
        //rbB.applyImpulse(tangentImpulse, rb);

        impulsesA.push({ impulse: impulse.flipped, at: Vector2.zero });
        impulsesB.push({ impulse: impulse, at: Vector2.zero });

        //impulsesA.push({ impulse: tangentImpulse.flipped, at: ra });
        //impulsesB.push({ impulse: tangentImpulse, at: rb });

        return {
            collision: this,
            A: {
                impulses: impulsesA,
                project: (rbB.mass === 0 ? project.clone.scale(2) : project).flipped
            },
            B: {
                impulses: impulsesB,
                project: rbA.mass === 0 ? project.clone.scale(2) : project
            }
        };
    }
}







function calculateVelocity(mass1: number, mass2: number, vel1: Vector2, vel2: Vector2): Vector2 {
    return Vector2.divide(vel2.clone.scale(2 * mass2).add(vel1.clone.scale(mass1 - mass2)), mass1 + mass2);
}

//const newVelocityA = calculateVelocity(rbA.mass, rbB.mass, rbA.velocity, rbB.velocity);
//const newVelocityB = calculateVelocity(rbB.mass, rbA.mass, rbB.velocity, rbA.velocity);

//rbA.velocity = newVelocityA;
//rbB.velocity = newVelocityB;

//const L1N = rbA.angularVelocity * rbA.inertia + (rbB.velocity.clone.scale(rbB.mass).sub(rbA.velocity.clone.scale(rbA.mass)).scale(ra)).sum * this.df * (1 - this.e);
//const L2N = rbB.angularVelocity * rbB.inertia + (rbA.velocity.clone.scale(rbA.mass).sub(rbB.velocity.clone.scale(rbB.mass)).scale(rb)).sum * this.df * (1 - this.e);

//rbA.angularVelocity = L1N / rbA.inertia / 10;
//rbB.angularVelocity = L2N / rbA.inertia / 10;


declare interface Solved {
    readonly collision: Collision;
    readonly A: {
        impulses: { impulse: Vector2, at: Vector2 }[];
        project: Vector2;
    };
    readonly B: {
        impulses: { impulse: Vector2, at: Vector2 }[];
        project: Vector2;
    };
}









//const vpA = rbA.velocity.clone.add(Vector2.cross1(rbA.angularVelocity, ra));
//const vpB = rbB.velocity.clone.add(Vector2.cross1(rbB.angularVelocity, rb));

//const rv = vpB.clone.sub(vpA);


//if (Vector2.dot(rv, this.normal) > 0) return;


//const j = (-(1 + this.e) * Vector2.dot(rv, this.normal)) / (rbA.invMass + rbB.invMass + Vector2.dot(Vector2.cross1(rbA.invInertia * Vector2.cross(ra, this.normal), ra).add(Vector2.cross1(rbB.invInertia * Vector2.cross(rb, this.normal), rb)), this.normal));
//const impulse = this.normal.normalized.scale(j);


//const t = rv.clone.sub(this.normal.clone.scale(Vector2.dot(rv, this.normal))).normalize();
//const jt = -Vector2.dot(rv, t) / (rbA.invMass + rbB.invMass + Vector2.dot(Vector2.cross1(rbA.invInertia * Vector2.cross(ra, this.normal), ra).add(Vector2.cross1(rbB.invInertia * Vector2.cross(rb, this.normal), rb)), this.normal));
//const tangentImpulse = Math.abs(jt) < j * this.sf ? t.clone.scale(jt) : t.clone.scale(-j).scale(this.df);


//rbA.applyImpulse(impulse.flipped, ra);
//rbB.applyImpulse(impulse, rb);

//rbA.applyImpulse(tangentImpulse.flipped, ra);
//rbB.applyImpulse(tangentImpulse, rb);





























//const contact = Vector2.average(...this.contactPoints);
//const ra: Vector2 = this.A.position.clone.sub(contact);
//const rb: Vector2 = this.B.position.clone.sub(contact);


//const vpA = rbA.velocity.clone.add(Vector2.cross1(rbA.angularVelocity, ra));
//const vpB = rbB.velocity.clone.add(Vector2.cross1(rbB.angularVelocity, rb));

//const rv = vpB.clone.sub(vpA);


//if (Vector2.dot(rv, this.normal) > 0) return;


//const j = (-(1 + this.e) * Vector2.dot(rv, this.normal)) / (rbA.invMass + rbB.invMass + Vector2.dot(Vector2.cross1(rbA.invInertia * Vector2.cross(ra, this.normal), ra).add(Vector2.cross1(rbB.invInertia * Vector2.cross(rb, this.normal), rb)), this.normal));
//const impulse = this.normal.normalized.scale(j);


//const t = rv.clone.sub(this.normal.clone.scale(Vector2.dot(rv, this.normal))).normalize();
//const jt = -Vector2.dot(rv, t) / (rbA.invMass + rbB.invMass + Vector2.dot(Vector2.cross1(rbA.invInertia * Vector2.cross(ra, this.normal), ra).add(Vector2.cross1(rbB.invInertia * Vector2.cross(rb, this.normal), rb)), this.normal));
//const tangentImpulse = Math.abs(jt) < j * this.sf ? t.clone.scale(jt) : t.clone.scale(-j).scale(this.df);


//rbA.applyImpulse(impulse.flipped, ra);
//rbB.applyImpulse(impulse, rb);

//rbA.applyImpulse(tangentImpulse.flipped, ra);
//rbB.applyImpulse(tangentImpulse, rb);














        //const newVelocityA = calculateVelocity(rbA.mass, rbB.mass, rbA.velocity, rbB.velocity);
        //const newVelocityB = calculateVelocity(rbB.mass, rbA.mass, rbB.velocity, rbA.velocity);


        //const angularImpulseA = calculateAngularVelocity(rbA.inertia, rbB.mass, rbB.velocity, ra);
        //const angularImpulseB = calculateAngularVelocity(rbB.inertia, rbA.mass, rbA.velocity, rb);


        //rbA.velocity = newVelocityA;
        //rbB.velocity = newVelocityB;
        //rbA.angularVelocity += angularImpulseA;
        //rbB.angularVelocity += angularImpulseB;




        //let rv = rbB.velocity.clone.add(Vector2.cross1(rbB.angularVelocity, rb)).sub(rbA.velocity.clone.add(Vector2.cross1(rbA.angularVelocity, ra)));

        //const contactVel = Vector2.dot(rbB.velocity.clone.add(Vector2.cross1(rbB.angularVelocity, rb)).sub(rbA.velocity.clone.sub(Vector2.cross1(rbA.angularVelocity, ra))), this.normal);

        //if (contactVel > 0) return;

        //const invMassSum = rbA.invMass + rbB.invMass + Vector2.cross(ra, this.normal) ** 2 * rbA.invInertia + Vector2.cross(rb, this.normal) ** 2 * rbB.invInertia;


        //const j = (-(this.e + 1) * contactVel) / invMassSum;
        //const impulse = this.normal.normalized.scale(j);


        //rbA.applyImpulse(impulse.flipped, ra);
        //rbB.applyImpulse(impulse, rb);

        //rv = rbB.velocity.clone.add(Vector2.cross1(rbB.angularVelocity, rb)).sub(rbA.velocity.clone.add(Vector2.cross1(rbA.angularVelocity, ra)));

        //const t = rv.perpendicularCounterClockwise;
        //const jt = -Vector2.dot(rv, t) / invMassSum;
        //const tangentImpulse = Math.abs(jt) < j * this.sf ? t.clone.scale(jt) : t.clone.scale(-j).scale(this.df);


        //rbA.applyImpulse(tangentImpulse.flipped, ra);
        //rbB.applyImpulse(tangentImpulse, rb);


