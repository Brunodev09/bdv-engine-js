"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __importDefault(require("../math/Point"));
var Model_1 = require("../core/Model");
var Vector2D_1 = __importDefault(require("../math/Vector2D"));
var Behaviour_1 = require("./Behaviour");
var CollisionManager_1 = __importDefault(require("../collision/CollisionManager"));
var _id = 0;
var GameObject = /** @class */ (function () {
    function GameObject(model, position, dimension, color, font, message, rgb) {
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
        this.rgb = rgb;
        this.font = font;
        this.message = message;
        this.props = {};
        this.vector = null;
        this.following = false;
        this.player = false;
        if (this.model === Model_1.Model.RECTANGLE) {
            this.middle = new Point_1.default(this.position.x + (this.dimension.width / 2), this.position.y + (this.dimension.height / 2));
        }
    }
    GameObject.prototype.getMiddlePoint = function () {
        this.middle.x = this.position.x + (this.dimension.width / 2);
        this.middle.y = this.position.y + (this.dimension.height / 2);
    };
    GameObject.prototype.isPlayer = function (bool) {
        this.player = bool;
        this.createPlayerListeners();
    };
    GameObject.prototype.createPlayerListeners = function () {
        var _this = this;
        document.addEventListener('keydown', function (e) {
            if (e.code === "ArrowUp")
                _this.position.y -= _this.props.speedY;
            if (e.code === "ArrowDown")
                _this.position.y += _this.props.speedY;
            if (e.code === "ArrowLeft")
                _this.position.x -= _this.props.speedX;
            if (e.code === "ArrowRight")
                _this.position.x += _this.props.speedX;
        });
    };
    GameObject.prototype.follow = function (object) {
        if (!object)
            object = this.referenced;
        else {
            this.following = true;
            this.referenced = object;
        }
        this.behaviour = Behaviour_1.Behaviour.FOLLOW;
        this.vector = Vector2D_1.default.NewPointSubtraction(object.position, this.position);
        if (this.vector.xComponent > 0)
            this.position.x += this.props.speedX;
        else
            this.position.x += -this.props.speedX;
        if (this.vector.yComponent > 0)
            this.position.y += this.props.speedY;
        else
            this.position.y += -this.props.speedY;
    };
    GameObject.prototype.erraticMovement = function () {
        if (!this.behaviour)
            this.behaviour = Behaviour_1.Behaviour.ERRATIC;
        this.position.x += this.props.speedX;
        this.position.y += this.props.speedY;
        if (this.position.x > 1024 || this.position.x < 0)
            this.props.speedX = -this.props.speedX;
        if (this.position.y > 768 || this.position.y < 0)
            this.props.speedY = -this.props.speedY;
    };
    GameObject.prototype.collision = function (object) {
        CollisionManager_1.default.getCollisionType(this.model, this, object);
    };
    GameObject.prototype.update = function () {
        switch (this.model) {
            case Model_1.Model.RECTANGLE:
                this.getMiddlePoint();
                break;
        }
        switch (this.behaviour) {
            case Behaviour_1.Behaviour.ERRATIC:
                this.erraticMovement();
                break;
            case Behaviour_1.Behaviour.FOLLOW:
                this.follow();
                break;
        }
    };
    return GameObject;
}());
exports.default = GameObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL0dhbWVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSx3REFBa0M7QUFDbEMsdUNBQXNDO0FBQ3RDLDhEQUF3QztBQUV4Qyx5Q0FBd0M7QUFDeEMsbUZBQTZEO0FBRzdELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztBQUVaO0lBbUJJLG9CQUFZLEtBQVksRUFBRSxRQUF5QixFQUFFLFNBQW9CLEVBQUUsS0FBYyxFQUFFLElBQWEsRUFBRSxPQUFnQixFQUFFLEdBQVM7UUFBckksaUJBcUJDO1FBRUQsZ0JBQVcsR0FBRyxVQUFDLFFBQWdCLEVBQUUsU0FBYztZQUMzQyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNyQyxDQUFDLENBQUE7UUF4QkcsR0FBRyxFQUFFLENBQUM7UUFDTixJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLO1lBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxN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