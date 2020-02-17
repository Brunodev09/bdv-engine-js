"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Geometry = /** @class */ (function () {
    function Geometry() {
    }
    Geometry.distanceBetweenPoints = function (pointA, pointB) {
        return Math.sqrt(((pointB.x - pointA.x) * (pointB.x - pointA.x)) + ((pointB.y - pointA.y) * (pointB.y - pointA.y)));
    };
    Geometry.createMatrix = function (dimensions) {
        var m = [];
        for (var i = 0; i < dimensions.width; i++)
            m[i] = new Array(dimensions.height);
        return m;
    };
    Geometry.isPointInsideCircle = function (point, center, radius) {
        if (Geometry.distanceBetweenPoints(point, center) >= radius)
            return false;
        else
            return true;
    };
    return Geometry;
}());
exports.default = Geometry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvbWV0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWF0aC9HZW9tZXRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBQUE7SUFpQkEsQ0FBQztJQWZVLDhCQUFxQixHQUE1QixVQUE2QixNQUFhLEVBQUUsTUFBYTtRQUNyRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEgsQ0FBQztJQUVNLHFCQUFZLEdBQW5CLFVBQW9CLFVBQXFCO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0UsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU0sNEJBQW1CLEdBQTFCLFVBQTJCLEtBQVksRUFBRSxNQUFhLEVBQUUsTUFBYztRQUNsRSxJQUFJLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDOztZQUNyRSxPQUFPLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUwsZUFBQztBQUFELENBQUMsQUFqQkQsSUFpQkMifQ==