import { GameObject } from '../GameObject.js';
import { ComponentType } from './ComponentType.js';

export class Component {
    public gameObject: GameObject;
    public readonly type: ComponentType;
    public readonly componentId: number = Component.nextId++;
    private static nextId: number = 0;
    public constructor(gameObject: GameObject, type: ComponentType = ComponentType.Component) {
        this.gameObject = gameObject;
        this.type = type;
    }
    public destroy(): void {
        this.gameObject.removeComponent(this.componentId);
    }
}