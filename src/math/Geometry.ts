import Point from "./Point";

export default class Geometry {
    
    static distanceBetweenPoints(pointA: Point, pointB: Point): number {
        return Math.round(Math.sqrt(((pointB.x - pointA.x) * (pointB.x - pointA.x)) + ((pointB.y - pointA.y) * (pointB.y - pointA.y))));
    }
}