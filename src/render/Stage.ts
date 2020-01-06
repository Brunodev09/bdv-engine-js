import GameObject from "../core/GameObject";

export default class Stage {
    queue: GameObject[];
    constructor() {
        this.queue = [];
    }
}