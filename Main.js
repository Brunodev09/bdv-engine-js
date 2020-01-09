let bdv = require("./dist/src/core/bdv").default;

window.onload = function () {
    let test = new bdv(1024, 768);
    test.activateCanvasRendering();
    // test.grid(10, 10);
    // test.aStar(25, 25, 10, 12, 8, 12);
    // test.aStar(25, 25, 5, 5, 10, 5, 1000, null);
    // test.aStar(50, 50, null, null, null, null, 50, null);

    // test.gridFromMapFile();
    // let mySeededMatrix = [];
    // for (let i = 0; i < 10; i++) mySeededMatrix[i] = [];

    // for (let i = 0; i < 10; i++) {
    //     for (let j = 0; j < 10; j++) {
    //         if (Math.floor(Math.random()*10) === 1) mySeededMatrix[i][j] = 1;
    //         else mySeededMatrix[i][j] = 0;
    //     }
    // }
    // test.conways(10, 10, mySeededMatrix, "green", "lightgreen", 100);
    // test.conways(100, 100, "green", "lightgreen", 100);

    // test.activateImageDataRendering();
    // test.render2.pixelDoodling();

    let movingSquare = test.drawingVectors();
    // let mySquare = test.newGameObject("RECTANGLE", 500, 200, 100, 100, "blue");
    // let myPath = test.newGameObjectArray("POINTS", [[100, 20], [25, 100], [11,10]], "green");
    // let myGrid = test.grid(50, 50);
    // let life = test.conways(50, 50);
}
