(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bdv_1 = __importDefault(require("./core/bdv"));
window.onload = function () {
    var test = new bdv_1.default("CANVAS_ID", 1024, 768);
    test.activateCanvasRendering();
    // let mySeededMatrix = [];
    // for (let i = 0; i < 10; i++) mySeededMatrix[i] = [];
    // for (let i = 0; i < 10; i++) {
    //     for (let j = 0; j < 10; j++) {
    //         if (Math.floor(Math.random()*10) === 1) mySeededMatrix[i][j] = 1;
    //         else mySeededMatrix[i][j] = 0;
    //     }
    // }
    // test.conways(10, 10, mySeededMatrix, "green", "lightgreen", 100);
    test.conways(150, 150, null, "green", "lightgreen", 100);
    // test.activateImageDataRendering();
    // test.render2.pixelDoodling();
    // let movingSquare = test.movingSquares();
    // let mySquare = test.newGameObject("RECTANGLE", 500, 200, 100, 100, "blue");
    // let myPath = test.newGameObjectArray("POINTS", [[100, 20], [25, 100], [11,10]], "green");
    // let myGrid = test.grid(50, 50);
    // let life = test.conways(50, 50);
};

},{"./core/bdv":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject = /** @class */ (function () {
    function GameObject(model, position, dimension, color, font, message) {
        var _this = this;
        this.addProperty = function (propName, propValue) {
            _this.props[propName] = propValue;
        };
        if (!color)
            color = "black";
        this.model = model;
        this.position = position;
        this.dimension = dimension;
        this.color = color;
        this.font = font;
        this.message = message;
        this.props = {};
    }
    return GameObject;
}());
exports.default = GameObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model;
(function (Model) {
    Model["RECTANGLE"] = "RECTANGLE";
    Model["RECTANGLE_BORDER"] = "RECTANGLE_BORDER";
    Model["POINT"] = "POINT";
    Model["POINTS"] = "POINTS";
    Model["POINTS_BORDER"] = "POINTS_BORDER";
    Model["TRIANGLE_BORDER"] = "TRIANGLE_BORDER";
    Model["LINE"] = "LINE";
    Model["TEXT"] = "TEXT";
    Model["CIRCLE"] = "CIRCLE";
    Model["CIRCLE_BORDER"] = "CIRCLE_BORDER";
    Model["ARC"] = "ARC";
})(Model = exports.Model || (exports.Model = {}));

},{}],4:[function(require,module,exports){
"use strict";
// @TODO - Load tiled map from JSON, Algos and graphs.
// @TODO - Dungeon generator.
// @TODO - Nodejs tool that reads a image file and converts it a color-mapped JSON.
// @TODO - Handling images.
// @TODO - Collidables.
// @TODO - Expand pixel rendering, perlin noise and mandelbrots.
// @TODO - Easy networking.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasRenderer_1 = __importDefault(require("../render/CanvasRenderer"));
var PixelRenderer_1 = __importDefault(require("../render/PixelRenderer"));
var Model_1 = require("./Model");
var GameObject_1 = __importDefault(require("./GameObject"));
var Dimension_1 = __importDefault(require("../math/Dimension"));
var Point_1 = __importDefault(require("../math/Point"));
var bdv = /** @class */ (function () {
    function bdv(canvasId, width, height) {
        var _this = this;
        this.activateCanvasRendering = function () {
            _this.render = new CanvasRenderer_1.default(_this.canvasId, _this.dimensions.width, _this.dimensions.height);
            _this.game();
        };
        this.activateImageDataRendering = function () {
            _this.render2 = new PixelRenderer_1.default(_this.canvasId, _this.dimensions);
            _this.render2.start();
        };
        this.game = function () {
            _this.render.loop();
            _this.render.clear();
        };
        this.newGameObject = function (model, positionX, positionY, width, height, color, font, message) {
            var object = new GameObject_1.default(Model_1.Model[model], new Point_1.default(positionX, positionY), new Dimension_1.default(width, height), color, font, message);
            _this.render.requestStage(object);
            return object;
        };
        this.newGameObjectArray = function (model, positions, color, font, message) {
            var aux = [];
            for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
                var point = positions_1[_i];
                var aux2 = [];
                for (var _a = 0, point_1 = point; _a < point_1.length; _a++) {
                    var coord = point_1[_a];
                    aux2.push(coord);
                }
                aux.push(new Point_1.default(aux2[0], aux2[1]));
            }
            var object = new GameObject_1.default(Model_1.Model[model], aux, new Dimension_1.default(0, 0), color, font, message);
            _this.render.requestStage(object);
            return object;
        };
        this.circle = function (x, y, r, t, c) {
            _this.render.arc(new Point_1.default(x, y), r, t, c);
        };
        this.write = function (message, font, x, y, color) {
            // this.render.fill(new TextFont(message, font), new Point(x, y), null, color);
        };
        this.movingSquares = function () {
            var object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(100, 100), new Dimension_1.default(100, 100), "purple");
            _this.render.requestStage(object);
            var speedX = 5, speedY = 5;
            setInterval(function () {
                object.position.x += speedX;
                object.position.y += speedY;
                if (object.position.x > _this.dimensions.width || object.position.x < 0)
                    speedX = -speedX;
                if (object.position.y > _this.dimensions.height || object.position.y < 0)
                    speedY = -speedY;
            }, 10);
            setInterval(function () {
                var _a = _this.RGB(), r = _a.r, g = _a.g, b = _a.b;
                object.color = "rgb(" + r + "," + g + "," + b + ")";
            }, 1000);
        };
        this.grid = function (rowsX, rowsY) {
            var matrix = [], tracker = [];
            var tileSize = new Dimension_1.default(Math.floor(_this.dimensions.width / rowsX), Math.floor(_this.dimensions.height / rowsY));
            for (var i = 0; i < rowsX; i++)
                matrix[i] = new Array(rowsY);
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    matrix[i][j] = 0;
                }
            }
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix.length; j++) {
                    if (matrix[i][j] === 0) {
                        var object = new GameObject_1.default(Model_1.Model.RECTANGLE_BORDER, new Point_1.default(i * tileSize.width, j * tileSize.height), new Dimension_1.default(tileSize.width, tileSize.height), "white");
                        _this.render.requestStage(object);
                        tracker.push(object);
                    }
                }
            }
            return tracker;
        };
        this.gridFromMapFile = function () {
        };
        this.canvasId = canvasId;
        this.dimensions = new Dimension_1.default(width, height);
        this.render = null;
        this.render2 = null;
    }
    bdv.prototype.RGB = function () {
        return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
    };
    bdv.prototype.conways = function (xRow, yRow, initialSeed, aliveColor, deadColor, speed) {
        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        var _this = this;
        var matrix = initialSeed, bufferMatrix = [];
        var tileSize = new Dimension_1.default(Math.floor(this.dimensions.width / xRow), Math.floor(this.dimensions.height / yRow));
        if (!initialSeed) {
            matrix = [];
            for (var i = 0; i < xRow; i++)
                matrix[i] = new Array(yRow);
        }
        for (var i = 0; i < xRow; i++)
            bufferMatrix[i] = new Array(yRow);
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1 || Math.floor(Math.random() * 10) === 1) {
                    matrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width, j * tileSize.height), new Dimension_1.default(tileSize.width, tileSize.height), aliveColor || "black");
                    matrix[i][j].addProperty("alive", true);
                    bufferMatrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width, j * tileSize.height), new Dimension_1.default(tileSize.width, tileSize.height), aliveColor || "black");
                    bufferMatrix[i][j].addProperty("alive", true);
                }
                else {
                    matrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width, j * tileSize.height), new Dimension_1.default(tileSize.width, tileSize.height), deadColor || "white");
                    matrix[i][j].addProperty("alive", false);
                    bufferMatrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width, j * tileSize.height), new Dimension_1.default(tileSize.width, tileSize.height), deadColor || "white");
                    bufferMatrix[i][j].addProperty("alive", false);
                }
                this.render.requestStage(matrix[i][j]);
            }
        }
        var isAlive = function (position, world) {
            var neighboursCount = 0;
            var cellStatus = world[position.x][position.y].props["alive"];
            if (world[position.x + 1] && world[position.x + 1][position.y] &&
                world[position.x + 1][position.y].props["alive"])
                neighboursCount++;
            if (world[position.x - 1] && world[position.x - 1][position.y] &&
                world[position.x - 1][position.y].props["alive"])
                neighboursCount++;
            if (world[position.x] && world[position.x][position.y + 1] &&
                world[position.x][position.y + 1].props["alive"])
                neighboursCount++;
            if (world[position.x] && world[position.x][position.y - 1] &&
                world[position.x][position.y - 1].props["alive"])
                neighboursCount++;
            if (world[position.x - 1] && world[position.x - 1][position.y + 1] &&
                world[position.x - 1][position.y + 1].props["alive"])
                neighboursCount++;
            if (world[position.x + 1] && world[position.x + 1][position.y + 1] &&
                world[position.x + 1][position.y + 1].props["alive"])
                neighboursCount++;
            if (world[position.x - 1] && world[position.x - 1][position.y - 1] &&
                world[position.x - 1][position.y - 1].props["alive"])
                neighboursCount++;
            if (world[position.x + 1] && world[position.x + 1][position.y - 1] &&
                world[position.x + 1][position.y - 1].props["alive"])
                neighboursCount++;
            if (cellStatus) {
                if (neighboursCount < 2)
                    return false;
                if (neighboursCount === 2 || neighboursCount === 3)
                    return true;
                if (neighboursCount > 3)
                    return false;
            }
            else if (!cellStatus && neighboursCount === 3)
                return true;
            else
                return false;
        };
        setInterval(function () {
            _this.render.clearStage();
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix.length; j++) {
                    var alive = isAlive(new Point_1.default(i, j), matrix);
                    if (alive) {
                        bufferMatrix[i][j].color = aliveColor || "black";
                        bufferMatrix[i][j].props["alive"] = true;
                    }
                    else {
                        bufferMatrix[i][j].props["alive"] = false;
                        bufferMatrix[i][j].color = deadColor || "white";
                    }
                    _this.render.requestStage(matrix[i][j]);
                }
            }
            // Matching properties from bufferedMatrix and matrix without losing reference.
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix.length; j++) {
                    matrix[i][j].color = bufferMatrix[i][j].color;
                    matrix[i][j].props["alive"] = bufferMatrix[i][j].props["alive"];
                }
            }
        }, speed || 100);
    };
    return bdv;
}());
exports.default = bdv;
window.onload = function () {
    var test = new bdv("CANVAS_ID", 1024, 768);
};
// window.onload = function () {
// let test = new bdv("CANVAS_ID", 1024, 768);
// test.activateCanvasRendering();
// let mySeededMatrix = [];
// for (let i = 0; i < 10; i++) mySeededMatrix[i] = [];
// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         if (Math.floor(Math.random()*10) === 1) mySeededMatrix[i][j] = 1;
//         else mySeededMatrix[i][j] = 0;
//     }
// }
// test.conways(10, 10, mySeededMatrix, "green", "lightgreen", 100);
// test.conways(150, 150, null, "green", "lightgreen", 100);
// test.activateImageDataRendering();
// test.render2.pixelDoodling();
// let movingSquare = test.movingSquares();
// let mySquare = test.newGameObject("RECTANGLE", 500, 200, 100, 100, "blue");
// let myPath = test.newGameObjectArray("POINTS", [[100, 20], [25, 100], [11,10]], "green");
// let myGrid = test.grid(50, 50);
// let life = test.conways(50, 50);
// }

},{"../math/Dimension":5,"../math/Point":6,"../render/CanvasRenderer":7,"../render/PixelRenderer":8,"./GameObject":2,"./Model":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dimension = /** @class */ (function () {
    function Dimension(w, h) {
        this.width = w;
        this.height = h;
    }
    return Dimension;
}());
exports.default = Dimension;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.default = Point;

},{}],7:[function(require,module,exports){
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
            else if (object.model === Model_1.Model.POINTS_BORDER) {
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

},{"../core/Model":3,"../math/Dimension":5,"../math/Point":6,"./Stage":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    return ImageDataRender;
}());
exports.default = ImageDataRender;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stage = /** @class */ (function () {
    function Stage() {
        this.queue = [];
    }
    return Stage;
}());
exports.default = Stage;

},{}]},{},[1]);
