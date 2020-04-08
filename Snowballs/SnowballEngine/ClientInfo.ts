import { Vector2 } from './Vector2.js';

export class ClientInfo {
    /**
     * 
     * Measure the refresh rate of the active monitor for ms.
     * 
     */
    private static measureMonitorRefreshRate(ms: number): Promise<number> {
        return new Promise(resolve => {
            let frames: number = 0;

            let handle = requestAnimationFrame(update);

            function update() {
                frames++;
                handle = requestAnimationFrame(update);
            }

            setTimeout(() => {
                resolve(Math.round(frames / ms * 1000));
                cancelAnimationFrame(handle);
            }, ms);
        });
    }

    /**
     *
     * Returns the resolution of the window.
     * 
     */
    public static resolution: Vector2 = new Vector2(innerWidth, innerHeight);

    public static monitorRefreshRate: number = 144;
    public static aspectRatio: Vector2 = ClientInfo.resolution.clone.setLength(new Vector2(16, 9).magnitude);

    /**
     * 
     * Returns the number of threads available on this machine.
     * 
     */
    public static readonly cpuThreads: number = navigator.hardwareConcurrency;
    private static async start() {
        addEventListener('resize', () => {
            ClientInfo.resolution.x = innerWidth;
            ClientInfo.resolution.y = innerHeight;

            ClientInfo.aspectRatio.copy(ClientInfo.resolution.clone.setLength(new Vector2(16, 9).magnitude));
        });

        ClientInfo.monitorRefreshRate = await ClientInfo.measureMonitorRefreshRate(1000);
    }
}

(<any>ClientInfo).start();