// Pinceis Cor e Tamanho
var favoritas = [];
var hsla = [0, 0, 0, 1];
var strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var strokeWidth = 6;
var estrokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var estrokeWidth = 36;
var linejoin = "round";
var lineJoinsCount = 0;
const lineJoins = ["miter", "round"];
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

function changeLine() {
    brushMode = 0
    lineJoinsCount++;
    if (lineJoinsCount > 1) {
        lineJoinsCount = 0;
    }
    linejoin = lineJoins[lineJoinsCount];
    if (lineJoinsCount != 1) {
        iD("line").innerHTML = " ➕";
        iD("line2").innerHTML = " ➕";
    } else {
        iD("line").innerHTML = " ⚫";
        iD("line2").innerHTML = " ⚫";
    }
}

function mudaCorQ(q = 0, valor) {
    hsla[q] = Number(valor);
    //        if (q == 0){hsla[q]=(hsla[q]*2)%360 }
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
        "mostraCor2",
        "pintar",
        "cores",
        "picker",
        "preencher"
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
        cursorColor();
    }
    iD("mostraCor").style.backgroundColor =
        strokeColor;
    iD("mostraCor2").style.backgroundColor =
        strokeColor;
    iD("pintar").style.backgroundColor = strokeColor;

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
    setStrokeColor();
    criaPaleta();
    desenha("CB", lastbrush,
        strokeWidth, strokeColor,
        "" + lastbrush + "-" + strokeWidth + "-" + strokeColor)

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

    let brushes = ["cursor"];
    for (i in brushes) {
        let tamanho = iD(brushes[i]);
        if (mode == "pintar" || mode == "cores" || mode == "cores" || mode == "picker" || mode == "recortar") {
            tamanho.style.width = value * zoomFactor - zoomFactor / 10 + "px";
            tamanho.style.height = value * zoomFactor + "px";
            tamanho.style.lineHeight = value * zoomFactor + "px";
            tamanho.style.marginTop =
                (value / 2) * zoomFactor * -1 + "px";
            tamanho.style.marginLeft =
                (value * zoomFactor * -1) / 2 + "px";
            tamanho.style.paddingRight =
                (value * zoomFactor * -1) / 2 + "px";
            if (i == 0) {
                //tamanho.style.backgroundColor = strokeColor;
            }

        }
        iD("tpx").value = value;
    }

    changeBrush()
    if (mode == "picker" || mode == "recortar") {
        cursor.style.width = 1 + "px";
        cursor.style.height = 1 + "px";
    }
}


function selectBrush(numero) {
    removeClass('selectedBr')
    iD("br" + numero).classList.add("selectedBr")
    changeBrush(numero)
}
var changedBrush = false
var brushName = "1-6-hsla(0,0%,0%,1)"

function createNewBrush(numero = lastbrush, tam = strokeWidth, cor = strokeColor) {
    brushName = "" + numero + "-" + tam + "-" + cor
    lastbrush = numero
    brushMode = 1
    var brushCanva = iD("brushCanva")
    var brushCtx = brushCanva.getContext("2d");
    // brushCanva.crossOrigin = "anonymous"
    brushCanva.height = tam
    brushCanva.width = tam
    brushCtx.fillStyle = cor;
    brushCtx.fillRect(0, 0, tam, tam)
    brushCtx.globalCompositeOperation = 'destination-in'
    brushCtx.drawImage(basicBrushes[numero], 0, 0, tam, tam)
    brushCtx.globalCompositeOperation = 'destination-over'
}

function changeBrush(numero = lastbrush, tam = strokeWidth, cor = strokeColor) {
    createNewBrush(numero, tam, cor)
    setTimeout(() => {
        let newNewBrush = new Image();
        newNewBrush.src = brushCanva.toDataURL("image/png");
        newBrush.src = newNewBrush.src
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
        newBrushes[brushName] = [newNewBrush, numero, strokeWidth, strokeColor]
    }, 20)
}

function favBrush(qual) {
    let brr = newBrushes[qual]
    lastbrush = brr[1]
    strokeColor = brr[3]
    setStrokeSize(brr[2])

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

function drawBrush(GCO, x1, y1, x2, y2, strokeColor, strokeWidth, brushName, cont = context) {
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
    /*var strokeImg = new Image();
    strokeImg.src = linejoin
    strokeImg.onload = function () {*/
    for (var z = 0; (z <= distance || z == 0); z++) {
        x = start.x + (Math.sin(angle) * z) - halfBrushW;
        y = start.y + (Math.cos(angle) * z) - halfBrushH;
        if (strokeWidth == 1) {
            x = redondo(x) + 1
            y = redondo(y) + 1
        }
        //console.log( x, y, angle, z );
        cont.drawImage(newBrushes[brushName][0], x, y, strokeWidth, strokeWidth);
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
