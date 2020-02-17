"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stage_1 = __importDefault(require("./Stage"));
var Model_1 = require("../core/Model");
var Dimension_1 = __importDefault(require("../math/Dimension"));
var Point_1 = __importDefault(require("../math/Point"));
var bdvRender = /** @class */ (function () {
    function bdvRender(canvasId, width, height) {
        var _this = this;
        this.loop = function () {
            requestAnimationFrame(_this.animation);
        };
        this.animation = function () {
            _this.clear();
            _this.stageRenderingOrder();
            requestAnimationFrame(_this.animation);
        };
        this.stageRenderingOrder = function () {
            for (var _i = 0, _a = _this.stage.queue; _i < _a.length; _i++) {
                var object = _a[_i];
                switch (object.model) {
                    case Model_1.Model.RECTANGLE:
                        _this.fill(object);
                        break;
                    case Model_1.Model.RECTANGLE_BORDER:
                        _this.stroke(object);
                        break;
                    case Model_1.Model.POINTS:
                    case Model_1.Model.POINTS_BORDER:
                    case Model_1.Model.VECTOR:
                        _this.path(object);
                        break;
                    case Model_1.Model.CIRCLE:
                        break;
                    case Model_1.Model.CIRCLE_BORDER:
                        break;
                }
            }
        };
        this.clear = function () {
            _this.color('black');
            _this.ctx.fillRect(0, 0, _this.dimensions.width, _this.dimensions.height);
        };
        this.fill = function (object) {
            if (!object.color)
                object.color = _this.defaultColor;
            if (object.position instanceof Point_1.default) {
                _this.color(object.color);
                if (object.model === Model_1.Model.RECTANGLE) {
                    _this.ctx.fillRect(object.position.x, object.position.y, object.dimension.width, object.dimension.height);
                }
                else if (object.model === Model_1.Model.TEXT) {
                    _this.ctx.font = object.font;
                    _this.ctx.fillStyle = object.color;
                    _this.ctx.fillText(object.message, object.position.x, object.position.y);
                }
            }
        };
        this.stroke = function (object) {
            if (!object.color)
                object.color = _this.defaultColor;
            _this.color(object.color);
            if (object.position instanceof Point_1.default) {
                _this.ctx.strokeStyle = object.color;
                _this.ctx.strokeRect(object.position.x, object.position.y, object.dimension.width, object.dimension.height);
            }
        };
        this.path = function (object) {
            if (!object.color)
                object.color = _this.defaultColor;
            _this.ctx.fillStyle = object.color;
            _this.ctx.beginPath();
            var it = 0;
            if (object.position instanceof Array) {
                for (var _i = 0, _a = object.position; _i < _a.length; _i++) {
                    var point = _a[_i];
                    if (it === 0) {
                        _this.ctx.moveTo(point.x, point.y);
                        it++;
                        continue;
                    }
                    _this.ctx.lineTo(point.x, point.y);
                    it++;
                }
            }
            if (object.model === Model_1.Model.POINTS) {
                _this.ctx.fillStyle = object.color;
                _this.ctx.fill();
            }
            else if (object.model === Model_1.Model.POINTS_BORDER || object.model === Model_1.Model.VECTOR) {
                _this.ctx.strokeStyle = object.color;
                _this.ctx.stroke();
            }
        };
        this.arc = function (point, radius, type, color) {
            // Full arc - 0 to 2pi
            _this.ctx.beginPath();
            _this.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
            if (!type)
                type = "stroke";
            if (!color)
                color = _this.defaultColor;
            if (type === "fill") {
                _this.ctx.fillStyle = color;
                _this.ctx.fill();
            }
            else {
                _this.ctx.strokeStyle = color;
                _this.ctx.stroke();
            }
        };
        this.color = function (color) {
            _this.ctx.fillStyle = color;
        };
        // super(canvasId, width, height);
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.dimensions = new Dimension_1.default(width, height);
        this.defaultColor = 'black';
        this.stage = new Stage_1.default();
    }
    bdvRender.prototype.requestStage = function (object) {
        this.stage.queue.push(object);
        return this.stage.queue.length - 1;
    };
    bdvRender.prototype.removeFromStage = function (index) {
        if (!this.stage.queue[index])
            return false;
        this.stage.queue.splice(index, 1);
        return true;
    };
    bdvRender.prototype.clearStage = function () {
        this.stage.queue = [];
    };
    return bdvRender;
}());
exports.default = bdvRender;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVuZGVyL0NhbnZhc1JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esa0RBQTRCO0FBQzVCLHVDQUFzQztBQUV0QyxnRUFBMEM7QUFDMUMsd0RBQWtDO0FBRWxDO0lBT0ksbUJBQVksUUFBZ0IsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUEzRCxpQkFRQztRQWlCRCxTQUFJLEdBQUc7WUFDSCxxQkFBcUIsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO1FBRUQsY0FBUyxHQUFHO1lBQ1IsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IscUJBQXFCLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQTtRQUVELHdCQUFtQixHQUFHO1lBQ2xCLEtBQW1CLFVBQWdCLEVBQWhCLEtBQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCLEVBQUU7Z0JBQWhDLElBQUksTUFBTSxTQUFBO2dCQUNYLFFBQVEsTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDbEIsS0FBSyxhQUFLLENBQUMsU0FBUzt3QkFDaEIsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbEIsTUFBTTtvQkFDVixLQUFLLGFBQUssQ0FBQyxnQkFBZ0I7d0JBQ3ZCLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3BCLE1BQU07b0JBQ1YsS0FBSyxhQUFLLENBQUMsTUFBTSxDQUFDO29CQUNsQixLQUFLLGFBQUssQ0FBQyxhQUFhLENBQUM7b0JBQ3pCLEtBQUssYUFBSyxDQUFDLE1BQU07d0JBQ2IsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbEIsTUFBTTtvQkFDVixLQUFLLGFBQUssQ0FBQyxNQUFNO3dCQUNiLE1BQU07b0JBQ1YsS0FBSyxhQUFLLENBQUMsYUFBYTt3QkFDcEIsTUFBTTtpQkFDYjthQUNKO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsVUFBSyxHQUFHO1lBQ0osS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFBO1FBRUQsU0FBSSxHQUFHLFVBQUMsTUFBa0I7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dCQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztZQUNwRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLFlBQVksZUFBSyxFQUFFO2dCQUNsQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLGFBQUssQ0FBQyxTQUFTLEVBQUU7b0JBQ2xDLEtBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzVHO3FCQUNJLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxhQUFLLENBQUMsSUFBSSxFQUFFO29CQUNsQyxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUM1QixLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNsQyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzNFO2FBQ0o7UUFDTCxDQUFDLENBQUE7UUFFRCxXQUFNLEdBQUcsVUFBQyxNQUFrQjtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3BELEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLElBQUksTUFBTSxDQUFDLFFBQVEsWUFBWSxlQUFLLEVBQUU7Z0JBQ2xDLEtBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUc7UUFDTCxDQUFDLENBQUE7UUFHRCxTQUFJLEdBQUcsVUFBQyxNQUFrQjtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3BELEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDbEMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFWCxJQUFJLE1BQU0sQ0FBQyxRQUFRLFlBQVksS0FBSyxFQUFFO2dCQUNsQyxLQUFrQixVQUFlLEVBQWYsS0FBQSxNQUFNLENBQUMsUUFBUSxFQUFmLGNBQWUsRUFBZixJQUFlLEVBQUU7b0JBQTlCLElBQUksS0FBSyxTQUFBO29CQUNWLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTt3QkFDVixLQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsRUFBRSxFQUFFLENBQUM7d0JBQ0wsU0FBUztxQkFDWjtvQkFDRCxLQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsRUFBRSxFQUFFLENBQUM7aUJBQ1I7YUFDSjtZQUVELElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxhQUFLLENBQUMsTUFBTSxFQUFFO2dCQUMvQixLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ25CO2lCQUNJLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxhQUFLLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssYUFBSyxDQUFDLE1BQU0sRUFBRTtnQkFDNUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDcEMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUMsQ0FBQTtRQUVELFFBQUcsR0FBRyxVQUFDLEtBQVksRUFBRSxNQUFjLEVBQUUsSUFBYSxFQUFFLEtBQWM7WUFDOUQsc0JBQXNCO1lBQ3RCLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV2RCxJQUFJLENBQUMsSUFBSTtnQkFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQzNCLElBQUksQ0FBQyxLQUFLO2dCQUFFLEtBQUssR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO1lBRXRDLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDakIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ25CO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDN0IsS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUMsQ0FBQTtRQUVELFVBQUssR0FBRyxVQUFDLEtBQWE7WUFDbEIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQTtRQXJJRyxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxtQkFBUyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztRQUU1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGdDQUFZLEdBQVosVUFBYSxNQUFrQjtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxtQ0FBZSxHQUFmLFVBQWdCLEtBQWE7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDhCQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQWlITCxnQkFBQztBQUFELENBQUMsQUEvSUQsSUErSUMifQ==