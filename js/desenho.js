
let workingframe = 0
var comandos = [[], []];

const canvas = iD("canvas");
const context = canvas.getContext('2d', { willReadFrequently: true });
const canvasV = iD("canvasV");
const contextV = canvasV.getContext("2d", { willReadFrequently: true });

let isDrawing = false;
let isGrabing = false;
let isPicking = false;
var isSelecting = false
var isEmoji = false;
var mandala = false
var mirror = false
let x = 0;
let y = 0;
var offsetX;
var offsetY;

const canvasDiv = iD("canvas_div");
var globalComposite = "source-over";

var mode = "cores";
var ultimoToque = { x: canvas.width / 2, y: canvas.height / 2 };
var mouseOver = false;
const win = iD("canvas_window");
const desenhoDiv = iD("desenho_div");
const images = []

var videoStream;
var origin = { x: canvas.width / 2, y: canvas.height / 2 };
var pixelGood = false
let infinitypaint = false

var audio2 = new Audio('./audio/back_001.wav');
var audio = new Audio('./audio/switch12.wav');
audio.volume = 0.2;
audio2.volume = 0.4;

let myImg = document.createElement("img");

function infinityPaint() {
    infinitypaint = !infinitypaint
    if (infinitypaint == true) {
        iD("infinity").innerHTML = '<span class="icon infinityicon"><span class="minicheck"></span></span>'

        Alert('<span title="infinity" class="emoji " id="emo -♾️">♾️</span> ' + alerts[language][6] + "<br>" + alerts[language][7])
    } else {
        iD("infinity").innerHTML = '<span class="icon infinityicon"></span>'

        Alert(' <span title="infinity" class="emoji " id="emo -♾️">♾️</span> ' + alerts[language][6] + "<br>" + alerts[language][8])
    }
}
function setCenter() {
    center = { x: canvas.width / 2, y: canvas.height / 2 };
    radius = (canvas.width / 2) - 10;
}
function Mirror() {
    mirror = !mirror
    if (mirror == true) {
        iD("mirror").innerHTML = '<span class="icon mirroricon"><span class="minicheck"></span></span>'
        setCenter()
        drawVerticalLine()
        Alert(`  <span id="mirror2" title="mirror" class="mais"
        style="background-image: url('/img/mirror.png'); color: #ffffff01;">.</span>`+ alerts[language][29] + "<br>" + alerts[language][7])
    } else {
        iD("mirror").innerHTML = '<span class="icon mirroricon"></span>'

        canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
        Alert(`  <span id="mirror2" title="mirror" class="mais" 
        style="background-image: url('/img/mirror.png'); color: #ffffff01;">.</span>`+ alerts[language][29] + "<br>" + alerts[language][8])
    }
}
function drawVerticalLine() {
    canvasBack.ctx.beginPath();
    canvasBack.ctx.strokeStyle = "gray";
    canvasBack.ctx.moveTo(center.x, 0);
    canvasBack.ctx.lineTo(center.x, canvas.height);
    canvasBack.ctx.stroke();
}
function Mandala() {
    mandala = !mandala
    if (mandala == true) {
        iD("mandala").innerHTML = '<span class="icon mandalaicon"><span class="minicheck"></span></span>'
        setCenter()
        mostraMenu("mandala")
        drawSlices()
        Alert('<span title="mandala" class="emoji " id="emo -♾️">⚛️</span> ' + alerts[language][24] + "<br>" + alerts[language][7])
    } else {
        canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
        iD("mandala").innerHTML = '<span class="icon mandalaicon"></span>'

        Alert(' <span title="mandala" class="emoji " id="emo -♾️">⚛️</span> ' + alerts[language][24] + "<br>" + alerts[language][8])
    }
}

function mandalaSlices(value) {
    slices = value
    _angle = 360 / slices
    drawSlices()
}
function drawSlices() {
    canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
    //canvasBack.ctx.fillStyle = '#212121';
    //canvasBack.ctx.fillRect(0,0,canvas.width,canvas.height);
    canvasBack.ctx.strokeStyle = lineColorTransparent;
    canvasBack.ctx.beginPath();
    canvasBack.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
    canvasBack.ctx.stroke();
    canvasBack.ctx.closePath();
    _start = 0;

    for (var i = 0; i < slices; i++) {
        lineStroke(center, getPointOnCircle(_start, center, radius), 3, lineColorTransparent);
        _start += _angle;
    }
}
var lineColorTransparent = 'rgba(120, 120, 120, 0.3)'
var lineStroke = function (start, end, width, color) {
    canvasBack.ctx.lineWidth = width;
    canvasBack.ctx.beginPath();
    canvasBack.ctx.strokeStyle = color;
    canvasBack.ctx.moveTo(start.x, start.y);
    canvasBack.ctx.lineTo(end.x, end.y);
    canvasBack.ctx.stroke()
}

function redondo(numero) {
    return Math.floor(numero, 10)
}

function dataURItoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = window.atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

function restauraPincel() {
    createNewBrush(oldBrush[0], oldBrush[1], oldBrush[2], oldBrush[3])
}

function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}

async function desenha(
    CMD,
    GCO,
    X = undefined,
    Y = undefined,
    eoX = undefined,
    eoY = undefined,
    strokeScale = undefined
) {
    //let  comando =[]
    if (undoLevel != 0) {
        let dif = historia[workingframe].length - undoLevel
        for (i = dif; i < historia[workingframe].length; i++) { historia[workingframe].pop() }
        undoLevel = 0
        // console.log("daqui pra frente..")
    }
    switch (CMD) {
        case "CB":
            createNewBrush(GCO, X, Y)
            break;

        case "rotacionar":
            // comando =["rotacionar", GCO, X, Y]
            // comandos[workingframe].push(comando)
            // comandosExec()
            break
        case "move":
            // comando =["move", GCO, X]
            // comandos[workingframe].push(comando)
            // comandosExec()
            break

        case "brush":

            // comando =["brush", GCO, X, Y, eoX, eoY, strokeScale]
            drawBrush(GCO, X, Y, eoX, eoY, strokeScale)
            //comandos[workingframe].push(comando)
            autoCrop(X, Y, strokeWidth * strokeScale, strokeHeight * strokeScale)
            let newStrokeWidth = strokeWidth * strokeScale
            let newStrokeHeight = strokeHeight * strokeScale
            if (infinitypaint == true) {
                // console.log(X, Y, eoY, eoY)
                if (X < newStrokeWidth / 2 && Y < newStrokeHeight) { //top left
                    setTimeout(() => {
                        //top right
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeScale)
                        //bottom left
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeScale)
                        //bottom right
                        drawBrush(GCO, X + canvas.width, Y + canvas.height, eoX + canvas.width, eoY + canvas.height, strokeScale)
                    }, 10)
                } else if (X > canvas.width - newStrokeWidth / 2 && Y < newStrokeHeight) {//top right
                    setTimeout(() => {
                        //top left
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeScale)
                        //bottom left
                        drawBrush(GCO, X - canvas.width, Y + canvas.height, eoX - canvas.width, eoY + canvas.height, strokeScale)

                        //bottom right
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeScale)


                    }, 10)
                } else if (X < newStrokeWidth / 2 && Y > canvas.height - newStrokeHeight / 2) { //bottom left
                    setTimeout(() => {
                        //bottom right
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeScale)
                        //top left
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeScale)
                        //top right
                        drawBrush(GCO, X + canvas.width, Y - canvas.height, eoX + canvas.width, eoY - canvas.height, strokeScale)


                    }, 10)
                }
                else if (X > canvas.width - newStrokeWidth / 2 / 2 && Y > canvas.height - newStrokeHeight / 2) { //bottom right
                    setTimeout(() => {
                        //bottom left
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeScale)
                        //top left
                        drawBrush(GCO, X - canvas.width, Y - canvas.height, eoX - canvas.width, eoY - canvas.height, strokeScale)
                        //top right
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeScale)
                    }, 10)
                }
                else if (X < newStrokeWidth / 2) {
                    setTimeout(() => {
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeScale)
                    }, 10)
                } else if (X > canvas.width - newStrokeWidth / 2) {
                    setTimeout(() => {
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeScale)
                    }, 10)


                } else if (Y < newStrokeHeight) {
                    setTimeout(() => {
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeScale)
                    }, 10)
                } else if (Y > canvas.height - newStrokeHeight / 2) {
                    setTimeout(() => {
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeScale)
                    }, 10)
                }

            }


            break;

        case "s":

            // comando =["s", GCO, X, Y, eoX, eoY, strokeWidth]
            // comandos[workingframe].push(comando)
            //comandosExec(comandos.length - 1)
            break;

        case "f":
            // comando =["f", GCO, X, Y, eoX, eoY, strokeWidth]
            blob = dataURItoBlob(X)
            let myImg = document.createElement("img");
            myImg.src = URL.createObjectURL(blob)
            myImg.onload = function () {
                let oldGCO = context.globalCompositeOperation
                changeGCO(GCO)
                context.drawImage(
                    myImg,
                    Y,
                    eoX,
                    myImg.width,
                    myImg.height);
                // comandos[workingframe].push(comando)
                changeGCO(oldGCO)
                autoCrop(imagem.width, imagem.height)
                autoCrop(0, 0)
            }
            break;
        case "i":
            // comando =["i", GCO, X, Y, eoX, eoY, strokeWidth]
            context.drawImage(X, Y, eoX);
            // comandos[workingframe].push(comando)
            break;

        case "img":
            // comando =["img", GCO, imagem, 0, 0, imagem.width, imagem.height]
            context.drawImage(imagem, 0, 0, imagem.width, imagem.height);
            // comandos[workingframe].push(comando)
            autoCrop(imagem.width, imagem.height)
            autoCrop(0, 0)
            break;

        case "b":
            // comando =["b", GCO, X];
            // comandos[workingframe].push(comando)
            context.fillStyle = X; //cor
            context.fillRect(0, 0, canvas.width, canvas.height);
            break;
        case "e":
            // comando =["e", GCO, X, Y, eoX, eoY]
            context.font = eoY + 'px serif'
            // use these alignment properties for "better" positioning
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(eoX, X, Y)

            // comandos[workingframe].push(comando)
            if (infinitypaint == true) {
                // console.log(X, Y, eoY, eoY)
                if (X < eoY / 2 && Y < eoY / 2) { //top left
                    setTimeout(() => {
                        //top right
                        // comando =["e", GCO, X + canvas.width, Y, eoX, eoY]
                        context.fillText(eoX, X + canvas.width, Y)
                        // comandos[workingframe].push(comando)

                        //bottom left
                        // comando =["e", GCO, X, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y + canvas.height)
                        // comandos[workingframe].push(comando)
                        //bottom right
                        // comando =["e", GCO, X + canvas.width, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X + canvas.width, Y + canvas.height)
                        // comandos[workingframe].push(comando)


                    }, 10)
                } else if (X > canvas.width - eoY / 2 && Y < eoY - 2) {//top right
                    setTimeout(() => {
                        //top left
                        // comando =["e", GCO, X - canvas.width, Y, eoX, eoY]
                        context.fillText(eoX, X - canvas.width, Y)
                        // comandos[workingframe].push(comando)
                        //bottom left
                        // comando =["e", GCO, X - canvas.width, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X - canvas.width, Y + canvas.height)
                        // comandos[workingframe].push(comando)

                        //bottom right
                        // comando =["e", GCO, X, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y + canvas.height)
                        // comandos[workingframe].push(comando)


                    }, 10)
                } else if (X < eoY / 2 && Y > canvas.height - eoY / 2) { //bottom left
                    setTimeout(() => {
                        //bottom right
                        // comando =["e", GCO, X + canvas.width, Y, eoX + canvas.width, eoY]
                        context.fillText(eoX, X + canvas.width, Y)
                        // comandos[workingframe].push(comando)

                        //top left
                        // comando =["e", GCO, X, Y - canvas.height, eoX, eoY - canvas.height]
                        context.fillText(eoX, X, Y - canvas.height)
                        // comandos[workingframe].push(comando)

                        //top right
                        // comando =["e", GCO, X + canvas.width, Y - canvas.height, eoX + canvas.width, eoY - canvas.height]
                        context.fillText(eoX, X + canvas.width, Y - canvas.height)
                        // comandos[workingframe].push(comando)


                    }, 10)
                }
                else if (X > canvas.width - eoY / 2 / 2 && Y > canvas.height - eoY / 2) { //bottom right
                    setTimeout(() => {
                        //bottom left
                        // comando =["e", GCO, X - canvas.width, Y, eoX - canvas.width, eoY]
                        context.fillText(eoX, X - canvas.width, Y)
                        // comandos[workingframe].push(comando)

                        //top left
                        // comando =["e", GCO, X - canvas.width, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X - canvas.width, Y - canvas.height)
                        // comandos[workingframe].push(comando)

                        //top right
                        // comando =["e", GCO, X, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y - canvas.height)
                        // comandos[workingframe].push(comando)


                    }, 10)
                }
                else if (X < eoY / 2) {
                    setTimeout(() => {
                        // comando =["e", GCO, X + canvas.width, Y, eoX, eoY]
                        context.fillText(eoX, X + canvas.width, Y)
                        // comandos[workingframe].push(comando)
                    }, 10)
                } else if (X > canvas.width - eoY / 2) {
                    setTimeout(() => {
                        // comando =["e", GCO, X - canvas.width, Y, eoX, eoY]
                        context.fillText(eoX, X - canvas.width, Y)
                        // comandos[workingframe].push(comando)
                    }, 10)


                } else if (Y < eoY) {
                    setTimeout(() => {
                        // comando =["e", GCO, X, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y + canvas.height)
                        // comandos[workingframe].push(comando)
                    }, 10)
                } else if (Y > canvas.height - eoY / 2) {
                    setTimeout(() => {
                        // comando =["e", GCO, X, Y - canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y - canvas.height)
                        // comandos[workingframe].push(comando)
                    }, 10)
                }
            }
            autoCrop(X, Y, eoY, eoY)
            break;


    }



}

function changeGCO(GCO = globalComposite) {
    context.globalCompositeOperation = GCO
}


function limpar(what) {
    if (what == "clipboard") {
        clearClipboard()
    } else {

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // comandos[workingframe] = []
        convertToImg()
        createNewBrush()

        if (what == "animacao") {
            if (animacao.length > 0) {
                let confirma2 = confirm(
                    "🗑 🎞️ Apagar toda a animação? \n(impossível desfazer)"
                );
                if (confirma2 === true) {
                    animacao = []
                    historia = []
                    workingframe = 0
                    iD("bplayer0").style.backgroundImage = 'none'
                    canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctxF.setTransform(1, 0, 0, 1, 0, 0);
                    ctxF.clearRect(0, 0, canvas.width, canvas.height);

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.setTransform(1, 0, 0, 1, 0, 0);

                    Historia()
                    changeFrame(workingframe)
                    adicionaQuadro()
                }
            }
        }
    }
}

function backPaint() {
    if (globalComposite != "destination-over") {
        globalComposite = "destination-over";
        iD(
            "globalComposite"
        ).innerHTML =
            `<span class="icon2 paintundericon"></span>`;
        Alert(alerts[language][12])

        if (iD("video")) {
            iD("video").setAttribute("class", "destination-over")
        }
        canvasFront.style.zIndex = -1
    } else {
        globalComposite = "source-over";
        iD(
            "globalComposite"
        ).innerHTML =
            `<span class="icon2 paintovericon"></span>`;
        Alert(alerts[language][13])
        removeClass("destination-over")
        canvasFront.style.zIndex = 3
    }
    changeGCO();
    if (mode == "apagar") { modeTo("pintar") }
    iD("globalComposite").classList.add("selected")
    //removeClass()
}

function mudaCorBG(cor) {
    if (cor === "strokeColor") {
        cor = strokeColor;
    }
    if (context.globalCompositeOperation != "destination-out") {
        //context.fillStyle = cor;
        // context.fillRect(0, 0, canvas.width, canvas.height);
        let GCO = context.globalCompositeOperation;
        desenha("b", GCO, cor);
        Historia()
    }
}

//convertToImg() // importate para q haja pelo menos um comando na lista de comandos.

function convertToImg() {
    console.log("convertTo img removed")
    undoLevel = 0
    img_b64 = canvas.toDataURL("image/png");
    // comando =["s", "source-over", img_b64, 0, 0, canvas.width, canvas.height]
    // comandos.unshift(comando)
}