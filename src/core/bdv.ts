// @TODO - Load tiled map from JSON, Algos and graphs.
// @TODO - Finish porting shape based rendering to GameObject -> Stages (Circles, arcs and fonts).
// @TODO - Dungeon generator.
// @TODO - Nodejs tool that reads a image file and converts it a color-mapped JSON.
// @TODO - Handling images.
// @TODO - Collidables.
// @TODO - Expand pixel rendering, perlin noise and mandelbrots.
// @TODO - Easy networking.

import bdvRender from "../render/CanvasRenderer";
import ImageDataRender from "../render/PixelRenderer";
import Stage from "../render/Stage";
import { Model } from "./Model";
import GameObject from "./GameObject";
import Dimension from "../math/Dimension";
import Point from "../math/Point";

import mapFile from "../../map.json";
import Conways from "../math/Conways";
import Pathfinding from "../math/Pathfinding";

export default class bdv {
    canvasId: string;
    dimensions: Dimension;
    render: null | bdvRender;
    render2: null | ImageDataRender;
    stage: Stage;

    constructor(canvasId: string, width: number, height: number) {
        this.canvasId = canvasId;
        this.dimensions = new Dimension(width, height);
        this.render = null;
        this.render2 = null;
    }

    activateCanvasRendering = () => {
        this.render = new bdvRender(this.canvasId, this.dimensions.width, this.dimensions.height);
        this.game();
    }

    activateImageDataRendering = () => {
        this.render2 = new ImageDataRender(this.canvasId, this.dimensions);
        this.render2.start();
    }

    game = () => {
        this.render.loop();
        this.render.clear();
    }

    newGameObject = (model: string, positionX: number, positionY: number, width: number, height: number, color: string, font?: string, message?: string) => {
        let object = new GameObject(Model[model], new Point(positionX, positionY), new Dimension(width, height), color, font, message);
        this.render.requestStage(object);

        return object;
    }

    newGameObjectArray = (model: string, positions: number[][], color: string, font?: string, message?: string) => {
        let aux = [];
        for (let point of positions) {
            let aux2 = [];
            for (let coord of point) {
                aux2.push(coord);
            }
            aux.push(new Point(aux2[0], aux2[1]));
        }
        let object = new GameObject(Model[model], aux, new Dimension(0, 0), color, font, message);
        this.render.requestStage(object);

        return object;
    }

    circle = (x: number, y: number, r: number, t?: string, c?: string) => {
        this.render.arc(new Point(x, y), r, t, c);
    }


    write = (message: string, font: string, x: number, y: number, color: string) => {
        // this.render.fill(new TextFont(message, font), new Point(x, y), null, color);
    }

    RGB() {
        return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) }
    }

    movingSquares = () => {
        let object = new GameObject(Model.RECTANGLE, new Point(100, 100), new Dimension(100, 100), "purple");
        this.render.requestStage(object);
        let speedX = 5, speedY = 5;

        setInterval(() => {
            (<Point>object.position).x += speedX;
            (<Point>object.position).y += speedY;
            if ((<Point>object.position).x > this.dimensions.width || (<Point>object.position).x < 0) speedX = -speedX;
            if ((<Point>object.position).y > this.dimensions.height || (<Point>object.position).y < 0) speedY = -speedY;
        }, 10);
        setInterval(() => {
            let { r, g, b } = this.RGB();
            object.color = `rgb(${r},${g},${b})`;
        }, 1000);
    };

    grid = (rowsX: number, rowsY: number) => {
        let matrix = [], tracker = [];
        const tileSize = new Dimension(Math.round(this.dimensions.width / rowsX), Math.round(this.dimensions.height / rowsY));

        for (let i = 0; i <= rowsX; i++) matrix[i] = new Array(rowsY);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = 0;
            }
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] === 0) {
                    let object = new GameObject(Model.RECTANGLE_BORDER, new Point(i * tileSize.width + i, j * tileSize.height + j), new Dimension(tileSize.width, tileSize.height), "white");
                    this.render.requestStage(object);
                    tracker.push(object);
                }
            }
        }

        return tracker;
    }

    conways(xRow: number, yRow: number, aliveColor?: string, deadColor?: string, speed?: number, seed?: any[][]): Conways {
        return new Conways(this.render, this.dimensions, new Dimension(xRow, yRow), aliveColor, deadColor, speed, seed);
    }

    async aStar(xRow: number, yRow: number, xStart?: number, yStart?: number, xEnd?: number, yEnd?: number, speed?: number, allowDiagonal?: boolean, seed?: number[][]) {
        return new Pathfinding(this.dimensions, this.render, new Dimension(xRow, yRow), xStart, yStart, xEnd, yEnd, speed, allowDiagonal, seed);
    }

    gridFromMapFile = () => {
        console.log(mapFile);
    }


}


