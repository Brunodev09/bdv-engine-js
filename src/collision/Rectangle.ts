import Point from "../math/Point";
import GameObject from "../core/GameObject";

export default class RectangleCollision {
    a: GameObject;
    b: GameObject;
    pa: Point;
    pb: Point;
    constructor(a: GameObject, b: GameObject) {
        this.a = a;
        this.b = b;
        this.pa = (<Point>this.a.position);
        this.pb = (<Point>this.b.position);

        if (this.pa.x < this.pb.x + this.b.dimension.width &&
            this.pa.x + this.a.dimension.width > this.pb.x &&
            this.pa.y < this.pb.y + b.dimension.height &&
            this.pa.y + this.a.dimension.height > this.pb.y) {

            let angle = (Math.atan2(this.b.middle.y - this.a.middle.y, this.b.middle.x - this.a.middle.x)) * (180 / Math.PI);

            if ((angle > -180 && angle < -135) || (angle > 135 && angle <= 180)) {
                this.pa.x += this.a.props.speedX;
            }
            if (angle > 45 && angle <= 135) {
                this.pa.y += -this.a.props.speedY;
            }
            if ((angle >= 0 && angle < 45) || (angle <= 0 && angle > -45)) {
                this.pa.x += -this.a.props.speedX;
            }
            if (angle < -45 && angle > -135) {
                this.pa.y += this.a.props.speedY;
            }
        }
    }
}