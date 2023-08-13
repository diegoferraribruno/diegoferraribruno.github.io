let keyZ = false
let keyY = false
let keyCtrl = false
let keyAlt = false
let spaceKey = false
var shiftHeld = false;
var canvasRender = document.createElement("canvas")
canvasRender.id = "canvasRender"
canvasRender.height = 320
canvasRender.width = 320
canvasRender.style.backgroundColor = "#ff000088"
ctxR = canvasRender.getContext('2d')
ctxR.imageSmoothingEnabled = false
var consoleDiv = false
//iD("canvas_window").appendChild(canvasRender)


var canvasFront = document.createElement("canvas")
canvasFront.id = "canvasFront"
canvasFront.width = canvas.width
canvasFront.height = canvas.height
ctxF = canvasFront.getContext('2d', [{ willReadFrequently: false }])
ctxF.drawImage(canvas, 0, 0)
canvasFront.style.position = "absolute"
canvasFront.style.marginTop = "0px"
canvasFront.style.marginLeft = -canvas.width + "px"
canvasFront.classList.add("cursor") // importante!
ctxF.imageSmoothingEnabled = false
iD("canvas_div").appendChild(canvasFront)
let cursorShow = true
var canvasBack = document.createElement("canvas")
canvasBack.id = "canvasBack"
canvasBack.width = canvas.width
canvasBack.height = canvas.height
canvasBack.ctx = canvasBack.getContext('2d', [{ willReadFrequently: false }])
canvasBack.ctx.drawImage(canvas, 0, 0)
canvasBack.style.position = "absolute"
canvasBack.style.marginTop = "0px"
canvasBack.style.marginLeft = -canvas.width + "px"
canvasBack.classList.add("cursor") // importante!
canvasBack.ctx.imageSmoothingEnabled = false
let movendo = false
let tempStrokeSize
var tempImg = document.createElement("img");
var rotacionar = false
iD("canvas_div").appendChild(canvasBack)
let lastPressure = 0.1
let dinamicInk = false
let lastInk = 1
let rainbowInk = false
let redimensionar = false

function handleKeyUp(evt) {

    if (evt.keyCode === 16) {
        shiftHeld = false
        redoTEnd()
    }
    if (evt.keyCode === 17) {
        keyCtrl = false
        redoTEnd()
        undoTEnd()

    }
    if (evt.key === "y") {
        redoTEnd()
        keyY = false
    }
    if (evt.keyCode === 90) {
        keyZ = false
        undoTEnd()

    }
    if (evt.code === "Space" && keyCtrl == false) {
        spaceKey = false
        isGrabing = false
        document.body.style.cursor = "pointer";
    }
    if (evt.code === "Space" && keyCtrl == true) {
        if (mode == "play") {
            stop();
        } else {
            play();
        }
    }

    if (evt.code === "AltRight" || evt.code === "AltLeft") {
        keyAlt = false
    }

}
function handleKeys(evt) {
    if (evt.keyCode === 90) {
        keyZ = true
    }
    if (evt.keyCode === 16) {
        shiftHeld = true
    }
    if (evt.keyCode === 17) {
        keyCtrl = true
    }
    if (evt.key === "y") {
        keyY = true
    }
    if (keyCtrl) {
        if (keyZ) {
            if (shiftHeld) {
                redoT();
            } else { undoT() }

        } else if (keyY) {
            redoT()
        }

    }
    if (evt.code === "Space" && keyCtrl == false) {
        evt.preventDefault()
        spaceKey = true
        isGrabing = true
        document.body.style.cursor = "move"
    }
    if (evt.code === "AltRight" || evt.code === "AltLeft") {
        keyAlt = true
    }
}

var isRecSelection = false
function handleStart(evt) {
    ctxF.globalAlpha = 1;
    let color = strokeColor
    if (context.globalCompositeOperation == "destination-out") { }
    evt.preventDefault();
    removeClass();
    iD("console").innerHTML = "width: " + evt.width + " height : " + evt.height + " pressure: " + evt.pressure

    changedBrush = false;
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    origin.x = (evt.pageX - offsetX) / zoomFactor
    origin.y = (evt.pageY - offsetY) / zoomFactor
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    if (pixelGood) {
        origin.x = redondo(origin.x)
        origin.y = redondo(origin.y)
    }
    if (mode === "selecionar") {
        canvasFront.classList.remove("esconde")
        isSelecting2 = true;
        cropStart.x = origin.x
        cropStart.y = origin.y
        const { offsetX, offsetY } = evt;
        if (!shiftHeld) {
            selectionPaths = [];
            currentPath = [];
        }
        isSelecting2 = true;
        currentPath.push([offsetX, offsetY]);

    } else if (mode === "recortar") {
        canvasFront.classList.remove("esconde")
        isSelecting = true;
        cropStart.x = origin.x
        cropStart.y = origin.y
    } else if (mode == "emoji") {
        isEmoji = true
        isDrawing = false
    } else if (mode == "move") {
        movendo = true
    } else if (mode == "rotacionar") {
        rotacionar = true
    } else if (mode == "redimensionar") {
        redimensionar = true
    } else if (mode == "zoomx") {
        isGrabing = true;
    } else if (mode == "picker") {
        canvasFront.classList.add("esconde")
        isPicking = true
    } else if (mode == "play") {
        stop();
    }
    else if ((mode == "pintar" || mode == "apagar" || mode == "cores") && !isGrabing) {
        if (dinamicInk == true) {
            mudaCorD(3, iD("A").value)
            lastInk = hsla[3]

        }
        if (rainbowInk) {
            value = hsla[0] + 3
            if (value > 360) { value = 0 }
            mudaCorD(0, value)
        }

        canvasFront.classList.remove("esconde")
        isDrawing = true
        mouseOver = true;
        if (context.globalCompositeOperation == "destination-out") {
            color = "#ff0000"
        }
        offsetX = canvas.getBoundingClientRect().left;
        offsetY = canvas.getBoundingClientRect().top;
        x = (evt.pageX - offsetX) / zoomFactor
        y = (evt.pageY - offsetY) / zoomFactor

        if (pixelGood) {
            x = redondo(x)
            y = redondo(y)
        }
        if ((evt.pointerType == "touch" || evt.pressure == 0.5) && dinamicBrush === true) {
           // strange if bellow wtf?!
           if (lastPressure < 1) { lastPressure = 1 }
           if (lastPressure > strokemax) { lastPressure = strokemax }  
          
            createNewBrush(lastbrush, lastPressure, color).then(

                desenha(
                    "brush",
                    context.globalCompositeOperation,
                    x,
                    y,
                    origin.x,
                    origin.y,
                    lastPressure
                )
            )


        } else {

            if (dinamicBrush === true && evt.pressure != 0.5) {
                lastPressure = evt.pressure + 1
                iD("console2").innerHTML = "pen pressure "+evt.pressure
                if (lastPressure < 1) { lastPressure = 1 }
                if (lastPressure > strokemax) { lastPressure = strokemax }  
               
                createNewBrush(lastbrush, lastPressure, color).then(

                    desenha(
                        "brush",
                        context.globalCompositeOperation,
                        x,
                        y,
                        origin.x,
                        origin.y,
                        lastPressure
                    )
                )
            }
            else {
                desenha(
                    "brush",
                    context.globalCompositeOperation,
                    x,
                    y,
                    origin.x,
                    origin.y,
                    strokeScale
                )
            }

        }

    }

}
let cursinho = new Image
const movecursor = new Image(); // Create new img element
movecursor.src = "img/movearrow.png";
const cropcursor = new Image();
cropcursor.src = "img/crop.png";


let colorincrease = 3
let hueinvert = false
let satincrease = 5
let lightnessincrease = 5
let alphaincrease = 0.001


function positivo(value) {
    if (value < 0) {
        return value * -1
    } else {
        return value
    }
}
function handleMove(evt) {

    let color = strokeColor
    if (context.globalCompositeOperation == "destination-out") {
        color = `hsla(45,50%,80%,${hsla[3]})`
    }
    evt.preventDefault();
    document.body.style.cursor = "default";
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    x = (evt.pageX - offsetX) / zoomFactor
    y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        x = redondo(x)
        y = redondo(y)
    }
    if (isSelecting2) {
        canvasFront.classList.remove("esconde")
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);

        drawSelection();
        if (iD("retangularselection").checked == true) {
            cropEnd.x = x
            cropEnd.y = y
            desenhaRetangulo();
        } else {

            const { offsetX, offsetY } = evt;
            currentPath.push([offsetX, offsetY]);

        }
    }
    if (mode == "recortar") {
        canvasFront.classList.remove("esconde")
        if (isSelecting === true) {
            cropEnd.x = x
            cropEnd.y = y
            desenhaRetangulo();
            // ctxF.font = 24 + 'px serif';
            ctxF.drawImage(cropcursor, x, y)
        } else {
            ctxF.setTransform(1, 0, 0, 1, 0, 0);
            ctxF.clearRect(0, 0, canvas.width, canvas.height);
            if (cropEnd.x == 0) {

                desenhaRetangulo(autoCropMin.x, autoCropMin.y, autoCropMax.x, autoCropMax.y, "#22b00033")
            } else {

                desenhaRetangulo();
            }
            ctxF.drawImage(cropcursor, x, y)
        }
    } else if ((isDrawing === true && isPicking == false && mode != 'move') && !isGrabing) {
        mouseOver = true;
        let dif = {
            x: origin.x - x,
            y: origin.y - y
        }
        let vari = 0.5
        if (origin.x == 0 && origin.y == 0) {
            origin.x = x
            origin.y = y
        }
        if (dif.x > vari || dif.y > vari || dif.x < -vari || dif.y < -vari) {
            if (dinamicInk == true) {
                lastInk -= 0.002
                mudaCorD(3, lastInk)
                // strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${lastInk})`;

            }
            if (lastInk > 0.1) {
                if (keyCtrl) {
                    ctxF.setTransform(1, 0, 0, 1, 0, 0);
                    ctxF.clearRect(0, 0, canvas.width, canvas.height);
                }
                if (rainbowInk) {
                    let value = hsla[0] + 3
                    if (value > 360) { value = 0 }
                    mudaCorD(0, value)
                }
                if (rainbowAB) {
                    let value = hsla[0] + colorincrease
                    if (value > 360) { value -=  360 }
                    else if (value < 0 ) { value = 360 - value }
                    if (hueinvert){
                        if(colorAbigger && value > rainbowABcolors[1].hue && value < rainbowABcolors[0].hue)
                            {
                            colorincrease = -1 * colorincrease
                            value = hsla[0] - colorincrease
                        }else if(colorAbigger == false &&
                            value > +rainbowABcolors[0].hue && value < +rainbowABcolors[1].hue) 
                             {
                            colorincrease = -1 * colorincrease
                            value = hsla[0] + colorincrease
                            }
                    }else{
                        if(colorAbigger && (value > +rainbowABcolors[0].hue || value < rainbowABcolors[1].hue))
                        {
                                colorincrease = -1 * colorincrease
                                value = hsla[0] + colorincrease 
                        }
                        else if(colorAbigger == false &&(value < +rainbowABcolors[0].hue || value > +rainbowABcolors[1].hue)){
                            colorincrease = -1 * colorincrease
                            value = hsla[0] + colorincrease
                            }
                    }
               

                    mudaCorD(0, value)

                    value = hsla[1] + satincrease
                    if (satAbigger){
                        if(value > +rainbowABcolors[0].saturation || value  < +rainbowABcolors[1].hue){
                            satincrease = -1 * satincrease
                            value = hsla[1] + satincrease
                        }
                    }else{
                        if(value < +rainbowABcolors[0].saturation || value  > +rainbowABcolors[1].hue){
                            satincrease = -1 * satincrease
                            value = hsla[1] + satincrease
                        }
                    }
                    mudaCorD(1, value)
                    if(+rainbowABcolors[0].lightness != +rainbowABcolors[1].lightness){
            
                    value = hsla[2] + lightnessincrease
                    if (lightAbigger){
                        if(value > +rainbowABcolors[0].lightness || value  < +rainbowABcolors[1].lightness){
                            lightnessincrease = -1 * lightnessincrease
                    value = hsla[2] + lightnessincrease

                            
                        }
                    }else{
                        if(value< +rainbowABcolors[0].lightness || value  > +rainbowABcolors[1].lightness){
                            lightnessincrease = -1 * lightnessincrease
                    value = hsla[2] + lightnessincrease

                        }
                    }
                    mudaCorD(2, value)
                }

                if ( +rainbowABcolors[0].alpha !=  +rainbowABcolors[1].alpha){
                        value = hsla[3] + alphaincrease

                        if (alphaAbigger){
                            if(value > +rainbowABcolors[0].alpha || value < + rainbowABcolors[1].alpha){
                                alphaincrease = -1 * alphaincrease
                                value = hsla[3] + alphaincrease

                            }
                        }else{
                            if(value < +rainbowABcolors[0].alpha || value > +rainbowABcolors[1].alpha){
                                alphaincrease = -1 * alphaincrease
                                value = hsla[3] + alphaincrease
                            }
                        }
                        mudaCorD(3, value)
                    }
                }
                if ((evt.pointerType == "touch" || (evt.pointerType == "mouse" && evt.pressure == 0.5)) && dinamicBrush === true && !keyCtrl) {
                    let pressure = ((positivo(origin.x - x) + positivo(origin.y - y)) / 2);
                    if (pressure > lastPressure) {
                        lastPressure += 0.05
                    }
                    else {
                        lastPressure -= 0.05
                    }

                    if (lastPressure < 1) { lastPressure = 1 }
                    if (lastPressure > strokemax) { lastPressure = strokemax }

                    iD("console2").innerHTML = " pressure/speed: " + lastPressure
                    createNewBrush(lastbrush, lastPressure, color).then(

                        desenha(
                            "brush",
                            context.globalCompositeOperation,
                            x,
                            y,
                            origin.x,
                            origin.y,
                            lastPressure
                        )
                    )
                } else {
                    if (dinamicBrush === true && evt.pressure != 0.5 && !keyCtrl) {
                        let pressure = (evt.pressure*3+1) * strokeScale
                        lastPressure = pressure
                        if (lastPressure < 1) { lastPressure = 1 }
                        if (lastPressure > strokemax) { lastPressure = strokemax }  
                        iD("console").innerHTML = "PEN width: " + evt.width + " height : " + evt.height + " pressure: " + pressure + " Lastpressure: " + lastPressure;
                        createNewBrush(lastbrush, lastPressure, color).then(
                            desenha(
                                "brush",
                                context.globalCompositeOperation,
                                x,
                                y,
                                origin.x,
                                origin.y,
                                lastPressure
                            )
                        )
                    } else {
                        desenha(
                            "brush",
                            context.globalCompositeOperation,
                            x,
                            y,
                            origin.x,
                            origin.y,
                            1
                        )
                    }
                }
            }
        }
    } else if (isPicking) {
        var imageData = context.getImageData(x, y, 1, 1).data;
        if (imageData[3] > 0) {
            mudaCor(RGBAToHSLA(
                imageData[0],
                imageData[1],
                imageData[2],
                imageData[3] / 255
            ), true);

        }

    } else if (mode == "zoomx") {// canvasFront
        canvasFront.classList.remove("esconde")
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        ctxF.font = 18 + 'px serif';
        ctxF.textAlign = "center";
        ctxF.textBaseline = "middle";
        ctxF.globalAlpha = 0.5;
        ctxF.fillText("🔎", x, y)

    } else if (mode == "play") {
        canvasFront.classList.remove("esconde")
    } else if (mode == "emoji") {
        canvasFront.classList.remove("esconde")
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        ctxF.font = iD("emosize").value + 'px serif'
        ctxF.textAlign = "center";
        ctxF.textBaseline = "middle";
        ctxF.fillText(emoji, x, y)
    } else if (mode == "move") {
        if (selecionado) {
            copySelection('cut')
            mode = "paste"
        } else if (movendo == true) {
            canvasFront.classList.remove("esconde")
            ctxF.globalAlpha = 1;
            ctxF.setTransform(1, 0, 0, 1, 0, 0);
            ctxF.clearRect(0, 0, canvas.width, canvas.height);
            canvasFront.globalCompositeOperation = "source-out"
            ctxF.drawImage(canvas, x - origin.x, y - origin.y)

        }

    } else if (mode == "rotacionar") {
        canvasFront.classList.remove("esconde")
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        if (rotacionar == true) {
            ctxF.globalAlpha = 1;
            ctxF.save()
            canvasFront.globalCompositeOperation = "source-out"
            if (iD("rotatecenter").checked == true) {
                origin.x = canvas.width / 2;
                origin.y = canvas.height / 2
            }
            ctxF.translate(origin.x, origin.y)
            ctxF.rotate(((y - origin.y + x - origin.x) * Math.PI) / 180);
            ctxF.drawImage(canvas, -origin.x, -origin.y)
            ctxF.restore()
        }
    }
    else if (mode == "redimensionar") {
        canvasFront.classList.remove("esconde")
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        if (redimensionar == true) {
            if (!keyCtrl && iD("cadeado").checked == false) {
                preResizeCanvas(redondo(canvas.width - (x - origin.x)), redondo(canvas.height - (y - origin.y)))
            } else {
                let proporcional = (x - origin.x + y - origin.y) / 200 + 1
                preResizeCanvas(redondo(canvas.width * proporcional), redondo(canvas.height * proporcional))
            }
        }
    }
    if (!isGrabing && mode != "recortar" && !isPicking && mode != "FX" && mode != "zoomx" && mode != "play" && mode != "move" && mode != "rotacionar" && mode != "selecionar" && !keyCtrl && mode != "redimensionar") {
        origin.x = x
        origin.y = y
        if (isDrawing == false && (pixelGood == true || context.globalCompositeOperation == "destination-out") && mode != "emoji") {

            if (cursorShow == true && !isDrawing) {
                canvasFront.classList.remove("esconde")
                ctxF.setTransform(1, 0, 0, 1, 0, 0);
                ctxF.clearRect(0, 0, canvas.width, canvas.height);
                if (dinamicBrush) {
                    ctxF.drawImage(brushCanva, x - (strokeWidth * lastPressure / 2), y - (strokeHeight * lastPressure / 2));

                } else {
                    let halfstrokew = 0
                    let halfstrokeh = 0
                    if (strokeWidth * strokeScale > 1) { halfstrokew = strokeWidth * strokeScale / 2 }
                    if (strokeHeight * strokeScale > 1) { halfstrokeh = strokeHeight * strokeScale / 2 }

                    ctxF.drawImage(brushCanva, redondo(x - halfstrokew), redondo(y - halfstrokeh));

                }

            }
        }
    }
    if (isGrabing) {
        document.body.style.cursor = "move";
        scrollWindow.x += origin.x - x
        scrollWindow.y += origin.y - y
        if (scrollWindow.x != 0 || scrollWindow.y != 0) {
            scrollMoveCanva(scrollWindow.x, scrollWindow.y)
        }
        origin.x = x
        origin.y = y
    }
    if (mode == "paste") {

        canvasFront.classList.remove("esconde")
        ctxF.globalAlpha = 0.8;
        //transformClip()
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        ctxF.drawImage(canvasRender, redondo(x - canvasRender.width / 2), redondo(y - canvasRender.height / 2))
    }


}

function handleUp(evt) {
    ctxF.globalAlpha = 1;
    let color = strokeColor
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    let over = checkOverCanvas(evt.pageX, evt.pageY)
    x = (evt.pageX - offsetX) / zoomFactor
    y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        x = redondo(x)
        y = redondo(y)
    }
    if (redimensionar == true) {
        if (!keyCtrl && iD("cadeado").checked == false) {
            resizeCanvas(redondo(canvas.width - (x - origin.x)), redondo(canvas.height - (y - origin.y)))
        } else {
            let proporcional = (x - origin.x + y - origin.y) / 200 + 1
            resizeCanvas(redondo(canvas.width * proporcional), redondo(canvas.height * proporcional))

        }

        redimensionar = false
        modeTo("move")


    }
    if (isDrawing && !isGrabing) {
        if (keyCtrl) {

            origin.x = x
            origin.y = y

        }
        isDrawing = false;
        // swapImg = canvasFront.toDataURL('image/png');
        /* if (isGlowing === true && context.globalCompositeOperation != "destination-out"){
          context.globalCompositeOperation = 'lighter'
         }*/
        drawTo(context.globalCompositeOperation, canvasFront, context, 0, 0, canvas.width, canvas.height)
        ultimoToque.x = x
        ultimoToque.y = y
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => { Historia() }, 30)

    } else if (mode === "emoji" && isEmoji) {
        let size = iD("emosize").value
        desenha(
            "e",
            context.globalCompositeOperation,
            x,
            y,
            emoji,
            size
        );
        ultimoToque.x = x
        ultimoToque.y = y
        isEmoji = false
        setTimeout(() => { Historia() }, 50)
    } else if (isSelecting) {
        mostraMenu("recortar")
        isSelecting = false
        cropEnd.x = x
        cropEnd.y = y
        desenhaRetangulo()
    } else if (isPicking) {

        var imageData = context.getImageData(x, y, 1, 1).data;
        if (imageData[3] > 1) {
            mudaCor(RGBAToHSLA(
                imageData[0],
                imageData[1],
                imageData[2],
                imageData[3] / 255
            ), true);

        }
        setTimeout(() => { modeTo("pintar"), mostraMenu("cores") }, 60)
        isPicking = false
    } else if (isGrabing) {
        isGrabing = false;
        scrollWindow.x = 0
        scrollWindow.y = 0
        ultimoToque.x = x
        ultimoToque.y = y
    } else if (isSelecting2) {
        isSelecting2 = false;
        selectionPaths.push(currentPath);
        currentPath = [];
        mostraMenu("selecionar")
        cropEnd.x = x
        cropEnd.y = y

    } else if (movendo == true) {
        if (selecionado) {
            setTimeout(() => {
                context.drawImage(canvasFront, 0, 0)
                movendo = false
                resetSelection()
                modeTo("move")
            }, 200)

        } else {

            ctxF.setTransform(1, 0, 0, 1, 0, 0);
            ctxF.clearRect(0, 0, canvas.width, canvas.height);
            ctxF.drawImage(canvas, x - origin.x, y - origin.y)
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        context.drawImage(canvasFront, 0, 0)
        Historia()
        movendo = false

    } else if (mode == "paste") {

        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(canvasRender, redondo(x - canvasRender.width / 2), redondo(y - canvasRender.height / 2))

        swapImg = canvas.toDataURL('image/png');
        swapImg.onload =

            Historia(swapImg)

        // comando = ["s", "source-over", swapImg, 0, 0, canvas.width, canvas.height];
        // comandos[workingframe].push(comando)
        // comandosParaComandosb()
        //saveFrame()
        //desenha("move", x - origin.x, y - origin.y)
        movendo = false
        // modeTo("move")
    } else if (rotacionar == true) {
        rotacionar = false
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(canvasFront, 0, 0)
        swapImg = canvas.toDataURL('image/png');
        swapImg.onload =

            Historia(swapImg)
        // comandosParaComandosb()
        setTimeout(() => {

            ctxF.setTransform(1, 0, 0, 1, 0, 0);
            ctxF.clearRect(0, 0, canvas.width, canvas.height);
            if (iD("rotatecenter").checked == true) {
                origin.x = canvas.width / 2;
                origin.y = canvas.height / 2
            }
        }, 300)
        // desenha("rotacionar", ((y - origin.y + x - origin.x) * Math.PI) / 180, origin.x, origin.y)
    }
    if (rainbowAB){
        hsla[0]= rainbowABcolors[0].hue
        hsla[1]= rainbowABcolors[0].saturation
        hsla[2] = rainbowABcolors[0].lightness
        hsla[3]= rainbowABcolors[0].alpha;

        strokeColor = `hsla(${rainbowABcolors[0].hue},${rainbowABcolors[0].saturation}%,${rainbowABcolors[0].lightness}%,${rainbowABcolors[0].alpha})`;
        estrokeColor = `hsla(${rainbowABcolors[1].hue},${rainbowABcolors[1].saturation}%,${rainbowABcolors[1].lightness}%,${rainbowABcolors[1].alpha})`;

    }

    origin.x = 0
    origin.y = 0

}
function handleEnd(evt) {

    if (isDrawing) {
        drawTo()
        Historia()
        if (dinamicInk) {
            mudaCorQ(3, iD("A").value)
        }
    } else if (isGrabing) {
        scrollCanva(
            (evt.pageX - offsetX) - window.innerWidth / 4,
            (evt.pageY - offsetY) - window.innerHeight / 4
        )
        isGrabing = false;
    }
    if (mode == "recortar") {
        desenhaRetangulo()
        isSelecting2 = false;
    }
    if (isSelecting2) {
        drawSelection()
        //mode = "paste"
        isSelecting2 = false;
    }


    if (mode != "play" && mode != "selecionar" && mode != "recortar" && mode != "FX" && mode != "rotacionar" && mode != "redimensionar") {
        //   mostra()
        mouseOver = false;
        //
        if (mouseOver == false || lastPressure == 0.5) {
            isDrawing = false;
            isGrabing = false;
            isPicking = false;
            isSelecting = false;
        }
        //   }, 500);
    } else {
        canvasFront.classList.remove("esconde")
    }
    document.body.style.cursor = "pointer";
    if (mode != "FX" && mode != "rotacionar" && mode != "recortar" && mode != "selecionar" && mode != "redimensionar") {

        scrollWindow.x = 0
        scrollWindow.y = 0
        origin.x = 0
        origin.y = 0

        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
    }

}

function handleCancel(evt) {
    evt.preventDefault();

    if (mode != "FX" && mode != "recortar" && mode != "redimensionar" && mode != "selecionar") {
        document.body.style.cursor = "pointer";
        if (isDrawing) {
            drawTo()
            Historia()
        }
    }
}

function prevent(evt) {
    evt.preventDefault();
}

function checkOverCanvas(x, y, offset = 0) {
    if (x > canvas.offsetLeft + offset && x < canvas.offsetWidth + canvas.offsetLeft - offset && y > canvas.offsetTop + offset && y < canvas.offsetHeight + canvas.offsetTop - offset) {
        return true;
    } else {
        document.body.style.cursor = "pointer";
        return false;
    }
}

function toggleConsole(){
    consoleDiv = !consoleDiv
    if (consoleDiv == true){

        iD("console").classList.remove("esconde")
        iD("console2").classList.remove("esconde")
    }else{
        iD("console").classList.add("esconde")
        iD("console2").classList.add("esconde")
    }

}
