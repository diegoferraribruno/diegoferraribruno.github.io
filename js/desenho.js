const canvas = iD("canvas");
const context = canvas.getContext('2d', { willReadFrequently: true });
const canvasV = iD("canvasV");
const contextV = canvasV.getContext("2d", { willReadFrequently: true });

let isDrawing = false;
let isGrabing = false;
let isPicking = false;
var isSelecting = false
var isEmoji = false;
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
let tilepaint = false

var audio2 = new Audio('./audio/back_001.wav');
var audio = new Audio('./audio/switch12.wav');
audio.volume = 0.2;
audio2.volume = 0.4;

let myImg = document.createElement("img");

function tilePaint() {
    tilepaint = !tilepaint
    if (tilepaint == true) {
        Alert('<span title="infinity" class="emoji " id="emo -♾️">♾️</span> ' + alerts[language][6] + "<br>" + alerts[language][7])
    } else {
        Alert(' <span title="infinity" class="emoji " id="emo -♾️">♾️</span> ' + alerts[language][6] + "<br>" + alerts[language][8])
    }
}

function redondo(numero) {
    return Math.floor(numero, 10)
}

function dataURItoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

function comandosExec() {

    if (executing == false) {
        oldBrush = [lastbrush, strokeWidth, strokeColor, globalComposite]
        context.clearRect(0, 0, canvas.width, canvas.height);
        exec();
        executing = true;
    }
}

function exec(coma = 0) {
    let lenc = comandos.length;
    let scope = lenc - undoLevel
    if (scope > coma) {
        switch (comandos[coma][0]) {
            case "move":
                canvasFront.ctx.globalCompositeOperation = "destination-over"
                canvasFront.ctx.globalAlpha = 1;
                canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
                canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvasFront.ctx.save()
                canvasFront.ctx.drawImage(canvas, comandos[coma][1], comandos[coma][2])
                canvasFront.ctx.restore()
                let img_b64 = canvasFront.toDataURL("image/png");
                let blob = dataURItoBlob(img_b64)
                myImg.src = URL.createObjectURL(blob)
                myImg.onload = function () {
                    context.globalAlpha = 1;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    let globaltemp = context.globalCompositeOperation
                    context.globalCompositeOperation = "destination-over";
                    context.drawImage(
                        myImg,
                        0,
                        0);
                    changeGCO(globaltemp)
                    coma++;
                    exec(coma)

                }
                break;
            case "rotacionar":
                canvasFront.ctx.globalCompositeOperation = "destination-over"
                canvasFront.ctx.globalAlpha = 1;
                canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
                canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvasFront.ctx.save()
                canvasFront.ctx.translate(comandos[coma][2], comandos[coma][3])
                canvasFront.ctx.rotate(comandos[coma][1]);
                canvasFront.ctx.drawImage(canvas, -comandos[coma][2], -comandos[coma][3])
                canvasFront.ctx.restore()

                let img_b64c = canvasFront.toDataURL("image/png");
                let blobn = dataURItoBlob(img_b64c)
                myImg.src = URL.createObjectURL(blobn)
                myImg.onload = function () {
                    context.globalAlpha = 1;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    let globaltemp = context.globalCompositeOperation
                    context.globalCompositeOperation = "destination-over";
                    context.drawImage(
                        myImg,
                        0,
                        0);
                    changeGCO(globaltemp)
                    coma++;
                    exec(coma)

                }
                break;

            case "new_frame()":
                new_frame()
                createNewBrush()
                coma++
                exec(coma)
                break;
            case "FX":
                context.filter = "none"
                context.filter = console.log(filters[comandos[coma][1]])
                coma++
                exec(coma)
                break;
            case "NB":
                coma++
                exec(coma)
                break;
            case "CB":
                strokeWidth = comandos[coma][2]
                strokeColor = comandos[coma][3]
                createNewBrush(
                    comandos[coma][1],
                    comandos[coma][2],
                    comandos[coma][3])
                coma++;
                exec(coma)
                break;
            case "f":
                let blobv = dataURItoBlob(comandos[coma][2])
                myImg.src = URL.createObjectURL(blobv)
                myImg.onload = function () {
                    let globaltemp = context.globalCompositeOperation
                    context.globalCompositeOperation = comandos[coma][1];
                    context.drawImage(
                        myImg,
                        comandos[coma][3],
                        comandos[coma][4],
                        myImg.width,
                        myImg.height);
                    changeGCO(globaltemp)
                    coma++;
                    exec(coma)
                }
                break;
            case "s":
                //changeGCO("destination-out");
                context.fillStyle = "#ffffffff";
                context.fillRect(0, 0, canvas.width, canvas.height);
                let myImg2 = document.createElement("img");
                myImg2.src = URL.createObjectURL(comandos[coma][2])
                myImg2.onload = function () {
                    let globaltemp = context.globalCompositeOperation
                    context.globalCompositeOperation = comandos[coma][1]
                    context.drawImage(
                        myImg2,
                        comandos[coma][3],
                        comandos[coma][4],
                        myImg2.width,
                        myImg2.height);
                    changeGCO(globaltemp)
                    coma++;
                    exec(coma)
                }
                break;
            case "i":
                context.globalCompositeOperation = comandos[coma][1]
                context.drawImage(
                    comandos[coma][2],
                    comandos[coma][3],
                    comandos[coma][4],
                    comandos[coma][5],
                    comandos[coma][6]);
                coma++;
                exec(coma)
                break;
            case "img":
                context.globalCompositeOperation = comandos[coma][1]
                context.drawImage(
                    comandos[coma][2],
                    comandos[coma][3],
                    comandos[coma][4],
                    comandos[coma][5],
                    comandos[coma][6]);
                coma++;
                exec(coma)
                break;
            case "b":
                changeGCO(comandos[coma][1]);
                context.fillStyle = comandos[coma][2];
                context.fillRect(0, 0, canvas.width, canvas.height);
                coma++;
                exec(coma)
                break;
            case "r":
                rotacionaCanva(comandos[coma][1])
                coma++;
                exec(coma)
                break;
            case "e":
                changeGCO(comandos[coma][1]);
                context.font = comandos[coma][5] + 'px serif'
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(comandos[coma][4], comandos[coma][2], comandos[coma][3])
                coma++;
                exec(coma)
                break;
            case "brush":
                context.globalCompositeOperation = comandos[coma][1]
                drawBrush(
                    comandos[coma][1],
                    comandos[coma][2],
                    comandos[coma][3],
                    comandos[coma][4],
                    comandos[coma][5],
                    comandos[coma][6]
                );
                coma++;
                exec(coma)
                break;
        }
    } else {
        // updatecanvasFront()

        executing = false
    }

}


function restauraPincel() {
    console.log("olbrush", oldBrush)
    desenha("CB", oldBrush[0], oldBrush[1], oldBrush[2], oldBrush[3])
}

function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}
function desenha(
    CMD,
    GCO,
    X = undefined,
    Y = undefined,
    eoX = undefined,
    eoY = undefined,
    strokeWidth = undefined
) {
    let comando = []
    switch (CMD) {
        case "rotacionar":
            comando = ["rotacionar", GCO, X, Y]
            comandos.push(comando)
            comandosExec()
            break
        case "move":
            comando = ["move", GCO, X]
            comandos.push(comando)
            comandosExec()
            break

        case "brush":

            comando = ["brush", GCO, X, Y, eoX, eoY, strokeWidth]
            drawBrush(GCO, X, Y, eoX, eoY, strokeWidth)
            comandos.push(comando)
            autoCrop(X, Y, strokeWidth, strokeWidth)

            if (tilepaint == true) {
                // console.log(X, Y, eoY, eoY)
                if (X < strokeWidth / 2 && Y < strokeWidth) { //top left
                    setTimeout(() => {
                        //top right
                        comando = ["brush", GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeWidth]
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeWidth)
                        comandos.push(comando)

                        //bottom left
                        comando = ["brush", GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeWidth]
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeWidth)
                        comandos.push(comando)

                        //bottom right
                        comando = ["brush", GCO, X + canvas.width, Y + canvas.height, eoX + canvas.width, eoY + canvas.height, strokeWidth]
                        drawBrush(GCO, X + canvas.width, Y + canvas.height, eoX + canvas.width, eoY + canvas.height, strokeWidth)
                        comandos.push(comando)


                    }, 10)
                } else if (X > canvas.width - strokeWidth / 2 && Y < strokeWidth) {//top right
                    setTimeout(() => {
                        //top left
                        comando = ["brush", GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeWidth]
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeWidth)
                        comandos.push(comando)
                        //bottom left
                        comando = ["brush", GCO, X - canvas.width, Y + canvas.height, eoX - canvas.width, eoY + canvas.height, strokeWidth]
                        drawBrush(GCO, X - canvas.width, Y + canvas.height, eoX - canvas.width, eoY + canvas.height, strokeWidth)
                        comandos.push(comando)

                        //bottom right
                        comando = ["brush", GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeWidth]
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeWidth)
                        comandos.push(comando)


                    }, 10)
                } else if (X < strokeWidth / 2 && Y > canvas.height - strokeWidth / 2) { //bottom left
                    setTimeout(() => {
                        //bottom right
                        comando = ["brush", GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeWidth]
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeWidth)
                        comandos.push(comando)

                        //top left
                        comando = ["brush", GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeWidth]
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeWidth)
                        comandos.push(comando)

                        //top right
                        comando = ["brush", GCO, X + canvas.width, Y - canvas.height, eoX + canvas.width, eoY - canvas.height, strokeWidth]
                        drawBrush(GCO, X + canvas.width, Y - canvas.height, eoX + canvas.width, eoY - canvas.height, strokeWidth)
                        comandos.push(comando)


                    }, 10)
                }
                else if (X > canvas.width - strokeWidth / 2 / 2 && Y > canvas.height - strokeWidth / 2) { //bottom right
                    setTimeout(() => {
                        //bottom left
                        comando = ["brush", GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeWidth]
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeWidth)
                        comandos.push(comando)

                        //top left
                        comando = ["brush", GCO, X - canvas.width, Y + canvas.height, eoX - canvas.width, eoY + canvas.height, strokeWidth]
                        drawBrush(GCO, X - canvas.width, Y - canvas.height, eoX - canvas.width, eoY - canvas.height, strokeWidth)
                        comandos.push(comando)

                        //top right
                        comando = ["brush", GCO, X, Y + canvas.height, eoX, eoY - canvas.height, strokeWidth]
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeWidth)
                        comandos.push(comando)


                    }, 10)
                }
                else if (X < strokeWidth / 2) {
                    setTimeout(() => {
                        comando = ["brush", GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeWidth]
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeWidth)
                        comandos.push(comando)
                    }, 10)
                } else if (X > canvas.width - strokeWidth / 2) {
                    setTimeout(() => {
                        comando = ["brush", GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeWidth]
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeWidth)
                        comandos.push(comando)
                    }, 10)


                } else if (Y < strokeWidth) {
                    setTimeout(() => {
                        comando = ["brush", GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeWidth]
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeWidth)
                        comandos.push(comando)
                    }, 10)
                } else if (Y > canvas.height - strokeWidth / 2) {
                    setTimeout(() => {
                        comando = ["brush", GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeWidth]
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeWidth)
                        comandos.push(comando)
                    }, 10)
                }

            }


            break;

        case "FX":
            comando = ["FX", fx]
            comandos.push(comando)
            break;
        case "CB":
            createNewBrush(GCO, X, Y)
            comando = ["CB", GCO, X, Y]
            comandos.push(comando)
            break;

        case "f":
            comando = ["f", GCO, X, Y, eoX, eoY, strokeWidth]
            blob = dataURItoBlob(X)
            let myImg = document.createElement("img");
            myImg.src = URL.createObjectURL(blob)
            myImg.onload = function () {
                let oldGCO = context.globalCompositeOperation
                changeGCO(globalComposite)
                context.drawImage(
                    myImg,
                    Y,
                    eoX,
                    myImg.width,
                    myImg.height);
                comandos.push(comando)
                changeGCO(oldGCO)
                autoCrop(imagem.width, imagem.height)
                autoCrop(0, 0)
            }
            break;
        case "i":
            comando = ["i", GCO, imagem, 0, 0, imagem.width, imagem.height]
            context.drawImage(imagem, 0, 0, imagem.width, imagem.height);
            comandos.push(comando)
            autoCrop(imagem.width, imagem.height)
            autoCrop(0, 0)
            break;

        case "img":
            comando = ["img", GCO, imagem, 0, 0, imagem.width, imagem.height]
            context.drawImage(imagem, 0, 0, imagem.width, imagem.height);
            comandos.push(comando)
            autoCrop(imagem.width, imagem.height)
            autoCrop(0, 0)
            break;

        case "b":
            comando = ["b", GCO, X];
            comandos.push(comando)
            context.fillStyle = X; //cor
            context.fillRect(0, 0, canvas.width, canvas.height);
            break;
        case "e":
            comando = ["e", GCO, X, Y, eoX, eoY]
            context.font = eoY + 'px serif'
            // use these alignment properties for "better" positioning
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(eoX, X, Y)

            comandos.push(comando)
            if (tilepaint == true) {
                // console.log(X, Y, eoY, eoY)
                if (X < eoY / 2 && Y < eoY / 2) { //top left
                    setTimeout(() => {
                        //top right
                        comando = ["e", GCO, X + canvas.width, Y, eoX, eoY]
                        context.fillText(eoX, X + canvas.width, Y)
                        comandos.push(comando)

                        //bottom left
                        comando = ["e", GCO, X, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y + canvas.height)
                        comandos.push(comando)
                        //bottom right
                        comando = ["e", GCO, X + canvas.width, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X + canvas.width, Y + canvas.height)
                        comandos.push(comando)


                    }, 10)
                } else if (X > canvas.width - eoY / 2 && Y < eoY - 2) {//top right
                    setTimeout(() => {
                        //top left
                        comando = ["e", GCO, X - canvas.width, Y, eoX, eoY]
                        context.fillText(eoX, X - canvas.width, Y)
                        comandos.push(comando)
                        //bottom left
                        comando = ["e", GCO, X - canvas.width, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X - canvas.width, Y + canvas.height)
                        comandos.push(comando)

                        //bottom right
                        comando = ["e", GCO, X, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y + canvas.height)
                        comandos.push(comando)


                    }, 10)
                } else if (X < eoY / 2 && Y > canvas.height - eoY / 2) { //bottom left
                    setTimeout(() => {
                        //bottom right
                        comando = ["e", GCO, X + canvas.width, Y, eoX + canvas.width, eoY]
                        context.fillText(eoX, X + canvas.width, Y)
                        comandos.push(comando)

                        //top left
                        comando = ["e", GCO, X, Y - canvas.height, eoX, eoY - canvas.height]
                        context.fillText(eoX, X, Y - canvas.height)
                        comandos.push(comando)

                        //top right
                        comando = ["e", GCO, X + canvas.width, Y - canvas.height, eoX + canvas.width, eoY - canvas.height]
                        context.fillText(eoX, X + canvas.width, Y - canvas.height)
                        comandos.push(comando)


                    }, 10)
                }
                else if (X > canvas.width - eoY / 2 / 2 && Y > canvas.height - eoY / 2) { //bottom right
                    setTimeout(() => {
                        //bottom left
                        comando = ["e", GCO, X - canvas.width, Y, eoX - canvas.width, eoY]
                        context.fillText(eoX, X - canvas.width, Y)
                        comandos.push(comando)

                        //top left
                        comando = ["e", GCO, X - canvas.width, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X - canvas.width, Y - canvas.height)
                        comandos.push(comando)

                        //top right
                        comando = ["e", GCO, X, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y - canvas.height)
                        comandos.push(comando)


                    }, 10)
                }
                else if (X < eoY / 2) {
                    setTimeout(() => {
                        comando = ["e", GCO, X + canvas.width, Y, eoX, eoY]
                        context.fillText(eoX, X + canvas.width, Y)
                        comandos.push(comando)
                    }, 10)
                } else if (X > canvas.width - eoY / 2) {
                    setTimeout(() => {
                        comando = ["e", GCO, X - canvas.width, Y, eoX, eoY]
                        context.fillText(eoX, X - canvas.width, Y)
                        comandos.push(comando)
                    }, 10)


                } else if (Y < eoY) {
                    setTimeout(() => {
                        comando = ["e", GCO, X, Y + canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y + canvas.height)
                        comandos.push(comando)
                    }, 10)
                } else if (Y > canvas.height - eoY / 2) {
                    setTimeout(() => {
                        comando = ["e", GCO, X, Y - canvas.height, eoX, eoY]
                        context.fillText(eoX, X, Y - canvas.height)
                        comandos.push(comando)
                    }, 10)
                }
            }
            autoCrop(X, Y, eoY, eoY)
            break;


    }

    if (undoLevel != 0) {
        for (i = 0; i < undoLevel; i++) { comandos.pop() }
        undoLevel = 0
        console.log("daqui pra frente..")
    }

}

function changeGCO(GCO = globalComposite) {
    context.globalCompositeOperation = GCO
}


function limpar(what) {

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    comandos = []
    // convertToImg()
    createNewBrush()

    if (what == "animacao")
        if (animacao.length > 0) {
            let confirma2 = confirm(
                "🗑 🎞️ Apagar toda a animação? \n(impossível desfazer)"
            );
            if (confirma2 === true) {
                animacao = []
                comandosb = []
                comandosb.push(comandos)
                workingframe = 0
                iD("bplayer0").style.backgroundImage = 'none'
                canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
                save_frame()
                changeFrame(workingframe)
                adicionaQuadro()

            }
        }
    comandosExec()

}
function mostra() {
    checksave()
    if (mode != "recortar" && mode != "FX") {
        canvasFront.classList.add("esconde")

    }
}


function backPaint() {
    if (globalComposite != "destination-over") {
        globalComposite = "destination-over";
        iD(
            "globalComposite"
        ).innerHTML =
            `<span style="position:relative; width:32px; display:inline-block;  left: 2px; top:0px ;` +
            `padding-top: 0px;">⭕</span> <span style="color:white;` +
            `position:absolute; opacity:0.7;  display:block; width:20px; top:-5px;left:3px; " title="Pintando por baixo">🔲</span> `;
        Alert(example = alerts[language][12])

        if (iD("video")) {
            iD("video").setAttribute("class", "destination-over")
        }


    } else {
        globalComposite = "source-over";
        iD(
            "globalComposite"
        ).innerHTML =
            `<span style="position:relative; width:32px; display:inline-block; left:4px; ` +
            `padding-top: 0px;">🔲</span> <span style="color:white;` +
            `position:absolute;  display:block; width:20px; left: 3px; top:-5px;" title="Pintando por cima">⭕</span> `;
        Alert(example = alerts[language][13])
        removeClass("destination-over")
    }
    changeGCO();
    if (mode == "apagar") { modeTo("pintar") }
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
    }
}


convertToImg() // importate para q haja pelo menos um comando na lista de comandos.

function convertToImg() {
    undoLevel = 0
    img_b64 = canvas.toDataURL("image/png");
    comando = ["f", "source-over", img_b64, 0, 0, canvas.width, canvas.height]
    comandos.unshift(comando)
}