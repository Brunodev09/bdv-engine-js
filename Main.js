window.onload = function () {
    let Core = require("./dist/src/core/bdv").bdv;
    let test = new Core(1024, 768);
    // test.activateCanvasRendering();

    // let a = test.grid(150, 150);
    // let equation = [1, 0, 0]; // 2x^2 + 1 -> [2, 0, 1] -> 2x² + 0x + 1
    // test.plotFunction(a, equation, "squared", [-100, 100]);

    // let pixel = test.pixelDoodling(a);
    // let c = test.createCircle(150, 50, 50, "red");
    // let d = test.circleSpawner(a, [c]);
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

    test.activateImageDataRendering();
    // test.newGameObject("RECTANGLE", 0, 100, 100, 100, "RED", null, null, [0, 255, 0, 255], 2);
    test.newGameObject("TEXTURE", 0, 0, 16, 16, null, null, null, [], 2, './assets/tileTest.png');
    // test.render2.pixelDoodling();

    // let movingSquare = test.drawingVectors();
    // let mySquare = test.newGameObject("RECTANGLE", 500, 200, 100, 100, "blue");
    // let myPath = test.newGameObjectArray("POINTS", [[100, 20], [25, 100], [11,10]], "green");
    // let myGrid = test.grid(50, 50);
    // let life = test.conways(50, 50);
}

