import { Pipe, PipeTransform } from '@angular/core';
import { AssetUtil } from '../utils/asset.util';

@Pipe({name: 'asset'})
export class AssetPipe implements PipeTransform {
    transform(fileName: string): string {
        return AssetUtil.getAssetUrl(fileName);
    }
}
