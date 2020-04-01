import { Vector2 } from './Vector2.js';

export class ClientInfo {
    public static measureMonitorFrameRate(ms: number): Promise<number> {
        return new Promise(resolve => {
            let frames: number = 0;

            let handle = requestAnimationFrame(update);

            function update() {
                handle = requestAnimationFrame(update);
            }

            setTimeout(() => {
                resolve(frames / ms);
                cancelAnimationFrame(handle);
            }, ms);
        });
    }
    public static resolution: Vector2 = new Vector2(innerWidth, innerHeight);
    public static aspectRatio: Vector2 = ClientInfo.resolution.clone.setLength(new Vector2(16, 9).magnitude);
    public static readonly cpuThreads: number = navigator.hardwareConcurrency;
    private static start() {
        window.addEventListener('resize', () => {
            ClientInfo.resolution.x = innerWidth;
            ClientInfo.resolution.y = innerHeight;

            const a = ClientInfo.resolution.clone.setLength(new Vector2(16, 9).magnitude);
            ClientInfo.aspectRatio.x = a.x
            ClientInfo.aspectRatio.y = a.y;
        });
    }
}

(<any>ClientInfo).start();