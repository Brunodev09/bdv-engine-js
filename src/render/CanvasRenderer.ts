
import Stage from "./Stage";
import { Model } from "../core/Model";
import GameObject from "../core/GameObject";
import Dimension from "../math/Dimension";
import Point from "../math/Point";

export default class bdvRender {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dimensions: Dimension;
    defaultColor: string;
    stage: Stage;

    constructor(canvasId: string, width: number, height: number) {
        // super(canvasId, width, height);
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.dimensions = new Dimension(width, height);
        this.defaultColor = 'black';

        this.stage = new Stage();
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
        this.clear();
        this.stageRenderingOrder();
        requestAnimationFrame(this.animation);
    }

    stageRenderingOrder = () => {
        for (let object of this.stage.queue) {
            switch (object.model) {
                case Model.RECTANGLE:
                    this.fill(object);
                    break;
                case Model.RECTANGLE_BORDER:
                    this.stroke(object);
                    break;
                case Model.POINTS:
                case Model.POINTS_BORDER:
                case Model.VECTOR:    
                    this.path(object);
                    break;
                case Model.CIRCLE:
                    break;
                case Model.CIRCLE_BORDER:
                    break;
            }
        }
    }

    clear = () => {
        this.color('black');
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    fill = (object: GameObject) => {
        if (!object.color) object.color = this.defaultColor;
        if (object.position instanceof Point) {
            this.color(object.color);
            if (object.model === Model.RECTANGLE) {
                this.ctx.fillRect(object.position.x, object.position.y, object.dimension.width, object.dimension.height);
            }
            else if (object.model === Model.TEXT) {
                this.ctx.font = object.font;
                this.ctx.fillStyle = object.color;
                this.ctx.fillText(object.message, object.position.x, object.position.y);
            }
        }
    }

    stroke = (object: GameObject) => {
        if (!object.color) object.color = this.defaultColor;
        this.color(object.color);
        if (object.position instanceof Point) {
            this.ctx.strokeStyle = object.color;
            this.ctx.strokeRect(object.position.x, object.position.y, object.dimension.width, object.dimension.height);
        }
    }


    path = (object: GameObject) => {
        if (!object.color) object.color = this.defaultColor;
        this.ctx.fillStyle = object.color;
        this.ctx.beginPath();
        let it = 0;

        if (object.position instanceof Array) {
            for (let point of object.position) {
                if (it === 0) {
                    this.ctx.moveTo(point.x, point.y);
                    it++;
                    continue;
                }
                this.ctx.lineTo(point.x, point.y);
                it++;
            }
        }

        if (object.model === Model.POINTS) {
            this.ctx.fillStyle = object.color;
            this.ctx.fill();
        }
        else if (object.model === Model.POINTS_BORDER || object.model === Model.VECTOR) {
            this.ctx.strokeStyle = object.color;
            this.ctx.stroke();
        }
    }

    arc = (point: Point, radius: number, type?: string, color?: string) => {
        // Full arc - 0 to 2pi
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);

        if (!type) type = "stroke";
        if (!color) color = this.defaultColor;

        if (type === "fill") {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }

    color = (color: string) => {
        this.ctx.fillStyle = color;
    }

}