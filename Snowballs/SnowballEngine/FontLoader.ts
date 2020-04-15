import { interval, normalizeAssetPath } from './Helpers.js';

export class FontLoader {
    /**
     * 
     * Loads font from given url using css.
     * 
     * @param name Name of the css font-family.
     * 
     */
    public static load(url: string, name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const e = document.querySelector('style') || document.createElement('style');
            e.innerHTML += `@font-face { font-family: ${name}; src: url('${normalizeAssetPath(url)}'); }`;
            document.head.appendChild(e);

            const p = document.createElement('span');
            p.textContent = 'IWML'.repeat(10);
            p.style.fontFamily = 'serif';
            p.style.visibility = 'hidden';
            p.style.fontSize = '1000px';
            document.body.appendChild(p);

            const initialSize = p.offsetWidth << 16 + p.offsetHeight;

            p.style.fontFamily = name;

            interval(clear => {
                if (p.offsetWidth << 16 + p.offsetHeight !== initialSize) {
                    clear();
                    resolve();
                    p.remove();
                }
            }, 1);
        });
    }
}