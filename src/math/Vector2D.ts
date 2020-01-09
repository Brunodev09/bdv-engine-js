import Point from "./Point";

export default class Vector2D {
    xComponent: number;
    yComponent: number;
    magnitude: number;
    static NewComponents(xComponent: number, yComponent: number): Vector2D {
        let vec = new Vector2D();
        vec.xComponent = xComponent;
        vec.yComponent = yComponent;
        return vec;
    }

    static NewPointSubtraction(pointA: Point, pointB: Point): Vector2D {
        let vec = new Vector2D();
        vec.xComponent = pointA.x - pointB.x;
        vec.yComponent = pointA.y - pointB.y;
        return vec;
    }

    static magnitude(vec: Vector2D): number {
        return Math.abs((vec.xComponent ^ 2) + (vec.yComponent ^ 2));
    }
}