// Pinceis Cor e Tamanho

const brushCanva = iD("brushCanva")
const brushCtx = brushCanva.getContext("2d");
var favoritas = [];
var hsla = [0, 0, 0, 1];
var strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var strokeScale = 1;
var strokeWidth = 6;
var strokeHeight = 6;
var estrokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var estrokeWidth = 36;

var isGlowing = false

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
        "salvaCor",
        "pintar",
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
        //   iD("mostraCor").style.color = strokeColor;

        //     iD("menu").style.visibility = "hidden";
    } else if (valor == "B") {
        strokeColor = `hsla(0,100%,100%,${hsla[3]})`;
        // iD("mostraCor").style.color = strokeColor;
        //     iD("menu").style.visibility = "hidden";
    } else {
        strokeColor = valor;
        //     iD("menu").style.visibility = "hidden";
        // cursorColor();
    }
    // iD("mostraCor").style.backgroundColor = strokeColor;
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
    let proportion = (strokeWidth / strokeHeight)
    strokeWidth = value;
    strokeHeight = strokeWidth * proportion
    iD("tpx").value = value;
    changeBrush()
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
    }1

    brushCanva.height = newHeight
    brushCanva.width = newWidth
    if (isGlowing == false) {
        brushCtx.globalAlpha = 1
    } else {
        brushCtx.globalAlpha = 0.1
    }
    brushCtx.fillStyle = cor;
    brushCtx.fillRect(0, 0, newWidth, newHeight)
    brushCtx.globalAlpha = 1
    brushCtx.globalCompositeOperation = 'destination-in'
    brushCtx.drawImage(imagem, 0, 0, newWidth, newHeight)
    brushCtx.globalCompositeOperation = 'source-over'

    if (isGlowing) {

        var radius = tam / 16;
        var centerX = brushCanva.width / 2
        var centerY = brushCanva.height / 2
        brushCtx.beginPath();
        brushCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        brushCtx.fillStyle = `hsla(${hsla[0]},60%,60%,0.3)`;
        brushCtx.fill();

    }
}

function rainbow() {
    rainbowInk = !rainbowInk
    mudaCorQ(2, 50)
    mudaCorQ(1, 100)

    if (rainbowInk == true) {
        iD("rainbow").innerHTML = '<span class="icon2 minicheck"></span>'

        Alert(`<span id="glow" title="glow" class="mais selected" onmousedown="glow()" style="background-image: url('/img/rainbowink.png'); color: #ffffff01;">.</span>` + alerts[language][28] + "<br>" + alerts[language][7])
    } else {
        iD("rainbow").innerHTML = ''

        Alert(`<span id="glow" title="glow" class="mais selected" onmousedown="glow()" style="background-image: url('/img/rainbowink.png'); color: #ffffff01;">.</span>` + alerts[language][28] + "<br>" + alerts[language][8])
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
                        favBrushButton.innerHTML += "<span class='favbrush'>" + strokeScale + "</span>"
                    } else {
                        favBrushButton.innerHTML += "<span style='display:block; position:relative; margin-top:-40px; margin-right:auto; margin-left:auto; text-aling:center; color: #000000cc; font-size:0.75em;'>" + strokeScale + "</span>"
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
        start = { x: (x1 / zoomFactor) * zoomFactor, y: (y1 / zoomFactor) * zoomFactor }
        end = { x: (x2 / zoomFactor) * zoomFactor, y: (y2 / zoomFactor) * zoomFactor }
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
            x = redondo(x) + 1
            y = redondo(y) + 1
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

const RGBAToHSLA = (r, g, b, a) => {
    r /= 255;
    g /= 255;
    b /= 255;
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
    //hslaToRgba(H,S,L,A)
    return `hsla(${H},${S}%,${L}%,${A})`;
};

function hslaToRgba(h=hsla[0], s=hsla[1], l=hsla[2],a=hsla[3]){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

   // return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), Math.round(a * 255)];
    iD("Rgba").value = Math.floor(r/255)
    iD("rGba").value = Math.floor(g/255)
    iD("rgBa").value = Math.floor(b/255)
    iD("rgbA").value =  a
    

}
function mudaRGB(q = 0, valor=0) {
    let r, g ,b, a
    r = iD("Rgba").value
    g = iD("rGba").value
    b = iD("rgBa").value
    a = iD("rgbA").value
    mudaCor( RGBAToHSLA(r,g,b,a))
}
function hexadecimal(){
    let hex = iD("hexadecimal").value
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)

    const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, "g"))
    
    const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16)
    
    const getAlphafloat = (a, alpha) => {
        if (typeof a !== "undefined") {return a / 255}
        if ((typeof alpha != "number") || alpha <0 || alpha >1){
          return 1
        }
        return alpha
    }
    
    const hexToRGBA = (hex, alpha) => {
        if (!isValidHex(hex)) {throw new Error("Invalid HEX")}
        const chunkSize = Math.floor((hex.length - 1) / 3)
        const hexArr = getChunksFromString(hex.slice(1), chunkSize)
        const [r, g, b, a] = hexArr.map(convertHexUnitTo256)
        return mudaCor(RGBAToHSLA( r, g, b, getAlphafloat(a, alpha)))
    }
      hexToRGBA(hex)
}

var oldBrush = [lastbrush, strokeScale, strokeColor, globalComposite]

function changeType(qual = "number") {
    if (qual == "number"){

        let objs = ["H", "S", "L", "A", "Rgba", "rGba", "rgBa","rgbA"]
        let tipo = 'number'
        if (iD("H").type == tipo) { tipo = 'range' }
        for (i = 0; i < objs.length; i++) {
            iD(objs[i]).setAttribute('type', tipo)
        }
    }
    else if( qual == "hsla"){
    
        iD("colorhsla").classList.remove("esconde")
        iD("colorrgba").classList.add("esconde")
        iD("colorhex").classList.add("esconde")


    }else if( qual == "rgba"){
        iD("colorrgba").classList.remove("esconde")
        iD("colorhsla").classList.add("esconde")
        iD("colorhex").classList.add("esconde")
        hslaToRgba()
        
    }
    else if( qual == "hex"){
        iD("hexadecimal").value = hsl2hex(hsla[0],hsla[1],hsla[2],hsla[3])
        iD("colorrgba").classList.add("esconde")
        iD("colorhsla").classList.add("esconde")
        iD("colorhex").classList.remove("esconde")

    }
}
function hsl2hex(h,s,l,alpha) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   
      // convert to Hex and prefix "0" if needed
    };
  //alpha conversion
  alpha = Math.round(alpha * 255).toString(16).padStart(2, '0');

  return `#${f(0)}${f(8)}${f(4)}${alpha}`;
} 

function glow() {
    isGlowing = !isGlowing
    if (isGlowing === true) {
        iD("glow").innerHTML = '<span class="icon2 minicheck"></span>'

        ctxF.globalCompositeOperation = 'lighter'
        //context.globalCompositeOperation = 'lighter'

        if (!nightmode) {
            night()
        }
        modeTo("cores")
    } else {
        ctxF.globalCompositeOperation = 'source-over'
        night()
        iD("glow").innerHTML = ''
    }
}