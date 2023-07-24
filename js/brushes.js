// Pinceis Cor e Tamanho

const brushCanva = iD("brushCanva")
const brushCtx = brushCanva.getContext("2d");
var favoritas = [];
var hsla = [0, 0, 0, 1];
var strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var strokeWidth = 6;
var estrokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var estrokeWidth = 36;

var isGlowing = false

var newBrushes = {}
var lastbrush = 1
var brushMode = 1
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
var dinamicBrush = true

function toggleDinamicBrush() {
    dinamicBrush = !dinamicBrush
    if (dinamicBrush == true) {
        Alert('<span title="dinamicbrush" class="dinamicbrush"> </span> ' + alerts[language][25] + "<br>" + alerts[language][7])
    } else {
        Alert('<span title="dinamicbrush" class="dinamicbrush"> </span> ' + alerts[language][25] + "<br>" + alerts[language][8])

    }
}
function toggleDinamicInk() {
    dinamicInk = !dinamicInk
}


function createBasicBrushes() {

    for (i = 0; i < 9; i++) {
        let prush = new Image();
        prush.src = `img/brush${i}.png`;
        basicBrushes.push(prush)
        prush.id = "br" + i
        prush.setAttribute("onmousedown", "selectBrush(" + i + ")")
        prush.setAttribute("style", "width:30px; height:30px; margin-top:2px;")
        iD("pinceis").appendChild(prush)

    }
    let customBrush = document.createElement("span")
    customBrush.id = "custombrush"
    //customBrush.classList.add("bot")
    customBrush.setAttribute("onmousedown", 'mostraSubMenu("custombrush")')
    customBrush.innerHTML = '<span class="shadow" style="display:inline-block; margin-top:-20px; font-size:18px; width:30px; height:30px;">🖌️<span style="display:inline-block;position:relative; margin-left: -30px; top:-5px">➕</span></span>'
    iD("pinceis").appendChild(customBrush)
}
createBasicBrushes()

function customBrush() {
    mostraSubMenu("custombrush")
}

function criaCustom() {
    let i = basicBrushes.length

    let newNewBrush2 = new Image();
    //newNewBrush2.crossOrigin = "anonymous"
    newNewBrush2.src = canvas.toDataURL("image/png");

    basicBrushes.push(newNewBrush2)

    let prush = new Image();
    prush = basicBrushes[i]
    prush.id = "br" + i
    prush.setAttribute("onmousedown", "selectBrush(" + i + ")")
    prush.setAttribute("style", "width:30px; height:32px; margin-top:2px;")
    iD("pinceis3").appendChild(prush)
    setTimeout(() => selectBrush(basicBrushes.length - 1), 350)
}


function mudaCorQ(q = 0, valor) {
    hsla[q] = Number(valor);
    //        if (q == 0){hsla[q]=(hsla[q]*2)%360 }
    strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
    setStrokeColor();
    criaPaleta();

}
function mudaCorAlpha() {
    let valor = iD("transparenciaE").value
    strokeColor = `hsla(0, 100%, 0%, ${valor})`
}
function salvaCor() {
    if (!favoritas.includes(strokeColor)) {
        favoritas.push(strokeColor);
    } else {
        favoritas = favoritas.filter((item) => item !== strokeColor);
    }
    setTimeout(criaPaleta2(), 20);
}

criaPaleta();

function setStrokeColor() {
    strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
    let objs = [
        "mostraCor",
        "salvaCor",
        //"mostraCor2",
        //"pintar",
        "cores",
        "picker",
        "preencher",
        "preenchercor"
    ];

    let quantos = objs.length;
    for (i = 0; i < quantos; i++) {
        iD(objs[i]).style.backgroundColor = strokeColor;
        iD(objs[i]).style.background = `linear-gradient(145deg, ${strokeColor},${strokeColor})`
    }
    changeBrush()

}

setStrokeColor();

function mudaCor(valor) {

    if (valor == "P") {
        strokeColor = `hsl(0,100%,0%,${hsla[3]})`;
        iD("mostraCor").style.color = strokeColor;

        //     iD("menu").style.visibility = "hidden";
    } else if (valor == "B") {
        strokeColor = `hsla(0,100%,100%,${hsla[3]})`;
        iD("mostraCor").style.color = strokeColor;
        //     iD("menu").style.visibility = "hidden";
    } else {
        strokeColor = valor;
        //     iD("menu").style.visibility = "hidden";
        // cursorColor();
    }
    iD("mostraCor").style.backgroundColor =
        strokeColor;
    //iD("mostraCor2").style.backgroundColor =
    //   strokeColor;
    //iD("pintar").style.backgroundColor = strokeColor;
    iD("preenchercor").style.backgroundColor = strokeColor;
    const toHslaObject = (hslaStr) => {
        const [hue, saturation, lightness, alpha] = hslaStr
            .match(/[\d\.]+/g)
            .map(Number);
        iD("H").value = hue;
        iD("S").value = saturation;
        iD("L").value = lightness;
        iD("A").value = alpha;
        hsla[0] = hue;
        hsla[1] = saturation;
        hsla[2] = lightness;
        hsla[3] = alpha;
    };
    toHslaObject(strokeColor);
    strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
    setStrokeColor();
    criaPaleta();

}

function criaPaleta() {
    let paleta = `<span onmousedown='mudaCor("B")'  class='bloquinho' ` +
        "style='background-color:hsla(0, 100%, 100%, " + hsla[3] * 4 + ")'> </span>";
    let hue100 = 100;
    for (i = 1; i < 15; i++) {
        hue100 -= Math.floor(100 / 14)
        let cor = iD("H").value
        paleta += `<span onmousedown='mudaCor("hsla(${cor},${hsla[1]}%,${hue100
            }%,${hsla[3]
            })")' class='bloquinho' style='background-color:hsla(${cor},${hsla[1]
            }%,${hue100}%,${hsla[3] * 4});'> </span>`;

    }

    iD("paleta").innerHTML = paleta;

}

function criaPaleta2() {
    let paleta = "";
    let quantas = favoritas.length;
    for (i = 0; i < quantas; i++) {
        paleta += `<span onmousedown='mudaCor("` + favoritas[i] + `")' class='bloquinho' style="background-color:` + favoritas[i] + `"> </span>`
    }
    iD("paleta2").innerHTML = paleta;
}
function criapaleta3() {
    let paleta3 = '';
    let c = 0;
    while (c < 7) {
        let cor = (c * 55)
        c++;
        paleta3 += `<span onmousedown='mudaCor("hsla(${cor},100%,50%,${hsla[3]
            })")' class='bloquinho' style='background-color:hsla(${cor},100%,50%,${hsla[3] * 4 + 0.2});'> </span>`;
        iD("paleta3").innerHTML = paleta3;
        iD("paleta3").innerHTML +=
            `<span onmousedown='mudaCor("hsla(0, 0%, 50%, ` + hsla[3] * 4 + `)")' class='bloquinho' ` +
            "style='background-color:hsla(0, 0%, 50%, " + hsla[3] * 4 + ")'> </span>";
        iD("paleta3").innerHTML +=
            `<span onmousedown='mudaCor("P")' class='bloquinho' ` +
            "style='background-color:hsla(0, 0%, 0%, " + hsla[3] * 4 + ")'> </span>";
    }
} criapaleta3()



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
    strokeWidth = value;
    iD("tpx").value = value;
    changeBrush()
    lastPressure = value
}


function selectBrush(numero) {
    removeClass('selectedBr')
    iD("br" + numero).classList.add("selectedBr")
    changeBrush(numero)
}
var changedBrush = false
var brushName = "1-6-hsla(0,0%,0%,1)"

async function createNewBrush(numero = lastbrush, tam = strokeWidth, cor = strokeColor) {
    if (isGlowing) { numero = 1 }
    brushName = "" + numero + "-" + tam + "-" + cor
    lastbrush = numero
    brushMode = 1
    // brushCanva.crossOrigin = "anonymous"
    brushCanva.height = tam
    brushCanva.width = tam
    brushCtx.globalAlpha = 0.1
    if (isGlowing == false) {
        brushCtx.globalAlpha = 1
    }
    brushCtx.fillStyle = cor;
    brushCtx.fillRect(0, 0, tam, tam)
    brushCtx.globalAlpha = 1
    brushCtx.globalCompositeOperation = 'destination-in'
    brushCtx.drawImage(basicBrushes[numero], 0, 0, tam, tam)
    brushCtx.globalCompositeOperation = 'source-over'

    if (isGlowing) {
        var radius = tam / 16;
        var centerX = brushCanva.width / 2
        var centerY = brushCanva.height / 2
        brushCtx.beginPath();
        brushCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        brushCtx.fillStyle = 'white';
        brushCtx.fill();
        //        cor = "#fff"

    }
}

function rainbow() {
    rainbowInk = !rainbowInk
    mudaCorQ(2, 50)
    mudaCorQ(1, 100)

    if (rainbowInk == true) {
        Alert(`<span id="glow" title="glow" class="mais selected" onmousedown="glow()" style="background-image: url('/img/rainbowink.png'); color: #ffffff01;">.</span>` + alerts[language][28] + "<br>" + alerts[language][7])
    } else {
        Alert(`<span id="glow" title="glow" class="mais selected" onmousedown="glow()" style="background-image: url('/img/rainbowink.png'); color: #ffffff01;">.</span>` + alerts[language][28] + "<br>" + alerts[language][8])

    }
}

function changeBrush(numero = lastbrush, tam = strokeWidth, cor = strokeColor) {
    lastbrush = numero
    createNewBrush(numero, tam, cor)
    if (dinamicBrush === false) {
        addFavBrush()

    }
}
function addFavBrushPin() {
    changedBrush = false
    addFavBrush()
}
function addFavBrush() {
    setTimeout(() => {
        let newNewBrush = new Image();
        newNewBrush.src = brushCanva.toDataURL("image/png");
        newBrush.src = newNewBrush.src
        newBrushes[brushName] = [newNewBrush, lastbrush, strokeWidth, strokeColor]
        if (changedBrush == false) {
            changedBrush = true;
            let existe = iD(brushName)
            if (!existe && mode != "picker") {
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
                    if (strokeWidth > 10) {
                        favBrushButton.innerHTML += "<span class='favbrush'>" + strokeWidth + "</span>"
                    } else {
                        favBrushButton.innerHTML += "<span style='display:block; position:relative; margin-top:-40px; margin-right:auto; margin-left:auto; text-aling:center; color: #000000cc; font-size:0.75em;'>" + strokeWidth + "</span>"
                    }
                    iD("pinceis2").prepend(favBrushButton)
                    clearBrushes()

                }, 25)
            }


        }
    }, 20)
}

function favBrush(brushName) {
    let brr = newBrushes[brushName]
    lastbrush = brr[1]
    strokeWidth = brr[2]
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

function drawMandala(GCO, X, Y, eoX, eoY, strokeWidth) {
    drawBrush2(GCO, X, Y, eoX, eoY, strokeWidth)
    _start = 0
    for (var i = 0; i < slices - 1; i++) {
        _start += _angle;
        var rP = rotate({ x: eoX, y: eoY }, center, _start);
        var rC = rotate({ x: X, y: Y }, center, _start);
        drawBrush2(GCO, rP.x, rP.y, rC.x, rC.y, strokeWidth);

    }
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
function drawBrush(GCO, x1, y1, x2, y2, strokeWidth, cont = ctxF) {
    if (mandala) {
        drawMandala(GCO, x1, y1, x2, y2, strokeWidth)
    } else {
        drawBrush2(GCO, x1, y1, x2, y2, strokeWidth, cont)
    }
}
function drawBrush2(GCO, x1, y1, x2, y2, strokeWidth, cont = ctxF) {
    let start
    let end
    if (pixelGood) {
        start = { x: (x1 / zoomFactor) * zoomFactor, y: (y1 / zoomFactor) * zoomFactor }
        end = { x: (x2 / zoomFactor) * zoomFactor, y: (y2 / zoomFactor) * zoomFactor }
    } else {
        start = { x: x1, y: y1 }
        end = { x: x2, y: y2 }
    }
    var halfBrushW = strokeWidth / 2;
    var halfBrushH = strokeWidth / 2;
    var distance = parseInt(Trig.distanceBetween2Points(start, end));
    var angle = Trig.angleBetween2Points(start, end);
    var x, y;
    changeGCO(GCO);
    cont.lineWidth = strokeWidth;

    for (var z = 0; (z <= distance || z == 0); z++) {
        x = start.x + (Math.sin(angle) * z) - halfBrushW;
        y = start.y + (Math.cos(angle) * z) - halfBrushH;
        if (strokeWidth == 1) {
            x = redondo(x) + 1
            y = redondo(y) + 1
        }

        /*    if (isGlowing){
                let globaltemp = context.globalCompositeOperation
                var blur = 10;
                context.shadowColor = strokeColor
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = blur;
                context.globalCompositeOperation = "destination-over"
                context.drawImage(brushCanva, x, y, strokeWidth, strokeWidth);
                context.globalCompositeOperation = globaltemp
                context.shadowBlur = 0;
                
    
            }*/
        cont.drawImage(brushCanva, x, y, strokeWidth, strokeWidth);
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

const RGBAToHSLA = (r, g, b, a) => {
    r /= 255;
    g /= 255;
    b /= 255;
    a /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    const H = Math.floor(60 * h < 0 ? 60 * h + 360 : 60 * h);
    const S = Math.floor(
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    );
    const L = Math.floor((100 * (2 * l - s)) / 2);
    const A = a;
    hsla[0] = H;
    hsla[1] = S;
    hsla[2] = L;
    hsla[3] = A;
    return `hsla(${H},${S}%,${L}%,${a})`;
};


var oldBrush = [lastbrush, strokeWidth, strokeColor, globalComposite]

function changeType() {
    let objs = ["H", "S", "L", "A"]
    let tipo = 'number'
    if (iD("H").type == tipo) { tipo = 'range' }
    for (i = 0; i < objs.length; i++) {
        iD(objs[i]).setAttribute('type', tipo)
    }
}
