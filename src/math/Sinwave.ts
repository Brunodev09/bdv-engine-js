import GameObject from "../core/GameObject";
import Point from "./Point";

export default class Sinwave {
    division: number;
    division2: number;
    sin: number;
    angle: number;
    grid: GameObject[][];
    
    constructor() {
        this.division = null;
        this.division2 = null;
        this.sin = 1;
        this.angle = 360;
        this.grid = null;
    }

    isPointPartOfSinPlot(point: Point) {
        let operation = Math.sin(point.x * Math.PI / 180.0);
        if (operation >= 0.99) operation = 1;
        else if (operation <= -0.99) operation = -1;
        if (operation < point.y + this.division2 && operation > point.y - this.division2) {
            return true;
        }
        return false;
    }

    populateGridWithSinValues(grid: GameObject[][]) {
        this.division = this.angle / (grid.length - 1);
        this.division2 = 2 / (grid[0].length - 1); // Variation between 1 and -1 -> delta = 2
        for (let x = 0; x < grid.length; x++) {
            this.sin = 1;
            for (let y = 0; y < grid.length; y++) {
                grid[x][y].addProperty("xValue", this.angle);
                grid[x][y].addProperty("yValue", this.sin);
                this.sin -= this.division2;
                if (this.sin <= -0.99) this.sin = -1;
            }
            this.angle -= this.division;
        }

        return grid;
    }
}