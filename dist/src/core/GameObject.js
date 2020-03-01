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
    function GameObject(model, position, dimension, color, font, message, rgb, img) {
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
        this.imgPath = img;
        this.img = null;
        switch (this.model) {
            case Model_1.Model.RECTANGLE:
                this.middle = new Point_1.default(this.position.x + (this.dimension.width / 2), this.position.y + (this.dimension.height / 2));
                break;
            case Model_1.Model.TEXTURE:
                this.img = new Image();
                this.img.src = this.imgPath;
                break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL0dhbWVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSx3REFBa0M7QUFDbEMsdUNBQXNDO0FBQ3RDLDhEQUF3QztBQUV4Qyx5Q0FBd0M7QUFDeEMsbUZBQTZEO0FBRzdELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztBQUVaO0lBcUJJLG9CQUFZLEtBQVksRUFBRSxRQUF5QixFQUFFLFNBQW9CLEVBQUUsS0FBYyxFQUFFLElBQWEsRUFBRSxPQUFnQixFQUFFLEdBQVMsRUFBRSxHQUFZO1FBQW5KLGlCQTZCQztRQUVELGdCQUFXLEdBQUcsVUFBQyxRQUFnQixFQUFFLFNBQWM7WUFDM0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDckMsQ0FBQyxDQUFBO1FBaENHLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSztZQUFFLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJ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