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

    async aStar(xRow: number, yRow: number, xStart?: number, yStart?: number, xEnd?: number, yEnd?: number, speed?: number, seed?: number[][]) {
        return new Pathfinding(this.dimensions, this.render, new Dimension(xRow, yRow), xStart, yStart, xEnd, yEnd, speed, seed);
        // Gcost = distance from current node to the start node.
        // Hcost = distance from current node to the end node.
        // Fcost = Gcost + Hcost.
        // Compute G, H and F for every surrounding start node (8 positions) and choose the one with the lowest Fcost.

        // @TODO - Make sure that the final path is not ALL the closed nodes but the shortest path among the closed nodes.
        // if (xStart && yStart && xEnd && yEnd && xStart === xEnd && yStart === yEnd) return null;

        // let matrix = [], tracker = [], closedNodes = [];
        // let start = xStart !== null && yStart !== null ? new Point(xStart, yStart) : new Point(Math.floor(Math.random() * xRow), Math.floor(Math.random() * yRow));
        // let end = xEnd !== null && yEnd !== null ? new Point(xEnd, yEnd) : new Point(Math.floor(Math.random() * xRow), Math.floor(Math.random() * yRow));
        // const tileSize = new Dimension(Math.floor(this.dimensions.width / xRow), Math.floor(this.dimensions.height / yRow));

        // let currentNode, endNode, startNode, openList = [], bestPath = [];

        // for (let i = 0; i < xRow; i++) matrix[i] = new Array(yRow);

        // for (let i = 0; i < matrix.length; i++) {
        //     for (let j = 0; j < matrix[i].length; j++) {
        //         if (i === start.x && j === start.y) matrix[i][j] = 2;
        //         else if (i === end.x && j === end.y) matrix[i][j] = 3;
        //         else if (Math.floor(Math.random() * 10) < 3) matrix[i][j] = 4;
        //         else matrix[i][j] = 1;
        //     }
        // }

        // for (let i = 0; i < matrix.length; i++) {
        //     for (let j = 0; j < matrix[i].length; j++) {
        //         let object;
        //         if (matrix[i][j] === 1) {
        //             object = new GameObject(Model.RECTANGLE, new Point(i * tileSize.width + i, j * tileSize.height + j), new Dimension(tileSize.width, tileSize.height), "white");
        //             object.addProperty("coords", new Point(i, j));
        //         }
        //         else if (matrix[i][j] === 2) {
        //             object = new GameObject(Model.RECTANGLE, new Point(i * tileSize.width + i, j * tileSize.height + j), new Dimension(tileSize.width, tileSize.height), "blue");
        //             object.addProperty("start", true);
        //             object.addProperty("coords", new Point(i, j));
        //             object.addProperty("gCost", 0);
        //             startNode = object;
        //             currentNode = object;
        //         }
        //         else if (matrix[i][j] === 3) {
        //             object = new GameObject(Model.RECTANGLE, new Point(i * tileSize.width + i, j * tileSize.height + j), new Dimension(tileSize.width, tileSize.height), "red");
        //             object.addProperty("end", true);
        //             object.addProperty("coords", new Point(i, j));
        //             endNode = object;
        //         }
        //         else {
        //             object = new GameObject(Model.RECTANGLE, new Point(i * tileSize.width + i, j * tileSize.height + j), new Dimension(tileSize.width, tileSize.height), "black");
        //             object.addProperty("wall", true);
        //             object.addProperty("coords", new Point(i, j));
        //         }
        //         this.render.requestStage(object);
        //         tracker.push(object);
        //     }
        // }

        // let findGameObjectByCoordinate = (point: Point): GameObject | null => {
        //     let found = null;
        //     for (let obj of tracker) {
        //         if (obj.props["coords"].x === point.x && obj.props["coords"].y === point.y) {
        //             found = obj;
        //             break;
        //         }
        //     }
        //     return found;
        // }

        // let lookForBestPathAfterEndNodeFound = () => {
        //     let next = currentNode;
        //     next.color = "lightblue";
        //     bestPath.push(next);
        //     while (next) {
        //         if (next && next.props && next.props.start) break;
        //         next = next.props.parent;
        //         next.color = "lightblue";
        //         bestPath.push(next);
        //     }
        //     endNode.color = "lightblue";
        //     console.log(currentNode, bestPath);
        // }

        // let addCostsToGameObject = async (startPoint: Point, endPoint: Point, pointToTest: Point): Promise<GameObject> => {
        //     // The trick here is that the Gcost is not SIMPLY the distance between the node being tested to the startNode.
        //     // It's rather the distance of the distance from the currentNode to the node being tested + the distance of the 
        //     // currentNode to the startNode. So Gcost = d(currentNode, thisNode) + d(currentNode, startNode).
        //     // Using distance between points will calculate correctly all the diagonals G and H costs.
        //     let G =
        //         Geometry.distanceBetweenPoints(new Point(pointToTest.x, pointToTest.y), new Point(currentNode.props.coords.x, currentNode.props.coords.y)) +
        //         Geometry.distanceBetweenPoints(new Point(currentNode.props.coords.x, currentNode.props.coords.y), startPoint);
        //     const H = Geometry.distanceBetweenPoints(new Point(pointToTest.x, pointToTest.y), endPoint);
        //     const F = G + H;

        //     let foundGameObject = findGameObjectByCoordinate(pointToTest);

        //     if (foundGameObject.props.closed) return foundGameObject;

        //     if (!foundGameObject.props.wall && !foundGameObject.props.start && !foundGameObject.props.end) {
        //         foundGameObject.color = "lightgreen";
        //     }

        //     if (!foundGameObject.props.start) foundGameObject.addProperty("parent", currentNode);

        //     // Since our Gcost is variable, I will never stop my code from re-adding the cost properties.
        //     if (foundGameObject && !foundGameObject.props.start) {

        //         if (foundGameObject.props["repeated"]) {
        //             if (F < foundGameObject.props["fCost"]) {
        //                 foundGameObject.addProperty("gCost", G);
        //                 foundGameObject.addProperty("hCost", H);
        //                 foundGameObject.addProperty("fCost", F);

        //                 if (foundGameObject.props.parent) {
        //                     foundGameObject.props.parent.addProperty("gCost", G);
        //                     foundGameObject.props.parent.addProperty("hCost", H);
        //                     foundGameObject.props.parent.addProperty("fCost", F);
        //                 }
        //             }
        //         } else {
        //             foundGameObject.addProperty("gCost", G);
        //             foundGameObject.addProperty("hCost", H);
        //             foundGameObject.addProperty("fCost", F);
        //         }


        //         if (foundGameObject.props.end) {
        //             lookForBestPathAfterEndNodeFound();
        //         }
        //     }

        //     return foundGameObject;
        // }

        // let isInOpenList = (point: Point): boolean => {
        //     for (let obj of openList) {
        //         if (obj.props["coords"].x === point.x && obj.props["coords"].y === point.y) {
        //             obj.addProperty("repeated", true);
        //             return true;
        //         }
        //     }
        //     return false;
        // }

        // let closed = (gameObject: GameObject): boolean => {
        //     return !!gameObject.props.closed;
        // }

        // let calculateCosts = async (point: Point) => {

        //     let startPoint = new Point(startNode.props["coords"].x, startNode.props["coords"].y);
        //     let endPoint = new Point(endNode.props["coords"].x, endNode.props["coords"].y);
        //     let returnedGameObject;

        //     if (matrix[point.x + 1] && matrix[point.x + 1][point.y]) {
        //         if (matrix[point.x + 1][point.y] !== 4) {
        //             const repeat = isInOpenList(new Point(point.x + 1, point.y));
        //             let object = await addCostsToGameObject(startPoint, endPoint, new Point(point.x + 1, point.y));
        //             if (!repeat && !closed(object)) openList.push(object);
        //         }
        //     }

        //     if (matrix[point.x - 1] && matrix[point.x - 1][point.y]) {
        //         if (matrix[point.x - 1][point.y] !== 4) {
        //             const repeat = isInOpenList(new Point(point.x - 1, point.y));
        //             let object = await addCostsToGameObject(startPoint, endPoint, new Point(point.x - 1, point.y));
        //             if (!repeat && !closed(object)) openList.push(object);
        //         }
        //     }

        //     if (matrix[point.x] && matrix[point.x][point.y + 1]) {
        //         if (matrix[point.x][point.y + 1] !== 4) {
        //             const repeat = isInOpenList(new Point(point.x, point.y + 1));
        //             let object = await addCostsToGameObject(startPoint, endPoint, new Point(point.x, point.y + 1));
        //             if (!repeat && !closed(object)) openList.push(object);
        //         }
        //     }

        //     if (matrix[point.x] && matrix[point.x][point.y - 1]) {
        //         if (matrix[point.x][point.y - 1] !== 4) {
        //             const repeat = isInOpenList(new Point(point.x, point.y - 1));
        //             let object = await addCostsToGameObject(startPoint, endPoint, new Point(point.x, point.y - 1));
        //             if (!repeat && !closed(object)) openList.push(object);
        //         }
        //     }

        //     if (matrix[point.x - 1] && matrix[point.x - 1][point.y + 1]) {
        //         if (matrix[point.x - 1][point.y + 1] !== 4) {
        //             const repeat = isInOpenList(new Point(point.x - 1, point.y + 1));
        //             let object = await addCostsToGameObject(startPoint, endPoint, new Point(point.x - 1, point.y + 1))
        //             if (!repeat && !closed(object)) openList.push(object);
        //         }
        //     }

        //     if (matrix[point.x + 1] && matrix[point.x + 1][point.y + 1]) {
        //         if (matrix[point.x + 1][point.y + 1] !== 4) {
        //             const repeat = isInOpenList(new Point(point.x + 1, point.y + 1));
        //             let object = await addCostsToGameObject(startPoint, endPoint, new Point(point.x + 1, point.y + 1));
        //             if (!repeat && !closed(object)) openList.push(object);
        //         }
        //     }

        //     if (matrix[point.x - 1] && matrix[point.x - 1][point.y - 1]) {
        //         if (matrix[point.x - 1][point.y - 1] !== 4) {
        //             const repeat = isInOpenList(new Point(point.x - 1, point.y - 1));
        //             let object = await addCostsToGameObject(startPoint, endPoint, new Point(point.x - 1, point.y - 1));
        //             if (!repeat && !closed(object)) openList.push(object);
        //         }
        //     }

        //     if (matrix[point.x + 1] && matrix[point.x + 1][point.y - 1]) {
        //         if (matrix[point.x + 1][point.y - 1] !== 4) {
        //             const repeat = isInOpenList(new Point(point.x + 1, point.y - 1));
        //             let object = await addCostsToGameObject(startPoint, endPoint, new Point(point.x + 1, point.y - 1));
        //             if (!repeat && !closed(object)) openList.push(object);
        //         }
        //     }

        //     openList.sort((a, b) => {
        //         let weightA = 0, weightB = 0;
        //         if (b.props["fCost"] === a.props["fCost"]) {
        //             // @TODO - On this first if, it doesn't matter if it's A or B. It's a draw. Add randomness later.
        //             if (b.props["hCost"] === a.props["hCost"]) weightA += 500;
        //             else if (b.props["hCost"] < a.props["hCost"]) weightB += 500;
        //             else weightA += 500;
        //         }
        //         else if (b.props["fCost"] > a.props["fCost"]) weightA += 500;
        //         else if (b.props["fCost"] < a.props["fCost"]) weightB += 500;

        //         return weightB - weightA;
        //     });
        //     if (!openList[0].props.start && !openList[0].props.end && !openList[0].props.wall && !openList[0].props.closed) {
        //         console.log(openList[0].props["fCost"])
        //         openList[0].color = "pink";
        //         openList[0].addProperty("closed", true);
        //         // openList[0].addProperty("parent", currentNode);
        //         closedNodes.push(openList[0]);
        //     }

        //     returnedGameObject = openList[0];
        //     openList.shift();

        //     return returnedGameObject;
        // };

        // while (!currentNode.props["end"]) {
        //     await Sleep.now(speed);
        //     currentNode = await calculateCosts(currentNode.props["coords"]);
        // }

    }

    gridFromMapFile = () => {
        console.log(mapFile);
    }


}


