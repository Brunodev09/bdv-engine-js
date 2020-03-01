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
        var _this_1 = this;
        this.start = function () {
            _this_1.imageData = _this_1.ctx.createImageData(_this_1.dimensions.width, _this_1.dimensions.height);
            _this_1.pixelArray = _this_1.imageData.data;
            var counter = 1;
            for (var i = 0; i < _this_1.pixelArray.length; i++) {
                if (counter === 4) {
                    _this_1.pixels.push(_this_1.pixelArray.slice(i - 3, i + 1));
                    counter = 1;
                    continue;
                }
                counter++;
            }
            var inner = 0;
            var resCounter = 0;
            for (var i = 0; i < _this_1.pixels.length; i++) {
                if (inner < _this_1.dimensions.height) {
                    _this_1.pixelsMatrix[resCounter][inner] = _this_1.pixels[i];
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
            requestAnimationFrame(_this_1.animation);
        };
        this.animation = function () {
            _this_1.createPixelsScreen();
            _this_1.stageRenderingOrder();
            _this_1.ctx.putImageData(_this_1.imageData, 0, 0);
            requestAnimationFrame(_this_1.animation);
        };
        this.stageRenderingOrder = function () {
            for (var _i = 0, _a = _this_1.stage.queue; _i < _a.length; _i++) {
                var object = _a[_i];
                switch (object.model) {
                    case Model_1.Model.RECTANGLE:
                        _this_1.rect(object);
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
            for (var i = 0; i < _this_1.pixelsMatrix.length; i++) {
                for (var j = 0; j < _this_1.pixelsMatrix[i].length; j++) {
                    _this_1.paint(new Point_1.default(i, j), { r: 0, g: 0, b: 0, a: 255 });
                }
            }
        };
        this.getPixel = function (index) {
            if (!_this_1.pixels[index])
                return undefined;
            return _this_1.pixels[index];
        };
        this.setPixel = function (index, rgb) {
            if (!_this_1.getPixel(index))
                return false;
            if (!index)
                index = 1;
            var innerIndex = index * 4;
            for (var i = rgb.length; i >= 0; i--) {
                _this_1.imageData.data[innerIndex] = rgb[i];
                innerIndex--;
            }
            return true;
        };
        this.getPixelFromMatrix = function (point) {
            try {
                return _this_1.pixelsMatrix[point.x][point.y];
            }
            catch (e) {
                console.error("No such pixel " + point.x + ", " + point.y + ".");
            }
        };
        this.paint = function (point, color) {
            var x = point.x, y = point.y;
            var r = color.r, g = color.g, b = color.b, a = color.a;
            return _this_1.setPixel((y * _this_1.dimensions.width) + x, [r, g, b, a]);
        };
        this.rect = function (object) {
            var dimension = object.dimension, position = object.position, rgb = object.rgb;
            if (!rgb)
                throw new Error("Please specify the rgb property on this GameObject to be able to render through PixelRenderer.");
            for (var i = 0; i < _this_1.pixelsMatrix.length; i++) {
                for (var j = 0; j < _this_1.pixelsMatrix[i].length; j++) {
                    if ((i - position.x > 0 && (i - position.x) < dimension.width) && (j - position.y > 0 && (j - position.y) < dimension.height)) {
                        _this_1.paint(new Point_1.default(i, j), object.rgb);
                    }
                }
            }
        };
        this.getColorOfEachPixelInImage = function (path, callback) {
            var img = new Image();
            var w, h;
            var _this = _this_1;
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var auxCanvas = document.createElement('CANVAS');
                var auxContext = auxCanvas.getContext("2d");
                auxCanvas.width = _this.dimensions.width;
                auxCanvas.height = _this.dimensions.height;
                auxContext.drawImage(this, 0, 0);
                var data = auxCanvas.toDataURL();
                console.log(data);
                // @ts-ignore
                w = this.width;
                // @ts-ignore
                h = this.height;
                // context.drawImage(img, 0, 0, w, h);       
                // callback && callback(context.getImageData(0, 0, w, h));
                // img = null;
            };
            img.src = path;
            if (img.complete || img.complete === undefined) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = path;
            }
        };
        this.pixelDoodling = function () {
            setInterval(function () {
                _this_1.imageData = _this_1.ctx.createImageData(_this_1.dimensions.width, _this_1.dimensions.height);
                var _a = _this_1.getRandomRGBValue(), r = _a[0], g = _a[1], b = _a[2];
                for (var i = 0; i < _this_1.imageData.data.length / 4; i++) {
                    // const randomPixel = Math.floor(Math.random() * (this.imageData.data.length / 4));
                    var pixel = _this_1.getPixel(i);
                    for (var j = 0; j < pixel.length; j++) {
                        _this_1.setPixel(i, [r, g, b, 0]);
                    }
                }
                _this_1.ctx.putImageData(_this_1.imageData, 0, 0);
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
    ImageDataRender.prototype.toDataUrl = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
    };
    return ImageDataRender;
}());
exports.default = ImageDataRender;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGl4ZWxSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZW5kZXIvUGl4ZWxSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDBEQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEMsOERBQXdDO0FBQ3hDLHdEQUFrQztBQUdsQztJQVNJLHlCQUFZLFFBQWdCLEVBQUUsVUFBcUI7UUFBbkQsbUJBUUM7UUFFRCxVQUFLLEdBQUc7WUFDSixPQUFJLENBQUMsU0FBUyxHQUFHLE9BQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekYsT0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN0QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7b0JBQ2YsT0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFDWixTQUFTO2lCQUNaO2dCQUNELE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENB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