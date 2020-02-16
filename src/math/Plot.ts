import GameObject from "../core/GameObject";
import Point from "./Point";

export default class Plot {
    grid: GameObject[][];
    equation: number[];
    unboxed: string;
    propertyName: string;
    divisionX: number;
    divisionY: number;
    xInterval: number[];
    yInterval: number[];

    currentX: number;
    currentY: number;
    constructor(grid: GameObject[][], equation: number[], propertyName: string, xInterval: number[]) {
        this.grid = grid;
        this.equation = equation;
        this.propertyName = propertyName;
        this.yInterval = [];
        this.xInterval = xInterval;
        this.unboxed = ``;

        this.divisionY = null;
        this.divisionX = null;

        this.decompressEquation();
    }

    isPointInFunction(point: Point) {
        let operation = eval(this.unboxed);
        // console.log(operation, point.y, this.divisionY)
        // If it's bigger than current point but smaller than the previous. It means our operation is aprox at this point.
        if (operation <= point.y && operation > point.y - this.divisionY) return true;
        return false;
    }

    populateGridWithFunctionValues() {

        this.getYInterval();

        this.divisionX = (Math.abs(this.xInterval[0]) + Math.abs(this.xInterval[1])) / (this.grid.length - 1);
        this.divisionY = (Math.abs(this.yInterval[0]) + Math.abs(this.yInterval[1])) / (this.grid[0].length - 1);
        this.currentX = this.xInterval[1];

        for (let x = 0; x < this.grid.length; x++) {
            this.currentY = this.yInterval[1];
            for (let y = 0; y < this.grid.length; y++) {
                this.grid[x][y].addProperty(this.propertyName + "X", this.currentX);
                this.grid[x][y].addProperty(this.propertyName + "Y", this.currentY);
                this.currentY -= this.divisionY;
            }
            this.currentX -= this.divisionX;
        }
        return this.grid;
    }

    getYInterval() {
        // Point variable must be defined in order for eval to sucessfully run. Run 'eval(this.unboxed)'
        const xLeft = this.xInterval[0], xRight = this.xInterval[1];
        let points = xLeft;
        let highestPoint = 0, smallestPoint = 0;
        while (points < xRight) {
            const _exec = this.execute(new Point(points, 0), this.unboxed);
            if (_exec > highestPoint) highestPoint = _exec;
            else if (_exec < smallestPoint) smallestPoint = _exec;
            points++;
        }
        this.yInterval[0] = smallestPoint;
        this.yInterval[1] = highestPoint;
    }

    private execute(point: Point, expression: string) {
        return eval(expression);
    }

    decompressEquation() {
        let counter = this.equation.length - 1;
        for (let element of this.equation) {
            if (counter === 0) {
                this.unboxed += ` + ${element}`;
                counter--;
                break;
            }
            if (counter === this.equation.length - 1) {
                this.unboxed += `(${element} * Math.pow(point.x, ${counter}))`;
                counter--;
                continue;
            }
            this.unboxed += ` + (${element} * Math.pow(point.x, ${counter}))`;
            counter--;
        }
        console.log(this.unboxed);
    }
}