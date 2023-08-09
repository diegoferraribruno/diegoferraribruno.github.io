//disable due to be too slow and not working right gotta fix it

function doubleImageSize() {
    // Set canvas size to double the size of the image
    const canvasWidth = canvas.width * 2;
    const canvasHeight = canvas.height * 2;
    tamanho(canvasWidth, canvasHeight);

    let len = animacao.length
    for (i = 0; i < len; i++) {
        workingframe = i
        const sourceImage = new Image()
        sourceImage.src = animacao[workingframe]
        sourceImage.onload = function () {

            ctxR.setTransform(1, 0, 0, 1, 0, 0);
            ctxR.clearRect(0, 0, ctxR.canvas.width, ctxR.canvas.height);
            // ctxR.drawImage(sourceImage, 0, 0, canvasWidth, canvasHeight);
            // Draw the image on the canvas, doubling its size with square pixels
            const originalWidth = sourceImage.width;
            const originalHeight = sourceImage.height;
            for (let y = 0; y < originalHeight; y++) {
                for (let x = 0; x < originalWidth; x++) {
                    const pixelColor = getPixelColor(ctxR, x, y);
                    drawPixel(ctxR, x * 2, y * 2, pixelColor);
                    drawPixel(ctxR, x * 2 + 1, y * 2, pixelColor);
                    drawPixel(ctxR, x * 2, y * 2 + 1, pixelColor);
                    drawPixel(ctxR, x * 2 + 1, y * 2 + 1, pixelColor);
                }
            }
            // Change the source image to the canvas content
            //  sourceImage.src = canvas.toDataURL('image/png');

            Historia()
        }
    }
    setTimeout(() => nextFrame(), 2000 * len)
    // Show the modified image
    // sourceImage.style.display = 'block';
}

// Function to get the color of a pixel at the specified location
function getPixelColor(ctxR, x, y) {
    const pixelData = ctxR.getImageData(x, y, 1, 1).data;
    return `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
}

// Function to draw a pixel with the specified color at the specified location
function drawPixel(ctxR, x, y, color) {
    ctxR.fillStyle = color;
    ctxR.fillRect(x, y, 1, 1);
}