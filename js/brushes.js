// Pinceis Cor e Tamanho

const brushCanva = iD("brushCanva")
const brushCtx = brushCanva.getContext("2d");

var favoritas = [];
var hsla = [0, 0, 0, 1];
var rgba = [0, 0, 0, 1];
var hexa = "#000000ff"
var isGlowing = false
var strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var estrokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var colormode = "hsla"

var strokeScale = 1;
var strokeWidth = 6;
var strokeHeight = 6;
var estrokeWidth = 36;
let strokemax = 3

var custombrushcolor = false
var newBrushes = {}
var lastbrush = 1
let brushesImg = {}
var basicBrushes = []
let novoBrushes = {}
var customBrushes = []
var selectedBasicBrush = 0
var newBrush = document.createElement("img")
var brush = new Image();
var stroke_range = [1, 2]
brush.src = 'img/brush1.png';
brush.onload = function () {
    changeBrush()
}
newBrush.src = brush.src
var dinamicBrush = false

function customBrushColor() {
    custombrushcolor = !custombrushcolor
}

function toggleDinamicBrush() {
    dinamicBrush = !dinamicBrush
    if (dinamicBrush == true) {
        iD("dinamicbrush").innerHTML = '<span class="icon dinamicbrushicon"><span class="icon2 minicheck"></span></span>'
        Alert('<span title="dinamicbrush" class="dinamicbrush"> </span> ' + alerts[language][25] + "<br>" + alerts[language][7])
    } else {
        iD("dinamicbrush").innerHTML = '<span class="icon dinamicbrushicon"></span>'
        Alert('<span title="dinamicbrush" class="dinamicbrush"> </span> ' + alerts[language][25] + "<br>" + alerts[language][8])
    }
}


function createBasicBrushes() {

    for (i = 0; i < 9; i++) {
        let prush = new Image();
        prush.src = `img/brush${i}.png`;
        basicBrushes.push(prush)
        prush.id = "br" + i
        prush.setAttribute("onmousedown", "selectBrush(" + i + ")")
        prush.setAttribute("style", "width:30px; height:30px; margin:2px;")
        iD("pinceis").appendChild(prush)

    }
}
createBasicBrushes()

function customBrush() {
    mostraSubMenu("custombrush")
}

function criaCustom(fromclipboard = false) {
    if (fromclipboard && clipboard.length == 0) {
        Alert('<span class="icon clipboardicon"></span> ' + textos[language]["103"], 4)
        return
    }
    let i = basicBrushes.length

    let newNewBrush2 = new Image();
    //newNewBrush2.crossOrigin = "anonymous"
    if (fromclipboard == false) {
        newNewBrush2.src = canvas.toDataURL("image/png");
    } else {

        newNewBrush2.src = clipboard[clipboard.length - 1]

    }

    basicBrushes.push(newNewBrush2)

    let prush = new Image();
    prush = basicBrushes[i]
    prush.id = "br" + i
    prush.setAttribute("onmousedown", "selectBrush(" + i + ")")
    prush.setAttribute("style", "width:30px; height:32px; margin-top:2px;")
    iD("pinceis3").appendChild(prush)
    setTimeout(() => selectBrush(basicBrushes.length - 1), 350)
}

function initStrokeRange() {
    let r = 2;
    while (r <= 500) {
        r = r * 1.3;
        stroke_range.push(Math.floor(r))
    }
}

function strokeSizeRange(value) {
    setStrokeSize(
        stroke_range[value]
    )
}

function setStrokeSize(value = strokeWidth) {
    let proportion = (strokeWidth / strokeHeight)
    strokeWidth = value;
    strokeHeight = strokeWidth * proportion
    iD("tpx").value = value;
    changeBrush()
}
function setStrokeMax(value) {
    strokemax = value
}

function selectBrush(numero) {
    removeClass('selectedBr')
    iD("br" + numero).classList.add("selectedBr")
    changeBrush(numero)
}
var changedBrush = false
var brushName = "1-6-6-hsla(0,0%,0%,1)"
//var basicBrushe = new Image()
async function createNewBrush(numero = lastbrush, tam = strokeScale, cor = strokeColor) {
    if (isGlowing) { numero = 1 }
    lastbrush = numero
    // brushCanva.crossOrigin = "anonymous"
    //basicBrushe.src = basicBrushes[numero]
    let imagem = new Image()
    imagem.src = basicBrushes[numero].src

    let proportion = imagem.height / imagem.width
    strokeHeight = strokeWidth * proportion
    brushName = "" + numero + "-" + strokeWidth + "-" + strokeHeight + "-" + cor
    let newWidth = redondo(strokeWidth * tam)
    let newHeight = redondo(strokeHeight * tam)

    if (dinamicBrush == false) {

        if (newWidth < 1) { newWidth = 1 }
        if (newHeight < 1) { newHeight = 1 }
    } else {

        if (newWidth < 3) { newWidth = 3 }
        if (newHeight < 3) { newHeight = 3 }
    }

    brushCanva.height = newHeight
    brushCanva.width = newWidth
    if (isGlowing == false) {
        brushCtx.globalAlpha = 1
    } else {
        brushCtx.globalAlpha = 0.05
    }

    if (custombrushcolor === false) {
        brushCtx.fillStyle = cor;
        brushCtx.fillRect(0, 0, newWidth, newHeight)
        brushCtx.globalAlpha = 1
        brushCtx.globalCompositeOperation = 'destination-in'
        brushCtx.drawImage(imagem, 0, 0, newWidth, newHeight)
        brushCtx.globalCompositeOperation = 'source-over'
    } else {
        //  brushCtx.fillStyle = cor;
        //  brushCtx.fillRect(0, 0, newWidth, newHeight)
        brushCtx.globalAlpha = hsla[3]
        brushCtx.globalCompositeOperation = 'source-over'
        brushCtx.drawImage(imagem, 0, 0, newWidth, newHeight)
    }

    if (isGlowing) {

        var radius = newHeight / 16;
        if (radius < 1) { radius = 1 }
        var centerX = brushCanva.width / 2
        var centerY = brushCanva.height / 2
        brushCtx.beginPath();
        brushCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        brushCtx.fillStyle = `hsla(${hsla[0]},60%,60%,0.3)`;
        brushCtx.fill();

    }
}


function changeBrush(numero = lastbrush, tam = strokeScale, cor = strokeColor) {
    lastbrush = numero
    createNewBrush(numero, tam, cor)
    /* if (dinamicBrush === false) {
         addFavBrush()
     }*/
}
function addFavBrushPin() {
    changedBrush = false
    addFavBrush()
}
function addFavBrush() {
    brushName = "" + lastbrush + "-" + strokeWidth + "-" + strokeHeight + "-" + strokeColor
    setTimeout(() => {
        let existe = iD(brushName)
        if (!existe && mode != "picker") {
            let newNewBrush = new Image();
            newNewBrush.src = brushCanva.toDataURL("image/png");
            newBrush.src = newNewBrush.src
            newBrushes[brushName] = [newNewBrush, lastbrush, strokeScale, strokeColor]
            if (changedBrush == false) {
                changedBrush = true;
                setTimeout(() => {
                    let favbrush = newBrushes[brushName][0]
                    favbrush.style.maxHeight = "32px";

                    let favBrushButton = document.createElement("div")
                    favBrushButton.id = brushName
                    favBrushButton.style.height = "30px";
                    favBrushButton.style.width = "30px";
                    favBrushButton.style.lineHeight = "30px";
                    favBrushButton.style.marginRight = "4px";
                    favBrushButton.style.verticalAlign = "top"
                    favBrushButton.style.display = "inline-block"

                    favBrushButton.setAttribute("onmousedown", "favBrush('" + brushName + "')")
                    favBrushButton.appendChild(favbrush)
                    if (strokeScale > 10) {
                        favBrushButton.innerHTML += "<span class='favbrush'>" + strokeWidth + "</span>"
                    } else {
                        favBrushButton.innerHTML += "<span style='display:block; position:relative; margin-top:-40px; margin-right:auto; margin-left:auto; text-aling:center; color: #000000cc; font-size:0.75em;'>" + strokeWidth + "</span>"
                    }
                    iD("pinceis2").prepend(favBrushButton)
                    clearBrushes()

                }, 25)


            }
        } else if (existe) {
            existe.parentNode.removeChild(existe);
            delete newBrushes[brushName]
        }
    }, 20)
}

function favBrush(brushName) {
    let brr = newBrushes[brushName]
    lastbrush = brr[1]
    strokeScale = brr[2]
    strokeColor = brr[3]
    changeBrush(brr[1], brr[2], brr[3])

}

function clearBrushes() {
    Object.keys(newBrushes).forEach((key) => {
        let existe = iD(key)
        if (existe != null) {
            novoBrushes[key] = newBrushes[key]
        }
    })
    newBrushes = {}
    Object.keys(novoBrushes).forEach((key) => {
        newBrushes[key] = novoBrushes[key]
    })
}
var center = { x: canvas.width / 2, y: canvas.height / 2 };
var radius = (canvas.width / 2) - 10;
var slices = 24;
var _angle = 360 / slices;
var _start = 0
var flag = false;
var dot_flag = false

function drawMandala(GCO, X, Y, eoX, eoY, strokeScale) {
    // drawBrush2(GCO, X, Y, eoX, eoY, strokeScale)
    _start = 0
    for (var i = 0; i < slices; i++) {
        _start += _angle;
        var rP = rotate({ x: eoX, y: eoY }, center, _start);
        var rC = rotate({ x: X, y: Y }, center, _start);
        drawBrush2(GCO, rP.x, rP.y, rC.x, rC.y, strokeScale);

    }
}
function drawMirror(GCO, X, Y, eoX, eoY, strokeScale) {
    // drawBrush2(GCO, X, Y, eoX, eoY, strokeScale)
    let X2, Y2, eoX2, eoY2
    if (X < center.x) {
        X2 = canvas.width - X
        eoX2 = canvas.width - eoX
    } else {
        X2 = canvas.width - X
        eoX2 = canvas.width - eoX

    }

    drawBrush2(GCO, X, Y, eoX, eoY, strokeScale);
    drawBrush2(GCO, X2, Y, eoX2, eoY, strokeScale);

}

var d2r = function (deg) {
    return deg * Math.PI / 180;
}

var getPointOnCircle = function (deg, center, radius) {
    var rad = d2r(deg);
    var x = center.x + radius * Math.cos(rad);
    var y = center.y + radius * Math.sin(rad);
    return { x: x, y: y };
}
function rotate(p1, p2, a) {
    a = d2r(a);
    var xr = (p1.x - p2.x) * Math.cos(a) - (p1.y - p2.y) * Math.sin(a) + p2.x;
    var yr = (p1.x - p2.x) * Math.sin(a) + (p1.y - p2.y) * Math.cos(a) + p2.y;
    return { x: xr, y: yr };
}
function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            drawDot();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

function drawBrush(GCO, x1, y1, x2, y2, strokeScale, cont = ctxF) {
    if (mandala) {
        drawMandala(GCO, x1, y1, x2, y2, strokeScale)
    } else if (mirror) {
        drawMirror(GCO, x1, y1, x2, y2, strokeScale)
    }
    else {
        drawBrush2(GCO, x1, y1, x2, y2, strokeScale, cont)
    }
}
function drawBrush2(GCO, x1, y1, x2, y2, strokeScale, cont = ctxF) {
    let start
    let end
    if (pixelGood) {
        start = { x: (x1 / zoomFactor) * zoomFactor + 1, y: (y1 / zoomFactor) * zoomFactor + 1 }
        end = { x: (x2 / zoomFactor) * zoomFactor + 1, y: (y2 / zoomFactor) * zoomFactor + 1 }
    } else {
        start = { x: x1, y: y1 }
        end = { x: x2, y: y2 }
    }
    let newStrokeWidth = strokeWidth * strokeScale
    let newStrokeHeight = strokeHeight * strokeScale
    if ((newStrokeHeight < 3 || newStrokeWidth < 3) && dinamicBrush == true) {
        newStrokeWidth = 3
        newStrokeHeight = 3
    }
    var halfBrushW = newStrokeWidth / 2;
    var halfBrushH = newStrokeHeight / 2;
    var distance = parseInt(Trig.distanceBetween2Points(start, end));
    var angle = Trig.angleBetween2Points(start, end);
    var x, y;
    changeGCO(GCO);
    cont.lineWidth = newStrokeWidth;

    for (var z = 0; (z <= distance || z == 0); z++) {
        x = start.x + (Math.sin(angle) * z) - halfBrushW;
        y = start.y + (Math.cos(angle) * z) - halfBrushH;
        if (strokeScale == 1) {
            x = redondo(x)
            y = redondo(y)
        }
        cont.drawImage(brushCanva, x, y, newStrokeWidth, newStrokeHeight);
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


var oldBrush = [lastbrush, strokeScale, strokeColor, globalComposite]
