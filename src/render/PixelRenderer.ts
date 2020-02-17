import Dimension from "../math/Dimension";
import GameObject from "../core/GameObject";
import Stage from "../render/Stage";
import { Model } from "../core/Model";
import Geometry from "../math/Geometry";
import Point from "../math/Point";
import RGB from "../math/RGB";

export default class ImageDataRender {
    dimensions: Dimension;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    imageData: ImageData;
    pixelArray: Uint8ClampedArray;
    pixels: Uint8ClampedArray[];
    stage: Stage;
    pixelsMatrix: Uint8ClampedArray[][] | number[][];
    constructor(canvasId: string, dimensions: Dimension) {
        this.dimensions = dimensions;
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.pixels = [];
        this.pixelsMatrix = Geometry.createMatrix(dimensions);
        this.stage = new Stage();
        this.start();
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
        let inner = 0;
        let resCounter = 0;
        for (let i = 0; i < this.pixels.length; i++) {
            if (resCounter < this.dimensions.width) {
                this.pixelsMatrix[resCounter][inner] = this.pixels[i];
            }
            else {
                inner++;
                resCounter = 0;
                continue;
            }
            resCounter++;
        }
    }

    requestStage(object: GameObject) {  
        this.stage.queue.push(object);
        return this.stage.queue.length - 1;
    }

    removeFromStage(index: number): boolean {
        if (!this.stage.queue[index]) return false;
        this.stage.queue.splice(index, 1);
        return true;
    }

    clearStage() {
        this.stage.queue = [];
    }

    loop = () => {
        requestAnimationFrame(this.animation);
    }

    animation = () => {
        this.createPixelsScreen();
        this.stageRenderingOrder();
        requestAnimationFrame(this.animation);
    }

    stageRenderingOrder = () => {
        for (let object of this.stage.queue) {
            switch (object.model) {
                case Model.RECTANGLE:
                    this.rect(object);
                    break;
                case Model.RECTANGLE_BORDER:
                    break;
                case Model.POINTS:
                case Model.POINTS_BORDER:
                case Model.VECTOR:    
                    break;
                case Model.CIRCLE:
                    break;
                case Model.CIRCLE_BORDER:
                    break;
                case Model.PIXEL_FREE:
                    break;    
            }
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
        return true;
    }

    getPixelFromMatrix = (point: Point) => {
        try {
            return this.pixelsMatrix[point.x][point.y];
        } catch(e) {
            console.error(`No such pixel ${point.x}, ${point.y}.`);
        }
    }

    paint = (point: Point, color: RGB) => {
        const { x, y } = point;
        console.log(x, y, "poi")
        const { r, g, b, a } = color;
        return this.setPixel(((y + 1) * this.dimensions.width) + x, [r, g, b, a]);
    }

    rect = (object: GameObject) => {
        const  { dimension, position, rgb } = object;
        if (!rgb) throw new Error("Please specify the rgb property on this GameObject to be able to render through PixelRenderer.");
        for (let i = 0; i < this.pixelsMatrix.length; i++) {
            for (let j = 0; j < this.pixelsMatrix[i].length; j++) {
                if ((i - (position as Point).x <= 0 && (i - (position as Point).x) <= dimension.width) && (j - (position as Point).y <= 0 && (j - (position as Point).y) <= dimension.height)) {
                    this.paint(new Point(i, j), object.rgb);
                }
            }
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