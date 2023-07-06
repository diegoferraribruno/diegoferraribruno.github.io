function preResizeCanvas(newWidth, newHeight) {
    if (!newHeight || !newWidth) {
        newWidth = parseInt(document.getElementById('canvasWidth').value);
        newHeight = parseInt(document.getElementById('canvasHeight').value);
    }
    // Clear the canvas
    canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the canvas size to the new values
    canvasFront.width = newWidth;
    canvasFront.height = newHeight;

    // Draw the image on the canvas (image will be resized to fit the new canvas size)
    canvasFront.ctx.drawImage(image, 0, 0, newWidth, newHeight);
    // Reset the selection paths and current path
}



function resizeCanvas(newWidth, newHeight) {
    if (!newHeight || !newWidth) {
        newWidth = parseInt(document.getElementById('canvasWidth').value);
        newHeight = parseInt(document.getElementById('canvasHeight').value);
    }
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the canvas size to the new values
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the image on the canvas (image will be resized to fit the new canvas size)
    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    // Reset the selection paths and current path
    // selectionPaths = [];
    // currentPath = [];
}



function updateHeightField() {
    const width = parseInt(canvasWidthInput.value);
    const currentAspectRatio = canvas.width / canvas.height;
    const newHeight = Math.round(width / currentAspectRatio);

    canvasHeightInput.value = newHeight;
}
