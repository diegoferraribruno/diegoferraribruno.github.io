const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const canvasV = document.getElementById("canvasV");
const contextV = canvasV.getContext("2d");
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
var audio2 = new Audio('./audio/back_001.wav');
var audio = new Audio('./audio/switch12.wav');
audio.volume = 0.2;
audio2.volume = 0.4;
var videoStream;
var origin = { x: canvas.width / 2, y: canvas.height / 2 };
var pixelGood = false


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



// drawing app

document.addEventListener("DOMContentLoaded", startup);

function startup() {
    window.addEventListener("resize", checkOrientation, false);
    window.addEventListener("orientationchange", checkOrientation, false);

    // (optional) Android doesn't always fire orientationChange on 180 degree turns
    setInterval(checkOrientation, 2000);
    window.scrollTo(0, 1600);
    setTimeout(() => {
        window.scrollTo(0, 400)
        setTimeout(window.scrollTo(0, 0), 160)
    }, 1000);

    document.querySelector('emoji-picker').addEventListener('emoji-click', function onEvent(detail) {
        trocaEmoji(event.detail.unicode);
        emojipicker();
    });
    Fundo("none")
    counter = setInterval(() => undoing(), 70)
    document.onkeydown = function (event) {
        //on enter key
        console.log(event.key)
        if (event.key === "Enter" && mode == "recortar") {
            cortar();
        }
    };
    modeTo("pintar")
    removeClass();

    document.getElementById(
        "globalComposite"
    ).innerHTML =
        `<span style="position:absolute; float:right; width:32px; display:block; ` +
        `padding-top: 0px;">🔲</span> <span style="color:white;` +
        `position:relative;  display:block; float:left; width:20px; margin-top:-5px;" title="Pintando por cima">⭕</span> `;
    window.addEventListener("resize", function (event) {
        resizeScreen();
    });
    resizeScreen();
    document.getElementById("undo").addEventListener(
        "touchstart",
        (event) => {
            event.preventDefault();
            undoT();
        },
        false
    );
    document.getElementById("undo").addEventListener(
        "touchend",
        (event) => {
            event.preventDefault();
            undoTEnd();
        },
        false
    );
    document.getElementById("redo").addEventListener(
        "touchstart",
        (event) => {
            event.preventDefault();
            redoT();
        },
        false
    );
    document.getElementById("redo").addEventListener(
        "touchend",
        (event) => {
            event.preventDefault();
            redoTEnd();
        },
        false
    );
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeys);

    document.getElementById("zoombar").value =
        zoomScale.indexOf(zoomFactor);

    desenhoDiv.addEventListener("gesturestart", prevent);
    win.addEventListener("touchmove", prevent);
    canvas.addEventListener("pointerdown", handleStart);
    canvas.addEventListener("pointerup", handleUp);
    canvas.addEventListener("pointercancel", handleCancel);
    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleEnd);

    initStrokeRange()
    setTimeout(() => resizeScreen(), 10)
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
            case "CB":
                if (!changedBrush) {
                    strokeColor = comandos[coma][3]
                    strokeWidth = comandos[coma][2]
                    changeBrush(comandos[coma][1], comandos[coma][2], comandos[coma][3], comandos[coma][4])
                }
                coma++;
                exec(coma)
                break;
            case "f":
                let myImg = document.createElement("img");
                myImg.src = URL.createObjectURL(comandos[coma][2])
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
                    myImg = []
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
            let myImg = document.createElement("img");
            myImg.src = URL.createObjectURL(X)
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
            autoCrop(X, Y, eoY, eoY)
            break
        case "brush":
            comando = ["brush", GCO, X, Y, eoX, eoY, strokeColor, stroke, linejoin]

            drawBrush(GCO, X, Y, eoX, eoY, strokeColor, stroke, linejoin)
            //context.drawImage(brush, X, Y, 8, 8);
            comandos.push(comando)
            autoCrop(X, Y, stroke, stroke)
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

function clearArea() {
    let confirma = confirm(
        "🗑 🖼️ Limpar o quadro? \n(impossível desfazer)"
    );

    if (confirma === true) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        comandos = []
    }
    if (animacao.length > 0) {
        let confirma2 = confirm(
            "🗑 🎞️ Apagar toda a animação? \n(impossível desfazer)"
        );
        if (confirma2 === true) {
            animacao = []
            workingframe = 0
            for (i = 0; i < 5; i++) {
                document.getElementById("bplayer" + i).style.backgroundImage = 'none'
            }
            changeFrame(workingframe)

        }
    }
    convertToImg()
    comandosExec()

    modeTo(oldMode)
}

let oldMode = mode;

async function modeTo(qual) {
    if (mode != qual) {
        if (qual != "recortar") {
            removeClass("flip")
            setTimeout(() => {
                origin.x = 0
                origin.y = 0
            }, 40)
        }
        /*				if (oldMode == "rotacionar" && rotationDeg != 0){
                    comandoR()
                    comandosExec()
                }*/

        removeClass();
        toggleSelect(qual);
        if (qual != "apagar") {
            oldMode = mode;
            mode = qual;
            mostraMenu(qual);
        } else {
            mode = "pintar"
            oldMode = "pintar"
            mostraMenu("pintar");
        }
    } else {
        if (qual != "apagar") { mostraMenu(qual); }
        if (qual == "cam") {
            removeVideo()
        }
    }
    switch (qual) {
        case "salvar":
            mode = qual;
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
        case "zoom":
            //removeClass();
            zoomIndex++;
            if (zoomIndex > 6) {
                zoomIndex = 0;
            }
            ZOOMf(zoomIndex);
            setTimeout(function () {
                document.getElementById("x1").innerHTML = zoomFactor + "x";
                scrollCanva(-620 * zoomFactor, -620 * zoomFactor);
            }, 10);
            cursorColor();
            toggleSelect(qual);
            resizeScreen()
            mode = "zoom"
            break;
        case "cam":

            camera();
            changeGCO();
            memorySwap(globalComposite);
            break;
        case "apagar":
            /*brushMode = 0;
            setStrokeSize(estrokeWidth);
            cursorColor();
            mudaCorAlpha();*/
            changeGCO("destination-out");
            //memorySwap("destination-out");

            break;
        case "pintar":
            setStrokeSize(strokeWidth);
            setStrokeColor();
            changeGCO();
            memorySwap(globalComposite);
            break;
        case "cores":
            //  setStrokeSize(strokeWidth);
            //  setStrokeColor();
            changeGCO();
            memorySwap(globalComposite);
            break;
        case "fundo":
            //  setStrokeSize(strokeWidth);
            changeGCO();
            memorySwap(globalComposite);
            break;

        case "preencher":
            document.getElementById("preenchercor").style.backgroundColor =
                strokeColor;
            changeGCO();
            break;
        case "picker":
            cursorColor()
            break;
        case "info":
            break;
        case "undo":
            undo();
            break;
        case "imagem":
            break;
        case "emoji":
            // setStrokeSize(strokeWidth);
            // setStrokeColor();
            setTimeout(() => {

                emojiSizeRange();
            }, 40)
            changeGCO();

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
            `<span style="position:absolute; width:30px; ` +
            `display:block; color:white; margin-left:-4px; margin-top:-5px;">⭕</span> ` +
            `<span style="position:relative; float:left; width:30px; display:block;  ` +
            `color:black; left:1px; margin-top:0px;" title="Pintando por baixo">🔲</span>`;
        Alert("⚠️ Pintando por <b>baixo</b>")

        if (document.getElementById("video")) {
            document.getElementById("video").setAttribute("class", "destination-over")
        }


    } else {
        globalComposite = "source-over";
        document.getElementById(
            "globalComposite"
        ).innerHTML =
            `<span style="position:absolute; float:right; width:32px; display:block; ` +
            `padding-top: 0px;">🔲</span> <span style="color:white;` +
            `position:relative;  display:block; float:left; width:20px; margin-top:-5px;" title="Pintando por cima">⭕</span> `;
        Alert("⚠️ Pintando por <b>cima</b>")
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


function Fundo2(qual) {
    let bgcor = "hsla(0, 100%, 10%, 0.6)"
    if (qual === "black") {
        bgcor = "hsla(0, 0%, 10%, 0.6)";
    } else if (qual === "white") {
        bgcor = "hsla(0, 0%, 90%, 0.6)";
    }
    win.style.backgroundColor = bgcor;
    for (i = 0; i < 5; i++) {
        document.getElementById("bplayer" + i).style.backgroundColor = bgcor
    }
}
function Fundo(qual) {
    if (qual === "img") {
        var item = prompt(
            "endereço da imagem de fundo",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/352px-Alan_Turing_Aged_16.jpg"
        );
        if (item == null || item == "") {
            //alert("fundo do app removido");
            canvasDiv.style.backgroundImage = `none`;
        } else {
            canvasDiv.style.backgroundImage = `url(${item})`;
        }
    } else if (qual === "cam") {
        var item = prompt(
            "endereço da imagem de fundo",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/352px-Alan_Turing_Aged_16.jpg"
        );
        if (item == null || item == "") {
            Alert("fundo do app removido");
            canvasDiv.style.backgroundImage = `none`;
        } else {
            canvasDiv.style.backgroundImage = `url(${item})`;
        }
    } else if (qual === "black") {
        canvasDiv.style.backgroundColor = "hsla(0, 100%, 0%, 1)";
    } else if (qual === "white") {
        canvasDiv.style.backgroundColor = "hsla(0, 100%, 100%, 1)";
    } else if (qual === "none") {
        canvasDiv.style.backgroundImage = `none`;
        canvasDiv.style.backgroundColor = "hsla(0, 100%, 100%, 0)";
    } else {
        canvasDiv.style.backgroundImage = `url(${qual})`;
    }
}
function pixel() {
    canvas.classList.toggle("pixel");
    canvasDiv.classList.toggle("pixel");
    pixelGood = !pixelGood
}

convertToImg() // importate para q haja pelo menos um comando na lista de comandos.

function convertToImg() {
    img_b64 = canvas.toDataURL("image/png");
    blob = dataURItoBlob(img_b64)
    comando = ["f", "source-over", blob, 0, 0, canvas.width, canvas.height]
    comandos.unshift(comando)
}