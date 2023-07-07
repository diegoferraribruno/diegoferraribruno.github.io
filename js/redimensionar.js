const canvasWidthInput = document.getElementById('canvasWidth');
const canvasHeightInput = document.getElementById('canvasHeight');
canvasWidthInput.addEventListener('input', updateHeightField);
const resizeButton = document.getElementById('resizeButton');
resizeButton.addEventListener('click', resizeCanvas);

function preResizeCanvas(newWidth, newHeight) {
    if (!newHeight || !newWidth) {
        newWidth = parseInt(document.getElementById('canvasWidth').value);
        newHeight = parseInt(document.getElementById('canvasHeight').value);
    }
    // Clear the canvas
    canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the canvas size to the new values
    // canvasFront.width = newWidth;
    //canvasFront.height = newHeight;
    desenhaRetangulo(0, 0, newWidth, newHeight)

    // Draw the image on the canvas (image will be resized to fit the new canvas size)
    canvasFront.ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
    // Reset the selection paths and current path
    canvasFront.classList.remove("esconde")
}




function resizeCanvas(newWidth, newHeight) {
    if (!newHeight || !newWidth) {
        newWidth = parseInt(document.getElementById('canvasWidth').value);
        newHeight = parseInt(document.getElementById('canvasHeight').value);
    }
    // Clear the canvas
    canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the canvas size to the new values
    canvasFront.width = newWidth;
    canvasFront.height = newHeight;
    canvasFront.style.marginLeft = -newWidth + "px"
    canvasDiv.style.width = newWidth + "px"; //add 30px for scroll
    canvasDiv.style.height = newHeight + "px"; //add 30px for scroll
    canvasBack.width = newWidth;
    canvasBack.height = newHeight;
    canvasBack.style.marginLeft = -newWidth + "px"
    iD("bplayer0").style.width = newWidth + "px"
    iD("bplayer0").style.height = newHeight + "px"
    iD("bplayer0").style.marginTop = - newHeight - 4 + "px"

    canvasFront.ctx.drawImage(canvas, 0, 0, newWidth, newHeight);

    setTimeout(() => {


        // Draw the image on the canvas (image will be resized to fit the new canvas size)
        canvas.width = newWidth;
        canvas.height = newHeight;
        context.drawImage(canvasFront, 0, 0, newWidth, newHeight);
    }, canvas.height / 2)

    // Reset the selection paths and current path
    // selectionPaths = [];
    // currentPath = [];
}



function updateHeightField() {
    const width = parseInt(canvasWidthInput.value);
    const currentAspectRatio = canvas.width / canvas.height;
    const newHeight = Math.round(width / currentAspectRatio);

    canvasHeightInput.value = newHeight;
    preResizeCanvas(width, newHeight)
}
