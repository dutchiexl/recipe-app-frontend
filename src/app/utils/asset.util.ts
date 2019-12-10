import { environment } from 'src/environments/environment';

export class AssetUtil {
    public static getPlaceholder(): string {
        return 'placeholder.jpg';
    }

    public static getPlaceholderUrl(): string {
        return this.getAssetUrl('placeholder.jpg');
    }

    public static getAssetUrl(fileName: string): string {
        return environment.assetBasePath + 'public/images/' + fileName;
    }

    public static getFilenameFromPath(path: string): string {
        const splitFilePath = path.split('/');
        return splitFilePath[splitFilePath.length - 1];
    }
}
