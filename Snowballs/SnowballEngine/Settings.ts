export class Settings {
    public static volume: number = 1;
    public static appPath: string = '';//'https://thieme.ml/ABS';
    private static relativeAssetPath: string = '/Assets/';
    public static get assetPath(): string {
        return Settings.appPath + Settings.relativeAssetPath;
    }
    public static mainFont: string = 'MainFont';
} 