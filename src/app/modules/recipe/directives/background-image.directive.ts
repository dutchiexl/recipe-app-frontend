import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AssetUtil} from "../utils/asset.util";

@Directive({
  selector: '[background-image]'
})
export class BackgroundImageDirective implements OnInit{
  @Input('background-image') imageName: string;
  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const url = AssetUtil.getAssetUrl(this.imageName);
    this.element.nativeElement.style = url;
  }
}
