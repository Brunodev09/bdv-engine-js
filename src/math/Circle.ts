import Point from "./Point";
import Geometry from "./Geometry";
import GameObject from "../core/GameObject";

export class CircleSpawner {
    generatedCircles: Circle[];
    constructor(grid: GameObject[][], circles: Circle[]) {
        this.generatedCircles = [];
        for (let circle of circles) {
            for (let x = 0; x < grid.length; x++) {
                for (let y = 0; y < grid[x].length; y++) {
                    if (grid[x][y].props["coords"].x === circle.origin.x && grid[x][y].props["coords"].y === circle.origin.y) {
                        grid[x][y].color = circle.color;
                        circle.points.push(new Point(x, y));
                    }
                    else if (Geometry.isPointInsideCircle(new Point(grid[x][y].props["coords"].x, grid[x][y].props["coords"].y), circle.origin, circle.radius)) {
                        grid[x][y].color = circle.color;
                        circle.points.push(new Point(x, y));
                    }
                }
            }
            this.generatedCircles.push(circle);
        }
    }

    getGeneratedCircles(): Circle[] {
        return this.generatedCircles;
    }
}

export class Circle {
    origin: Point;
    radius: number;
    color: string;
    points?: Point[];
    constructor(origin: Point, radius: number, color: string) {
        this.origin = origin;
        this.radius = radius;
        this.color = color;
        this.points = [];
    }

}