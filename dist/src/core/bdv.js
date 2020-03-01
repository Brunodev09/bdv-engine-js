"use strict";
// @TODO - Finish porting shape based rendering to GameObject -> Stages (Circles, arcs and fonts).
// @TODO - Dungeon generator.
// @TODO - Nodejs tool that reads a image file and converts it a color-mapped JSON.
// @TODO - Handling images.
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
// @TODO - Separate examples (conways, aStar etc from native functions of the engine to a 'samples' js folder teaching how to use the engine to build those).
var CanvasRenderer_1 = __importDefault(require("../render/CanvasRenderer"));
var PixelRenderer_1 = __importDefault(require("../render/PixelRenderer"));
var Model_1 = require("./Model");
var GameObject_1 = __importDefault(require("./GameObject"));
var Dimension_1 = __importDefault(require("../math/Dimension"));
var Point_1 = __importDefault(require("../math/Point"));
var Circle_1 = require("../math/Circle");
var map_json_1 = __importDefault(require("../../map.json"));
var Conways_1 = __importDefault(require("../math/Conways"));
var Pathfinding_1 = __importDefault(require("../math/Pathfinding"));
var Pixel_1 = __importDefault(require("../math/Pixel"));
var Sinwave_1 = __importDefault(require("../math/Sinwave"));
var Plot_1 = __importDefault(require("../math/Plot"));
var bdv = /** @class */ (function () {
    function bdv(width, height) {
        var _this = this;
        this.activateCanvasRendering = function () {
            _this.render = new CanvasRenderer_1.default(_this.canvasId, _this.dimensions.width, _this.dimensions.height);
            _this.game();
        };
        this.activateImageDataRendering = function () {
            _this.render2 = new PixelRenderer_1.default(_this.canvasId, _this.dimensions);
            _this.game2();
        };
        this.game2 = function () {
            _this.render2.loop();
        };
        this.game = function () {
            _this.render.loop();
        };
        this.newGameObject = function (model, positionX, positionY, width, height, color, font, message, rgb, renderOption) {
            var object = new GameObject_1.default(Model_1.Model[model], new Point_1.default(positionX, positionY), new Dimension_1.default(width, height), color, font, message, { r: rgb[0], g: rgb[1], b: rgb[2], a: rgb[3] });
            switch (renderOption) {
                case 1:
                    _this.render.requestStage(object);
                    break;
                case 2:
                    _this.render2.requestStage(object);
                    break;
                default:
                    _this.render ? _this.render.requestStage(object) : _this.render2.requestStage(object);
                    break;
            }
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
        this.circleSpawner = function (grid, circles) {
            // grid = this.addCoordinatesToGrid(grid);
            var spawner = new Circle_1.CircleSpawner(grid, circles);
            var c = spawner.getGeneratedCircles();
            setInterval(function () {
                var howManyPixels = Math.floor(Math.random() * 20);
                var _a = _this.RGB(), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
                for (var _i = 0, c_1 = c; _i < c_1.length; _i++) {
                    var circle = c_1[_i];
                    for (var _b = 0, _c = circle.points; _b < _c.length; _b++) {
                        var point = _c[_b];
                        if (howManyPixels <= 0) {
                            var newColors = _this.RGB();
                            r = newColors.r;
                            g = newColors.g;
                            b = newColors.b;
                            a = newColors.a;
                            howManyPixels = Math.floor(Math.random() * 1000);
                        }
                        // if (Math.floor(Math.random() * 2) === 1) grid[point.y][point.x].color = `rgb(${r},${g},${b},${a})`;
                        // else grid[point.x][point.y].color = `rgb(${r},${g},${b},${a})`;
                        grid[point.x][point.y].color = "rgb(" + r + "," + g + "," + b + "," + a + ")";
                        howManyPixels--;
                    }
                }
            }, 100);
        };
        this.pixelDoodling = function (grid) {
            var pixel = new Pixel_1.default(grid);
            // let points = pixel.generate();
            var sinWaves = new Sinwave_1.default();
            sinWaves.populateGridWithSinValues(grid);
            for (var x = 0; x < grid.length; x++) {
                for (var y = 0; y < grid.length; y++) {
                    if (sinWaves.isPointPartOfSinPlot(new Point_1.default(grid[x][y].props.xValue, grid[x][y].props.yValue))) {
                        grid[x][y].color = "green";
                        grid[x][y].addProperty("isPointSin", true);
                    }
                }
            }
            for (var x = 0; x < grid.length; x++) {
                var limitY = null;
                for (var y = 0; y < grid.length; y++) {
                    if (grid[x][y].props.isPointSin !== null && grid[x][y].props.isPointSin !== undefined)
                        limitY = y;
                    if (limitY !== null && y > limitY)
                        grid[x][y].color = "grey";
                }
            }
            // for (let point of points) {
            //     setTimeout(() => {
            //         if (Math.floor(Math.random() * 10) === 0) grid[point.x][point.y].color = "white";
            //         else grid[point.x][point.y].color = "red";
            //     }, 10)
            // }
            // setInterval(() => {
            //     let {r, g, b, a} = this.RGB();
            //     for (let point of points) {
            //         if (Math.floor(Math.random() * 10) === 1) {
            //             if (r >= 255) r = 0;
            //             else r++;
            //             if (g >= 255) g = 0;
            //             else g++;
            //             if (b >= 255) b = 0;
            //             else b++;
            //             if (a >= 255) a = 0;
            //             else a++;
            //         }
            //         grid[point.x][point.y].color = `rgb(${r},${g},${b}, ${a})`;
            //     }
            // }, 10);
        };
        this.createCircle = function (cx, cy, r, c) {
            return new Circle_1.Circle(new Point_1.default(cx, cy), r, c);
        };
        this.write = function (message, font, x, y, color) {
            // this.render.fill(new TextFont(message, font), new Point(x, y), null, color);
        };
        this.drawingVectors = function () {
            var object1 = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(280, 300), new Dimension_1.default(100, 100), "blue");
            var object2 = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(100, 300), new Dimension_1.default(100, 100), "red");
            object1.addProperty("speedX", 3);
            object1.addProperty("speedY", 3);
            object1.erraticMovement();
            object2.addProperty("speedX", 30);
            object2.addProperty("speedY", 30);
            object2.isPlayer(true);
            _this.connectVector(object2, object1);
            // object1.follow(object2);
            _this.render.requestStage(object1);
            _this.render.requestStage(object2);
            setInterval(function () {
                object2.collision(object1);
                object1.update();
                object2.update();
            }, 15);
        };
        this.grid = function (rowsX, rowsY) {
            var matrix = [], tracker = [];
            var tileSize = new Dimension_1.default(Math.round(_this.dimensions.width / rowsX), Math.round(_this.dimensions.height / rowsY));
            for (var i = 0; i < rowsX; i++)
                matrix[i] = new Array(rowsY);
            for (var i = 0; i < rowsX; i++)
                tracker[i] = new Array(rowsY);
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    matrix[i][j] = 0;
                }
            }
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] === 0) {
                        var object = new GameObject_1.default(Model_1.Model.RECTANGLE, new Point_1.default(i * tileSize.width, j * tileSize.height), new Dimension_1.default(tileSize.width, tileSize.height), "white");
                        object.props["coords"] = new Point_1.default(i, j);
                        _this.render.requestStage(object);
                        tracker[i][j] = object;
                    }
                }
            }
            return tracker;
        };
        this.gridFromMapFile = function () {
            console.log(map_json_1.default);
        };
        this.canvasId = "CANVAS_ID";
        this.dimensions = new Dimension_1.default(width, height);
        this.render = null;
        this.render2 = null;
        var element = document.createElement('CANVAS');
        element.setAttribute("id", "CANVAS_ID");
        element.setAttribute("width", String(width));
        element.setAttribute("height", String(height));
        document.body.appendChild(element);
    }
    bdv.prototype.getPixels = function (path) {
        this.render2.getColorOfEachPixelInImage(path, function (px) {
            console.log(px);
        });
    };
    bdv.prototype.addCoordinatesToGrid = function (grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                grid[i][j].props["coords"] = new Point_1.default(i, j);
            }
        }
        return grid;
    };
    bdv.prototype.plotFunction = function (grid, equation, propertyName, xInterval) {
        var xAxis = this.newGameObjectArray(Model_1.Model.POINTS_BORDER, [[0, this.dimensions.height / 2], [this.dimensions.width, this.dimensions.height / 2]], "black");
        var yAxis = this.newGameObjectArray(Model_1.Model.POINTS_BORDER, [[this.dimensions.width / 2, 0], [this.dimensions.width / 2, this.dimensions.height]], "black");
        var plot = new Plot_1.default(grid, equation, propertyName, xInterval);
        var propertyNameX = propertyName + "X";
        var propertyNameY = propertyName + "Y";
        grid = plot.populateGridWithFunctionValues();
        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid.length; y++) {
                if (plot.isPointInFunction(new Point_1.default(grid[x][y].props[propertyNameX], grid[x][y].props[propertyNameY]))) {
                    grid[x][y].color = "red";
                    break;
                }
            }
        }
    };
    bdv.prototype.RGB = function () {
        return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255), a: Math.floor(Math.random() * 255) };
    };
    bdv.prototype.Vector2D = function (object1, object2, color) {
        // If no color is attributed, a transparent vector will be created.
        if (!color)
            color = "rgb(0, 0, 0, 0)";
        return new GameObject_1.default(Model_1.Model.VECTOR, [object1.middle, object2.middle], new Dimension_1.default(0, 0), color);
    };
    bdv.prototype.connectVector = function (follower, followed) {
        var vec = this.Vector2D(followed, follower, "white");
        this.render.requestStage(vec);
        return vec;
    };
    bdv.prototype.conways = function (xRow, yRow, aliveColor, deadColor, speed, seed) {
        return new Conways_1.default(this.render, this.dimensions, new Dimension_1.default(xRow, yRow), aliveColor, deadColor, speed, seed);
    };
    bdv.prototype.aStar = function (xRow, yRow, xStart, yStart, xEnd, yEnd, speed, allowDiagonal, seed) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Pathfinding_1.default(this.dimensions, this.render, new Dimension_1.default(xRow, yRow), xStart, yStart, xEnd, yEnd, speed, allowDiagonal, seed)];
            });
        });
    };
    return bdv;
}());
exports.bdv = bdv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmR2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYmR2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrR0FBa0c7QUFDbEcsNkJBQTZCO0FBQzdCLG1GQUFtRjtBQUNuRiwyQkFBMkI7QUFDM0IsZ0VBQWdFO0FBQ2hFLDJCQUEyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFM0IsNkpBQTZKO0FBRTdKLDRFQUFpRDtBQUNqRCwwRUFBc0Q7QUFFdEQsaUNBQWdDO0FBQ2hDLDREQUFzQztBQUN0QyxnRUFBMEM7QUFDMUMsd0RBQWtDO0FBRWxDLHlDQUF1RDtBQUV2RCw0REFBcUM7QUFDckMsNERBQXNDO0FBQ3RDLG9FQUE4QztBQUM5Qyx3REFBa0M7QUFDbEMsNERBQXNDO0FBQ3RDLHNEQUFnQztBQUVoQztJQU9JLGFBQVksS0FBYSxFQUFFLE1BQWM7UUFBekMsaUJBV0M7UUFFRCw0QkFBdUIsR0FBRztZQUN0QixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksd0JBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUYsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQUVELCtCQUEwQixHQUFHO1lBQ3pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx1QkFBZSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25FLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUE7UUFFRCxVQUFLLEdBQUc7WUFDSixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQTtRQUVELFNBQUksR0FBRztZQUNILEtBQUksQ0FBQyxNQUFNLENB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