"use strict";
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
// @TODO - Separate examples (conways, aStar etc from native functions of the engine to a 'samples' js folder teaching how to use the engine to build those).
// @TODO - Finish the pixel renderer. 
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
            _this.render2.createPixelsScreen();
        };
        this.game = function () {
            _this.render.loop();
            _this.render.clear();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmR2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYmR2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrR0FBa0c7QUFDbEcsNkJBQTZCO0FBQzdCLG1GQUFtRjtBQUNuRiwyQkFBMkI7QUFDM0IsdUJBQXVCO0FBQ3ZCLGdFQUFnRTtBQUNoRSwyQkFBMkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTNCLDZKQUE2SjtBQUM3SixzQ0FBc0M7QUFFdEMsNEVBQWlEO0FBQ2pELDBFQUFzRDtBQUV0RCxpQ0FBZ0M7QUFDaEMsNERBQXNDO0FBQ3RDLGdFQUEwQztBQUMxQyx3REFBa0M7QUFFbEMseUNBQXVEO0FBRXZELDREQUFxQztBQUNyQyw0REFBc0M7QUFDdEMsb0VBQThDO0FBQzlDLHdEQUFrQztBQUNsQyw0REFBc0M7QUFDdEMsc0RBQWdDO0FBRWhDO0lBT0ksYUFBWSxLQUFhLEVBQUUsTUFBYztRQUF6QyxpQkFXQztRQUVELDRCQUF1QixHQUFHO1lBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSx3QkFBUyxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBRUQsK0JBQTBCLEdBQUc7WUFDekIsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFlLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkUsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQTtRQUVELFVBQUssR0FBRztZQUNKLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxr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