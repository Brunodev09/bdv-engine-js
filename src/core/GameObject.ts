
import Dimension from "../math/Dimension";
import Point from "../math/Point";
import { Model } from "../core/Model";
import Vector2D from "../math/Vector2D";

import { Behaviour } from "./Behaviour";
import CollisionManager from "../collision/CollisionManager";
import RGB from "../math/RGB";

let _id = 0;

export default class GameObject {
    model: Model;
    position: Point | Point[];
    dimension: Dimension;
    color: string;
    rgb: RGB;
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
    imgPath: string;
    img: HTMLImageElement;
    callback: Function;

    constructor(model: Model, position: Point | Point[], dimension: Dimension, color?: string, font?: string, message?: string, rgb?: RGB, img?: string) {
        _id++;
        this.id = _id;
        if (!color) color = "black";
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

        switch(this.model) {
            case Model.RECTANGLE:
                this.middle = new Point((<Point>this.position).x + (this.dimension.width / 2), (<Point>this.position).y + (this.dimension.height / 2));
                break;
            case Model.TEXTURE:
                this.img = new Image();
                this.img.src = this.imgPath;
                break;
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

    addCallback(callback: Function) {
        this.callback = callback;
    }

    createClickListener() {
        document.addEventListener('click', (e) => {
            if (e.clientX > (<Point>this.position).x && e.clientX <= (<Point>this.position).x + this.dimension.width && e.clientY > (<Point>this.position).y && e.clientY <= (<Point>this.position).y + this.dimension.height) {
                this.callback && this.callback(this, "clickEvent");
            }
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