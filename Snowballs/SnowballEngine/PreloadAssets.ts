import { awaitPromises, normalizeAssetPath } from './Helpers.js';

/**
 * 
 * Loads all assets listed in a json file under url.
 * 
 */
export async function PreloadAssets(url: string): Promise<void> {
    const r = await fetch(normalizeAssetPath(url));
    const l: string[] = await r.json();
    const promises: Promise<any>[] = l.map(s => fetch(normalizeAssetPath(s)));
    await awaitPromises(...promises);
}