"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stage_1 = __importDefault(require("../render/Stage"));
var Model_1 = require("../core/Model");
var Geometry_1 = __importDefault(require("../math/Geometry"));
var Point_1 = __importDefault(require("../math/Point"));
var ImageDataRender = /** @class */ (function () {
    function ImageDataRender(canvasId, dimensions) {
        var _this = this;
        this.start = function () {
            _this.imageData = _this.ctx.createImageData(_this.dimensions.width, _this.dimensions.height);
            _this.pixelArray = _this.imageData.data;
            var counter = 1;
            for (var i = 0; i < _this.pixelArray.length; i++) {
                if (counter === 4) {
                    _this.pixels.push(_this.pixelArray.slice(i - 3, i + 1));
                    counter = 1;
                    continue;
                }
                counter++;
            }
            var inner = 0;
            var resCounter = 0;
            for (var i = 0; i < _this.pixels.length; i++) {
                if (resCounter < _this.dimensions.width) {
                    _this.pixelsMatrix[resCounter][inner] = _this.pixels[i];
                }
                else {
                    resCounter++;
                    inner = 0;
                    continue;
                }
                inner++;
            }
        };
        this.loop = function () {
            requestAnimationFrame(_this.animation);
        };
        this.animation = function () {
            _this.createPixelsScreen();
            _this.stageRenderingOrder();
            _this.ctx.putImageData(_this.imageData, 0, 0);
            requestAnimationFrame(_this.animation);
        };
        this.stageRenderingOrder = function () {
            for (var _i = 0, _a = _this.stage.queue; _i < _a.length; _i++) {
                var object = _a[_i];
                switch (object.model) {
                    case Model_1.Model.RECTANGLE:
                        _this.rect(object);
                        break;
                    case Model_1.Model.RECTANGLE_BORDER:
                        break;
                    case Model_1.Model.POINTS:
                    case Model_1.Model.POINTS_BORDER:
                    case Model_1.Model.VECTOR:
                        break;
                    case Model_1.Model.CIRCLE:
                        break;
                    case Model_1.Model.CIRCLE_BORDER:
                        break;
                    case Model_1.Model.PIXEL_FREE:
                        break;
                }
            }
        };
        this.getRandomRGBValue = function () {
            return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        };
        this.createPixelsScreen = function () {
            for (var i = 0; i < _this.imageData.data.length; i++) {
                var r = _this.getRandomRGBValue()[0];
                _this.imageData.data[i] = 100;
            }
            _this.ctx.putImageData(_this.imageData, 0, 0);
        };
        this.getPixel = function (index) {
            if (!_this.pixels[index])
                return undefined;
            return _this.pixels[index];
        };
        this.setPixel = function (index, rgb) {
            if (!_this.getPixel(index))
                return false;
            for (var i = 0; i < rgb.length; i++) {
                _this.pixels[index][i] = rgb[i];
            }
            var innerIndex = index * 4;
            for (var i = 0; i < rgb.length; i++) {
                _this.imageData.data[innerIndex] = rgb[i];
                innerIndex--;
            }
            return true;
        };
        this.getPixelFromMatrix = function (point) {
            try {
                return _this.pixelsMatrix[point.x][point.y];
            }
            catch (e) {
                console.error("No such pixel " + point.x + ", " + point.y + ".");
            }
        };
        this.paint = function (point, color) {
            var x = point.x, y = point.y;
            var r = color.r, g = color.g, b = color.b, a = color.a;
            return _this.setPixel(((y + 1) * _this.dimensions.width) + x, [r, g, b, a]);
        };
        this.rect = function (object) {
            var dimension = object.dimension, position = object.position, rgb = object.rgb;
            if (!rgb)
                throw new Error("Please specify the rgb property on this GameObject to be able to render through PixelRenderer.");
            for (var i = 0; i < _this.pixelsMatrix.length; i++) {
                for (var j = 0; j < _this.pixelsMatrix[i].length; j++) {
                    if ((i - position.x > 0 && (i - position.x) < dimension.width) && (j - position.y > 0 && (j - position.y) < dimension.height)) {
                        _this.paint(new Point_1.default(i, j), object.rgb);
                    }
                }
            }
        };
        this.pixelDoodling = function () {
            setInterval(function () {
                _this.imageData = _this.ctx.createImageData(_this.dimensions.width, _this.dimensions.height);
                var _a = _this.getRandomRGBValue(), r = _a[0], g = _a[1], b = _a[2];
                for (var i = 0; i < _this.imageData.data.length / 4; i++) {
                    // const randomPixel = Math.floor(Math.random() * (this.imageData.data.length / 4));
                    var pixel = _this.getPixel(i);
                    for (var j = 0; j < pixel.length; j++) {
                        _this.setPixel(i, [r, g, b, 0]);
                    }
                }
                _this.ctx.putImageData(_this.imageData, 0, 0);
            }, 100);
        };
        this.dimensions = dimensions;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.pixels = [];
        this.pixelsMatrix = Geometry_1.default.createMatrix(dimensions);
        this.stage = new Stage_1.default();
        this.start();
    }
    ImageDataRender.prototype.requestStage = function (object) {
        this.stage.queue.push(object);
        return this.stage.queue.length - 1;
    };
    ImageDataRender.prototype.removeFromStage = function (index) {
        if (!this.stage.queue[index])
            return false;
        this.stage.queue.splice(index, 1);
        return true;
    };
    ImageDataRender.prototype.clearStage = function () {
        this.stage.queue = [];
    };
    return ImageDataRender;
}());
exports.default = ImageDataRender;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGl4ZWxSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZW5kZXIvUGl4ZWxSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDBEQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEMsOERBQXdDO0FBQ3hDLHdEQUFrQztBQUdsQztJQVNJLHlCQUFZLFFBQWdCLEVBQUUsVUFBcUI7UUFBbkQsaUJBUUM7UUFFRCxVQUFLLEdBQUc7WUFDSixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekYsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN0QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7b0JBQ2YsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFDWixTQUFTO2lCQUNaO2dCQUNELE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENB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