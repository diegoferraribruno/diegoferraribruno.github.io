var rotationDeg = 0;

function rotacionar() {
    rotationDeg = (rotationDeg + 90) % 360,
        console.log(rotationDeg)
    // comandoR()
    canvasDiv.style.width = canvas.width + "px";
    // canvasDiv.height = cw;
    canvasDiv.style.height = canvas.height + "px";
    canvasDiv.setAttribute("style", `-webkit-transform: rotate(${rotationDeg}deg);)
- moz - transform: rotate(${rotationDeg}deg);
-o - transform: rotate(${rotationDeg}deg);
-ms - transform: rotate(${rotationDeg}deg);
transform: rotate(${rotationDeg}deg);`)
    setTimeout(
        () => {
            let cw = canvasDiv.width;
            let ch = canvasDiv.height;
            //if (rotationDeg == 90 || rotationDeg == 270) {
            // canvasDiv.width = ch;
            canvasDiv.style.width = canvas.width + "px";
            // canvasDiv.height = cw;
            canvasDiv.style.height = canvas.height + "px";
            cw = canvasDiv.width;
            ch = canvasDiv.height;

        }, 10
    )
    //}
}
function drawRotated(degrees = 90) {
    var swapImg = [];
    var blob = [];
    swapImg = canvas.toDataURL("image/png");
    blob = dataURItoBlob(swapImg);
    //context2.clearRect(0, 0, c2.width, c2.height);
    let myImg = document.createElement("img");
    myImg.src = URL.createObjectURL(blob);
    myImg.onload = function () {
        let cw = canvas.width;
        let ch = canvas.height;
        if (degrees == 90 || degrees == 270) {
            canvas.width = ch;
            //canvasDiv.style.width = ch + "px";
            canvas.height = cw;
            //canvasDiv.style.height = cw + "px";
            cw = canvas.width;
            ch = canvas.height;
            canvasDiv.style.marginTop = ch - cw
        } else {
            canvas.width = cw;
            canvas.height = ch;
            canvasDiv.style.marginTop = 0
        }

        context.save();
        // translate and rotate
        switch (degrees) {
            case 90:
                context.translate(cw, Math.floor(ch / cw));
                context.rotate(Math.PI / 2);
                break;
            case 180:
                context.rotate(Math.PI);
                context.translate(-cw, -ch);
                break;
            case 270:
                context.translate(-Math.floor(ch / cw), cw);

                context.rotate(Math.PI * 3 / 2);
                break;
        }
        // draw the previows image, now rotated
        context.drawImage(myImg, 0, 0);
        context.restore();
        canvasDiv.style.width = canvas.width + "px";
        canvasDiv.style.height = canvas.height + "px";
    };
}

function rotacionaCanva(rotationDeg = 0) {
    if (rotationDeg != 0) {

        drawRotated(rotationDeg)

        rotationDeg = 0;
        canvasDiv.setAttribute("style", `-webkit-transform: rotate(${rotationDeg}deg);)
- moz - transform: rotate(${rotationDeg}deg);
-o - transform: rotate(${rotationDeg}deg);
-ms - transform: rotate(${rotationDeg}deg);
transform: rotate(${rotationDeg}deg);`)

    }

}
function comandoR() {
    if (rotationDeg != 0) {
        let comando = ["r", rotationDeg];
        comandos[workingframe].push(comando)
        rotationDeg = 0
    }
    comandosExec()
}