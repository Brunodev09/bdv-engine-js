// @TODO - Load tiled map from JSON, Algos and graphs.
// @TODO - Finish porting shape based rendering to GameObject -> Stages (Circles, arcs and fonts).
// @TODO - Dungeon generator.
// @TODO - Nodejs tool that reads a image file and converts it a color-mapped JSON.
// @TODO - Handling images.
// @TODO - Collidables.
// @TODO - Expand pixel rendering, perlin noise and mandelbrots.
// @TODO - Easy networking.

//@TODO - Create behaviour class for GameObjects.

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

    constructor(width: number, height: number) {
        this.canvasId = "CANVAS_ID";
        this.dimensions = new Dimension(width, height);
        this.render = null;
        this.render2 = null;

        let element = document.createElement('CANVAS');
        element.setAttribute("id", "CANVAS_ID");
        element.setAttribute("width", String(width));
        element.setAttribute("height", String(height));
        document.body.appendChild(element);
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

    newGameObject = (model: string, positionX: number, positionY: number, width: number, height: number, color: string, font?: string, message?: string): GameObject => {
        let object = new GameObject(Model[model], new Point(positionX, positionY), new Dimension(width, height), color, font, message);
        this.render.requestStage(object);

        return object;
    }

    newGameObjectArray = (model: string, positions: number[][], color: string, font?: string, message?: string): GameObject => {
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

    Vector2D(object1: GameObject, object2: GameObject, color?: string) {
        // If no color is attributed, a transparent vector will be created.
        if (!color) color = `rgb(0, 0, 0, 0)`;
        return new GameObject(Model.VECTOR, [object1.middle, object2.middle], new Dimension(0, 0), color);
    }

    drawingVectors = () => {
        let object1 = new GameObject(Model.RECTANGLE, new Point(280, 300), new Dimension(100, 100), "blue");
        let object2 = new GameObject(Model.RECTANGLE, new Point(100, 300), new Dimension(100, 100), "red");

        object1.addProperty("speedX", 3);
        object1.addProperty("speedY", 3);
        object1.erraticMovement();

        object2.addProperty("speedX", 30);
        object2.addProperty("speedY", 30);
        object2.isPlayer(true);

        this.connectVector(object2, object1);

        // object1.follow(object2);

        this.render.requestStage(object1);
        this.render.requestStage(object2);

        setInterval(() => {
            object2.collision(object1);
            object1.update();
            object2.update();
        }, 15);
    }

    connectVector(follower: GameObject, followed: GameObject): GameObject {
        let vec = this.Vector2D(followed, follower, "white");
        this.render.requestStage(vec);
        return vec;
    }

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


