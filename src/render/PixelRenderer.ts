import Dimension from "../math/Dimension";

export default class ImageDataRender {
    dimensions: Dimension;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    imageData: ImageData;
    pixelArray: Uint8ClampedArray;
    pixels: Uint8ClampedArray[];
    constructor(canvasId: string, dimensions: Dimension) {
        this.dimensions = dimensions;
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.pixels = [];
    }

    start = () => {
        this.imageData = this.ctx.createImageData(this.dimensions.width, this.dimensions.height);
        this.pixelArray = this.imageData.data;
        let counter = 1;
        for (let i = 0; i < this.pixelArray.length; i++) {
            if (counter === 4) {
                this.pixels.push(this.pixelArray.slice(i - 3, i + 1));
                counter = 1;
                continue;
            }
            counter++;
        }
    }

    getRandomRGBValue = () => {
        return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    }

    createPixelsScreen = () => {
        for (let i = 0; i < this.imageData.data.length; i++) {
            let [r] = this.getRandomRGBValue();
            this.imageData.data[i] = 100;
        }
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    getPixel = (index: number): Uint8ClampedArray | undefined => {
        if (!this.pixels[index]) return undefined;
        return this.pixels[index];
    }

    setPixel = (index: number, rgb: number[]): boolean => {
        if (!this.getPixel(index)) return false;
        for (let i = 0; i < rgb.length; i++) {
            this.pixels[index][i] = rgb[i];
        }

        let innerIndex = index * 4;
        for (let i = 0; i < rgb.length; i++) {
            this.imageData.data[innerIndex] = rgb[i];
            innerIndex--;
        }
    }

    pixelDoodling = () => {
        setInterval(() => {
            this.imageData = this.ctx.createImageData(this.dimensions.width, this.dimensions.height);
            let [r, g, b] = this.getRandomRGBValue();

            for (let i = 0; i < this.imageData.data.length / 4; i++) {
                // const randomPixel = Math.floor(Math.random() * (this.imageData.data.length / 4));
                let pixel = this.getPixel(i);
                for (let j = 0; j < pixel.length; j++) {
                    this.setPixel(i, [r, g, b, 0]);
                }
            }
            this.ctx.putImageData(this.imageData, 0, 0);
        }, 100);
    }
}