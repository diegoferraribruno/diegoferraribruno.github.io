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
    ctxF.clearRect(0, 0, canvas.width, canvas.height);

    // Set the canvas size to the new values
    // canvasFront.width = newWidth;
    //canvasFront.height = newHeight;
    desenhaRetangulo(0, 0, newWidth, newHeight)

    // Draw the image on the canvas (image will be resized to fit the new canvas size)
    ctxF.drawImage(canvas, 0, 0, newWidth, newHeight);
    // Reset the selection paths and current path
    canvasFront.classList.remove("esconde")
}

function redimendionarAnima(newWidth, newHeight) {
    setTimeout(() => {
        removeClass()
        Alert(alerts[language][16] + " redimensionar <br>" + alerts[language][17])
    }
        , 10)


    if (iD("scaleall").checked) {

        let frame = 0
        let len = animacao.length
        canvasFront.width = newWidth
        canvasFront.height = newHeight
        canvasBack.width = newWidth
        canvasBack.height = newHeight
        for (i = 0; i <= len; i++) {
            if (i < len) {

                framesToCanvas(newWidth, newHeight, i)
            } else {
                setTimeout(() => {
                    ctxF.setTransform(1, 0, 0, 1, 0, 0);
                    ctxF.clearRect(0, 0, canvasFront.width, canvasFront.height);
                    canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
                    canvasBack.ctx.clearRect(0, 0, canvasFront.width, canvasFront.height);

                    // setTimeout(() => { for (i = 0; i < len; i++) { changeFrame(i) } }, 200)

                }, 100 * len)
            }

        }

        function framesToCanvas(newWidth, newHeight, frame = 0) {
            let imagem = new Image()

            imagem.width = newWidth
            imagem.height = newHeight
            blob = dataURItoBlob(animacao[frame]);
            imagem.src = URL.createObjectURL(blob);
            imagem.onload =
                function () {
                    ctxF.setTransform(1, 0, 0, 1, 0, 0);
                    ctxF.clearRect(0, 0, canvasFront.width, canvasFront.height);
                    ctxF.drawImage(imagem, 0, 0, newWidth, newHeight);
                    canvasToFrame(frame)
                }
        }


        function canvasToFrame(frame = workingframe) {
            swapImg = canvasFront.toDataURL('image/png');
            // newAnima[frame] = swapImg
            workingframe = frame
            Historia(swapImg)
        }
        /* comando = ["s", "source-over", swapImg, 0, 0, canvas.width, canvas.height];
comandos[workingframe] = []
comandos[workingframe].push(comando)
// comandosParaComandosb()
*/
        /*
                setTimeout(() => {
                    let len = newAnima.length
                    animacao.length = 0
                    for (i = 0; i < len; i++) {
                        animacao.push(newAnima[i])
                    }
                    setTimeout(function () {
                        setTimeout(() => { adicionaQuadro() }, 30)
                        autoCropMax = { x: 0, y: 0 }
                        autoCropMin = { x: canvas.width, y: canvas.height };
                        cropEnd.x = 0;
                        cropEnd.y = 0;
                    }, 10)
        
                }, 200 * len)*/
    } else {
        canvasFront.width = newWidth
        canvasFront.height = newHeight
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvasFront.width, canvasFront.height);
        ctxF.drawImage(canvas, 0, 0, newWidth, newHeight);
        //swapImg = canvasFront.toDataURL('image/png');
        //newAnima[workingframe] = swapImg

        setTimeout(() => {
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(canvasFront, 0, 0)
            Historia()
        }, 20)
        //comando = ["s", "source-over", swapImg, 0, 0,newWidth, newHeight];
        //comandos[workingframe].push(comando)
        // comandosParaComandosb()
        setTimeout(() => {
            canvasFront.width = canvas.width
            canvasFront.height = canvas.height
            ctxF.setTransform(1, 0, 0, 1, 0, 0);
            ctxF.clearRect(0, 0, canvasFront.width, canvasFront.height);
            //comandosExec()
        }, 200)

    }

}



function resizeCanvas(newWidth, newHeight) {
    if (!newHeight || !newWidth) {
        newWidth = parseInt(document.getElementById('canvasWidth').value);
        newHeight = parseInt(document.getElementById('canvasHeight').value);
    }
    if (newWidth != canvas.height) {
        limpaRetangulo()
        //Historia()
        setTimeout(() => {
            let oldGCO = context.globalCompositeOperation;
            changeGCO("source-over");
            context.imageSmoothingEnabled = false;
            if (iD("scaleall").checked) {
                tamanho(newWidth, newHeight)
                var len = animacao.length
                setTimeout(() => { changeFrame(workingframe) }, 400 + (100 * len))
            }
            setTimeout(redimendionarAnima(newWidth, newHeight), 600)

        }, 200)

    } else { removeClass() };
    selectionPaths = [];
    currentPath = [];

}



function updateHeightField() {
    const width = parseInt(canvasWidthInput.value);
    const currentAspectRatio = canvas.width / canvas.height;
    const newHeight = Math.round(width / currentAspectRatio);

    canvasHeightInput.value = newHeight;
    preResizeCanvas(width, newHeight)
}
