var brushMode = 1

let brushesImg = {}

var copo = []

var basicBrushes = []
var selectedBasicBrush = 0
function createBasicBrushes() {

    for (i = 0; i < 10; i++) {
        let prush = new Image();
        prush.src = `img/brush${i}.png`;
        basicBrushes.push(prush)
        prush.id = "br" + i
        prush.setAttribute("onmousedown", "selectBrush(" + i + ")")
        prush.setAttribute("style", "width:30px; height:32px; margin-top:2px;")
        document.getElementById("pinceis").appendChild(prush)
    }
}
createBasicBrushes()

var brush = new Image();
brush.src = 'img/brush1.png';

brush.onload = function () {
    changeBrush()
}
var newBrush = document.createElement("img")
newBrush.src = brush.src

var newBrushes = {}
var brushCount = 0
var lastbrush = 1

function createColorBrush() {
    brushCount++
}

createColorBrush()

function selectBrush(numero) {
    removeClass('selectedBr')
    document.getElementById("br" + numero).classList.add("selectedBr")
    changeBrush(numero)
}
var changedBrush = false
var brushName = ""
function changeBrush(numero = lastbrush, tam = strokeWidth, cor = strokeColor) {
    brushName = "" + numero + tam + cor
    lastbrush = numero
    brushMode = 1
    var brushCanva = document.getElementById("brushCanva")
    var brushCtx = brushCanva.getContext("2d");
    brushCanva.height = tam
    brushCanva.width = tam
    brushCtx.fillStyle = cor;

    brushCtx.fillRect(0, 0, tam, tam)
    brushCtx.globalCompositeOperation = 'destination-in'
    brushCtx.drawImage(basicBrushes[numero], 0, 0, tam, tam)
    brushCtx.globalCompositeOperation = 'destination-over'
    setTimeout(() => {
        let newNewBrush = new Image();
        newNewBrush.src = brushCanva.toDataURL("image/png");
        newBrush.crossOrigin = "anonymous"
        newBrush.src = newNewBrush.src
        cursor.style.backgroundImage = 'url("' + newNewBrush.src + '")';
        cursor.style.opacity = 0.8
        if (changedBrush == false) {


            changedBrush = true;
            let existe = document.getElementById(brushName)
            if (!existe) {

                setTimeout(() => {

                    let favbrush = newBrushes[brushName][0]
                    favbrush.style.maxHeight = "32px";

                    let favBrushButton = document.createElement("div")
                    favBrushButton.id = brushName
                    favBrushButton.style.Height = "30px";
                    favBrushButton.style.width = "30px";
                    favBrushButton.style.lineHeight = "30px";
                    favBrushButton.style.marginRight = "4px";
                    favBrushButton.style.verticalAlign = "top"
                    favBrushButton.style.display = "inline-block"

                    favBrushButton.setAttribute("onmousedown", "favBrush('" + brushName + "')")
                    favBrushButton.appendChild(favbrush)
                    if (strokeWidth > 10) {
                        favBrushButton.innerHTML += "<span class='favbrush'>" + strokeWidth + "</span>"
                    } else {
                        favBrushButton.innerHTML += "<span style='display:block; position:relative; margin-top:-40px; margin-right:auto; margin-left:auto; text-aling:center; color: #000000cc; font-size:0.75em;'>" + strokeWidth + "</span>"
                    }
                    document.getElementById("pinceis2").prepend(favBrushButton)
                    clearBrushes()

                }, 20)
            }


        }
        brushCount++
        newBrushes[brushName] = [newNewBrush, numero, strokeWidth, strokeColor]
    }, 10)
}

function favBrush(qual) {
    let brr = newBrushes[qual]
    lastbrush = brr[1]
    strokeColor = brr[3]
    setStrokeSize(brr[2])

}

let novoBrushes = {}

function clearBrushes() {
    Object.keys(newBrushes).forEach((key) => {
        let existe = document.getElementById(key)
        if (existe != null) {
            novoBrushes[key] = newBrushes[key]
        }
    })
    newBrushes = {}
    Object.keys(novoBrushes).forEach((key) => {
        newBrushes[key] = novoBrushes[key]
    })
}

function drawBrush(GCO, x1, y1, x2, y2, strokeColor, stroke, linejoin) {
    let start
    let end
    if (pixelGood) {
        start = { x: (x1 / zoomFactor) * zoomFactor, y: (y1 / zoomFactor) * zoomFactor }
        end = { x: (x2 / zoomFactor) * zoomFactor, y: (y2 / zoomFactor) * zoomFactor }
    } else {
        start = { x: x1, y: y1 }
        end = { x: x2, y: y2 }
    }
    var halfBrushW = stroke / 2;
    var halfBrushH = stroke / 2;
    var distance = parseInt(Trig.distanceBetween2Points(start, end));
    var angle = Trig.angleBetween2Points(start, end);
    var x, y;
    changeGCO(GCO);
    context.lineWidth = stroke;
    /*var strokeImg = new Image();
    strokeImg.src = linejoin
    strokeImg.onload = function () {*/
    for (var z = 0; (z <= distance || z == 0); z++) {
        x = start.x + (Math.sin(angle) * z) - halfBrushW;
        y = start.y + (Math.cos(angle) * z) - halfBrushH;
        if (stroke == 1) {
            x = redondo(x) + 1
            y = redondo(y) + 1
        }
        //console.log( x, y, angle, z );
        context.drawImage(newBrushes[linejoin][0], x, y, stroke, stroke);
    }
    //  }
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