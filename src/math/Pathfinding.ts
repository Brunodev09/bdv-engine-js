import GameObject from "../core/GameObject";
import Dimension from "./Dimension";
import Point from "./Point";
import Geometry from "./Geometry";
import Sleep from "../utils/Sleep";

import Renderable from "../core/Renderable";
import Render from "../render/CanvasRenderer";
import { Model } from "../core/Model";

export default class Pathfinding implements Renderable {


    static A_STAR_COST_SORTING(a: GameObject, b: GameObject) {
            let weightA = 0, weightB = 0;
            if (b.props["fCost"] === a.props["fCost"]) {
                // @TODO - On this first if, it doesn't matter if it's A or B. It's a draw. Add randomness later.
                if (b.props["hCost"] === a.props["hCost"]) weightA += 500;
                else if (b.props["hCost"] < a.props["hCost"]) weightB += 500;
                else weightA += 500;
            }
            else if (b.props["fCost"] > a.props["fCost"]) weightA += 500;
            else if (b.props["fCost"] < a.props["fCost"]) weightB += 500;

            return weightB - weightA;
    }

    shouldRender: boolean;
    data: any[];

    screen: Dimension;
    render: Render;

    rows: Dimension;
    tileSize: Dimension;
    xStart?: number;
    yStart?: number;
    xEnd?: number;
    yEnd?: number;
    speed?: number;
    seed?: number[][];

    currentNode: GameObject;
    endNode: GameObject;
    startNode: GameObject;
    openList: GameObject[];
    closedList: GameObject[];
    bestPath: GameObject[];
    matrix: number[][];
    tracker: GameObject[];
    start: Point;
    end: Point;

    constructor(screen, render, rows, xStart, yStart, xEnd, yEnd, speed, seed) {
        // Gcost = distance from current node to the start node.
        // Hcost = distance from current node to the end node.
        // Fcost = Gcost + Hcost.
        // Compute G, H and F for every surrounding start node (8 positions) and choose the one with the lowest Fcost.

        this.screen = screen;
        this.render = render;
        this.rows = rows;
        this.speed = speed;

        this.closedList = [], this.openList = [], this.bestPath = [], this.tracker = [];

        if (xStart && yStart && xEnd && yEnd && xStart === xEnd && yStart === yEnd) return null;

        this.matrix = [], this.tracker = [], this.closedList = [];
        this.start = xStart !== null && yStart !== null ? new Point(xStart, yStart) : new Point(Math.floor(Math.random() * this.rows.width), Math.floor(Math.random() * this.rows.height));
        this.end = xEnd !== null && yEnd !== null ? new Point(xEnd, yEnd) : new Point(Math.floor(Math.random() * this.rows.width), Math.floor(Math.random() * this.rows.height));
        this.tileSize = new Dimension(Math.floor(this.screen.width / this.rows.width), Math.floor(this.screen.height / this.rows.height));

        this.matrix = Geometry.createMatrix(new Dimension(this.rows.width, this.rows.height));

        this.randomGeneration(1);
        this.createGameObjectWithCosts();
        this.run();
    }

    randomGeneration(obstacleLevel: number) {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (i === this.start.x && j === this.start.y) this.matrix[i][j] = 2;
                else if (i === this.end.x && j === this.end.y) this.matrix[i][j] = 3;
                else if (Math.floor(Math.random() * 10) < 3) this.matrix[i][j] = 4;
                else this.matrix[i][j] = 1;
            }
        }
    }

    createGameObjectWithCosts() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                let object;
                if (this.matrix[i][j] === 1) {
                    object = new GameObject(Model.RECTANGLE, new Point(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension(this.tileSize.width, this.tileSize.height), "white");
                    object.addProperty("coords", new Point(i, j));
                }
                else if (this.matrix[i][j] === 2) {
                    object = new GameObject(Model.RECTANGLE, new Point(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension(this.tileSize.width, this.tileSize.height), "blue");
                    object.addProperty("start", true);
                    object.addProperty("coords", new Point(i, j));
                    object.addProperty("gCost", 0);
                    this.startNode = object;
                    this.currentNode = object;
                }
                else if (this.matrix[i][j] === 3) {
                    object = new GameObject(Model.RECTANGLE, new Point(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension(this.tileSize.width, this.tileSize.height), "red");
                    object.addProperty("end", true);
                    object.addProperty("coords", new Point(i, j));
                    this.endNode = object;
                }
                else {
                    object = new GameObject(Model.RECTANGLE, new Point(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension(this.tileSize.width, this.tileSize.height), "black");
                    object.addProperty("wall", true);
                    object.addProperty("coords", new Point(i, j));
                }
                this.render.requestStage(object);
                this.tracker.push(object);
            }
        }
    }

    isInOpenList = (point: Point): boolean => {
        for (let obj of this.openList) {
            if (obj.props["coords"].x === point.x && obj.props["coords"].y === point.y) {
                obj.addProperty("repeated", true);
                return true;
            }
        }
        return false;
    }

    closed = (gameObject: GameObject): boolean => {
        return !!gameObject.props.closed;
    }

    findGameObjectByCoordinate = (point: Point): GameObject | null => {
        let found = null;
        for (let obj of this.tracker) {
            if (obj.props["coords"].x === point.x && obj.props["coords"].y === point.y) {
                found = obj;
                break;
            }
        }
        return found;
    }

    lookForBestPathAfterEndNodeFound = () => {
        let next = this.currentNode;
        next.color = "lightblue";
        this.bestPath.push(next);
        while (next) {
            if (next && next.props && next.props.start) break;
            next = next.props.parent;
            next.color = "lightblue";
            this.bestPath.push(next);
        }
        this.endNode.color = "lightblue";
    }

    addCostsToGameObject = async (startPoint: Point, endPoint: Point, pointToTest: Point): Promise<GameObject> => {
        // The trick here is that the Gcost is not SIMPLY the distance between the node being tested to the startNode.
        // It's rather the distance of the distance from the currentNode to the node being tested + the distance of the 
        // currentNode to the startNode. So Gcost = d(currentNode, thisNode) + d(currentNode, startNode).
        // Using distance between points will calculate correctly all the diagonals G and H costs.
        let G =
            Geometry.distanceBetweenPoints(new Point(pointToTest.x, pointToTest.y), new Point(this.currentNode.props.coords.x, this.currentNode.props.coords.y)) +
            Geometry.distanceBetweenPoints(new Point(this.currentNode.props.coords.x, this.currentNode.props.coords.y), startPoint);
        const H = Geometry.distanceBetweenPoints(new Point(pointToTest.x, pointToTest.y), endPoint);
        const F = G + H;

        let foundGameObject = this.findGameObjectByCoordinate(pointToTest);

        if (foundGameObject.props.closed) return foundGameObject;

        if (!foundGameObject.props.wall && !foundGameObject.props.start && !foundGameObject.props.end) {
            foundGameObject.color = "lightgreen";
        }

        if (!foundGameObject.props.start) foundGameObject.addProperty("parent", this.currentNode);

        // Since our Gcost is variable, I will never stop my code from re-adding the cost properties.
        if (foundGameObject && !foundGameObject.props.start) {

            if (foundGameObject.props["repeated"]) {
                if (F < foundGameObject.props["fCost"]) {
                    foundGameObject.addProperty("gCost", G);
                    foundGameObject.addProperty("hCost", H);
                    foundGameObject.addProperty("fCost", F);

                    if (foundGameObject.props.parent) {
                        foundGameObject.props.parent.addProperty("gCost", G);
                        foundGameObject.props.parent.addProperty("hCost", H);
                        foundGameObject.props.parent.addProperty("fCost", F);
                    }
                }
            } else {
                foundGameObject.addProperty("gCost", G);
                foundGameObject.addProperty("hCost", H);
                foundGameObject.addProperty("fCost", F);
            }


            if (foundGameObject.props.end) {
                this.lookForBestPathAfterEndNodeFound();
            }
        }

        return foundGameObject;
    }

    calculateCosts = async (point: Point) => {

        let startPoint = new Point(this.startNode.props["coords"].x, this.startNode.props["coords"].y);
        let endPoint = new Point(this.endNode.props["coords"].x, this.endNode.props["coords"].y);
        let returnedGameObject;

        if (this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y]) {
            if (this.matrix[point.x + 1][point.y] !== 4) {
                const repeat = this.isInOpenList(new Point(point.x + 1, point.y));
                let object = await this.addCostsToGameObject(startPoint, endPoint, new Point(point.x + 1, point.y));
                if (!repeat && !this.closed(object)) this.openList.push(object);
            }
        }

        if (this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y]) {
            if (this.matrix[point.x - 1][point.y] !== 4) {
                const repeat = this.isInOpenList(new Point(point.x - 1, point.y));
                let object = await this.addCostsToGameObject(startPoint, endPoint, new Point(point.x - 1, point.y));
                if (!repeat && !this.closed(object)) this.openList.push(object);
            }
        }

        if (this.matrix[point.x] && this.matrix[point.x][point.y + 1]) {
            if (this.matrix[point.x][point.y + 1] !== 4) {
                const repeat = this.isInOpenList(new Point(point.x, point.y + 1));
                let object = await this.addCostsToGameObject(startPoint, endPoint, new Point(point.x, point.y + 1));
                if (!repeat && !this.closed(object)) this.openList.push(object);
            }
        }

        if (this.matrix[point.x] && this.matrix[point.x][point.y - 1]) {
            if (this.matrix[point.x][point.y - 1] !== 4) {
                const repeat = this.isInOpenList(new Point(point.x, point.y - 1));
                let object = await this.addCostsToGameObject(startPoint, endPoint, new Point(point.x, point.y - 1));
                if (!repeat && !this.closed(object)) this.openList.push(object);
            }
        }

        if (this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y + 1]) {
            if (this.matrix[point.x - 1][point.y + 1] !== 4) {
                const repeat = this.isInOpenList(new Point(point.x - 1, point.y + 1));
                let object = await this.addCostsToGameObject(startPoint, endPoint, new Point(point.x - 1, point.y + 1))
                if (!repeat && !this.closed(object)) this.openList.push(object);
            }
        }

        if (this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y + 1]) {
            if (this.matrix[point.x + 1][point.y + 1] !== 4) {
                const repeat = this.isInOpenList(new Point(point.x + 1, point.y + 1));
                let object = await this.addCostsToGameObject(startPoint, endPoint, new Point(point.x + 1, point.y + 1));
                if (!repeat && !this.closed(object)) this.openList.push(object);
            }
        }

        if (this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y - 1]) {
            if (this.matrix[point.x - 1][point.y - 1] !== 4) {
                const repeat = this.isInOpenList(new Point(point.x - 1, point.y - 1));
                let object = await this.addCostsToGameObject(startPoint, endPoint, new Point(point.x - 1, point.y - 1));
                if (!repeat && !this.closed(object)) this.openList.push(object);
            }
        }

        if (this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y - 1]) {
            if (this.matrix[point.x + 1][point.y - 1] !== 4) {
                const repeat = this.isInOpenList(new Point(point.x + 1, point.y - 1));
                let object = await this.addCostsToGameObject(startPoint, endPoint, new Point(point.x + 1, point.y - 1));
                if (!repeat && !this.closed(object)) this.openList.push(object);
            }
        }

        this.openList.sort(Pathfinding.A_STAR_COST_SORTING);

        if (!this.openList[0].props.start && !this.openList[0].props.end && !this.openList[0].props.wall && !this.openList[0].props.closed) {
            this.openList[0].color = "pink";
            this.openList[0].addProperty("closed", true);
            this.closedList.push(this.openList[0]);
        }

        returnedGameObject = this.openList[0];
        this.openList.shift();

        return returnedGameObject;
    };

    async run() {
        while (!this.currentNode.props["end"]) {
            await Sleep.now(this.speed);
            this.currentNode = await this.calculateCosts(this.currentNode.props["coords"]);
        }
    }
}
