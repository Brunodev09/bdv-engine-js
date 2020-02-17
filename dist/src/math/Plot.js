"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __importDefault(require("./Point"));
var Plot = /** @class */ (function () {
    function Plot(grid, equation, propertyName, xInterval) {
        this.grid = grid;
        this.equation = equation;
        this.propertyName = propertyName;
        this.yInterval = [];
        this.xInterval = xInterval;
        this.unboxed = "";
        this.divisionY = null;
        this.divisionX = null;
        this.decompressEquation();
    }
    Plot.prototype.isPointInFunction = function (point) {
        var operation = eval(this.unboxed);
        // console.log(operation, point.y, this.divisionY)
        // If it's bigger than current point but smaller than the previous. It means our operation is aprox at this point.
        if (operation <= point.y && operation > point.y - this.divisionY)
            return true;
        return false;
    };
    Plot.prototype.populateGridWithFunctionValues = function () {
        this.getYInterval();
        this.divisionX = (Math.abs(this.xInterval[0]) + Math.abs(this.xInterval[1])) / (this.grid.length - 1);
        this.divisionY = (Math.abs(this.yInterval[0]) + Math.abs(this.yInterval[1])) / (this.grid[0].length - 1);
        this.currentX = this.xInterval[1];
        for (var x = 0; x < this.grid.length; x++) {
            this.currentY = this.yInterval[1];
            for (var y = 0; y < this.grid.length; y++) {
                this.grid[x][y].addProperty(this.propertyName + "X", this.currentX);
                this.grid[x][y].addProperty(this.propertyName + "Y", this.currentY);
                this.currentY -= this.divisionY;
            }
            this.currentX -= this.divisionX;
        }
        return this.grid;
    };
    Plot.prototype.getYInterval = function () {
        // Point variable must be defined in order for eval to sucessfully run. Run 'eval(this.unboxed)'
        var xLeft = this.xInterval[0], xRight = this.xInterval[1];
        var points = xLeft;
        var highestPoint = 0, smallestPoint = 0;
        while (points < xRight) {
            var _exec = this.execute(new Point_1.default(points, 0), this.unboxed);
            if (_exec > highestPoint)
                highestPoint = _exec;
            else if (_exec < smallestPoint)
                smallestPoint = _exec;
            points++;
        }
        this.yInterval[0] = smallestPoint;
        this.yInterval[1] = highestPoint;
    };
    Plot.prototype.execute = function (point, expression) {
        return eval(expression);
    };
    Plot.prototype.decompressEquation = function () {
        var counter = this.equation.length - 1;
        for (var _i = 0, _a = this.equation; _i < _a.length; _i++) {
            var element = _a[_i];
            if (counter === 0) {
                this.unboxed += " + " + element;
                counter--;
                break;
            }
            if (counter === this.equation.length - 1) {
                this.unboxed += "(" + element + " * Math.pow(point.x, " + counter + "))";
                counter--;
                continue;
            }
            this.unboxed += " + (" + element + " * Math.pow(point.x, " + counter + "))";
            counter--;
        }
        console.log(this.unboxed);
    };
    return Plot;
}());
exports.default = Plot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL1Bsb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBNEI7QUFFNUI7SUFZSSxjQUFZLElBQW9CLEVBQUUsUUFBa0IsRUFBRSxZQUFvQixFQUFFLFNBQW1CO1FBQzNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQ0FBaUIsR0FBakIsVUFBa0IsS0FBWTtRQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLGtEQUFrRDtRQUNsRCxrSEFBa0g7UUFDbEgsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzlFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCw2Q0FBOEIsR0FBOUI7UUFFSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNuQztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsMkJBQVksR0FBWjtRQUNJLGdHQUFnRztRQUNoRyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUUsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN4QyxPQUFPLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDcEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELElBQUksS0FBSyxHQUFHLFlBQVk7Z0JBQUUsWUFBWSxHQUFHLEtBQUssQ0FBQztpQkFDMUMsSUFBSSxLQUFLLEdBQUcsYUFBYTtnQkFBRSxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQ3RELE1BQU0sRUFBRSxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRU8sc0JBQU8sR0FBZixVQUFnQixLQUFZLEVBQUUsVUFBa0I7UUFDNUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGlDQUFrQixHQUFsQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN2QyxLQUFvQixVQUFhLEVBQWIsS0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLGNBQWEsRUFBYixJQUFhLEVBQUU7WUFBOUIsSUFBSSxPQUFPLFNBQUE7WUFDWixJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFNLE9BQVMsQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsTUFBTTthQUNUO1lBQ0QsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxJQUFJLE1BQUksT0FBTyw2QkFBd0IsT0FBTyxPQUFJLENBQUM7Z0JBQy9ELE9BQU8sRUFBRSxDQUFDO2dCQUNWLFNBQVM7YUFDWjtZQUNELElBQUksQ0FBQyxPQUFPLElBQUksU0FBTyxPQUFPLDZCQUF3QixPQUFPLE9BQUksQ0FBQztZQUNsRSxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBM0ZELElBMkZDIn0=