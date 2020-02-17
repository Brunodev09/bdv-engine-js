"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sinwave = /** @class */ (function () {
    function Sinwave() {
        this.division = null;
        this.division2 = null;
        this.sin = 1;
        this.angle = 360;
        this.grid = null;
    }
    Sinwave.prototype.isPointPartOfSinPlot = function (point) {
        var operation = Math.sin(point.x * Math.PI / 180.0);
        if (operation >= 0.99)
            operation = 1;
        else if (operation <= -0.99)
            operation = -1;
        if (operation < point.y + this.division2 && operation > point.y - this.division2) {
            return true;
        }
        return false;
    };
    Sinwave.prototype.populateGridWithSinValues = function (grid) {
        this.division = this.angle / (grid.length - 1);
        this.division2 = 2 / (grid[0].length - 1); // Variation between 1 and -1 -> delta = 2
        for (var x = 0; x < grid.length; x++) {
            this.sin = 1;
            for (var y = 0; y < grid.length; y++) {
                grid[x][y].addProperty("xValue", this.angle);
                grid[x][y].addProperty("yValue", this.sin);
                this.sin -= this.division2;
                if (this.sin <= -0.99)
                    this.sin = -1;
            }
            this.angle -= this.division;
        }
        return grid;
    };
    return Sinwave;
}());
exports.default = Sinwave;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lud2F2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL1NpbndhdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTtJQU9JO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsc0NBQW9CLEdBQXBCLFVBQXFCLEtBQVk7UUFDN0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDcEQsSUFBSSxTQUFTLElBQUksSUFBSTtZQUFFLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDaEMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJO1lBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzlFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsMkNBQXlCLEdBQXpCLFVBQTBCLElBQW9CO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsMENBQTBDO1FBQ3JGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzNCLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUk7b0JBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN4QztZQUNELElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUMvQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQyJ9