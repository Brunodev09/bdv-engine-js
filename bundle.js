(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let bdv = require("./dist/src/core/bdv").default;

window.onload = function () {
    let test = new bdv("CANVAS_ID", 1024, 768);
    test.activateCanvasRendering();
    // test.grid(10, 10);
    // test.aStar(25, 25, 10, 12, 8, 12);
    // test.aStar(25, 25, 5, 5, 10, 5, 1000, null);
    test.aStar(50, 50, null, null, null, null, 0, null);

    // test.gridFromMapFile();
    // let mySeededMatrix = [];
    // for (let i = 0; i < 10; i++) mySeededMatrix[i] = [];

    // for (let i = 0; i < 10; i++) {
    //     for (let j = 0; j < 10; j++) {
    //         if (Math.floor(Math.random()*10) === 1) mySeededMatrix[i][j] = 1;
    //         else mySeededMatrix[i][j] = 0;
    //     }
    // }
    // test.conways(10, 10, mySeededMatrix, "green", "lightgreen", 100);
    // test.conways(100, 100, null, null, 100);

    // test.activateImageDataRendering();
    // test.render2.pixelDoodling();

    // let movingSquare = test.movingSquares();
    // let mySquare = test.newGameObject("RECTANGLE", 500, 200, 100, 100, "blue");
    // let myPath = test.newGameObjectArray("POINTS", [[100, 20], [25, 100], [11,10]], "green");
    // let myGrid = test.grid(50, 50);
    // let life = test.conways(50, 50);
}

},{"./dist/src/core/bdv":5}],2:[function(require,module,exports){
module.exports={
    "charsMap": { "#": "green", "S": "grey", "W": "blue" },
    "map": [["#", "#", "#", "#", "#", "#", "#", "#"],
        ["W", "#", "#", "#", "#", "#", "#", "W"],
        ["#", "#", "#", "#", "#", "#", "#", "W"],
        ["#", "#", "#", "S", "S", "#", "#", "W"],
        ["#", "#", "#", "S", "S", "#", "#", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#"]]
}

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _id = 0;
var GameObject = /** @class */ (function () {
    function GameObject(model, position, dimension, color, font, message) {
        var _this = this;
        this.addProperty = function (propName, propValue) {
            _this.props[propName] = propValue;
        };
        _id++;
        this.id = _id;
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
// @TODO - Load tiled map from JSON, Algos and graphs.
// @TODO - Finish porting shape based rendering to GameObject -> Stages (Circles, arcs and fonts).
// @TODO - Dungeon generator.
// @TODO - Nodejs tool that reads a image file and converts it a color-mapped JSON.
// @TODO - Handling images.
// @TODO - Collidables.
// @TODO - Expand pixel rendering, perlin noise and mandelbrots.
// @TODO - Easy networking.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var map_json_1 = __importDefault(require("../../map.json"));
var Conways_1 = __importDefault(require("../math/Conways"));
var Pathfinding_1 = __importDefault(require("../math/Pathfinding"));
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
            var tileSize = new Dimension_1.default(Math.round(_this.dimensions.width / rowsX), Math.round(_this.dimensions.height / rowsY));
            for (var i = 0; i <= rowsX; i++)
                matrix[i] = new Array(rowsY);
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    matrix[i][j] = 0;
                }
            }
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix.length; j++) {
                    if (matrix[i][j] === 0) {
                        var object = new GameObject_1.default(Model_1.Model.RECTANGLE_BORDER, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), "white");
                        _this.render.requestStage(object);
                        tracker.push(object);
                    }
                }
            }
            return tracker;
        };
        this.gridFromMapFile = function () {
            console.log(map_json_1.default);
        };
        this.canvasId = canvasId;
        this.dimensions = new Dimension_1.default(width, height);
        this.render = null;
        this.render2 = null;
    }
    bdv.prototype.RGB = function () {
        return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
    };
    bdv.prototype.conways = function (xRow, yRow, aliveColor, deadColor, speed, seed) {
        return new Conways_1.default(this.render, this.dimensions, new Dimension_1.default(xRow, yRow), aliveColor, deadColor, speed, seed);
    };
    bdv.prototype.aStar = function (xRow, yRow, xStart, yStart, xEnd, yEnd, speed, seed) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Pathfinding_1.default(this.dimensions, this.render, new Dimension_1.default(xRow, yRow), xStart, yStart, xEnd, yEnd, speed, seed)];
            });
        });
    };
    return bdv;
}());
exports.default = bdv;

},{"../../map.json":2,"../math/Conways":6,"../math/Dimension":7,"../math/Pathfinding":9,"../math/Point":10,"../render/CanvasRenderer":11,"../render/PixelRenderer":12,"./GameObject":3,"./Model":4}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dimension_1 = __importDefault(require("./Dimension"));
var Point_1 = __importDefault(require("./Point"));
var Geometry_1 = __importDefault(require("./Geometry"));
var GameObject_1 = __importDefault(require("../core/GameObject"));
var Model_1 = require("../core/Model");
var Conways = /** @class */ (function () {
    function Conways(render, screen, rows, aliveColor, deadColor, speed, seed) {
        this.isAlive = function (position, world) {
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
        this.shouldRender = true;
        this.render = render;
        this.screen = screen;
        this.rows = rows;
        this.aliveColor = aliveColor;
        this.deadColor = deadColor;
        this.speed = speed;
        if (!aliveColor)
            this.aliveColor = "black";
        if (!deadColor)
            this.deadColor = "white";
        this.tileSize = new Dimension_1.default(Math.round(this.screen.width / this.rows.width), Math.round(this.screen.height / this.rows.height));
        this.matrix = seed;
        if (!seed)
            this.matrix = Geometry_1.default.createMatrix(this.rows);
        this.bufferMatrix = Geometry_1.default.createMatrix(this.rows);
        this.createAliveDeadGridOfGameObjects();
        this.start();
    }
    Conways.prototype.createAliveDeadGridOfGameObjects = function () {
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === 1 || Math.floor(Math.random() * 10) === 1) {
                    this.matrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension_1.default(this.tileSize.width, this.tileSize.height), this.aliveColor || "black");
                    this.matrix[i][j].addProperty("alive", true);
                    this.bufferMatrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension_1.default(this.tileSize.width, this.tileSize.height), this.aliveColor || "black");
                    this.bufferMatrix[i][j].addProperty("alive", true);
                }
                else {
                    this.matrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension_1.default(this.tileSize.width, this.tileSize.height), this.deadColor || "white");
                    this.matrix[i][j].addProperty("alive", false);
                    this.bufferMatrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension_1.default(this.tileSize.width, this.tileSize.height), this.deadColor || "white");
                    this.bufferMatrix[i][j].addProperty("alive", false);
                }
                if (this.shouldRender)
                    this.render.requestStage(this.matrix[i][j]);
            }
        }
    };
    Conways.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            if (_this.shouldRender)
                _this.render.clearStage();
            for (var i = 0; i < _this.matrix.length; i++) {
                for (var j = 0; j < _this.matrix.length; j++) {
                    var alive = _this.isAlive(new Point_1.default(i, j), _this.matrix);
                    if (alive) {
                        _this.bufferMatrix[i][j].color = _this.aliveColor || "black";
                        _this.bufferMatrix[i][j].props["alive"] = true;
                    }
                    else {
                        _this.bufferMatrix[i][j].props["alive"] = false;
                        _this.bufferMatrix[i][j].color = _this.deadColor || "white";
                    }
                    if (_this.shouldRender)
                        _this.render.requestStage(_this.matrix[i][j]);
                }
            }
            // Matching properties from bufferedMatrix and matrix without losing reference.
            for (var i = 0; i < _this.matrix.length; i++) {
                for (var j = 0; j < _this.matrix.length; j++) {
                    _this.matrix[i][j].color = _this.bufferMatrix[i][j].color;
                    _this.matrix[i][j].props["alive"] = _this.bufferMatrix[i][j].props["alive"];
                }
            }
        }, this.speed || 100);
    };
    return Conways;
}());
exports.default = Conways;

},{"../core/GameObject":3,"../core/Model":4,"./Dimension":7,"./Geometry":8,"./Point":10}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
    return Geometry;
}());
exports.default = Geometry;

},{}],9:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __importDefault(require("../core/GameObject"));
var Dimension_1 = __importDefault(require("./Dimension"));
var Point_1 = __importDefault(require("./Point"));
var Geometry_1 = __importDefault(require("./Geometry"));
var Sleep_1 = __importDefault(require("../utils/Sleep"));
var Model_1 = require("../core/Model");
var Pathfinding = /** @class */ (function () {
    function Pathfinding(screen, render, rows, xStart, yStart, xEnd, yEnd, speed, seed) {
        // Gcost = distance from current node to the start node.
        // Hcost = distance from current node to the end node.
        // Fcost = Gcost + Hcost.
        // Compute G, H and F for every surrounding start node (8 positions) and choose the one with the lowest Fcost.
        var _this = this;
        this.isInOpenList = function (point) {
            for (var _i = 0, _a = _this.openList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.props["coords"].x === point.x && obj.props["coords"].y === point.y) {
                    obj.addProperty("repeated", true);
                    return true;
                }
            }
            return false;
        };
        this.closed = function (gameObject) {
            return !!gameObject.props.closed;
        };
        this.findGameObjectByCoordinate = function (point) {
            var found = null;
            for (var _i = 0, _a = _this.tracker; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.props["coords"].x === point.x && obj.props["coords"].y === point.y) {
                    found = obj;
                    break;
                }
            }
            return found;
        };
        this.lookForBestPathAfterEndNodeFound = function () {
            var next = _this.currentNode;
            next.color = "lightblue";
            _this.bestPath.push(next);
            while (next) {
                if (next && next.props && next.props.start)
                    break;
                next = next.props.parent;
                next.color = "lightblue";
                _this.bestPath.push(next);
            }
            _this.endNode.color = "lightblue";
        };
        this.addCostsToGameObject = function (startPoint, endPoint, pointToTest) { return __awaiter(_this, void 0, void 0, function () {
            var G, H, F, foundGameObject;
            return __generator(this, function (_a) {
                G = Geometry_1.default.distanceBetweenPoints(new Point_1.default(pointToTest.x, pointToTest.y), new Point_1.default(this.currentNode.props.coords.x, this.currentNode.props.coords.y)) +
                    Geometry_1.default.distanceBetweenPoints(new Point_1.default(this.currentNode.props.coords.x, this.currentNode.props.coords.y), startPoint);
                H = Geometry_1.default.distanceBetweenPoints(new Point_1.default(pointToTest.x, pointToTest.y), endPoint);
                F = G + H;
                foundGameObject = this.findGameObjectByCoordinate(pointToTest);
                if (foundGameObject.props.closed)
                    return [2 /*return*/, foundGameObject];
                if (!foundGameObject.props.wall && !foundGameObject.props.start && !foundGameObject.props.end) {
                    foundGameObject.color = "lightgreen";
                }
                if (!foundGameObject.props.start)
                    foundGameObject.addProperty("parent", this.currentNode);
                // Since our Gcost is variable, I will never stop my code from re-adding the cost properties.
                if (foundGameObject && !foundGameObject.props.start) {
                    if (foundGameObject.props["repeated"]) {
                        if (F < foundGameObject.props["fCost"]) {
                            foundGameObject.addProperty("gCost", G);
                            foundGameObject.addProperty("hCost", H);
                            foundGameObject.addProperty("fCost", F);
                            if (foundGameObject.props.parent) {
                                foundGameObject.props.parent.addProperty("gCost", G);
                                foundGameObject.props.parent.addProperty("hCost", H);
                                foundGameObject.props.parent.addProperty("fCost", F);
                            }
                        }
                    }
                    else {
                        foundGameObject.addProperty("gCost", G);
                        foundGameObject.addProperty("hCost", H);
                        foundGameObject.addProperty("fCost", F);
                    }
                    if (foundGameObject.props.end) {
                        this.lookForBestPathAfterEndNodeFound();
                    }
                }
                return [2 /*return*/, foundGameObject];
            });
        }); };
        this.calculateCosts = function (point) { return __awaiter(_this, void 0, void 0, function () {
            var startPoint, endPoint, returnedGameObject, repeat, object, repeat, object, repeat, object, repeat, object, repeat, object, repeat, object, repeat, object, repeat, object;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startPoint = new Point_1.default(this.startNode.props["coords"].x, this.startNode.props["coords"].y);
                        endPoint = new Point_1.default(this.endNode.props["coords"].x, this.endNode.props["coords"].y);
                        if (!(this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y])) return [3 /*break*/, 2];
                        if (!(this.matrix[point.x + 1][point.y] !== 4)) return [3 /*break*/, 2];
                        repeat = this.isInOpenList(new Point_1.default(point.x + 1, point.y));
                        return [4 /*yield*/, this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x + 1, point.y))];
                    case 1:
                        object = _a.sent();
                        if (!repeat && !this.closed(object))
                            this.openList.push(object);
                        _a.label = 2;
                    case 2:
                        if (!(this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y])) return [3 /*break*/, 4];
                        if (!(this.matrix[point.x - 1][point.y] !== 4)) return [3 /*break*/, 4];
                        repeat = this.isInOpenList(new Point_1.default(point.x - 1, point.y));
                        return [4 /*yield*/, this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x - 1, point.y))];
                    case 3:
                        object = _a.sent();
                        if (!repeat && !this.closed(object))
                            this.openList.push(object);
                        _a.label = 4;
                    case 4:
                        if (!(this.matrix[point.x] && this.matrix[point.x][point.y + 1])) return [3 /*break*/, 6];
                        if (!(this.matrix[point.x][point.y + 1] !== 4)) return [3 /*break*/, 6];
                        repeat = this.isInOpenList(new Point_1.default(point.x, point.y + 1));
                        return [4 /*yield*/, this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x, point.y + 1))];
                    case 5:
                        object = _a.sent();
                        if (!repeat && !this.closed(object))
                            this.openList.push(object);
                        _a.label = 6;
                    case 6:
                        if (!(this.matrix[point.x] && this.matrix[point.x][point.y - 1])) return [3 /*break*/, 8];
                        if (!(this.matrix[point.x][point.y - 1] !== 4)) return [3 /*break*/, 8];
                        repeat = this.isInOpenList(new Point_1.default(point.x, point.y - 1));
                        return [4 /*yield*/, this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x, point.y - 1))];
                    case 7:
                        object = _a.sent();
                        if (!repeat && !this.closed(object))
                            this.openList.push(object);
                        _a.label = 8;
                    case 8:
                        if (!(this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y + 1])) return [3 /*break*/, 10];
                        if (!(this.matrix[point.x - 1][point.y + 1] !== 4)) return [3 /*break*/, 10];
                        repeat = this.isInOpenList(new Point_1.default(point.x - 1, point.y + 1));
                        return [4 /*yield*/, this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x - 1, point.y + 1))];
                    case 9:
                        object = _a.sent();
                        if (!repeat && !this.closed(object))
                            this.openList.push(object);
                        _a.label = 10;
                    case 10:
                        if (!(this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y + 1])) return [3 /*break*/, 12];
                        if (!(this.matrix[point.x + 1][point.y + 1] !== 4)) return [3 /*break*/, 12];
                        repeat = this.isInOpenList(new Point_1.default(point.x + 1, point.y + 1));
                        return [4 /*yield*/, this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x + 1, point.y + 1))];
                    case 11:
                        object = _a.sent();
                        if (!repeat && !this.closed(object))
                            this.openList.push(object);
                        _a.label = 12;
                    case 12:
                        if (!(this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y - 1])) return [3 /*break*/, 14];
                        if (!(this.matrix[point.x - 1][point.y - 1] !== 4)) return [3 /*break*/, 14];
                        repeat = this.isInOpenList(new Point_1.default(point.x - 1, point.y - 1));
                        return [4 /*yield*/, this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x - 1, point.y - 1))];
                    case 13:
                        object = _a.sent();
                        if (!repeat && !this.closed(object))
                            this.openList.push(object);
                        _a.label = 14;
                    case 14:
                        if (!(this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y - 1])) return [3 /*break*/, 16];
                        if (!(this.matrix[point.x + 1][point.y - 1] !== 4)) return [3 /*break*/, 16];
                        repeat = this.isInOpenList(new Point_1.default(point.x + 1, point.y - 1));
                        return [4 /*yield*/, this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x + 1, point.y - 1))];
                    case 15:
                        object = _a.sent();
                        if (!repeat && !this.closed(object))
                            this.openList.push(object);
                        _a.label = 16;
                    case 16:
                        this.openList.sort(Pathfinding.A_STAR_COST_SORTING);
                        if (!this.openList[0].props.start && !this.openList[0].props.end && !this.openList[0].props.wall && !this.openList[0].props.closed) {
                            this.openList[0].color = "pink";
                            this.openList[0].addProperty("closed", true);
                            this.closedList.push(this.openList[0]);
                        }
                        returnedGameObject = this.openList[0];
                        this.openList.shift();
                        return [2 /*return*/, returnedGameObject];
                }
            });
        }); };
        this.screen = screen;
        this.render = render;
        this.rows = rows;
        this.speed = speed;
        this.closedList = [], this.openList = [], this.bestPath = [], this.tracker = [];
        if (xStart && yStart && xEnd && yEnd && xStart === xEnd && yStart === yEnd)
            return null;
        this.matrix = [], this.tracker = [], this.closedList = [];
        this.start = xStart !== null && yStart !== null ? new Point_1.default(xStart, yStart) : new Point_1.default(Math.floor(Math.random() * this.rows.width), Math.floor(Math.random() * this.rows.height));
        this.end = xEnd !== null && yEnd !== null ? new Point_1.default(xEnd, yEnd) : new Point_1.default(Math.floor(Math.random() * this.rows.width), Math.floor(Math.random() * this.rows.height));
        this.tileSize = new Dimension_1.default(Math.floor(this.screen.width / this.rows.width), Math.floor(this.screen.height / this.rows.height));
        this.matrix = Geometry_1.default.createMatrix(new Dimension_1.default(this.rows.width, this.rows.height));
        this.randomGeneration();
        this.createGameObjectWithCosts();
        this.run();
    }
    Pathfinding.A_STAR_COST_SORTING = function (a, b) {
        var weightA = 0, weightB = 0;
        if (b.props["fCost"] === a.props["fCost"]) {
            // @TODO - On this first if, it doesn't matter if it's A or B. It's a draw. Add randomness later.
            if (b.props["hCost"] === a.props["hCost"])
                weightA += 500;
            else if (b.props["hCost"] < a.props["hCost"])
                weightB += 500;
            else
                weightA += 500;
        }
        else if (b.props["fCost"] > a.props["fCost"])
            weightA += 500;
        else if (b.props["fCost"] < a.props["fCost"])
            weightB += 500;
        return weightB - weightA;
    };
    Pathfinding.prototype.randomGeneration = function () {
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (i === this.start.x && j === this.start.y)
                    this.matrix[i][j] = 2;
                else if (i === this.end.x && j === this.end.y)
                    this.matrix[i][j] = 3;
                // else if (Math.floor(Math.random() * 10) < 3) this.matrix[i][j] = 4;
                else
                    this.matrix[i][j] = 1;
            }
        }
    };
    Pathfinding.prototype.createGameObjectWithCosts = function () {
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                var object = void 0;
                if (this.matrix[i][j] === 1) {
                    object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension_1.default(this.tileSize.width, this.tileSize.height), "white");
                    object.addProperty("coords", new Point_1.default(i, j));
                }
                else if (this.matrix[i][j] === 2) {
                    object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension_1.default(this.tileSize.width, this.tileSize.height), "blue");
                    object.addProperty("start", true);
                    object.addProperty("coords", new Point_1.default(i, j));
                    object.addProperty("gCost", 0);
                    this.startNode = object;
                    this.currentNode = object;
                }
                else if (this.matrix[i][j] === 3) {
                    object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension_1.default(this.tileSize.width, this.tileSize.height), "red");
                    object.addProperty("end", true);
                    object.addProperty("coords", new Point_1.default(i, j));
                    this.endNode = object;
                }
                else {
                    object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * this.tileSize.width + i, j * this.tileSize.height + j), new Dimension_1.default(this.tileSize.width, this.tileSize.height), "black");
                    object.addProperty("wall", true);
                    object.addProperty("coords", new Point_1.default(i, j));
                }
                this.render.requestStage(object);
                this.tracker.push(object);
            }
        }
    };
    Pathfinding.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.currentNode.props["end"]) return [3 /*break*/, 3];
                        return [4 /*yield*/, Sleep_1.default.now(this.speed)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.calculateCosts(this.currentNode.props["coords"])];
                    case 2:
                        _a.currentNode = _b.sent();
                        return [3 /*break*/, 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Pathfinding;
}());
exports.default = Pathfinding;

},{"../core/GameObject":3,"../core/Model":4,"../utils/Sleep":14,"./Dimension":7,"./Geometry":8,"./Point":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"../core/Model":4,"../math/Dimension":7,"../math/Point":10,"./Stage":13}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stage = /** @class */ (function () {
    function Stage() {
        this.queue = [];
    }
    return Stage;
}());
exports.default = Stage;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sleep = /** @class */ (function () {
    function Sleep() {
    }
    Sleep.now = function (ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, ms);
        });
    };
    return Sleep;
}());
exports.default = Sleep;

},{}]},{},[1]);
