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
    pixelsMatrix: Uint8ClampedArray[][] | number[][][];
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
            if (inner < this.dimensions.width) {
                (this.pixelsMatrix[inner][resCounter] as any) = this.pixels[i];
            }
            else {
                resCounter++;
                inner = 0;
                continue;
            }
            inner++;
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

    clear = () => {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    loop = () => {
        requestAnimationFrame(this.animation);
    }

    animation = () => {
        this.createPixelsScreen();
        // this.clear();
        this.stageRenderingOrder();

        // this.ctx.putImageData(this.ctx.getImageData(0, 0, this.dimensions.width, this.dimensions.height), 0, 0);
        this.ctx.putImageData(this.imageData, 0, 0);
        requestAnimationFrame(this.animation);
    }


    stageRenderingOrder = () => {
        for (let object of this.stage.queue) {
            switch (object.model) {
                case Model.TEXTURE:
                    this.renderImg(object);
                    break;
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
        for (let i = 0; i < this.pixelsMatrix.length; i++) {
            for (let j = 0; j < this.pixelsMatrix[i].length; j++) {
                this.paint(new Point(i, j), { r: 0, g: 0, b: 0, a: 255 });
            }
        }
    }

    getPixel = (index: number): Uint8ClampedArray | undefined => {
        if (!this.pixels[index]) return undefined;
        return this.pixels[index];
    }

    setPixel = (index: number, rgb: number[]): boolean => {
        if (!this.getPixel(index)) return false;
        if (!index) index = 1;

        let innerIndex = index * 4;
        for (let i = rgb.length; i >= 0; i--) {
            this.imageData.data[innerIndex] = rgb[i];
            innerIndex--;
        }

        return true;
    }

    getPixelFromMatrix = (point: Point) => {
        try {
            return this.pixelsMatrix[point.x][point.y];
        } catch (e) {
            console.error(`No such pixel ${point.x}, ${point.y}.`);
        }
    }

    paint = (point: Point, color: RGB) => {
        const { x, y } = point;
        const { r, g, b, a } = color;
        return this.setPixel((y * this.dimensions.width) + x, [r, g, b, a]);
    }

    rect = (object: GameObject) => {
        const { dimension, position, rgb } = object;
        if (!rgb) {
            object.rgb = { r: 211, g: 211, b: 211, a: 255 };
        }
        for (let i = 0; i < this.pixelsMatrix.length; i++) {
            for (let j = 0; j < this.pixelsMatrix[i].length; j++) {
                if ((i - (position as Point).x > 0 && (i - (position as Point).x) < dimension.width) && (j - (position as Point).y > 0 && (j - (position as Point).y) < dimension.height)) {
                    this.paint(new Point(i, j), object.rgb);
                }
            }
        }
    }

    renderImg = (object: GameObject) => {
        this.ctx.drawImage(object.img, (<Point>object.position).x, (<Point>object.position).y);
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