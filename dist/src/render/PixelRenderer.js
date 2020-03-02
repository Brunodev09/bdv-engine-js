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
                if (inner < _this.dimensions.height) {
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
        this.clear = function () {
            _this.ctx.fillStyle = "black";
            _this.ctx.fillRect(0, 0, _this.dimensions.width, _this.dimensions.height);
        };
        this.loop = function () {
            requestAnimationFrame(_this.animation);
        };
        this.animation = function () {
            _this.createPixelsScreen();
            // this.clear();
            _this.stageRenderingOrder();
            // this.ctx.putImageData(this.ctx.getImageData(0, 0, this.dimensions.width, this.dimensions.height), 0, 0);
            _this.ctx.putImageData(_this.imageData, 0, 0);
            requestAnimationFrame(_this.animation);
        };
        this.stageRenderingOrder = function () {
            for (var _i = 0, _a = _this.stage.queue; _i < _a.length; _i++) {
                var object = _a[_i];
                switch (object.model) {
                    case Model_1.Model.TEXTURE:
                        _this.renderImg(object);
                        break;
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
            for (var i = 0; i < _this.pixelsMatrix.length; i++) {
                for (var j = 0; j < _this.pixelsMatrix[i].length; j++) {
                    _this.paint(new Point_1.default(i, j), { r: 0, g: 0, b: 0, a: 255 });
                }
            }
        };
        this.getPixel = function (index) {
            if (!_this.pixels[index])
                return undefined;
            return _this.pixels[index];
        };
        this.setPixel = function (index, rgb) {
            if (!_this.getPixel(index))
                return false;
            if (!index)
                index = 1;
            var innerIndex = index * 4;
            for (var i = rgb.length; i >= 0; i--) {
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
            return _this.setPixel((y * _this.dimensions.width) + x, [r, g, b, a]);
        };
        this.rect = function (object) {
            var dimension = object.dimension, position = object.position, rgb = object.rgb;
            if (!rgb) {
                object.rgb = { r: 211, g: 211, b: 211, a: 255 };
            }
            for (var i = 0; i < _this.pixelsMatrix.length; i++) {
                for (var j = 0; j < _this.pixelsMatrix[i].length; j++) {
                    if ((i - position.x > 0 && (i - position.x) < dimension.width) && (j - position.y > 0 && (j - position.y) < dimension.height)) {
                        _this.paint(new Point_1.default(i, j), object.rgb);
                    }
                }
            }
        };
        this.renderImg = function (object) {
            _this.ctx.drawImage(object.img, object.position.x, object.position.y);
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