
import Dimension from "../math/Dimension";
import Point from "../math/Point";
import { Model } from "../core/Model";


export default class GameObject {
    model: Model;
    position: Point | Point[];
    dimension: Dimension;
    color: string;
    font?: string;
    message?: string;
    props?: any;
    constructor(model: Model, position: Point | Point[], dimension: Dimension, color?: string, font?: string, message?: string) {
        if (!color) color = "black"
        this.model = model;
        this.position = position;
        this.dimension = dimension;
        this.color = color;

        this.font = font;
        this.message = message;
        this.props = {};
    }

    addProperty = (propName: string, propValue: any) => {
        this.props[propName] = propValue;
    }
}