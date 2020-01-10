import Point from "./Point";
import Dimension from "./Dimension";


export default class Geometry {
    
    static distanceBetweenPoints(pointA: Point, pointB: Point): number {
        return Math.sqrt(((pointB.x - pointA.x) * (pointB.x - pointA.x)) + ((pointB.y - pointA.y) * (pointB.y - pointA.y)));
    }

    static createMatrix(dimensions: Dimension): any[][] {
        let m = [];
        for (let i = 0; i < dimensions.width; i++) m[i] = new Array(dimensions.height);
        return m;
    }

    static isPointInsideCircle(point: Point, center: Point, radius: number) {
        if (Geometry.distanceBetweenPoints(point, center) >= radius) return false;
        else return true;
    }

}