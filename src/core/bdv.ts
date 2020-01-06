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
        const tileSize = new Dimension(Math.floor(this.dimensions.width / rowsX), Math.floor(this.dimensions.height / rowsY));

        for (let i = 0; i < rowsX; i++) matrix[i] = new Array(rowsY);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = 0;
            }
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] === 0) {
                    let object = new GameObject(Model.RECTANGLE_BORDER, new Point(i * tileSize.width, j * tileSize.height), new Dimension(tileSize.width, tileSize.height), "white");
                    this.render.requestStage(object);
                    tracker.push(object);
                }
            }
        }

        return tracker;
    }

    conways(xRow: number, yRow: number, initialSeed?: any[][], aliveColor?: string, deadColor?: string, speed?: number) {

        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

        let matrix = initialSeed, bufferMatrix = [];
        const tileSize = new Dimension(Math.floor(this.dimensions.width / xRow), Math.floor(this.dimensions.height / yRow));

        if (!initialSeed) {
            matrix = [];
            for (let i = 0; i < xRow; i++) matrix[i] = new Array(yRow);
        }
        for (let i = 0; i < xRow; i++) bufferMatrix[i] = new Array(yRow);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1 || Math.floor(Math.random() * 10) === 1) {
                    matrix[i][j] = new GameObject(Model.RECTANGLE, new Point(i * tileSize.width, j * tileSize.height), new Dimension(tileSize.width, tileSize.height), aliveColor || "black");
                    matrix[i][j].addProperty("alive", true);
                    bufferMatrix[i][j] = new GameObject(Model.RECTANGLE, new Point(i * tileSize.width, j * tileSize.height), new Dimension(tileSize.width, tileSize.height), aliveColor || "black");
                    bufferMatrix[i][j].addProperty("alive", true);
                }
                else {
                    matrix[i][j] = new GameObject(Model.RECTANGLE, new Point(i * tileSize.width, j * tileSize.height), new Dimension(tileSize.width, tileSize.height), deadColor || "white");
                    matrix[i][j].addProperty("alive", false);
                    bufferMatrix[i][j] = new GameObject(Model.RECTANGLE, new Point(i * tileSize.width, j * tileSize.height), new Dimension(tileSize.width, tileSize.height), deadColor || "white");
                    bufferMatrix[i][j].addProperty("alive", false);
                }
                this.render.requestStage(matrix[i][j]);
            }
        }

        let isAlive = (position: Point, world: GameObject[][]) => {
            let neighboursCount = 0;

            const cellStatus = world[position.x][position.y].props["alive"];

            if (world[position.x + 1] && world[position.x + 1][position.y] &&
                world[position.x + 1][position.y].props["alive"]) neighboursCount++;

            if (world[position.x - 1] && world[position.x - 1][position.y] &&
                world[position.x - 1][position.y].props["alive"]) neighboursCount++;

            if (world[position.x] && world[position.x][position.y + 1] &&
                world[position.x][position.y + 1].props["alive"]) neighboursCount++;

            if (world[position.x] && world[position.x][position.y - 1] &&
                world[position.x][position.y - 1].props["alive"]) neighboursCount++;

            if (world[position.x - 1] && world[position.x - 1][position.y + 1] &&
                world[position.x - 1][position.y + 1].props["alive"]) neighboursCount++;

            if (world[position.x + 1] && world[position.x + 1][position.y + 1] &&
                world[position.x + 1][position.y + 1].props["alive"]) neighboursCount++;

            if (world[position.x - 1] && world[position.x - 1][position.y - 1] &&
                world[position.x - 1][position.y - 1].props["alive"]) neighboursCount++;

            if (world[position.x + 1] && world[position.x + 1][position.y - 1] &&
                world[position.x + 1][position.y - 1].props["alive"]) neighboursCount++;

            if (cellStatus) {
                if (neighboursCount < 2) return false;
                if (neighboursCount === 2 || neighboursCount === 3) return true;
                if (neighboursCount > 3) return false;
            }
            else if (!cellStatus && neighboursCount === 3) return true;
            else return false;
        }

        setInterval(() => {
            this.render.clearStage();
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix.length; j++) {
                    let alive = isAlive(new Point(i, j), matrix);
                    if (alive) {
                        bufferMatrix[i][j].color = aliveColor || "black";
                        bufferMatrix[i][j].props["alive"] = true;
                    }
                    else {
                        bufferMatrix[i][j].props["alive"] = false;
                        bufferMatrix[i][j].color = deadColor || "white";
                    }
                    this.render.requestStage(matrix[i][j]);
                }
            }
            // Matching properties from bufferedMatrix and matrix without losing reference.
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix.length; j++) {
                    matrix[i][j].color = bufferMatrix[i][j].color;
                    matrix[i][j].props["alive"] = bufferMatrix[i][j].props["alive"];
                }
            }
        }, speed || 100);
    }

    gridFromMapFile = () => {
        console.log(mapFile);
    }
}

