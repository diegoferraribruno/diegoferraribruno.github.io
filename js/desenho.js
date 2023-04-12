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
var favoritas = [];
var stroke = 1;
var hsla = [0, 0, 0, 1];
var strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var strokeWidth = 6;
var estrokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var estrokeWidth = 36;
var mode = "cores";
var linejoin = "round";
var lineJoinsCount = 0;
const lineJoins = ["miter", "round"];
var ultimoToque = { x: canvas.width / 2, y: canvas.height / 2 };
var zoomFactor = 1;
var zoomScale = [0.5, 1, 2, 4, 8, 16, 32];
var zoomIndex = 1;
var mouseOver = false;
var layer1 = [];
var x2size = 1;
const cursor = document.getElementById("cursor");
const win = document.getElementById("canvas_window");
const desenhoDiv = document.getElementById("desenho_div");
const images = []
var audio2 = new Audio('./audio/back_001.wav');
var audio = new Audio('./audio/switch12.wav');
audio.volume = 0.2;
audio2.volume = 0.4;
var videoStream;
let rotationDeg = 0;
var origin = { x: canvas.width / 2, y: canvas.height / 2 };
var cropEnd = { x: 0, y: 0 };
var emoji = "😍"
var pixelGood = false


function redondo(numero) {
    return Math.floor(numero, 10)
}

function rotacionar() {
    rotationDeg = (rotationDeg + 90) % 360,
        console.log(rotationDeg)
    // comandoR()
    canvasDiv.style.width = canvas.width + "px";
    // canvasDiv.height = cw;
    canvasDiv.style.height = canvas.height + "px";
    canvasDiv.setAttribute("style", `-webkit-transform: rotate(${rotationDeg}deg);)
- moz - transform: rotate(${rotationDeg}deg);
-o - transform: rotate(${rotationDeg}deg);
-ms - transform: rotate(${rotationDeg}deg);
transform: rotate(${rotationDeg}deg);`)
    setTimeout(
        () => {
            let cw = canvasDiv.width;
            let ch = canvasDiv.height;
            //if (rotationDeg == 90 || rotationDeg == 270) {
            // canvasDiv.width = ch;
            canvasDiv.style.width = canvas.width + "px";
            // canvasDiv.height = cw;
            canvasDiv.style.height = canvas.height + "px";
            cw = canvasDiv.width;
            ch = canvasDiv.height;

        }, 10
    )
    //}
}
function drawRotated(degrees = 90) {
    var swapImg = [];
    var blob = [];
    swapImg = canvas.toDataURL("image/png");
    blob = dataURItoBlob(swapImg);
    //context2.clearRect(0, 0, c2.width, c2.height);
    let myImg = document.createElement("img");
    myImg.src = URL.createObjectURL(blob);
    myImg.onload = function () {
        let cw = canvas.width;
        let ch = canvas.height;
        if (degrees == 90 || degrees == 270) {
            canvas.width = ch;
            //canvasDiv.style.width = ch + "px";
            canvas.height = cw;
            //canvasDiv.style.height = cw + "px";
            cw = canvas.width;
            ch = canvas.height;
            canvasDiv.style.marginTop = ch - cw
        } else {
            canvas.width = cw;
            canvas.height = ch;
            canvasDiv.style.marginTop = 0
        }

        context.save();
        // translate and rotate
        switch (degrees) {
            case 90:
                context.translate(cw, Math.floor(ch / cw));
                context.rotate(Math.PI / 2);
                break;
            case 180:
                context.rotate(Math.PI);
                context.translate(-cw, -ch);
                break;
            case 270:
                context.translate(-Math.floor(ch / cw), cw);

                context.rotate(Math.PI * 3 / 2);
                break;
        }
        // draw the previows image, now rotated
        context.drawImage(myImg, 0, 0);
        context.restore();
        canvasDiv.style.width = canvas.width + "px";
        canvasDiv.style.height = canvas.height + "px";
    };
}

function tamanhom() {
    removeClass();
    document.getElementById("menutamanho").classList.toggle("aparece")
}
function tamanho(W = document.getElementById("largura").value, H = document.getElementById("altura").value) {
    canvasDiv.style.width = W + "px"; //add 30px for scroll
    canvasDiv.style.height = H + "px"; //add 30px for scroll
    canvas.width = W;
    canvas.height = H;

    for (i = 0; i < 5; i++) {
        document.getElementById("bplayer" + i).style.width = W + "px"
        document.getElementById("bplayer" + i).style.height = H + "px"
        document.getElementById("bplayer" + i).style.marginTop = - H - 4 + "px"
    }

    document.getElementById("player").style.height = H + "px"
    document.getElementById("player").style.width = W + "px"
    document.getElementById("player").style.backgroundSize = "cover";

    if (W > window.innerWidth) {
        let escala = (window.innerWidth - 8) / W

        document.getElementById("player").style.height = H * escala + "px"
        document.getElementById("player").style.width = W * escala + "px"
        document.getElementById("player").style.left = "4px"
        document.getElementById("player").style.top = "4px"

    }
    if (W < screen.width || H < screen.height) {
        zoomIndex = 0;
        modeTo("zoom");
    } else {
        zoomIndex = 6;
        modeTo("zoom");
    }
    document.getElementById("largura").value = W
    document.getElementById("altura").value = H
}
//function handleOrientation() {
var previousOrientation = window.orientation;
var checkOrientation = function () {
    if (window.orientation !== previousOrientation) {
        previousOrientation = window.orientation;
        if (mode == "cam") {
            modeTo("cam"); setTimeout(() => {
                modeTo("cam")
            }, 10);
        }

        if (screen.width > screen.height) {

            document.getElementById("ferramentas").classList.add("horizontal");
            document.getElementById("ferramentas2").classList.add("horizontal2");
            document.getElementById("menus").style.top = "100px";

            // alert(`virou, ${screen.width} , ${screen.height}`)

        } else {
            document.getElementById("ferramentas").classList.remove("horizontal");
            document.getElementById("ferramentas2").classList.remove("horizontal2");
            document.getElementById("menus").style.top = "0px";

        }
        win.style.width = parseInt(window.innerWidth, 10) - 80 + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 20 + "px";

        let escala = (window.innerWidth - 8) / canvas.width

        document.getElementById("player").style.height = H * escala + "px"
        document.getElementById("player").style.width = W * escala + "px"
        document.getElementById("player").style.left = "4px"
        document.getElementById("player").style.top = "4px"

        // orientation changed, do your magic here
    }
};

window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);

// (optional) Android doesn't always fire orientationChange on 180 degree turns
setInterval(checkOrientation, 2000);

function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
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

function prevent(evt) {
    evt.preventDefault();
}

let nightmode = false
function night() {
    let testarray = document.getElementsByClassName("fundobranco");
    let testarray2 = document.getElementsByClassName("light");
    for (let i = 0; i < testarray.length; i++) {
        testarray[i].classList.toggle("dark")
    } for (let i = 0; i < testarray2.length; i++) {
        testarray2[i].classList.toggle("dark")
    }
    nightmode = !nightmode
    if (nightmode) {
        Fundo2('black')
    } else {
        Fundo2("white")
    }

}
var input = document.getElementById('input');
input.addEventListener('change', handleFiles);
var input2 = document.getElementById('input2');
input2.addEventListener('change', readURL, true);
var imagem = new Image;
var backgroundSprite = new Image;
function handleFiles(e) {

    imagem = new Image;
    imagem.src = URL.createObjectURL(e.target.files[0]);
    imagem.onload = function () {
        {
            let ajustar = document.getElementById("ajustar").checked
            if (ajustar === true) {
                tamanho(imagem.width, imagem.height)
            } else if (imagem.width > canvas.width) {
                let proporcao = canvas.width / imagem.width
                imagem.height = imagem.height * proporcao
                imagem.width = imagem.width * proporcao
                let centerx = canvas.width / 2 - imagem.width / 2
                let centery = canvas.height / 2 - imagem.height / 2
            }

            desenha("i", globalComposite, imagem, 0, 0, imagem.width, imagem.height)
        }
    }
}
function readURL() {
    var file = document.getElementById("input2").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        var image = new Image();

        image.src = reader.result;

        image.onload = function () {
            if (image.width > canvas.width) {
                let proporcao = canvas.width / image.width
                image.height = image.height * proporcao
                image.width = image.width * proporcao
            }
            canvasDiv.style.backgroundImage = "url(" + reader.result + ")";
            canvasDiv.style.backgroundSize = `${image.width}px ${image.height}px`
        };
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
    }
}
function x2(w = document.getElementById("largura").value, h = document.getElementById("altura").value) {
    w = w * 2;
    h = h * 2;
    if (w > 2500) {
        w = w / 4;
        h = h / 4;
    }
    var resultado = confirm(
        "\t\t\t\t↔️ Deseja mudar o tamanho da tela de \n" +
        `\t\t\t\t\t\t${w}px x ${h}px\n` +
        `\t\t\t\t\t\t\tpara\n` +
        `\t\t\t\t\t\t${w}px x ${h}px\n\n` +
        `\t\t\t\t\t utilize a lupa 🔎 para zoom \n` +
        `\t\t\t\t e a mão 🖐 para navegar pela tela\n\n`
    );
    if (resultado === true) {
        //dobra o tamanho do canva
        zoomIndex = 0;
        modeTo("zoom");
        canvasDiv.style.width = w + "px"; //add 30px for scroll
        canvasDiv.style.height = h + "px"; //add 30px for scroll
        canvas.width = w;
        canvas.height = h;
        win.style.width = parseInt(window.innerWidth, 10) - 60 + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 60 + "px";
        document.getElementById("largura").value = w
        document.getElementById("altura").value = h
    }
    setTimeout(() => comandosExec(), 40)
}
function toggleHand() {
    if (mode != "zoom") {
        oldMode = mode;
        mode = "zoom";
        toggleSelect("hand");
        cursorColor("zoom");
    } else {
        modeTo(oldMode);
        cursorColor(oldMode);
    }
}
// drawing app

document.addEventListener("DOMContentLoaded", startup);
function resizeScreen() {
    desenhoDiv.style.width = window.innerWidth + "px";
    desenhoDiv.style.height = window.innerHeight + "px";
    if (screen.width > screen.height) {

        document.getElementById("ferramentas").classList.add("horizontal");
        document.getElementById("ferramentas2").classList.add("horizontal2");
        // alert(`virou, ${screen.width} , ${screen.height}`)
        win.style.width = parseInt(window.innerWidth, 10) - 80 + "px";
        win.style.height = parseInt(window.innerHeight, 10) + "px";
        document.getElementById("menus").style.top = "0px";
    } else {
        document.getElementById("ferramentas").classList.remove("horizontal");
        document.getElementById("ferramentas2").classList.remove("horizontal2");
        win.style.width = parseInt(window.innerWidth, 10) + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 132 + "px";
        document.getElementById("menus").style.top = "90px";
    }
    canvasDiv.style.width = canvas.width + "px";
    canvasDiv.style.height = canvas.height + "px";
    if (document.getElementById("player").style.height > window.innerWidth) {
        let escala = (window.innerWidth - 8) / canvas.width

        document.getElementById("player").style.height = canvas.height * escala + "px"
        document.getElementById("player").style.width = canvas.width * escala + "px"
        document.getElementById("player").style.left = "4px"
        document.getElementById("player").style.top = "4px"
    }
    setTimeout(() => comandosExec(), 40)
}

function startup() {
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
        if (event.keyCode === 13 && mode == "recortar") {
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

function salvaImagem() {
    let nome = document.getElementById("filename").value
    if (nome != null && nome != "") {
        var dataURL = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        //downloadImage(dataURL, 'my-canvas.jpeg');
        downloadImage(dataURL, `${nome}.png`);
    } else { Alert("Favor Preencher o nome do arquivo") }
}

function rotacionaCanva(rotationDeg = 0) {
    if (rotationDeg != 0) {

        drawRotated(rotationDeg)

        rotationDeg = 0;
        canvasDiv.setAttribute("style", `-webkit-transform: rotate(${rotationDeg}deg);)
- moz - transform: rotate(${rotationDeg}deg);
-o - transform: rotate(${rotationDeg}deg);
-ms - transform: rotate(${rotationDeg}deg);
transform: rotate(${rotationDeg}deg);`)

    }

}
function comandoR() {
    if (rotationDeg != 0) {
        let comando = ["r", rotationDeg];
        comandos.push(comando)
        rotationDeg = 0
    }
    comandosExec()
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
let keyZ = false
let keyY = false
let keyCtrl = false
var shiftHeld = false;

function handleKeyUp(evt) {
    if (evt.keyCode === 16) {
        shiftHeld = false
        redoTEnd()
    }
    if (evt.keyCode === 17) {
        keyCtrl = false
        redoTEnd()
        undoTEnd()

    }
    if (evt.key === "y") {
        redoTEnd()
        keyY = false
    }
    if (evt.keyCode === 90) {
        keyZ = false
        undoTEnd()

    }
}
function handleKeys(evt) {
    if (evt.keyCode === 90) {
        keyZ = true
    }
    if (evt.keyCode === 16) {
        shiftHeld = true
    }
    if (evt.keyCode === 17) {
        keyCtrl = true
    }
    if (evt.key === "y") {
        keyY = true
    }
    if (keyCtrl) {
        if (keyZ) {
            if (shiftHeld) {
                redoT();
            } else { undoT() }

        } else if (keyY) {
            redoT()
        }

    }
}


function undoing() {
    if (desfazendo == true && refazendo == false) {
        undo()
    }
    if (refazendo == true) {
        redo()
    }

}
var comandos = [];
var comandosb = [];
let desfazendo = false;
let refazendo = false;
var counter;
var counterU;


function undoT() {
    desfazendo = true
    undoing()
}
function undoTEnd() {
    desfazendo = false
}
function undo() {
    let len = comandos.length;
    let posicao = 1
    for (i = 0; i < len; i++) {
        if (i < undoLevel - 1 && (comandos[i][0] == "s")) {
            posicao = i;
        }
    }
    if (undoLevel < len - 1) {
        undoLevel++
        comandosExec(posicao)
    } else {
        audio.play();
        undoTEnd()
    }
}
function redoTEnd() {
    refazendo = false
}
function redoT() {
    refazendo = true
    undoing()
}
function redo() {
    let len = comandos.length;
    let posicao = 0
    for (i = 0; i < len; i++) {
        if (i < undoLevel && comandos[i][0] == "s") {
            posicao = i;
        }
    }
    if (undoLevel > 0) {
        undoLevel--
        comandosExec(posicao)
    } else {
        audio.play();
        redoTEnd()
    }
}


let swapT
let blobb
let swaps = new Array()
let pL
let posicoes = new Array(0)

function memorySwap(GCO) {
    let len = comandos.length;
    if (len > 500) {
        swapImg = canvas.toDataURL('image/png');
        blobb = dataURItoBlob(swapImg)
        comando = ["s", "source-over", blobb, 0, 0, canvas.width, canvas.height];
        swaps.push(comando)
        swapImg = []
        blobb = []
        comando = []

        setTimeout(() => {
            comandos = []
            let lenb = swaps.length
            if (lenb > 8) { swaps.shift() }
            lenb = swaps.length
            for (i = 0; i < lenb; i++) {
                comandos.push(swaps[i]);
            }
            // clearBrushes()
        }, 40)
    }
}
var executing = false
var undoLevel = 0


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

function handleStart(evt) {
    removeClass();
    cursor.style.opacity = 0.4
    changedBrush = false;
    evt.preventDefault();
    origin.x = (evt.pageX - offsetX) / zoomFactor
    origin.y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        origin.x = redondo(origin.x)
        origin.y = redondo(origin.y)
    }
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    if (mode === "recortar") {
        swapImg = canvas.toDataURL("image/png");
        blob = dataURItoBlob(swapImg);
        tempImg = document.createElement("img");
        tempImg.src = URL.createObjectURL(blob);
        isSelecting = true;
    }
    if (mode == "emoji") {
        isEmoji = true
        isDrawing = false
    }
    if (mode == "zoom") {
        isGrabing = true;
    }
    if (mode == "pintar" || mode == "apagar" || mode == "cores") {
        isDrawing = true
        mouseOver = true;

        offsetX = canvas.getBoundingClientRect().left;
        offsetY = canvas.getBoundingClientRect().top;
        x = (evt.pageX - offsetX) / zoomFactor
        y = (evt.pageY - offsetY) / zoomFactor
        if (pixelGood) {
            x = redondo(x)
            y = redondo(y)
        }
        if (brushMode == 0) {
            desenha(
                "p",
                context.globalCompositeOperation,
                x,
                y,
                origin.x,
                origin.y + 0.1,
                strokeColor,
                stroke,
                linejoin
            );
        }
        else {
            desenha(
                "brush",
                context.globalCompositeOperation,
                x,
                y,
                origin.x,
                origin.y,
                strokeColor,
                strokeWidth,
                brushName
            );
        }

    }
    if (mode == "picker") {
        isPicking = true
    }

}


function handleMove(evt) {
    evt.preventDefault();
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    x = (evt.pageX - offsetX) / zoomFactor
    y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        x = redondo(x)
        y = redondo(y)
    }


    let over = checkOverCanvas(x, y)

    if (isSelecting === true) {
        cropEnd.x = x
        cropEnd.y = y
        context.strokeStyle = "#ffccccdd";
        desenhaRetangulo();
    }
    if (isDrawing === true) {
        //  evt.preventDefault();
        mouseOver = true;
        if (brushMode == 0) {
            desenha(
                "p",
                context.globalCompositeOperation,
                x,
                y,
                origin.x,
                origin.y,
                strokeColor,
                stroke,
                linejoin
            );

        } else {
            desenha(
                "brush",
                context.globalCompositeOperation,
                x,
                y,
                origin.x,
                origin.y,
                strokeColor,
                strokeWidth,
                brushName
            );

        }

    }
    if (isPicking) {
        var imageData = context.getImageData(x, y, 1, 1).data;
        if (imageData[3] > 1) {
            RGBAToHSLA(
                imageData[0],
                imageData[1],
                imageData[2],
                imageData[3]
            );
            setStrokeColor();
        }
    }
    if (isGrabing) {
        scrollCanva((origin.x - x) * zoomFactor, (origin.y - y) * zoomFactor);
    }
    if (!isGrabing && mode != "recortar") {
        origin.x = x
        origin.y = y
    }
    cursor.style.left = evt.pageX + "px";
    cursor.style.top = evt.pageY + "px";
    cursor.style.opacity = 0.6

}
function handleUp(evt) {
    cursor.style.opacity = 0
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    let over = checkOverCanvas(evt.pageX, evt.pageY)
    x = (evt.pageX - offsetX) / zoomFactor
    y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        x = redondo(x)
        y = redondo(y)
    }
    if (isSelecting === true && over === true) {
        cropEnd.x = x
        cropEnd.y = y
        desenhaRetangulo();
    }
    if (mode === "emoji" && isEmoji) {
        let size = document.getElementById("emosize").value
        desenha(
            "e",
            context.globalCompositeOperation,
            x,
            y,
            emoji,
            size
        );
        ultimoToque.x = x
        ultimoToque.y = y
        isEmoji = false
    }
    if (mode === "recortar") {
        mostraMenu("recortar")
        isSelecting = false
    }

    if (isPicking) {

        var imageData = context.getImageData(x, y, 1, 1).data;
        if (imageData[3] > 1) {
            RGBAToHSLA(
                imageData[0],
                imageData[1],
                imageData[2],
                imageData[3]
            );
            setStrokeColor();
        }
        isPicking = false
    }
    if (isDrawing) {
        ultimoToque.x = x
        ultimoToque.y = y
        isDrawing = false;
    }
    if (isGrabing) {
        origin.x = x
        origin.y = y
        isGrabing = false;

    }
}

function handleEnd(evt) {
    mouseOver = false;
    setTimeout(() => {
        if (mouseOver == false) {
            isDrawing = false;
            isGrabing = false;
            isPicking = false;
            isSelecting = false;
        }
    }, 500);
}

function handleCancel(evt) {
    evt.preventDefault();
}

function checkOverCanvas(x, y) {
    if (x > canvas.offsetLeft && x < canvas.offsetWidth + canvas.offsetLeft && y > canvas.offsetTop && y < canvas.offsetHeight + canvas.offsetTop) {
        return true;
    } else {
        return false;
    }
}

function desenhaRetangulo() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "destination-over"
    context.lineWidth = 0.5
    context.strokeStyle = "#ff2200";
    context.stroke();
    context.setLineDash([1, 1]);
    context.beginPath();
    context.rect(
        origin.x,
        origin.y,
        (cropEnd.x - origin.x),
        (cropEnd.y - origin.y)
    );
    context.stroke();
    context.globalCompositeOperation = "destination-over";
    context.drawImage(
        tempImg,
        0,
        0,
        tempImg.width,
        tempImg.height);

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

function toggleSelect(id) {
    removeClass("selected");
    document.getElementById(id).classList.toggle("selected");
}

function mostraMenu(id) {
    let quem = document.getElementById("menu" + id);
    quem.classList.toggle("aparece");
}

function removeClass(qual = "aparece") {
    //pega quem tem e remove
    Array.from(document.querySelectorAll(`.${qual}`)).forEach(function (
        el
    ) {
        el.classList.remove(`${qual}`);
    });
}

// Pinceis Cor e Tamanho

function criaPaleta() {
    let paleta = `<span onmousedown='mudaCor("B")'  class='bloquinho' ` +
        "style='background-color:hsla(0, 100%, 100%, " + hsla[3] * 4 + ")'> </span>";
    let hue100 = 100;
    for (i = 1; i < 15; i++) {
        hue100 -= Math.floor(100 / 14)
        let cor = document.getElementById("H").value
        paleta += `<span onmousedown='mudaCor("hsla(${cor},${hsla[1]}%,${hue100
            }%,${hsla[3]
            })")' class='bloquinho' style='background-color:hsla(${cor},${hsla[1]
            }%,${hue100}%,${hsla[3] * 4});'> </span>`;

    }

    document.getElementById("paleta").innerHTML = paleta;

}

function criaPaleta2() {
    let paleta = "";
    let quantas = favoritas.length;
    for (i = 0; i < quantas; i++) {
        paleta += `<span onmousedown='mudaCor("` + favoritas[i] + `")' class='bloquinho' style="background-color:` + favoritas[i] + `"> </span>`
    }
    document.getElementById("paleta2").innerHTML = paleta;
}
function criapaleta3() {
    let paleta3 = '';
    let c = 0;
    while (c < 7) {
        let cor = (c * 55)
        c++;
        paleta3 += `<span onmousedown='mudaCor("hsla(${cor},100%,50%,${hsla[3]
            })")' class='bloquinho' style='background-color:hsla(${cor},100%,50%,${hsla[3] * 4 + 0.2});'> </span>`;
        document.getElementById("paleta3").innerHTML = paleta3;
        document.getElementById("paleta3").innerHTML +=
            `<span onmousedown='mudaCor("hsla(0, 0%, 50%, ` + hsla[3] * 4 + `)")' class='bloquinho' ` +
            "style='background-color:hsla(0, 0%, 50%, " + hsla[3] * 4 + ")'> </span>";
        document.getElementById("paleta3").innerHTML +=
            `<span onmousedown='mudaCor("P")' class='bloquinho' ` +
            "style='background-color:hsla(0, 0%, 0%, " + hsla[3] * 4 + ")'> </span>";
    }
} criapaleta3()

let stroke_range = [1, 2]

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
    let brushes = ["cursor"];
    for (i in brushes) {
        let tamanho = document.getElementById(brushes[i]);
        if (mode == "pintar" || mode == "cores" || mode == "cores" || mode == "picker" || mode == "recortar") {
            strokeWidth = value;
            tamanho.style.width = value * zoomFactor + "px";
            tamanho.style.height = value * zoomFactor + "px";
            tamanho.style.lineHeight = value * zoomFactor + "px";
            tamanho.style.marginTop =
                (value / 2) * zoomFactor * -1 + "px";
            tamanho.style.marginLeft =
                (value * zoomFactor * -1) / 2 + "px";
            if (i == 0) {
                //tamanho.style.backgroundColor = strokeColor;
            }

            stroke = strokeWidth;
            document.getElementById("tpx").value = value;
        } else if (mode == "apagar") {
            estrokeWidth = value;
            tamanho.style.width = estrokeWidth * zoomFactor + "px";
            tamanho.style.height = estrokeWidth * zoomFactor + "px";
            tamanho.style.lineHeight = estrokeWidth * zoomFactor + "px";

            tamanho.style.marginTop =
                (estrokeWidth / 2) * zoomFactor * -1 + "px";
            tamanho.style.marginLeft =
                (estrokeWidth * zoomFactor * -1) / 2 + "px";
            stroke = estrokeWidth;
            document.getElementById("tpx2").value = value;
        }
    }
    changeBrush()
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
function Alert(text) {
    let alert = document.getElementById("menualerta")
    alert.classList.add("aparece")
    let aconteudo = document.getElementById("alertconteudo")
    aconteudo.innerHTML = text;
    setTimeout(() => { closeAlert() }, 2000)

}
function closeAlert() {
    document.getElementById("menualerta").classList.remove("aparece")
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

function mudaCorQ(q = 0, valor) {
    hsla[q] = Number(valor);
    //        if (q == 0){hsla[q]=(hsla[q]*2)%360 }
    setStrokeColor();
    criaPaleta();

}
function mudaCorAlpha() {
    let valor = document.getElementById("transparenciaE").value
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
        document.getElementById(objs[i]).style.backgroundColor = strokeColor;
        document.getElementById(objs[i]).style.background = `linear-gradient(145deg, ${strokeColor},${strokeColor})`
    }
    changeBrush()

}
setStrokeColor();

function mudaCor(valor) {

    if (valor == "P") {
        strokeColor = `hsl(0,100%,0%,${hsla[3]})`;
        document.getElementById("mostraCor").style.color = strokeColor;

        //     document.getElementById("menu").style.visibility = "hidden";
    } else if (valor == "B") {
        strokeColor = `hsla(0,100%,100%,${hsla[3]})`;
        document.getElementById("mostraCor").style.color = strokeColor;
        //     document.getElementById("menu").style.visibility = "hidden";
    } else {
        strokeColor = valor;
        //     document.getElementById("menu").style.visibility = "hidden";
        cursorColor();
    }
    document.getElementById("mostraCor").style.backgroundColor =
        strokeColor;
    document.getElementById("mostraCor2").style.backgroundColor =
        strokeColor;
    document.getElementById("pintar").style.backgroundColor = strokeColor;

    const toHslaObject = (hslaStr) => {
        const [hue, saturation, lightness, alpha] = hslaStr
            .match(/[\d\.]+/g)
            .map(Number);
        document.getElementById("H").value = hue;
        document.getElementById("S").value = saturation;
        document.getElementById("L").value = lightness;
        document.getElementById("A").value = alpha;
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
        "" + lastbrush + strokeWidth + strokeColor)

}
// Save | Download image from stackoverflow
// Convert canvas to image added to startup .getElementById("btn-download")

//function downloadImage(data, filename = 'untitled.jpeg') {
function downloadImage(data, filename = "untitled.png") {
    var a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { confirmLink("apoio.html") }, 1200);
    //
}
function changeLine() {
    brushMode = 0
    lineJoinsCount++;
    if (lineJoinsCount > 1) {
        lineJoinsCount = 0;
    }
    linejoin = lineJoins[lineJoinsCount];
    if (lineJoinsCount != 1) {
        document.getElementById("line").innerHTML = " ➕";
        document.getElementById("line2").innerHTML = " ➕";
    } else {
        document.getElementById("line").innerHTML = " ⚫";
        document.getElementById("line2").innerHTML = " ⚫";
    }
}

////// ZOOM and scroling
function setZoom(zoom, el) {
    transformOrigin = [0, 0];
    el = el || instance.getContainer();
    var p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString =
            transformOrigin[0] + "% " + transformOrigin[1] + "%";

    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;

        document.getElementById("canvas_div2").style.width = canvas.width + "px";
        document.getElementById("canvas_div2").style.height = canvas.height + "px";
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;
    resizeScreen();
}

function ZOOMf(a) {
    let escala = zoomScale[a];
    ZOOM(escala);
}
function ZOOM(a) {
    setZoom(a, canvasDiv);
    //  setZoom(a, canvas_window);
    resetCanva();
    setTimeout(function () {
        win.scrollTop = 0;
        win.scrollLeft = 0;
    }, 10);
    zoomFactor = Number(a);
    setTimeout(
        () =>
            scrollCanva(
                ultimoToque.x * zoomFactor - 160,
                ultimoToque.y * zoomFactor - 160
            ),
        30
    );
    setTimeout(() => setZoom(zoomFactor, canvasDiv), 10);

    setStrokeSize(strokeWidth);
    document.getElementById("tzoom").value = zoomFactor;
    document.getElementById("zoombar").value =
        zoomScale.indexOf(zoomFactor);
    document.getElementById("x1").innerHTML = zoomFactor + "x";

}

function scrollCanva(a, b) {
    win.scrollLeft += a;
    win.scrollTop += b;
}
function resetCanva() {
    let objects = ["canvas_window", "canvas_div"];
    for (i in objects.length) {
        document.getElementById(objects[i]).style.width = "320px";
        document.getElementById(objects[i]).style.height = "320px";
    }
}

// cursor area //

function cursorMove(e) {
    var x = e.clientX
    var y = e.clientY

    cursor.style.left = x - 1 + "px";
    cursor.style.top = y + 1 + "px";
    document.body.style.cursor = "none";
    cursor.style.visibility = "visible";
}
function mostra() {
    document.body.style.cursor = "pointer";
    cursor.style.visibility = "hidden";
}

function cursorColor() {
    switch (mode) {
        case "apagar":
            cursor.style.borderColor = "#555555cc";
            cursor.innerHTML = "<div style='font-size:16px; margin-top:4px;'>🧽</div>";
            break;
        case "pintar":
            cursor.innerHTML = "";
            cursor.style.borderColor = strokeColor;
            break;
        case "zoom":
            cursor.innerHTML = "🖐";
            setTimeout(() => { cursor.style.backgroundImage = "none"; }, 20)
            break;
        case "picker":
            setStrokeSize(2)
            cursor.innerHTML = '<div style="-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); -ms-transform: scale(-1, 1); transform: scale(-1, 1);width:32px; margin-top:12px; margin-left:-3px;">💉</div>'
            cursor.style.borderColor = "#000000ee";
            cursor.style.width = 2 + "px";
            cursor.style.height = 1 + "px";
            cursor.style.margingLeft = 24 + "px";
            cursor.style.margingTop = 52 + "px";
            cursor.style.opacity = 1
            break;
        case "recortar":

            cursor.innerHTML = '<div style="width:32px; margin-top:0px; margin-left:-12px;">✂️</div>'
            cursor.style.width = 2 + "px";
            cursor.style.height = 1 + "px";
            cursor.style.margingLeft = 24 + "px";
            cursor.style.margingTop = 52 + "px";
            cursor.style.opacity = 1
            break;
        case "cam":
            cursor.innerHTML = "📷";
            break;


        default:
            cursor.innerHTML = "";
            cursor.style.borderColor = strokeColor;
            break;
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
function emojiSizeRange() {
    valor = document.getElementById("emosize").value
    cursor.style.width = 0 + "px";
    cursor.style.height = 0 + "px";
    cursor.style.lineHeight = 1 + "px";
    cursor.style.marginTop = 0 + "px";
    cursor.style.marginLeft = 0 + "px";
    valor = valor * zoomFactor
    document.getElementById("emoExemplo").style.fontSize = valor + "px"
    cursor.innerHTML = '<span id="emoExemplo2" style="position:absolute; display:block; margin-left:-' + valor / 2 + 'px; height:' + valor + 'px; margin-top:-' + valor / 10 + 'px; ">' + emoji + '</span>'
    document.getElementById("emoExemplo2").style.fontSize = valor + "px"
}
function emojipicker() {

    let emojip = document.getElementById("emojipicker");
    if (emojip.style.display == "none") {
        emojip.style.display = "block";
    }
    else {
        emojip.style.display = "none";
    }
}
function trocaEmoji(emo) {
    emoji = emo
    emoExemplo.innerHTML = emo
    emojiSizeRange(document.getElementById("emosize").value)
    emoexemplo = document.getElementById("emoexemplo")

}

function hidecustom() {
    document.getElementById("custom").classList.toggle("esconde")
}
