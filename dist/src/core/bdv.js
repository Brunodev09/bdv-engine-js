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
// @TODO - Finish the pixel renderer. - Finish primitive shapes and fix color offset. 
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmR2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYmR2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrR0FBa0c7QUFDbEcsNkJBQTZCO0FBQzdCLG1GQUFtRjtBQUNuRiwyQkFBMkI7QUFDM0IsZ0VBQWdFO0FBQ2hFLDJCQUEyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFM0IsNkpBQTZKO0FBQzdKLHNGQUFzRjtBQUV0Riw0RUFBaUQ7QUFDakQsMEVBQXNEO0FBRXRELGlDQUFnQztBQUNoQyw0REFBc0M7QUFDdEMsZ0VBQTBDO0FBQzFDLHdEQUFrQztBQUVsQyx5Q0FBdUQ7QUFFdkQsNERBQXFDO0FBQ3JDLDREQUFzQztBQUN0QyxvRUFBOEM7QUFDOUMsd0RBQWtDO0FBQ2xDLDREQUFzQztBQUN0QyxzREFBZ0M7QUFFaEM7SUFPSSxhQUFZLEtBQWEsRUFBRSxNQUFjO1FBQXpDLGlCQVdDO1FBRUQsNEJBQXVCLEdBQUc7WUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHdCQUFTLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFGLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFRCwrQkFBMEIsR0FBRztZQUN6QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQWUsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuRSxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFBO1FBRUQsVUFBSyxHQUFHO1lBQ0osS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUE7UUFFRCxTQUFJLEdBQUc7WUFDSCxLQUFJ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