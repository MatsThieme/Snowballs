import { Vector2 } from '../Vector2.js';
import { UIFontSize } from './UIFontSize.js';
import { UIMenu } from './UIMenu.js';

export class UIFont {
    private menu: UIMenu;
    public constructor(menu: UIMenu) {
        this.menu = menu;
    }
    private get fontMultiplier() {
        return new Vector2(this.menu.scene.domElement.width, this.menu.scene.domElement.height).magnitude / this.menu.aabb.size.magnitude * 3;
    }

    /**
     * 
     * Returns a font string, font size adjusts to menu size.
     * 
     */
    public getFont(name: string, size: UIFontSize = UIFontSize.Medium, bold: boolean = false) {
        return `${bold ? 'bold' : ''} ${Math.round(this.fontMultiplier * size)}px ${name}`;
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
     * Calculates the width and height in % relative to this.menu of the text using the font string.
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

        return new Vector2(width / (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width) * 100, height / (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height) * 100);
    }

    /**
     * 
     * Returns the modified font string whose px is scaled to fit the given size. (not tested)
     * 
     */
    public fit(text: string, font: string, size: Vector2): string {
        const { px, bold, name } = this.parseFontString(font);
        const { x, y } = this.measureText(text, font);

        const s = new Vector2(size.x / 100 * (this.menu.aabb.size.x / 100 * this.menu.scene.domElement.width), size.y / 100 * (this.menu.aabb.size.y / 100 * this.menu.scene.domElement.height));

        const scale = Math.min(s.x / x, s.y / y);

        return (bold ? 'bold ' : '') + Math.round(px * scale) + 'px ' + name;
    }
}