import { Injectable } from '@angular/core';


export type ClipFn = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

export enum ClipMethod {
  NONE,
  CIRCLE,
  HEXEGON
}

const clipMethods: { [name: number]: ClipFn } = {
  [ClipMethod.CIRCLE]: (ctx, w: number, h: number) => {
    ctx.arc(w / 2, w / 2, w / 2, 0, 2 * Math.PI);
  },
  [ClipMethod.HEXEGON]: (ctx, w, h) => {
    ctx.moveTo(w * 0.52, h * 0.04);
    ctx.lineTo(w, h * 0.28);
    ctx.lineTo(w, h * 0.78);
    ctx.lineTo(w * 0.52, h * 1.01);
    ctx.lineTo(w * 0.05, h * 0.78);
    ctx.lineTo(w * 0.05, h * 0.28);
  }
};

@Injectable()
export class ClipIconService {



  public async clip(
    imgData: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | ImageData | Blob,
    w: number,
    h: number,
    shape: ClipMethod | ClipFn
  ) {
    const img = await createImageBitmap(imgData);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.beginPath();
    let clipFn: ClipFn;

    if (typeof shape !== 'function') {
      clipFn = clipMethods[shape];
    } else {
      clipFn = shape;
    }
    clipFn(ctx, w, h);
    ctx.clip();
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();
    return canvas;
  }
  public loadAndClip(imgUrl: string, width: number, height: number, shape?: ClipMethod.NONE): Promise<HTMLImageElement>;
  public loadAndClip(imgUrl: string, width: number, height: number, shape: ClipMethod | ClipFn): Promise<HTMLCanvasElement>;
  public loadAndClip(
    imgUrl: string,
    width: number,
    height: number,
    shape: ClipMethod | ClipFn
  ): Promise<HTMLCanvasElement | HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image(width, height);
      // img.setAttribute('crossOrigin', '*');
      img.onload = event => {
        if (!shape) {
          resolve(img);
          return;
        }
        this.clip(img, width, height, shape).then((clipped) => {
          resolve(clipped);
        }).catch(err => {
          reject(err);
        });
      };
      img.onerror = event => {
        reject(event);
      };
      img.src = imgUrl;
    });
  }

}
