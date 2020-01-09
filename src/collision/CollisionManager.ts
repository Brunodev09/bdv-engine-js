import { Model } from "../core/Model";
import GameObject from "../core/GameObject";

import RectangleCollision from "./Rectangle";

export default class CollisionManager {
    static getCollisionType(model: Model, a: GameObject, b: GameObject) {
        switch (model) {
            case Model.RECTANGLE:
                return new RectangleCollision(a, b);    
        }
    }
}