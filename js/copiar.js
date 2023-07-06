let selectionPaths = [];
let currentPath = [];
let isSelecting2 = false;

function drawSelection() {
    canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
    //canvasFront.ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Replace 'image' with your actual image variable

    for (const path of selectionPaths) {
        canvasFront.ctx.beginPath();

        canvasFront.ctx.setLineDash([2, 2]);
        canvasFront.ctx.moveTo(path[0][0], path[0][1]);
        for (let i = 1; i < path.length; i++) {
            canvasFront.ctx.lineTo(path[i][0], path[i][1]);
        }
        canvasFront.ctx.closePath();
        canvasFront.ctx.fillStyle = '#ff000066'; // Set fill color with opacity
        canvasFront.ctx.fill(); // Fill the selection shape
    }

    if (currentPath.length > 1) {
        canvasFront.ctx.beginPath();

        canvasFront.ctx.setLineDash([2, 2]);
        canvasFront.ctx.moveTo(currentPath[0][0], currentPath[0][1]);
        for (let i = 1; i < currentPath.length; i++) {
            canvasFront.ctx.lineTo(currentPath[i][0], currentPath[i][1]);
        }
        canvasFront.ctx.closePath();
        canvasFront.ctx.fillStyle = '#ff000066'; // Set fill color with opacity
        canvasFront.ctx.strokeStyle = '#ffffff88'; // Set stroke color with opacity
        canvasFront.ctx.lineWidth = 1;
        canvasFront.ctx.fill(); // Fill the current selection shape

        canvasFront.ctx.stroke()
    }
}

function copiar() {

    new_frame();
}