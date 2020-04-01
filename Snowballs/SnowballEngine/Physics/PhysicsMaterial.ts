export class PhysicsMaterial {
    public bounciness: number;
    public dynamicFriction: number;
    public staticFriction: number;
    public constructor(bounce: number = 1, dynamicFriction: number = 1, staticFriction: number = 1) {
        this.bounciness = bounce;
        this.dynamicFriction = dynamicFriction;
        this.staticFriction = staticFriction;
    }
}