import { AlignH, AlignV } from './Align.js';
import { Vector2 } from '../Vector2.js';

export interface Alignable {
    alignH: AlignH;
    alignV: AlignV;
    position: Vector2;
    relativePosition: Vector2;
    align: Vector2;
}