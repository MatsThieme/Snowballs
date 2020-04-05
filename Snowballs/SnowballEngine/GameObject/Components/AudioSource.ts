import { triggerOnUserInputEvent } from '../../Helpers.js';
import { Settings } from '../../Settings.js';
import { GameObject } from '../GameObject.js';
import { AudioListener } from './AudioListener.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';

export class AudioSource extends Component {
    public audio: HTMLAudioElement;
    public constructor(gameObject: GameObject) {
        super(gameObject, ComponentType.AudioSource);
        this.audio = new Audio();
        if (this.gameObject.scene.hasAudioListener)
            this.gameObject.scene.getAllGameObjects().map(gO => gO.getComponent(AudioListener)).filter(l => l)[0]?.addSource(this);
    }

    /**
     * 
     * The audios source string.
     * 
     */
    public get clip(): string {
        return this.audio.src;
    }
    public set clip(val: string) {
        this.audio.src = Settings.assetPath + val;
    }

    /**
     * 
     * Loop the clip.
     * 
     */
    public get loop(): boolean {
        return this.audio.loop;
    }
    public set loop(val: boolean) {
        this.audio.loop = val;
    }

    /**
     * 
     * The volume of the clip.
     * 
     */
    public get volume(): number {
        return this.audio.volume;
    }
    public set volume(val: number) {
        this.audio.volume = val;
    }

    /**
     * 
     * Play the audio clip.
     * 
     */
    public play(): void {
        triggerOnUserInputEvent(() => this.audio.play());
    }

    /**
     *
     * Pause the audio clip.
     *
     */
    public pause(): void {
        triggerOnUserInputEvent(() => this.audio.pause());
    }

    /**
     *
     * Reset the audio clip.
     *
     */
    public reset(): void {
        this.audio.currentTime = 0;
    }
}