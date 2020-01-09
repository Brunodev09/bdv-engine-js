
import Dimension from "../math/Dimension";
import Point from "../math/Point";
import { Model } from "../core/Model";
import Vector2D from "../math/Vector2D";

import { Behaviour } from "./Behaviour";
import CollisionManager from "../collision/CollisionManager";

let _id = 0;

export default class GameObject {
    model: Model;
    position: Point | Point[];
    dimension: Dimension;
    color: string;
    middle: Point;

    player?: boolean;
    behaviour?: Behaviour;
    vector?: Vector2D;
    referenced?: GameObject;
    following?: boolean;
    lockMovement: boolean;
    font?: string;
    message?: string;
    props?: any;
    id?: number;

    constructor(model: Model, position: Point | Point[], dimension: Dimension, color?: string, font?: string, message?: string) {
        _id++;
        this.id = _id;
        if (!color) color = "black"
        this.model = model;
        this.position = position;
        this.dimension = dimension;
        this.color = color;

        this.font = font;
        this.message = message;
        this.props = {};

        this.vector = null;
        this.following = false;
        this.player = false;

        if (this.model === Model.RECTANGLE) {
            this.middle = new Point((<Point>this.position).x + (this.dimension.width / 2), (<Point>this.position).y + (this.dimension.height / 2));
        }
    }

    addProperty = (propName: string, propValue: any) => {
        this.props[propName] = propValue;
    }

    getMiddlePoint() {
        this.middle.x = (<Point>this.position).x + (this.dimension.width / 2);
        this.middle.y = (<Point>this.position).y + (this.dimension.height / 2);
    }

    isPlayer(bool: boolean) {
        this.player = bool;
        this.createPlayerListeners();
    }

    createPlayerListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === "ArrowUp") (<Point>this.position).y -= this.props.speedY;
            if (e.code === "ArrowDown") (<Point>this.position).y += this.props.speedY;
            if (e.code === "ArrowLeft") (<Point>this.position).x -= this.props.speedX;
            if (e.code === "ArrowRight") (<Point>this.position).x += this.props.speedX;
        });
    }


    follow(object: GameObject | void) {
        if (!object) object = this.referenced;
        else {
            this.following = true;
            this.referenced = object;
        }
        
        this.behaviour = Behaviour.FOLLOW;

        this.vector = Vector2D.NewPointSubtraction((<Point>object.position), (<Point>this.position));

        if (this.vector.xComponent > 0) (<Point>this.position).x += this.props.speedX;
        else (<Point>this.position).x += -this.props.speedX;

        if (this.vector.yComponent > 0) (<Point>this.position).y += this.props.speedY;
        else (<Point>this.position).y += -this.props.speedY;

    }

    erraticMovement() {
        if (!this.behaviour) this.behaviour = Behaviour.ERRATIC;

        (<Point>this.position).x += this.props.speedX;
        (<Point>this.position).y += this.props.speedY;
        if ((<Point>this.position).x > 1024 || (<Point>this.position).x < 0) this.props.speedX = -this.props.speedX;
        if ((<Point>this.position).y > 768 || (<Point>this.position).y < 0) this.props.speedY = -this.props.speedY;
    }

    collision(object: GameObject) {
        CollisionManager.getCollisionType(this.model, this, object);
    }

    update() {

        switch(this.model) {
            case Model.RECTANGLE:
                this.getMiddlePoint();
                break;
        }

        switch(this.behaviour) {
            case Behaviour.ERRATIC:
                this.erraticMovement();
                break;
            case Behaviour.FOLLOW:
                this.follow();
                break;    
        }
    }

}