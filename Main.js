window.onload = function () {
    let Core = require("./dist/src/core/bdv").bdv;
    let bdv = new Core(800, 600);

    bdv.activateImageDataRendering();
    let objectMatrix = bdv.grid(16, 16);

    function entityListener(gameObject, event) {
        console.log(gameObject, event);
    }

    for (let row of objectMatrix) {
        for (let obj of row) {
            obj.addCallback(entityListener);
            obj.createClickListener();
        }
    }


}

