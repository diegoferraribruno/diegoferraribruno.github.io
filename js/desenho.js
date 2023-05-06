const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d', { willReadFrequently: true });
const canvasV = document.getElementById("canvasV");
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

const canvasDiv = document.getElementById("canvas_div");
var globalComposite = "source-over";

var mode = "cores";
var ultimoToque = { x: canvas.width / 2, y: canvas.height / 2 };
var mouseOver = false;
var layer1 = [];
const win = document.getElementById("canvas_window");
const desenhoDiv = document.getElementById("desenho_div");
const images = []

var videoStream;
var origin = { x: canvas.width / 2, y: canvas.height / 2 };
var pixelGood = false
let tilepaint = true

var audio2 = new Audio('./audio/back_001.wav');
var audio = new Audio('./audio/switch12.wav');
audio.volume = 0.2;
audio2.volume = 0.4;

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

function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

function comandosExec() {
    if (executing == false) {
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
            case "new_frame()":
                new_frame()
                coma++
                exec(coma)
                break;
            case "FX":
                // alert("filtro" + filters[comandos[coma][1]])
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
                changeBrush(comandos[coma][1], comandos[coma][2], comandos[coma][3])
                coma++;
                exec(coma)
                break;
            case "f":
                let myImg = document.createElement("img");
                blob = dataURItoBlob(comandos[coma][2])
                myImg.src = URL.createObjectURL(blob)
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
                changeGCO("destination-out");
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
                    myImg2 = []
                }
                break;
            case "p":
                drawLine(
                    comandos[coma][1],
                    comandos[coma][2],
                    comandos[coma][3],
                    comandos[coma][4],
                    comandos[coma][5],
                    comandos[coma][6],
                    comandos[coma][7],
                    comandos[coma][8]
                );
                coma++;
                exec(coma)
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
                drawBrush(
                    comandos[coma][1],
                    comandos[coma][2],
                    comandos[coma][3],
                    comandos[coma][4],
                    comandos[coma][5],
                    comandos[coma][6],
                    comandos[coma][7],
                    comandos[coma][8]
                );
                coma++;
                exec(coma)
                break;
        }
    } else {
        // updateCanvasBack()
        executing = false
    }

}

function desenha(
    CMD,
    GCO,
    X = undefined,
    Y = undefined,
    eoX = undefined,
    eoY = undefined,
    strokeColor = undefined,
    stroke = undefined,
    linejoin = undefined
) {
    let comando = []
    switch (CMD) {
        case "FX":
            comando = ["FX", fx]
            comandos.push(comando)
        case "CB":
            comando = ["CB", GCO, X, Y, eoX]
            comandos.push(comando)
            break;
        case "p":
            comando = ["p", GCO, X, Y, eoX, eoY, strokeColor, stroke, linejoin];
            comandos.push(comando)
            drawLine(
                comando[1],
                comando[2],
                comando[3],
                comando[4],
                comando[5],
                comando[6],
                comando[7],
                comando[8]

            );
            autoCrop(X, Y, stroke, stroke)
            break;
        case "f":
            comando = ["f", GCO, X, Y, eoX, eoY, strokeColor]
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
        case "brush":

            comando = ["brush", GCO, X, Y, eoX, eoY, strokeColor, stroke, linejoin]
            drawBrush(GCO, X, Y, eoX, eoY, strokeColor, stroke, linejoin)
            comandos.push(comando)
            autoCrop(X, Y, stroke, stroke)

            if (tilepaint == true) {
                // console.log(X, Y, eoY, eoY)
                if (X < strokeWidth / 2 && Y < strokeWidth) { //top left
                    setTimeout(() => {
                        //top right
                        comando = ["brush", GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeColor, stroke, linejoin)
                        comandos.push(comando)

                        //bottom left
                        comando = ["brush", GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)

                        //bottom right
                        comando = ["brush", GCO, X + canvas.width, Y + canvas.height, eoX + canvas.width, eoY + canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X + canvas.width, Y + canvas.height, eoX + canvas.width, eoY + canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)


                    }, 10)
                } else if (X > canvas.width - strokeWidth / 2 && Y < strokeWidth) {//top right
                    setTimeout(() => {
                        //top left
                        comando = ["brush", GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeColor, stroke, linejoin)
                        comandos.push(comando)
                        //bottom left
                        comando = ["brush", GCO, X - canvas.width, Y + canvas.height, eoX - canvas.width, eoY + canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X - canvas.width, Y + canvas.height, eoX - canvas.width, eoY + canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)

                        //bottom right
                        comando = ["brush", GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)


                    }, 10)
                } else if (X < strokeWidth / 2 && Y > canvas.height - strokeWidth / 2) { //bottom left
                    setTimeout(() => {
                        //bottom right
                        comando = ["brush", GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeColor, stroke, linejoin)
                        comandos.push(comando)

                        //top left
                        comando = ["brush", GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)

                        //top right
                        comando = ["brush", GCO, X + canvas.width, Y - canvas.height, eoX + canvas.width, eoY - canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X + canvas.width, Y - canvas.height, eoX + canvas.width, eoY - canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)


                    }, 10)
                }
                else if (X > canvas.width - strokeWidth / 2 / 2 && Y > canvas.height - strokeWidth / 2) { //bottom right
                    setTimeout(() => {
                        //bottom left
                        comando = ["brush", GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeColor, stroke, linejoin)
                        comandos.push(comando)

                        //top left
                        comando = ["brush", GCO, X - canvas.width, Y + canvas.height, eoX - canvas.width, eoY + canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X - canvas.width, Y - canvas.height, eoX - canvas.width, eoY - canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)

                        //top right
                        comando = ["brush", GCO, X, Y + canvas.height, eoX, eoY - canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)


                    }, 10)
                }
                else if (X < strokeWidth / 2) {
                    setTimeout(() => {
                        comando = ["brush", GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X + canvas.width, Y, eoX + canvas.width, eoY, strokeColor, stroke, linejoin)
                        comandos.push(comando)
                    }, 10)
                } else if (X > canvas.width - strokeWidth / 2) {
                    setTimeout(() => {
                        comando = ["brush", GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X - canvas.width, Y, eoX - canvas.width, eoY, strokeColor, stroke, linejoin)
                        comandos.push(comando)
                    }, 10)


                } else if (Y < strokeWidth) {
                    setTimeout(() => {
                        comando = ["brush", GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X, Y + canvas.height, eoX, eoY + canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)
                    }, 10)
                } else if (Y > canvas.height - strokeWidth / 2) {
                    setTimeout(() => {
                        comando = ["brush", GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeColor, stroke, linejoin]
                        drawBrush(GCO, X, Y - canvas.height, eoX, eoY - canvas.height, strokeColor, stroke, linejoin)
                        comandos.push(comando)
                    }, 10)
                }

            }

            //context.drawImage(brush, X, Y, 8, 8);
            break;


    }

    if (undoLevel != 0) {
        for (i = 0; i < undoLevel; i++) { comandos.pop() }
        undoLevel = 0
        console.log("daqui pra frente..")
    }
    //updateCanvasBack()
}

function changeGCO(GCO = globalComposite) {
    context.globalCompositeOperation = GCO
}

function drawLine(GCO, x1, y1, x2, y2, strokeColor, stroke, linejoin) {
    changeGCO(GCO);
    context.beginPath();
    context.strokeStyle = strokeColor;
    context.lineWidth = stroke;
    context.lineJoin = linejoin;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
}

function limpar(what) {

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    comandos = []
    convertToImg()

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
                for (i = 0; i < 5; i++) {
                    document.getElementById("bplayer" + i).style.backgroundImage = 'none'
                }
                save_frame()
                changeFrame(workingframe)
                adicionaQuadro()

            }
        }
    comandosExec()

    // modeTo(oldMode)
}

let oldMode = mode;

async function modeTo(qual) {
    setTimeout(() => stop(), 300)
    canvasBack.style.backgroundColor = "transparent"
    canvasBack.filter = "none"
    if (mode != qual) {
        if (qual != "recortar") {
            removeClass("flip")
            setTimeout(() => {
                origin.x = 0
                origin.y = 0
            }, 40)
        }
        removeClass();
        toggleSelect(qual);
        if (qual != "apagar") {
            mode = qual
            mostraMenu(qual);

        } else {

            mode = "pintar"
            oldMode = "pintar"
            mostraMenu("pintar");
            Alert(`<span title="Apagar" class="bot" onmousedown="modeTo('apagar')">🧽</span>  ${alerts[language][9]} ${alerts[language][11]} <br> ${alerts[language][7]}`, 1)
            changeGCO("destination-out")
            cursorColor()
        }
    } else {
        removeClass();
        if (qual != "apagar") { mostraMenu(qual); }
        if (qual == "cam") {
            removeVideo()
        }
    }
    switch (qual) {
        case "FX":

            canvasBack.classList.remove("esconde")
            updateCanvasBack()
            mode = "FX";
            break;
        case "salvar":
            // mode = qual;
            break;
        case "recortar":
            /*  let len = comandos.length
              if (len > 1 && comandos[len - 1][0] != "i") {
                  new_frame()
                  console.log("quadro salvo")
              }*/
            cut()

            mode = qual;
            //removeClass();
            break;
        case "rotacionar":
            break;
        case "zoomx":
            //removeClass();
            /*  */
            mode = "zoomx"
            break;
        case "cam":
            mode = qual
            camera();
            changeGCO();
            memorySwap();
            break;
        case "apagar":

            cursorColor()
            /*brushMode = 0;
            setStrokeSize(estrokeWidth);
            cursorColor();
            mudaCorAlpha();*/
            changeGCO("destination-out");
            break;
        case "pintar":
            mode = qual
            setStrokeSize(strokeWidth);
            setStrokeColor();
            changeGCO();
            memorySwap();
            break;
        case "cores":
            changeGCO();
            memorySwap();
            break;
        case "fundo":

            changeGCO();
            memorySwap();
            break;

        case "preencher":
            document.getElementById("preenchercor").style.backgroundColor =
                strokeColor;
            changeGCO();
            break;
        case "picker":
            mode = qual
            // cursorColor()
            break;
        case "info":
            break;
        case "undo":
            undo();
            break;
        case "imagem":
            modeTo(oldMode)
            break;
        case "emoji":
            mode = qual
            // setStrokeSize(strokeWidth);
            // setStrokeColor();
            setTimeout(() => {

                emojiSizeRange();
            }, 40)
            changeGCO();

            break;
        case "FX":
            break;
        case _:
            break;
    }
    cursorColor();
}


function backPaint() {
    if (globalComposite != "destination-over") {
        globalComposite = "destination-over";
        document.getElementById(
            "globalComposite"
        ).innerHTML =
            `<span style="position:relative; width:32px; display:inline-block;  left: 2px; top:0px ;` +
            `padding-top: 0px;">⭕</span> <span style="color:white;` +
            `position:absolute; opacity:0.7;  display:block; width:20px; top:-5px;left:3px; " title="Pintando por baixo">🔲</span> `;
        Alert(example = alerts[language][12])

        if (document.getElementById("video")) {
            document.getElementById("video").setAttribute("class", "destination-over")
        }


    } else {
        globalComposite = "source-over";
        document.getElementById(
            "globalComposite"
        ).innerHTML =
            `<span style="position:relative; width:32px; display:inline-block; left:4px; ` +
            `padding-top: 0px;">🔲</span> <span style="color:white;` +
            `position:absolute;  display:block; width:20px; left: 3px; top:-5px;" title="Pintando por cima">⭕</span> `;
        Alert(example = alerts[language][13])
        removeClass("destination-over")
    }
    cursor.classList.toggle("cursorIndex");
    cursor.classList.toggle("selected");
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