function draw(a, b, c, d, e = null, f = null) {
    drawBrush(a, b, c, d, e, f, ctxF)

}


function renderLayer(layer = images) {
    canvasRender.width = art.size.width
    canvasRender.height = art.size.height
    let len = layer.length
    for (i = 0; i < len; i++) {
        let comando = layer[i]
        let newImg = comando[0]
        ctxR.drawImage(
            newImg,
            comando[1],
            comando[2],
            comando[3],
            comando[4]);
    }
}
function redraw(blob) {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    // Or Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at

    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate(-window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    drawCanvasSize()
    ctx.translate(window.innerWidth / 2, window.innerHeight / 2)
    renderLayer()
    ctx.drawImage(canvasRender, 0, 0)
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore()
    // requestAnimationFrame(draw)
}


function drawCanvasSize() {
    var x = 0
    var y = 0;
    var width = art.size.width;
    var height = art.size.height;

    var borderWidth = 2;
    var offset = borderWidth * 2;

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(x - borderWidth, y - borderWidth, width + offset, height + offset);
    ctx.fillStyle = art.background.color;
    if (art.background.transparent) {
        ctx.globalCompositeOperation = 'destination-out'
    }
    ctx.fillRect(x, y, width, height);
    if (art.background.transparent) {
        ctx.globalCompositeOperation = 'destination-over'
    }
}
let image
function canvasFrontToImg() {
    let len = comandos.length
    for (i = 0; i < len; i++) {
        let brushWidth = comandos[i][4] * cameraZoom
        let brushHeight = comandos[i][5] * cameraZoom
        if (comandos[i][0] - brushWidth / 2 < dimensions.x1) { dimensions.x1 = comandos[i][0] - brushWidth / 2 }
        if (comandos[i][2] - brushWidth / 2 < dimensions.x1) { dimensions.x1 = comandos[i][2] - brushWidth / 2 }
        if (comandos[i][0] + brushWidth / 2 > dimensions.x2) { dimensions.x2 = comandos[i][0] + brushWidth / 2 }
        if (comandos[i][2] + brushWidth / 2 > dimensions.x2) { dimensions.x2 = comandos[i][2] + brushWidth / 2 }
        if (comandos[i][1] - brushHeight / 2 < dimensions.y1) { dimensions.y1 = comandos[i][1] - brushHeight / 2 }
        if (comandos[i][3] - brushHeight / 2 < dimensions.y1) { dimensions.y1 = comandos[i][3] - brushHeight / 2 }
        if (comandos[i][1] + brushHeight / 2 > dimensions.y2) { dimensions.y2 = comandos[i][1] + brushHeight / 2 }
        if (comandos[i][3] + brushHeight / 2 > dimensions.y2) { dimensions.y2 = comandos[i][3] + brushHeight / 2 }
    }
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    console.dir(dimensions)
    let imgWidth = Math.floor((dimensions.x2 - dimensions.x1) / cameraZoom)
    let imgHeight = Math.floor((dimensions.y2 - dimensions.y1) / cameraZoom)
    canvasRender.width = imgWidth
    canvasRender.height = imgHeight
    ctxR.save()
    ctxR.translate(-dimensions.x1 / cameraZoom, -dimensions.y1 / cameraZoom)
    comandosExec(ctxR)
    ctxR.restore()
    image = canvasRender.toDataURL('image/png');

    let newImg = new Image()
    blob = dataURItoBlob(image)
    newImg.src = URL.createObjectURL(blob)
    let imagemfinale = [newImg, dimensions.x1, dimensions.y1, imgWidth, imgHeight]
    images.push(imagemfinale)
    setTimeout(() => {
        redraw()
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        ctxR.setTransform(1, 0, 0, 1, 0, 0);
        ctxR.clearRect(0, 0, canvas.width, canvas.height);
    }, 100)


    //need to save image + cameraoffset position!

    //reset dimensions
    dimensions = {
        x1: art.size.width,
        x2: 1,
        y1: art.size.height,
        y2: 1
    }

    comandos = []
}

function drawRect(x, y, width, height) {
    ctx.fillRect(x, y, width, height)
}

function drawText(text, x, y, size, font) {
    ctx.font = `${size}px ${font}`
    ctx.fillText(text, x, y)
}

function dataURItoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
let myImg = document.createElement("img");

async function comandosExec(context = ctx, layer = comandos) {
    let len = layer.length
    if (len != 0) {
        for (i = 0; i < len; i++) {
            let comando = layer[i]
            if (comando[0] == "GCO") {
                context.globalCompositeOperation = comando[1]
            } else if (context == ctxR) {
                redrawBrush(comando[0], comando[1], comando[2], comando[3], comando[4], comando[5], context)
            }
            else if (context == ctx) {
                blob = dataURItoBlob(comando[0])
                let myImg = new Image(comando[3] * cameraZoom, comando[4] * cameraZoom)
                myImg.src = URL.createObjectURL(blob)
                myImg.onload = function () {
                    myImg.classList.add("canvas")
                    //document.body.appendChild(myImg)
                    //     let oldGCO = context.globalCompositeOperation
                    //                    changeGCO(globalComposite)
                    context.drawImage(
                        myImg,
                        (comando[1] + cameraOffset.x) * cameraZoom,
                        (comando[2] + cameraOffset.y) * cameraZoom,
                        comando[3] * cameraZoom,
                        comando[4] * cameraZoom);
                    //comandos.push(comando)
                    //                    changeGCO(oldGCO)
                    //                    autoCrop(imagem.width, imagem.height)
                    //                    autoCrop(0, 0)
                }
            }
            else if (context == ctxF) {
                drawBrush(comando[0], comando[1], comando[2], comando[3], comando[4], comando[5], context)
            }
        }
    }
}

async function drawBrush(x1, y1, x2, y2, w, h, cont = ctx) {
    let start
    let end
    if (art.pixelGood) {
        start = { x: Math.floor(x1), y: Math.floor(y1) }
        end = { x: Math.floor(x2), y: Math.floor(y2) }
    } else {
        start = { x: x1, y: y1 }
        end = { x: x2, y: y2 }
    }
    var halfBrushW = Math.floor(w / 2 * cameraZoom);
    var halfBrushH = Math.floor(h / 2 * cameraZoom);
    var distance = parseInt(Trig.distanceBetween2Points(start, end));
    var angle = Trig.angleBetween2Points(start, end);
    var x, y;
    cont.lineWidth = w;

    for (var z = 0; (z <= distance || z == 0); z++) {
        x = start.x + (Math.sin(angle) * z) - halfBrushW;
        y = start.y + (Math.cos(angle) * z) - halfBrushH;
        if (w == 1 || h == 1) {
            x = redondo(x) + 1
            y = redondo(y) + 1
        }
        cont.drawImage(brush, x, y, Math.floor(w * cameraZoom), Math.floor(h * cameraZoom));
    }
}
async function redrawBrush(x1, y1, x2, y2, w, h, cont = ctxR) {
    let start
    let end
    if (art.pixelGood) {
        start = { x: Math.floor(x1 / cameraZoom), y: Math.floor(y1 / cameraZoom) }
        end = { x: Math.floor(x2) / cameraZoom, y: Math.floor(y2 / cameraZoom) }
    } else {
        start = { x: x1 / cameraZoom, y: y1 / cameraZoom }
        end = { x: x2 / cameraZoom, y: y2 / cameraZoom }
    }
    var halfBrushW = Math.floor(w / 2);
    var halfBrushH = Math.floor(h / 2);
    var distance = parseInt(Trig.distanceBetween2Points(start, end));
    var angle = Trig.angleBetween2Points(start, end);
    var x, y;
    cont.lineWidth = w;

    for (var z = 0; (z <= distance || z == 0); z++) {
        x = start.x + (Math.sin(angle) * z) - halfBrushW;
        y = start.y + (Math.cos(angle) * z) - halfBrushH;
        if (w == 1 || h == 1) {
            x = redondo(x) + 1
            y = redondo(y) + 1
        }
        cont.drawImage(brush, x, y, Math.floor(w), Math.floor(h));
    }
}


var Trig = {
    distanceBetween2Points: function (point1, point2) {

        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    },

    angleBetween2Points: function (point1, point2) {

        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return Math.atan2(dx, dy);
    }
}