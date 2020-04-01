import { clamp, triggerOnUserInputEvent } from '../../Helpers.js';
import { Settings } from '../../Settings.js';
import { GameObject } from '../GameObject.js';
import { AudioSource } from './AudioSource.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';

export class AudioListener extends Component {
    public distance: number;
    private context: AudioContext;
    private sources: AudioSource[];
    private gains: GainNode[];
    private panners: StereoPannerNode[];
    public constructor(gameObject: GameObject, distance: number = 20) {
        super(gameObject, ComponentType.AudioSource);
        this.context = new AudioContext();
        triggerOnUserInputEvent(() => this.context.resume());
        this.sources = [];
        this.gains = [];
        this.panners = [];
        this.distance = distance;
    }
    public addSource(audioSource: AudioSource): void {
        this.sources.push(audioSource);
        const mediaElement = this.context.createMediaElementSource(audioSource.audio);
        const pan = this.context.createStereoPanner();
        const gain = this.context.createGain();
        mediaElement.connect(pan).connect(gain).connect(this.context.destination);
        this.gains.push(gain);
        this.panners.push(pan);
    }
    private calcStereoPanning(audioSource: AudioSource): number {
        return clamp(-1, 1, (Math.abs(this.gameObject.transform.position.x - audioSource.gameObject.transform.position.x)) / this.distance * (audioSource.gameObject.transform.position.x > this.gameObject.transform.position.x ? 1 : -1));
    }
    private calcRelativeVolume(audioSource: AudioSource): number {
        return clamp(0, 1, 1 - this.gameObject.transform.position.distance(audioSource.gameObject.transform.position) / this.distance);
    }
    public update(): void {
        for (let i = 0; i < this.sources.length; i++) {
            this.panners[i].pan.value = this.calcStereoPanning(this.sources[i]);
            this.gains[i].gain.value = this.calcRelativeVolume(this.sources[i]) * Settings.volume;
        }
    }
}