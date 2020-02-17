"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2D = /** @class */ (function () {
    function Vector2D() {
    }
    Vector2D.NewComponents = function (xComponent, yComponent) {
        var vec = new Vector2D();
        vec.xComponent = xComponent;
        vec.yComponent = yComponent;
        return vec;
    };
    Vector2D.NewPointSubtraction = function (pointA, pointB) {
        var vec = new Vector2D();
        vec.xComponent = pointA.x - pointB.x;
        vec.yComponent = pointA.y - pointB.y;
        return vec;
    };
    Vector2D.magnitude = function (vec) {
        return Math.abs((vec.xComponent ^ 2) + (vec.yComponent ^ 2));
    };
    return Vector2D;
}());
exports.default = Vector2D;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjdG9yMkQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWF0aC9WZWN0b3IyRC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBQUE7SUFxQkEsQ0FBQztJQWpCVSxzQkFBYSxHQUFwQixVQUFxQixVQUFrQixFQUFFLFVBQWtCO1FBQ3ZELElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDNUIsR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU0sNEJBQW1CLEdBQTFCLFVBQTJCLE1BQWEsRUFBRSxNQUFhO1FBQ25ELElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU0sa0JBQVMsR0FBaEIsVUFBaUIsR0FBYTtRQUMxQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQyJ9