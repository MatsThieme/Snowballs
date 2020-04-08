import { UIMenu } from './UIMenu.js';
import { UIFontSize } from './UIFontSize.js';
import { Vector2 } from '../Vector2.js';

export class UIFont {
    private menu: UIMenu;
    public constructor(menu: UIMenu) {
        this.menu = menu;
    }
    private get fontMultiplier() {
        return this.menu.aabb.size.magnitude / 50;
    }

    /**
     * 
     * Returns a font string, font size adjusts to menu size.
     * 
     */
    public getFont(name: string, size: UIFontSize = UIFontSize.Medium, bold: boolean = false) {
        return `${bold ? 'bold' : ''} ${~~(this.fontMultiplier * size)}px ${name}`;
    }

    /**
     * 
     * Returns values parsed from a font string.
     * 
     */
    public parseFontString(font: string): { bold: boolean, px: number, name: string } {
        return { bold: font.indexOf('bold') !== -1, px: parseInt((<any>font.match(/[^\d]*(\d+)px.*/))[1]), name: (<any>font.match(/.*px (\w+).*/))[1] };
    }

    /**
     * 
     * Returns the width and height of the text using the font string.
     * 
     */
    public measureText(text: string, font: string): Vector2 {
        const { px, bold, name } = this.parseFontString(font);
        const el = document.createElement('div');
        el.style.fontFamily = name;
        el.style.fontSize = px + 'px';
        el.style.fontWeight = bold ? 'bold' : 'normal';
        el.textContent = text;
        el.style.display = 'inline-block';
        el.style.visibility = 'hidden';
        document.body.appendChild(el);

        const cS = getComputedStyle(el);
        const width = parseInt(cS.width);
        const height = parseInt(cS.height);

        el.remove();

        return new Vector2(width, height);
    }

    /**
     * 
     * Returns the modified font string whichs px is scaled to fit the given size.
     * 
     */
    public fit(text: string, font: string, size: Vector2): string {
        const { px, bold, name } = this.parseFontString(font);
        const { x, y } = this.measureText(text, font);

        const scale = Math.min(size.x / x, size.y / y);

        return (bold ? 'bold ' : '') + ~~(px * scale) + 'px ' + name;
    }
}