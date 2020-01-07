(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let bdv = require("./dist/src/core/bdv").default;

window.onload = function () {
    let test = new bdv("CANVAS_ID", 1024, 768);
    test.activateCanvasRendering();
    // test.grid(10, 10);
    // test.aStar(25, 25, 10, 12, 8, 12);
    test.aStar(25, 25, null, null, null, null, 100, null);

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
    // test.conways(100, 100, null, "red", "pink", 100);

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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Geometry_1 = __importDefault(require("../math/Geometry"));
var Sleep_1 = __importDefault(require("../utils/Sleep"));
var map_json_1 = __importDefault(require("../../map.json"));
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
    bdv.prototype.conways = function (xRow, yRow, initialSeed, aliveColor, deadColor, speed) {
        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        var _this = this;
        var matrix = initialSeed, bufferMatrix = [];
        var tileSize = new Dimension_1.default(Math.round(this.dimensions.width / xRow), Math.round(this.dimensions.height / yRow));
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
                    matrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), aliveColor || "black");
                    matrix[i][j].addProperty("alive", true);
                    bufferMatrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), aliveColor || "black");
                    bufferMatrix[i][j].addProperty("alive", true);
                }
                else {
                    matrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), deadColor || "white");
                    matrix[i][j].addProperty("alive", false);
                    bufferMatrix[i][j] = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), deadColor || "white");
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
    bdv.prototype.aStar = function (xRow, yRow, xStart, yStart, xEnd, yEnd, speed, seed) {
        return __awaiter(this, void 0, void 0, function () {
            var matrix, tracker, start, end, tileSize, currentNode, endNode, startNode, fCosts, i, i, j, i, j, object, findGameObjectByCoordinate, addCostsToGameObject, isRepeated, closed, calculateCosts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Gcost = distance from current node to the start node.
                        // Hcost = distance from current node to the end node.
                        // Fcost = Gcost + Hcost.
                        // Compute G, H and F for every surrounding start node (8 positions) and choose the one with the lowest Fcost.
                        if (xStart && yStart && xEnd && yEnd && xStart === xEnd && yStart === yEnd)
                            return [2 /*return*/, null];
                        matrix = [], tracker = [];
                        start = xStart !== null && yStart !== null ? new Point_1.default(xStart, yStart) : new Point_1.default(Math.floor(Math.random() * xRow), Math.floor(Math.random() * yRow));
                        end = xEnd !== null && yEnd !== null ? new Point_1.default(xEnd, yEnd) : new Point_1.default(Math.floor(Math.random() * xRow), Math.floor(Math.random() * yRow));
                        tileSize = new Dimension_1.default(Math.floor(this.dimensions.width / xRow), Math.floor(this.dimensions.height / yRow));
                        fCosts = [];
                        for (i = 0; i < xRow; i++)
                            matrix[i] = new Array(yRow);
                        for (i = 0; i < matrix.length; i++) {
                            for (j = 0; j < matrix[i].length; j++) {
                                if (i === start.x && j === start.y)
                                    matrix[i][j] = 2;
                                else if (i === end.x && j === end.y)
                                    matrix[i][j] = 3;
                                else if (Math.floor(Math.random() * 10) < 3)
                                    matrix[i][j] = 4;
                                else
                                    matrix[i][j] = 1;
                            }
                        }
                        for (i = 0; i < matrix.length; i++) {
                            for (j = 0; j < matrix[i].length; j++) {
                                object = void 0;
                                if (matrix[i][j] === 1) {
                                    object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), "white");
                                    object.addProperty("coords", new Point_1.default(i, j));
                                }
                                else if (matrix[i][j] === 2) {
                                    object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), "blue");
                                    object.addProperty("start", true);
                                    object.addProperty("coords", new Point_1.default(i, j));
                                    startNode = object;
                                    currentNode = object;
                                }
                                else if (matrix[i][j] === 3) {
                                    object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), "red");
                                    object.addProperty("end", true);
                                    object.addProperty("coords", new Point_1.default(i, j));
                                    endNode = object;
                                }
                                else {
                                    object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width + i, j * tileSize.height + j), new Dimension_1.default(tileSize.width, tileSize.height), "black");
                                    object.addProperty("wall", true);
                                    object.addProperty("coords", new Point_1.default(i, j));
                                }
                                this.render.requestStage(object);
                                tracker.push(object);
                            }
                        }
                        findGameObjectByCoordinate = function (point) {
                            var found = null;
                            for (var _i = 0, tracker_1 = tracker; _i < tracker_1.length; _i++) {
                                var obj = tracker_1[_i];
                                if (obj.props["coords"].x === point.x && obj.props["coords"].y === point.y) {
                                    found = obj;
                                    break;
                                }
                            }
                            return found;
                        };
                        addCostsToGameObject = function (startPoint, endPoint, pointToTest) { return __awaiter(_this, void 0, void 0, function () {
                            var d, d2, f, foundGameObject, _i, tracker_2, obj;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        d = Geometry_1.default.distanceBetweenPoints(new Point_1.default(pointToTest.x, pointToTest.y), new Point_1.default(currentNode.props.coords.x, currentNode.props.coords.y)) +
                                            Geometry_1.default.distanceBetweenPoints(new Point_1.default(currentNode.props.coords.x, currentNode.props.coords.y), startPoint);
                                        d2 = Geometry_1.default.distanceBetweenPoints(new Point_1.default(pointToTest.x, pointToTest.y), endPoint);
                                        f = d + d2;
                                        foundGameObject = findGameObjectByCoordinate(pointToTest);
                                        if (!foundGameObject) return [3 /*break*/, 6];
                                        foundGameObject.addProperty("gCost", d);
                                        foundGameObject.addProperty("hCost", d2);
                                        foundGameObject.addProperty("fCost", f);
                                        if (!(!foundGameObject.props.wall && !foundGameObject.props.closed && !foundGameObject.props.start && !foundGameObject.props.end)) return [3 /*break*/, 1];
                                        foundGameObject.color = "lightgreen";
                                        return [3 /*break*/, 6];
                                    case 1:
                                        if (!foundGameObject.props.end) return [3 /*break*/, 6];
                                        startNode.color = "lightblue";
                                        _i = 0, tracker_2 = tracker;
                                        _a.label = 2;
                                    case 2:
                                        if (!(_i < tracker_2.length)) return [3 /*break*/, 5];
                                        obj = tracker_2[_i];
                                        if (!obj.props["closed"]) return [3 /*break*/, 4];
                                        obj.color = "lightblue";
                                        return [4 /*yield*/, Sleep_1.default.now(Math.round(speed / 3))];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        foundGameObject.color = "lightblue";
                                        _a.label = 6;
                                    case 6: return [2 /*return*/, foundGameObject];
                                }
                            });
                        }); };
                        isRepeated = function (point) {
                            for (var _i = 0, fCosts_1 = fCosts; _i < fCosts_1.length; _i++) {
                                var obj = fCosts_1[_i];
                                if (obj.props["coords"].x === point.x && obj.props["coords"].y === point.y) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        closed = function (gameObject) {
                            return !!gameObject.props.closed;
                        };
                        calculateCosts = function (point) { return __awaiter(_this, void 0, void 0, function () {
                            var startPoint, endPoint, returnedGameObject, object, object, object, object, object, object, object, object;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        startPoint = new Point_1.default(startNode.props["coords"].x, startNode.props["coords"].y);
                                        endPoint = new Point_1.default(endNode.props["coords"].x, endNode.props["coords"].y);
                                        if (!(matrix[point.x + 1] && matrix[point.x + 1][point.y])) return [3 /*break*/, 2];
                                        if (!(matrix[point.x + 1][point.y] !== 4)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x + 1, point.y))];
                                    case 1:
                                        object = _a.sent();
                                        if (!isRepeated(new Point_1.default(point.x + 1, point.y)) && !closed(object))
                                            fCosts.push(object);
                                        _a.label = 2;
                                    case 2:
                                        if (!(matrix[point.x - 1] && matrix[point.x - 1][point.y])) return [3 /*break*/, 4];
                                        if (!(matrix[point.x - 1][point.y] !== 4)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x - 1, point.y))];
                                    case 3:
                                        object = _a.sent();
                                        if (!isRepeated(new Point_1.default(point.x - 1, point.y)) && !closed(object))
                                            fCosts.push(object);
                                        _a.label = 4;
                                    case 4:
                                        if (!(matrix[point.x] && matrix[point.x][point.y + 1])) return [3 /*break*/, 6];
                                        if (!(matrix[point.x][point.y + 1] !== 4)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x, point.y + 1))];
                                    case 5:
                                        object = _a.sent();
                                        if (!isRepeated(new Point_1.default(point.x, point.y + 1)) && !closed(object))
                                            fCosts.push(object);
                                        _a.label = 6;
                                    case 6:
                                        if (!(matrix[point.x] && matrix[point.x][point.y - 1])) return [3 /*break*/, 8];
                                        if (!(matrix[point.x][point.y - 1] !== 4)) return [3 /*break*/, 8];
                                        return [4 /*yield*/, addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x, point.y - 1))];
                                    case 7:
                                        object = _a.sent();
                                        if (!isRepeated(new Point_1.default(point.x, point.y - 1)) && !closed(object))
                                            fCosts.push(object);
                                        _a.label = 8;
                                    case 8:
                                        if (!(matrix[point.x - 1] && matrix[point.x - 1][point.y + 1])) return [3 /*break*/, 10];
                                        if (!(matrix[point.x - 1][point.y + 1] !== 4)) return [3 /*break*/, 10];
                                        return [4 /*yield*/, addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x - 1, point.y + 1))];
                                    case 9:
                                        object = _a.sent();
                                        if (!isRepeated(new Point_1.default(point.x - 1, point.y + 1)) && !closed(object))
                                            fCosts.push(object);
                                        _a.label = 10;
                                    case 10:
                                        if (!(matrix[point.x + 1] && matrix[point.x + 1][point.y + 1])) return [3 /*break*/, 12];
                                        if (!(matrix[point.x + 1][point.y + 1] !== 4)) return [3 /*break*/, 12];
                                        return [4 /*yield*/, addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x + 1, point.y + 1))];
                                    case 11:
                                        object = _a.sent();
                                        if (!isRepeated(new Point_1.default(point.x + 1, point.y + 1)) && !closed(object))
                                            fCosts.push(object);
                                        _a.label = 12;
                                    case 12:
                                        if (!(matrix[point.x - 1] && matrix[point.x - 1][point.y - 1])) return [3 /*break*/, 14];
                                        if (!(matrix[point.x - 1][point.y - 1] !== 4)) return [3 /*break*/, 14];
                                        return [4 /*yield*/, addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x - 1, point.y - 1))];
                                    case 13:
                                        object = _a.sent();
                                        if (!isRepeated(new Point_1.default(point.x - 1, point.y - 1)) && !closed(object))
                                            fCosts.push(object);
                                        _a.label = 14;
                                    case 14:
                                        if (!(matrix[point.x + 1] && matrix[point.x + 1][point.y - 1])) return [3 /*break*/, 16];
                                        if (!(matrix[point.x + 1][point.y - 1] !== 4)) return [3 /*break*/, 16];
                                        return [4 /*yield*/, addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x + 1, point.y - 1))];
                                    case 15:
                                        object = _a.sent();
                                        if (!isRepeated(new Point_1.default(point.x + 1, point.y - 1)) && !closed(object))
                                            fCosts.push(object);
                                        _a.label = 16;
                                    case 16:
                                        fCosts.sort(function (a, b) {
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
                                        });
                                        if (!fCosts[0].props.start && !fCosts[0].props.end && !fCosts[0].props.wall && !fCosts[0].props.closed) {
                                            fCosts[0].color = "pink";
                                            fCosts[0].addProperty("closed", true);
                                        }
                                        returnedGameObject = __assign({}, fCosts[0]);
                                        fCosts.shift();
                                        return [2 /*return*/, returnedGameObject];
                                }
                            });
                        }); };
                        _a.label = 1;
                    case 1:
                        if (!!currentNode.props["end"]) return [3 /*break*/, 4];
                        return [4 /*yield*/, Sleep_1.default.now(speed)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, calculateCosts(currentNode.props["coords"])];
                    case 3:
                        currentNode = _a.sent();
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return bdv;
}());
exports.default = bdv;

},{"../../map.json":2,"../math/Dimension":6,"../math/Geometry":7,"../math/Point":8,"../render/CanvasRenderer":9,"../render/PixelRenderer":10,"../utils/Sleep":12,"./GameObject":3,"./Model":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Geometry = /** @class */ (function () {
    function Geometry() {
    }
    Geometry.distanceBetweenPoints = function (pointA, pointB) {
        return Math.sqrt(((pointB.x - pointA.x) * (pointB.x - pointA.x)) + ((pointB.y - pointA.y) * (pointB.y - pointA.y)));
    };
    return Geometry;
}());
exports.default = Geometry;

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"../core/Model":4,"../math/Dimension":6,"../math/Point":8,"./Stage":11}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stage = /** @class */ (function () {
    function Stage() {
        this.queue = [];
    }
    return Stage;
}());
exports.default = Stage;

},{}],12:[function(require,module,exports){
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
