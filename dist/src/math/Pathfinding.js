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
    function Pathfinding(screen, render, rows, xStart, yStart, xEnd, yEnd, speed, allowDiagonal, seed) {
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
        this.addCostsToGameObject = function (startPoint, endPoint, pointToTest) {
            var _a = _this.calculateCosts(startPoint, endPoint, pointToTest, _this.currentNode), F = _a.F, G = _a.G, H = _a.H;
            var foundGameObject = _this.findGameObjectByCoordinate(pointToTest);
            if (foundGameObject.props.closed)
                return foundGameObject;
            if (!foundGameObject.props.wall && !foundGameObject.props.start && !foundGameObject.props.end) {
                foundGameObject.color = "lightgreen";
            }
            // Only add currentNode as parent if it's not repeated. Will only update the repeated parent IF current Fcost < previous Fcost.
            if (!foundGameObject.props.start && !foundGameObject.props.repeated)
                foundGameObject.addProperty("parent", _this.currentNode);
            // Since our Gcost is variable, I will never stop my code from re-adding the cost properties.
            if (foundGameObject && !foundGameObject.props.start) {
                if (foundGameObject.props["repeated"]) {
                    if (F >= foundGameObject.props["fCost"])
                        return foundGameObject;
                }
                foundGameObject.addProperty("parent", _this.currentNode);
                foundGameObject.addProperty("gCost", G);
                foundGameObject.addProperty("hCost", H);
                foundGameObject.addProperty("fCost", F);
                if (foundGameObject.props.end) {
                    _this.lookForBestPathAfterEndNodeFound();
                }
            }
            return foundGameObject;
        };
        this.computeNextNodeChoice = function (point) { return __awaiter(_this, void 0, void 0, function () {
            var startPoint, endPoint, returnedGameObject;
            return __generator(this, function (_a) {
                startPoint = new Point_1.default(this.startNode.props["coords"].x, this.startNode.props["coords"].y);
                endPoint = new Point_1.default(this.endNode.props["coords"].x, this.endNode.props["coords"].y);
                if (this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y]) {
                    if (this.notObstacle(new Point_1.default(point.x + 1, point.y), 4)) {
                        this.addToOpenList(startPoint, endPoint, new Point_1.default(point.x + 1, point.y));
                    }
                }
                if (this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y]) {
                    if (this.notObstacle(new Point_1.default(point.x - 1, point.y), 4)) {
                        this.addToOpenList(startPoint, endPoint, new Point_1.default(point.x - 1, point.y));
                    }
                }
                if (this.matrix[point.x] && this.matrix[point.x][point.y + 1]) {
                    if (this.notObstacle(new Point_1.default(point.x, point.y + 1), 4)) {
                        this.addToOpenList(startPoint, endPoint, new Point_1.default(point.x, point.y + 1));
                    }
                }
                if (this.matrix[point.x] && this.matrix[point.x][point.y - 1]) {
                    if (this.notObstacle(new Point_1.default(point.x, point.y - 1), 4)) {
                        this.addToOpenList(startPoint, endPoint, new Point_1.default(point.x, point.y - 1));
                    }
                }
                if (this.allowDiagonal) {
                    if (this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y + 1]) {
                        if (this.notObstacle(new Point_1.default(point.x - 1, point.y + 1), 4)) {
                            this.addToOpenList(startPoint, endPoint, new Point_1.default(point.x - 1, point.y + 1));
                        }
                    }
                }
                if (this.allowDiagonal) {
                    if (this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y + 1]) {
                        if (this.notObstacle(new Point_1.default(point.x + 1, point.y + 1), 4)) {
                            this.addToOpenList(startPoint, endPoint, new Point_1.default(point.x + 1, point.y + 1));
                        }
                    }
                }
                if (this.allowDiagonal) {
                    if (this.matrix[point.x - 1] && this.matrix[point.x - 1][point.y - 1]) {
                        if (this.notObstacle(new Point_1.default(point.x - 1, point.y - 1), 4)) {
                            this.addToOpenList(startPoint, endPoint, new Point_1.default(point.x - 1, point.y - 1));
                        }
                    }
                }
                if (this.allowDiagonal) {
                    if (this.matrix[point.x + 1] && this.matrix[point.x + 1][point.y - 1]) {
                        if (this.notObstacle(new Point_1.default(point.x + 1, point.y - 1), 4)) {
                            this.addToOpenList(startPoint, endPoint, new Point_1.default(point.x + 1, point.y - 1));
                        }
                    }
                }
                this.openList.sort(Pathfinding.A_STAR_COST_SORTING);
                this.addToClosedList(this.openList[0]);
                returnedGameObject = this.openList[0];
                this.openList.shift();
                return [2 /*return*/, returnedGameObject];
            });
        }); };
        this.screen = screen;
        this.render = render;
        this.rows = rows;
        this.speed = speed;
        this.allowDiagonal = allowDiagonal;
        this.closedList = [], this.openList = [], this.bestPath = [], this.tracker = [];
        if (xStart && yStart && xEnd && yEnd && xStart === xEnd && yStart === yEnd)
            return null;
        this.matrix = [], this.tracker = [], this.closedList = [];
        this.start = xStart !== null && yStart !== null ? new Point_1.default(xStart, yStart) : new Point_1.default(Math.floor(Math.random() * this.rows.width), Math.floor(Math.random() * this.rows.height));
        this.end = xEnd !== null && yEnd !== null ? new Point_1.default(xEnd, yEnd) : new Point_1.default(Math.floor(Math.random() * this.rows.width), Math.floor(Math.random() * this.rows.height));
        this.tileSize = new Dimension_1.default(Math.floor(this.screen.width / this.rows.width), Math.floor(this.screen.height / this.rows.height));
        this.matrix = Geometry_1.default.createMatrix(new Dimension_1.default(this.rows.width, this.rows.height));
        this.randomGeneration(1);
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
    Pathfinding.prototype.randomGeneration = function (obstacleLevel) {
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (i === this.start.x && j === this.start.y)
                    this.matrix[i][j] = 2;
                else if (i === this.end.x && j === this.end.y)
                    this.matrix[i][j] = 3;
                else if (Math.floor(Math.random() * 10) < 3)
                    this.matrix[i][j] = 4;
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
    Pathfinding.prototype.calculateCosts = function (startPoint, endPoint, point, parent) {
        // The trick here is that the Gcost is not SIMPLY the distance between the node being tested to the startNode.
        // It's rather the distance of the distance from the currentNode to the node being tested + the distance of the 
        // currentNode to the startNode. So Gcost = d(currentNode, thisNode) + d(currentNode, startNode).
        // Using distance between points will calculate correctly all the diagonals G and H costs.
        var G = Geometry_1.default.distanceBetweenPoints(new Point_1.default(point.x, point.y), new Point_1.default(parent.props.coords.x, parent.props.coords.y)) +
            Geometry_1.default.distanceBetweenPoints(new Point_1.default(parent.props.coords.x, parent.props.coords.y), startPoint);
        var H = Geometry_1.default.distanceBetweenPoints(new Point_1.default(point.x, point.y), endPoint);
        var F = G + H;
        return { F: F, G: G, H: H };
    };
    Pathfinding.prototype.addToClosedList = function (object) {
        if (!object.props.start && !object.props.end && !object.props.wall && !object.props.closed) {
            object.color = "pink";
            object.addProperty("closed", true);
            this.closedList.push(object);
        }
    };
    Pathfinding.prototype.addToOpenList = function (startPoint, endPoint, point) {
        return __awaiter(this, void 0, void 0, function () {
            var repeat, object;
            return __generator(this, function (_a) {
                repeat = this.isInOpenList(new Point_1.default(point.x, point.y));
                object = this.addCostsToGameObject(startPoint, endPoint, new Point_1.default(point.x, point.y));
                if (!repeat && !this.closed(object)) {
                    this.openList.push(object);
                }
                return [2 /*return*/];
            });
        });
    };
    Pathfinding.prototype.notObstacle = function (point, obstacleNumberRepresentation) {
        return this.matrix[point.x][point.y] !== obstacleNumberRepresentation;
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
                        return [4 /*yield*/, this.computeNextNodeChoice(this.currentNode.props["coords"])];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0aGZpbmRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWF0aC9QYXRoZmluZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtFQUE0QztBQUM1QywwREFBb0M7QUFDcEMsa0RBQTRCO0FBQzVCLHdEQUFrQztBQUNsQyx5REFBbUM7QUFJbkMsdUNBQXNDO0FBRXRDO0lBNENJLHFCQUFZLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUk7UUFDcEYsd0RBQXdEO1FBQ3hELHNEQUFzRDtRQUN0RCx5QkFBeUI7UUFDekIsOEdBQThHO1FBSmxILGlCQTBCQztRQThDRCxpQkFBWSxHQUFHLFVBQUMsS0FBWTtZQUN4QixLQUFnQixVQUFhLEVBQWIsS0FBQSxLQUFJLENBQUMsUUFBUSxFQUFiLGNBQWEsRUFBYixJQUFhLEVBQUU7Z0JBQTFCLElBQUksR0FBRyxTQUFBO2dCQUNSLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUN4RSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbEMsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQTtRQUVELFdBQU0sR0FBRyxVQUFDLFVBQXNCO1lBQzVCLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtRQUVELCtCQUEw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SUFBSSxDQUFDO1FBRXhGLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLGVBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25MLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLGVBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pLLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUks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