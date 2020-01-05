// Long term:
// @TODO - Graphs, Image Loader (with buffer pixel reading), algos applied to grid and graphs on command.
// @TODO - Easy networking.


class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Dimension {
    width: number;
    height: number;
    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
    }
}


enum Model {
    RECTANGLE = "RECTANGLE",
    RECTANGLE_BORDER = "RECTANGLE_BORDER",
    POINT = "POINT",
    POINTS = "POINTS",
    POINTS_BORDER = "POINTS_BORDER",
    TRIANGLE_BORDER = "TRIANGLE_BORDER",
    LINE = "LINE",
    TEXT = "TEXT",
    CIRCLE = "CIRCLE",
    CIRCLE_BORDER = "CIRCLE_BORDER",
    ARC = "ARC",
}

class GameObject {
    model: Model;
    position: Point | Point[];
    dimension: Dimension;
    color: string;
    font?: string;
    message?: string;
    constructor(model: Model, position: Point | Point[], dimension: Dimension, color?: string, font?: string, message?: string) {
        if (!color) color = "black"
        this.model = model;
        this.position = position;
        this.dimension = dimension;
        this.color = color;

        this.font = font;
        this.message = message;
    }

    addProperty = (propName: string, propValue: any) => {
        this[propName] = propValue;
    }
}

class Stage {
    queue: GameObject[];
    constructor() {
        this.queue = [];
    }
}

class bdv {
    canvasId: string;
    dimensions: Dimension;
    render: null | bdvRender;
    stage: Stage;

    constructor(canvasId: string, width: number, height: number) {
        this.canvasId = canvasId;
        this.dimensions = new Dimension(width, height);
        this.render = null;
    }

    start = () => {
        this.render = new bdvRender(this.canvasId, this.dimensions.width, this.dimensions.height);
        this.game();
    }

    game = () => {
        this.render.loop();
        this.render.clear();
    }

    newGameObject = (model: string, positionX: number, positionY: number, width: number, height: number, color: string, font?: string, message?: string) => {
        let object = new GameObject(Model[model], new Point(positionX, positionY), new Dimension(width, height), color, font, message);
        this.render.requestStage(object);

        return object;
    }

    newGameObjectArray = (model: string, positions: number[][], color: string, font?: string, message?: string) => {
        let aux = [];
        for (let point of positions) {
            let aux2 = [];
            for (let coord of point) {
                aux2.push(coord);
            }
            aux.push(new Point(aux2[0], aux2[1]));
        }
        let object = new GameObject(Model[model], aux, new Dimension(0, 0), color, font, message);
        this.render.requestStage(object);

        return object;
    }

    circle = (x: number, y: number, r: number, t?: string, c?: string) => {
        this.render.arc(new Point(x, y), r, t, c);
    }


    write = (message: string, font: string, x: number, y: number, color: string) => {
        // this.render.fill(new TextFont(message, font), new Point(x, y), null, color);
    }

    movingSquares = () => {
        let object = new GameObject(Model.RECTANGLE, new Point(100, 100), new Dimension(100, 100), "purple");
        this.render.requestStage(object);
        let speedX = 5, speedY = 5;

        setInterval(() => {
            (<Point>object.position).x += speedX;
            (<Point>object.position).y += speedY;
            if ((<Point>object.position).x > this.dimensions.width || (<Point>object.position).x < 0) speedX = -speedX;
            if ((<Point>object.position).y > this.dimensions.height || (<Point>object.position).y < 0) speedY = -speedY;
        }, 10);
    };

    grid = (rowsX: number, rowsY: number) => {
        let matrix = [], tracker = [];
        const tileSize = new Dimension(Math.floor(this.dimensions.width / rowsX), Math.floor(this.dimensions.height / rowsY));

        for (let i = 0; i < rowsX; i++) matrix[i] = new Array(rowsY);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = 0;
            }
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] === 0) {
                    let object = new GameObject(Model.RECTANGLE_BORDER, new Point(i * tileSize.width, j * tileSize.height), new Dimension(tileSize.width, tileSize.height), "white");
                    this.render.requestStage(object);
                    tracker.push(object);
                }
            }
        }

        return tracker;
    }

}

class bdvRender extends bdv {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dimensions: Dimension;
    defaultColor: string;
    stage: Stage;

    constructor(canvasId: string, width: number, height: number) {
        super(canvasId, width, height);
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.dimensions = new Dimension(width, height);
        this.defaultColor = 'black';

        this.stage = new Stage();
    }

    requestStage(object: GameObject) {
        this.stage.queue.push(object);
    }

    loop = () => {
        requestAnimationFrame(this.animation);
    }

    animation = () => {
        this.clear();
        this.stageRenderingOrder();
        requestAnimationFrame(this.animation);
    }

    stageRenderingOrder = () => {
        for (let object of this.stage.queue) {
            switch (object.model) {
                case Model.RECTANGLE:
                    this.fill(object);
                    break;
                case Model.RECTANGLE_BORDER:
                    this.stroke(object);
                    break;
                case Model.POINTS:
                case Model.POINTS_BORDER:
                    this.path(object);
                    break;
                case Model.CIRCLE:
                    break;
                case Model.CIRCLE_BORDER:
                    break;
            }
        }
    }

    clear = () => {
        this.color('black');
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    fill = (object: GameObject) => {
        if (!object.color) object.color = this.defaultColor;
        if (object.position instanceof Point) {
            this.color(object.color);
            if (object.model === Model.RECTANGLE) {
                this.ctx.fillRect(object.position.x, object.position.y, object.dimension.width, object.dimension.height);
            }
            else if (object.model === Model.TEXT) {
                this.ctx.font = object.font;
                this.ctx.fillStyle = object.color;
                this.ctx.fillText(object.message, object.position.x, object.position.y);
            }
        }
    }

    stroke = (object: GameObject) => {
        if (!object.color) object.color = this.defaultColor;
        this.color(object.color);
        if (object.position instanceof Point) {
            this.ctx.strokeStyle = object.color;
            this.ctx.strokeRect(object.position.x, object.position.y, object.dimension.width, object.dimension.height);
        }
    }


    path = (object: GameObject) => {
        if (!object.color) object.color = this.defaultColor;
        this.ctx.fillStyle = object.color;
        this.ctx.beginPath();
        let it = 0;

        if (object.position instanceof Array) {
            for (let point of object.position) {
                if (it === 0) {
                    this.ctx.moveTo(point.x, point.y);
                    it++;
                    continue;
                }
                this.ctx.lineTo(point.x, point.y);
                it++;
            }
        }

        if (object.model === Model.POINTS) {
            this.ctx.fillStyle = object.color;
            this.ctx.fill();
        }
        else if (object.model === Model.POINTS_BORDER) {
            this.ctx.strokeStyle = object.color;
            this.ctx.stroke();
        }
    }

    arc = (point: Point, radius: number, type?: string, color?: string) => {
        // Full arc - 0 to 2pi
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);

        if (!type) type = "stroke";
        if (!color) color = this.defaultColor;

        if (type === "fill") {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }

    color = (color: string) => {
        this.ctx.fillStyle = color;
    }

}


window.onload = function () {
    let test = new bdv("CANVAS_ID", 1024, 768);
    test.start();
    // let movingSquare = test.movingSquares();
    // let mySquare = test.newGameObject("RECTANGLE", 500, 200, 100, 100, "blue");
    // let myPath = test.newGameObjectArray("POINTS", [[100, 20], [25, 100], [11,10]], "green");
    let myGrid = test.grid(50, 50);

}