let keyZ = false
let keyY = false
let keyCtrl = false
var shiftHeld = false;

var canvasFront = document.createElement("canvas")
canvasFront.id = "canvasFront"
canvasFront.width = canvas.width
canvasFront.height = canvas.height
canvasFront.ctx = canvasFront.getContext('2d', [{ willReadFrequently: false }])
canvasFront.ctx.drawImage(canvas, 0, 0)
canvasFront.style.position = "absolute"
canvasFront.style.marginTop = "0px"
canvasFront.style.marginLeft = -canvas.width + "px"
canvasFront.classList.add("cursor") // importante!
canvasFront.ctx.imageSmoothingEnabled = false
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
iD("canvas_div").appendChild(canvasBack)

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
}
let movendo = false
let tempStrokeSize
var tempImg = document.createElement("img");
var rotacionar = false

function handleStart(evt) {
    removeClass();
    // cursor.style.opacity = 0.4
    changedBrush = false;

    evt.preventDefault();
    origin.x = (evt.pageX - offsetX) / zoomFactor
    origin.y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        origin.x = redondo(origin.x)
        origin.y = redondo(origin.y)
    }
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    if (mode === "recortar") {
        canvasFront.classList.remove("esconde")
        /*  swapImg = canvas.toDataURL("image/png");
          blob = dataURItoBlob(swapImg);
          tempImg = document.createElement("img");
          tempImg.src = URL.createObjectURL(blob);*/
        isSelecting = true;
    }
    if (mode == "emoji") {
        isEmoji = true
        isDrawing = false
    }
    if (mode == "move") {
        movendo = true
    }
    if (mode == "rotacionar") {
        rotacionar = true
    }
    if (mode == "zoomx") {
        isGrabing = true;
    }
    if (mode == "pintar" || mode == "apagar" || mode == "cores") {
        canvasFront.classList.add("esconde")
        isDrawing = true
        mouseOver = true;

        offsetX = canvas.getBoundingClientRect().left;
        offsetY = canvas.getBoundingClientRect().top;
        x = (evt.pageX - offsetX) / zoomFactor
        y = (evt.pageY - offsetY) / zoomFactor
        if (pixelGood) {
            x = redondo(x)
            y = redondo(y)
        }
        desenha(
            "brush",
            context.globalCompositeOperation,
            x,
            y,
            origin.x,
            origin.y,
            strokeWidth
        );


    }
    if (mode == "picker") {
        canvasFront.classList.add("esconde")
        isPicking = true
    }
    if (mode == "play") {
        stop();
    }
    console.log(origin.x, origin.y)
}
let cursinho = new Image
const movecursor = new Image(); // Create new img element
movecursor.src = "img/movearrow.png";

function handleMove(evt) {
    document.body.style.cursor = "default";
    // cursorMove(evt)
    evt.preventDefault();
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    x = (evt.pageX - offsetX) / zoomFactor
    y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        x = redondo(x)
        y = redondo(y)
    }

    if (isSelecting === true) {
        cropEnd.x = x
        cropEnd.y = y
        desenhaRetangulo();
        canvasFront.ctx.font = 24 + 'px serif';
        canvasFront.ctx.fillText("✂️", x, y)
    } else if (mode == "recortar") {
        canvasFront.classList.remove("esconde")
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (cropEnd.x == 0) {

            desenhaRetangulo(autoCropMin.x, autoCropMin.y, autoCropMax.x, autoCropMax.y, "#22ff00")
        } else {

            desenhaRetangulo();
        }
        canvasFront.ctx.fillText("✂️", x, y)
    }
    if (isDrawing === true && isPicking == false && mode != 'move') {
        mouseOver = true;
        desenha(
            "brush",
            context.globalCompositeOperation,
            x,
            y,
            origin.x,
            origin.y,
            strokeWidth
        );

    }
    if (isPicking) {
        var imageData = context.getImageData(x, y, 1, 1).data;
        if (imageData[3] > 0) {
            RGBAToHSLA(
                imageData[0],
                imageData[1],
                imageData[2],
                imageData[3]
            );
            setStrokeColor();
            changeBrush()
            console.log(imageData)
        }
        /*    cursor.style.left = evt.pageX + "px";
            cursor.style.top = evt.pageY + "px";
            cursor.style.opacity = 0.9*/

    }
    if (isGrabing) {
        scrollCanva((origin.x - x) * zoomFactor, (origin.y - y) * zoomFactor);
    }
    if (!isGrabing && mode != "recortar" && !isPicking && mode != "FX" && mode != "zoomx" && mode != "play" && mode != "move" && mode != "rotacionar") {
        origin.x = x
        origin.y = y

        /*   cursor.style.left = evt.pageX + "px";
           cursor.style.top = evt.pageY + "px";
           cursor.style.opacity = 0.6*/
        if (isDrawing == false && (pixelGood == true || context.globalCompositeOperation == "destination-out") && mode != "emoji") {

            if (cursorShow == true && !isDrawing) {
                canvasFront.classList.remove("esconde")
                canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
                canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvasFront.ctx.drawImage(brushCanva, x - (strokeWidth / 2), y - (strokeWidth / 2));

            }
        }


    }
    if (mode == "zoomx") {// canvasFront
        canvasFront.classList.remove("esconde")
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasFront.ctx.font = 18 + 'px serif';
        canvasFront.ctx.textAlign = "center";
        canvasFront.ctx.textBaseline = "middle";
        canvasFront.ctx.globalAlpha = 0.5;
        canvasFront.ctx.fillText("🔎", x, y)

    }
    if (mode == "play") {
        canvasFront.classList.remove("esconde")
    }
    if (mode == "emoji") {
        canvasFront.classList.remove("esconde")
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasFront.ctx.font = iD("emosize").value + 'px serif'
        canvasFront.ctx.textAlign = "center";
        canvasFront.ctx.textBaseline = "middle";
        canvasFront.ctx.fillText(emoji, x, y)
    }
    if (mode == "move") {
        canvasFront.classList.remove("esconde")
        canvasFront.ctx.globalAlpha = 1;
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasFront.ctx.drawImage(movecursor, x - 16, y - 16)

        if (movendo == true) {
            canvasFront.globalCompositeOperation = "source-out"
            canvasFront.ctx.drawImage(canvas, x - origin.x, y - origin.y)
        }
    }
    if (mode == "rotacionar") {
        canvasFront.classList.remove("esconde")
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (rotacionar == true) {
            canvasFront.ctx.globalAlpha = 1;
            canvasFront.ctx.save()
            canvasFront.globalCompositeOperation = "source-out"
            canvasFront.ctx.translate(canvas.width / 2, canvas.height / 2)
            canvasFront.ctx.rotate(((y - origin.y + x - origin.x) * Math.PI) / 180);
            canvasFront.ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2)
            canvasFront.ctx.restore()
            //canvasFront.ctx.translate(320, 320)

            //canvasFront.ctx.restore()
        }
    }
}
function handleUp(evt) {
    // cursor.style.opacity = 0
    if (movendo == true) {
        desenha("move", x - origin.x, y - origin.y)
        movendo = false
    }
    if (rotacionar == true) {
        rotacionar = false
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenha("rotacionar", ((y - origin.y + x - origin.x) * Math.PI) / 180)
    }
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    let over = checkOverCanvas(evt.pageX, evt.pageY)
    x = (evt.pageX - offsetX) / zoomFactor
    y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        x = redondo(x)
        y = redondo(y)
    }
    if (isSelecting === true) {
        cropEnd.x = x
        cropEnd.y = y
        desenhaRetangulo();
    }
    if (mode == "recortar") {
        desenhaRetangulo();
    }

    if (mode === "emoji" && isEmoji) {
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
    }
    if (mode === "recortar") {
        mostraMenu("recortar")
        isSelecting = false
        desenhaRetangulo()
    }

    if (isPicking) {

        var imageData = context.getImageData(x, y, 1, 1).data;
        if (imageData[3] > 1) {
            RGBAToHSLA(
                imageData[0],
                imageData[1],
                imageData[2],
                imageData[3]
            );
            setStrokeColor();
            changeBrush()
        }
        setTimeout(() => modeTo("pintar"), 60)
        isPicking = false
    }
    if (isDrawing) {
        ultimoToque.x = x
        ultimoToque.y = y
        isDrawing = false;
    }
    if (isGrabing) {
        origin.x = x
        origin.y = y
        isGrabing = false;

    }


}

function handleEnd(evt) {
    if (mode == recortar) {
        desenhaRetangulo()
    }
    mostra()

    if (mode != "play") {

        mouseOver = false;
        setTimeout(() => {
            if (mouseOver == false) {
                isDrawing = false;
                isGrabing = false;
                isPicking = false;
                isSelecting = false;
            }
        }, 500);
    } else {
        canvasFront.classList.remove("esconde")
    }
    document.body.style.cursor = "pointer";
}

function handleCancel(evt) {
    evt.preventDefault();
    document.body.style.cursor = "pointer";
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

