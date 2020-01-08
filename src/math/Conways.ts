import Dimension from "./Dimension";
import Point from "./Point";
import Geometry from "./Geometry";

import GameObject from "../core/GameObject";
import { Model } from "../core/Model";
import Renderable from "../core/Renderable";
import Render from "../render/CanvasRenderer";

export default class Conways implements Renderable {
    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    screen: Dimension;
    rows: Dimension;
    aliveColor?: string;
    deadColor?: string;
    speed?: number;
    matrix: any[][];
    bufferMatrix: any[][];
    tileSize: Dimension;
    render: Render;

    shouldRender: boolean;
    data: any[];
    constructor(render, screen, rows, aliveColor, deadColor, speed, seed) {
        this.shouldRender = true;
        this.render = render;
        this.screen = screen;

        this.rows = rows;
        this.aliveColor = aliveColor;
        this.deadColor = deadColor;
        this.speed = speed;

        if (!aliveColor) this.aliveColor = "black";
        if (!deadColor) this.deadColor = "white";

        this.tileSize = new Dimension(Math.round(this.screen.width / this.rows.width), Math.round(this.screen.height / this.rows.height));
        this.matrix = seed;
        if (!seed) this.matrix = Geometry.createMatrix(this.rows);
        this.bufferMatrix = Geometry.createMatrix(this.rows);
        
        this.createAliveDeadGridOfGameObjects();
        this.start();
    }

    isAlive = (position: Point, world: GameObject[][]) => {
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

    createAliveDeadGridOfGameObjects() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === 1 || Math.floor(Math.random() * 10) === 1) {
                    this.matrix[i][j] = new GameObject(Model.RECTANGLE, new Point(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension(this.tileSize.width, this.tileSize.height), this.aliveColor || "black");
                    this.matrix[i][j].addProperty("alive", true);
                    this.bufferMatrix[i][j] = new GameObject(Model.RECTANGLE, new Point(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension(this.tileSize.width, this.tileSize.height), this.aliveColor || "black");
                    this.bufferMatrix[i][j].addProperty("alive", true);
                }
                else {
                    this.matrix[i][j] = new GameObject(Model.RECTANGLE, new Point(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension(this.tileSize.width, this.tileSize.height), this.deadColor || "white");
                    this.matrix[i][j].addProperty("alive", false);
                    this.bufferMatrix[i][j] = new GameObject(Model.RECTANGLE, new Point(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension(this.tileSize.width, this.tileSize.height), this.deadColor || "white");
                    this.bufferMatrix[i][j].addProperty("alive", false);
                }
                if (this.shouldRender) this.render.requestStage(this.matrix[i][j]);
            }
        }
    }

    start() {
        setInterval(() => {
            if (this.shouldRender) this.render.clearStage();
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix.length; j++) {
                    let alive = this.isAlive(new Point(i, j), this.matrix);
                    if (alive) {
                        this.bufferMatrix[i][j].color = this.aliveColor || "black";
                        this.bufferMatrix[i][j].props["alive"] = true;
                    }
                    else {
                        this.bufferMatrix[i][j].props["alive"] = false;
                        this.bufferMatrix[i][j].color = this.deadColor || "white";
                    }
                    if (this.shouldRender) this.render.requestStage(this.matrix[i][j]);
                }
            }
            // Matching properties from bufferedMatrix and matrix without losing reference.
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix.length; j++) {
                    this.matrix[i][j].color = this.bufferMatrix[i][j].color;
                    this.matrix[i][j].props["alive"] = this.bufferMatrix[i][j].props["alive"];
                }
            }
        }, this.speed || 100);
    }

}