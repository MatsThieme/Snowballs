export class Settings {
    /*
     *
     * Game volume multiplier
     * 
     */
    public static volume: number = 1;
    public static appPath: string = window.location.toString().match(/(.*?)(?:index.html)?$/);
    private static relativeAssetPath: string = '/Assets/';
    public static get assetPath(): string {
        return Settings.appPath + Settings.relativeAssetPath;
    }
    public static mainFont: string = 'MainFont';
}
