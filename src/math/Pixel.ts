import GameObject from "../core/GameObject";
import RGB from "./RGB";
import Point from "./Point";

// Please only use square matrixes.
export default class Pixel {
    grid: GameObject[][];
    rgb: RGB;
    points: Point[];
    area: number;
    failures: number;
    constructor(grid: GameObject[][]) {
        this.points = [];
        this.failures = 0;
        this.grid = grid;
        this.area = Math.floor(Math.round((this.grid.length * this.grid[0].length))) + 100;
        this.generate();

        this.rgb = this.rgba();
    }

    rgba(): RGB {
        return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255), a: Math.floor(Math.random() * 255) }
    }

    stringifyRGB(rgb: RGB): string {
        return `rgb(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
    }

    generate() {
        this.points.push(new Point(Math.floor(Math.random() * this.grid.length - 1), 50));
        let currentPoint = this.points[0];

        for (let i = 0; i < Math.floor(this.area / 8); i++) {
            if (this.failures >= 7) break;

            for (let j = 0; j < 8; j++) {
                let x = Math.floor(Math.random() * Math.floor(Math.random() * 100));
                let y = Math.floor(Math.random() * Math.floor(Math.random() * 100));
                if (this.grid[currentPoint.x + x] && this.grid[currentPoint.x + x][currentPoint.y + y]) {
                    if (this.notInPoints) {
                        this.points.push(new Point(currentPoint.x + x, currentPoint.y + y));
                    } else {
                        j--;
                        continue;
                    }
                } else {
                    this.failures++;
                    j++;
                }
            }

            currentPoint = this.points[Math.floor(Math.random() * this.points.length)];

            if (this.failures < 7) this.failures = 0;
        }
        return this.points;
    }

    removeRandomPoints() {
        for (let point of this.points) {
            if (Math.floor(Math.random() * 50) === 1) this.points.splice(Math.floor(Math.random() * this.points.length - 1), 1);
        }
    }

    notInPoints(point: Point) {
        for (let i = 0; i < this.points.length; i++) {
            if (point.x === this.points[i].x && point.y === this.points[i].y) return false;
        }
        return true;
    }
}
