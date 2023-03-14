const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const canvasV = document.getElementById("canvasV");
const contextV = canvasV.getContext("2d");
let isDrawing = false;
let isGrabing = false;
let isPicking = false;
var isSelecting = false;
let x = 0;
let y = 0;
var offsetX;
var offsetY;
const ongoingTouches = [];

const canvasDiv = document.getElementById("canvas_div");
var globalComposite = "source-over";
var favoritas = [];
var stroke = 1;
var hsla = [0, 100, 50, 1];
var strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var strokeWidth = 0.6;
var estrokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
var estrokeWidth = 36;
var mode = "cores";
var linejoin = "round";
var lineJoinsCount = 0;
const lineJoins = ["miter", "round"];
var ultimoToque = { x: 160, y: 160 };
var zoomFactor = 1;
var zoomScale = [0.5, 1, 2, 4, 8];
var zoomIndex = 1;
var mouseOver = false;
var layer1 = [];
var x2size = 1;
const cursor = document.getElementById("cursor");
const win = document.getElementById("canvas_window");
const desenhoDiv = document.getElementById("desenho_div");
const images = []
var audio = new Audio('./audio/back_001.wav');
var audio2 = new Audio('./audio/click_005.wav');
audio.volume = 0.4;
audio2.volume = 0.4;
var useFrontCamera = true; //moved up from modeto("cam") to test.
var videoStream;
let rotationDeg = 0;
var origin = { x: 0, y: 0 };
var cropEnd = { x: 0, y: 0 };

function cortar() {
    if (cropEnd.x != 0) {
        comandosExec()
        setTimeout(() => {
            let swapImg = [];
            let blob = [];
            swapImg = canvas.toDataURL("image/png");
            blob = dataURItoBlob(swapImg);
            let myImg = document.createElement("img");
            myImg.src = URL.createObjectURL(blob);
            myImg.onload = async function () {
                let noy
                let nox
                let pos = { x: -origin.x, y: -origin.y }
                if (cropEnd.x < origin.x) {
                    nox = [origin.x, cropEnd.x]
                    pos.x = -cropEnd.x;
                } else {
                    nox = [cropEnd.x, origin.x]
                }
                if (cropEnd.y < origin.y) {
                    noy = [origin.y, cropEnd.y]
                    pos.y = -cropEnd.y;
                } else {
                    noy = [cropEnd.y, origin.y]
                }
                canvas.width = nox[0] - nox[1];
                canvas.height = noy[0] - noy[1];
                canvasDiv.style.width = nox[0] - nox[1] + "px"
                canvasDiv.style.height = noy[0] - noy[1] + "px"
                let oldGCO = context.globalCompositeOperation;
                changeGCO("source-over");
                context.imageSmoothingEnabled = false;
                let comando = ["f", "source-over", blob, pos.x, pos.y, myImg.width, myImg.height];
                comandos.length = 0
                comandos.push(comando)
                comandosExec()
                changeGCO(oldGCO);

            }
        }, 100)

    };
    setTimeout(() => {
        modeTo("recortar")
    }, 200)
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
function tamanho() {
    let W = document.getElementById("largura").value
    let H = document.getElementById("altura").value
    canvasDiv.style.width = W + "px"; //add 30px for scroll
    canvasDiv.style.height = H + "px"; //add 30px for scroll
    canvas.width = W;
    canvas.height = H;
    win.style.width = parseInt(window.innerWidth, 10) - 48 + "px";
    win.style.height = parseInt(window.innerHeight, 10) - 48 + "px";
    if (W < screen.width && H < screen.height) {
        zoomIndex = 0;
        modeTo("zoom");
    } else {
        zoomIndex = 3;
        modeTo("zoom");
    }
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
            document.getElementsById("menus").style.top = "90px";

            // alert(`virou, ${screen.width} , ${screen.height}`)

        } else {
            document.getElementById("ferramentas").classList.remove("horizontal");
            document.getElementById("ferramentas2").classList.remove("horizontal2");
            document.getElementsById("menus").style.top = "0px";

        }
        win.style.width = parseInt(window.innerWidth, 10) - 80 + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 20 + "px";

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
function night() {
    let testarray = document.getElementsByClassName("fundobranco");
    let testarray2 = document.getElementsByClassName("day");
    for (let i = 0; i < testarray.length; i++) {
        testarray[i].classList.toggle("night")
    } for (let i = 0; i < testarray2.length; i++) {
        testarray2[i].classList.toggle("night")
    }
}
var input = document.getElementById('input');
input.addEventListener('change', handleFiles);
var input2 = document.getElementById('input2');
input2.addEventListener('change', readURL, true);
var imagem = new Image;

function handleFiles(e) {
    imagem = new Image;
    imagem.src = URL.createObjectURL(e.target.files[0]);
    imagem.onload = function () {
        if (imagem.width > canvas.width) {
            let proporcao = canvas.width / imagem.width
            imagem.height = imagem.height * proporcao
            imagem.width = imagem.width * proporcao
            let centerx = canvas.width / 2 - imagem.width / 2
            let centery = canvas.height / 2 - imagem.height / 2
        }
        desenha("i", globalComposite, imagem, 0, 0, imagem.width, imagem.height)
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
function x2(w = 320, h = 320) {
    let newSize = 320;
    let newSizeb = 320;
    if (x2size < 4) {
        newSize = newSize * x2size;
        newSizeb = newSize * 2;
    } else {

        newSize = 320 * x2size;
        newSizeb = 320;
    }

    var resultado = confirm(
        "\t\t\t\t↔️ Deseja mudar o tamanho da tela de \n" +
        `\t\t\t\t\t\t${newSize}px x ${newSize}px\n` +
        `\t\t\t\t\t\t\tpara\n` +
        `\t\t\t\t\t\t${newSizeb}px x ${newSizeb}px\n\n` +
        `\t\t\t\t\t utilize a lupa 🔎 para zoom \n` +
        `\t\t\t\t e a mão 🖐 para navegar pela tela\n\n`
    );
    if (resultado === true) {
        //dobra o tamanho do canva
        x2size *= 2;
        if (x2size > 4) {
            x2size = 1;
            zoomIndex = 0;
            modeTo("zoom");
            win.style.width = `320px`;
            win.style.height = `320px`;
        } else {
            zoomIndex = 0;
            modeTo("zoom");
        }
        let W = w * x2size;
        let H = h * x2size;
        canvasDiv.style.width = W + "px"; //add 30px for scroll
        canvasDiv.style.height = H + "px"; //add 30px for scroll
        canvas.width = W;
        canvas.height = H;
        win.style.width = parseInt(window.innerWidth, 10) - 60 + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 60 + "px";
    }
    setTimeout(()=> comandosExec(),40)
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
 setTimeout(()=> comandosExec(),40)
}

function startup() {
    Fundo("white")
    Fundo('img/grid3.png')
    counter = setInterval(() => undoing(), 30)
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
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleCancel);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("mousedown", (e) => {
        x = e.offsetX;
        y = e.offsetY;
        if (mode != "picker" && mode != "zoom" && mode != "recortar") {
            isDrawing = true;
        } else if (mode == "zoom") {
            isGrabing = true;
        } else if (mode == "picker") {
            isPicking = true
        } else if (mode == "recortar" && isSelecting == false) {
            isSelecting = true
            origin.x = e.offsetX;
            origin.y = e.offsetY;
        }
        removeClass();
    });
    canvas.addEventListener("mouseenter", (e) => {
        mouseOver = true;
    });
    canvas.addEventListener("mouseout", (e) => {
        mouseOver = false;
        setTimeout(() => {
            if (mouseOver == false) {
                isDrawing = false;
                isGrabing = false;
                isPicking = false;
                isSelecting = false;
            }
        }, 500);
    });
    canvas.addEventListener("mousemove", (e) => {
        if (isDrawing && mode != "picker") {
            desenha(
                "p",
                context.globalCompositeOperation,
                x,
                y,
                e.offsetX,
                e.offsetY,
                strokeColor,
                stroke,
                linejoin
            );
        } else if (isGrabing) {
            ultimoToque.y = e.offsetY;
            ultimoToque.x = e.offsetX;
            scrollCanva(
                (x - ultimoToque.x) * zoomFactor,
                (y - ultimoToque.y) * zoomFactor
            );
        } else if (isPicking) {
            x = e.offsetX;
            y = e.offsetY;
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
        } else if (isSelecting) {
            cropEnd.x = e.offsetX;
            cropEnd.y = e.offsetY;
            context.strokeStyle = "#ccccccdd";
            context.strokeWidth = 0.5
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.setLineDash([1, 1]);
            context.beginPath();
            changeGCO("source-over");
            context.rect(
                origin.x,
                origin.y,
                e.offsetX - origin.x,
                e.offsetY - origin.y
            );
            context.stroke();
            changeGCO("destination-over");
            context.drawImage(
                tempImg,
                0,
                0,
                tempImg.width,
                tempImg.height);
        }
        x = e.offsetX;
        y = e.offsetY;
    });
    canvas.addEventListener("mouseup", (e) => {
        if (isDrawing && mode != "picker") {
            desenha(
                "p",
                context.globalCompositeOperation,
                x,
                y,
                e.offsetX + 1,
                e.offsetY + 1,
                strokeColor,
                stroke,
                linejoin
            );
            ultimoToque.y = e.offsetY;
            ultimoToque.x = e.offsetX;
            x = 0;
            y = 0;
            isDrawing = false;
        } else if (mode == "picker") {
            x = e.offsetX;
            y = e.offsetY;
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
        } else if (mode == "zoom") {
            isGrabing = false;
        } else if (isSelecting) {
            isSelecting = false;
            mostraMenu("recortar")
        }
    });
    document
        .getElementById("btn-download")
        .addEventListener("click", function (e) {
            //   rotacionaCanva(rotationDeg)
            //var dataURL = canvas.toDataURL("image/jpeg", 1.0);
            let nome = prompt("nome da arte:", "desenho");
            if (nome != null && nome != "") {
                var dataURL = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
                //downloadImage(dataURL, 'my-canvas.jpeg');
                downloadImage(dataURL, `${nome}.png`);
            }
        });
    initStrokeRange()
    setTimeout(() => resizeScreen(), 10)
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
        comando = ["r", rotationDeg];
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
}
function undoTEnd() {
    desfazendo = false
}
function undo() {
    let len = comandos.length;
    let posicao = 0
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
            /* case "c":
                 changeGCO(comandos[coma][1]);
                 context.putImageData(
                     comandos[coma][2],
                     comandos[coma][3],
                     comandos[coma][4],
                     comandos[coma][5],
                     comandos[coma][6],
                     comandos[coma][7],
                     comandos[coma][8]);
                 coma++;
                 exec(coma)
                 break*/
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
            }
            break;
        case "i":
            comando = ["i", GCO, imagem, 0, 0, imagem.width, imagem.height]
            context.drawImage(imagem, 0, 0, imagem.width, imagem.height);
            comandos.push(comando)
            break;

        case "b":
            comando = ["b", GCO, X];
            comandos.push(comando)
            context.fillStyle = X; //cor
            context.fillRect(0, 0, canvas.width, canvas.height);
            break;
    }

    if (undoLevel != 0) {
        for (i = 0; i < undoLevel; i++) { comandos.pop() }
        undoLevel = 0
        console.log("daqui pra frente..")
    }

}
function handleStart(evt) {
    evt.preventDefault();
    removeClass();

    const touches = evt.changedTouches;
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    x = touches[0].clientX;
    y = touches[0].clientY;
    for (let i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
    }
    if (mode == "zoom") {
        isGrabing = true;
    }
    if (mode == "recortar" && isSelecting == false) {
        isSelecting = true
        origin.x = touches[0].clientX - offsetX;
        origin.y = touches[0].clientY - offsetY;
    }

}
function changeGCO(GCO = globalComposite) {
    context.globalCompositeOperation = GCO
}
function handleMove(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        const idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) {
            ultimoToque.x = (touches[i].clientX - offsetX) / zoomFactor;
            ultimoToque.y = (touches[i].clientY - offsetY) / zoomFactor;
            if (mode == "recortar") {
                x = (ongoingTouches[idx].clientX - offsetX) / zoomFactor;
                y = (ongoingTouches[idx].clientY - offsetY) / zoomFactor;
            }
            if (mode != "zoom" && mode != "picker" && mode != "recortar") {
                x = (ongoingTouches[idx].clientX - offsetX) / zoomFactor;
                y = (ongoingTouches[idx].clientY - offsetY) / zoomFactor;

                desenha(
                    "p",
                    context.globalCompositeOperation,
                    x,
                    y,
                    ultimoToque.x,
                    ultimoToque.y,
                    strokeColor,
                    stroke,
                    linejoin
                );
                cursor.style.left = (touches[i].clientX) + "px";
                cursor.style.top = (touches[i].clientY) + "px";
                ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
            } else if (isSelecting) {
                console.log(ultimoToque.x, ultimoToque.y)
                cropEnd.x = ultimoToque.x
                cropEnd.y = ultimoToque.y
                context.strokeStyle = "#ffccccdd";
                context.strokeWidth = 0.5
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.setLineDash([1, 1]);
                context.beginPath();
                changeGCO("source-over")
                context.rect(
                    x,
                    y,
                    ultimoToque.x - x,
                    ultimoToque.y - y
                );

                context.stroke();
                changeGCO("destination-over");
                context.drawImage(
                    tempImg,
                    0,
                    0,
                    tempImg.width,
                    tempImg.height);
            }

        }

    }
    if (mode == "picker") {
        const touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const idx = ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
                var imageData = context.getImageData(
                    ultimoToque.x,
                    ultimoToque.y,
                    1,
                    1
                ).data;
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
        }
    }
    if (mode == "zoom") {
        if (isGrabing) {
            for (let i = 0; i < touches.length; i++) {
                const idx = ongoingTouchIndexById(touches[i].identifier);
                if (idx == 0) {
                    scrollCanva(x - touches[0].clientX, y - touches[0].clientY);
                    x = touches[0].clientX;
                    y = touches[0].clientY;
                }
            }
        }
    }
}
function handleEnd(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        let idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) {
            context.lineWidth = strokeWidth;
            context.fillStyle = strokeColor;
            ongoingTouches.splice(idx, 1); // remove it; we're done
        }
    }
    if (mode == "zoom") {
        isGrabing = false;
    }
    if (mode == "recortar") {
        mostraMenu("recortar")
        isSelecting = false
    }
}

function handleCancel(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        let idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1); // remove it; we're done
    }
}

function copyTouch({ identifier, clientX, clientY }) {
    return { identifier, clientX, clientY };
}

function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
        const id = ongoingTouches[i].identifier;
        if (id === idToFind) {
            return i;
        }
    }
    return -1; // not found
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
        "Limpar todo o desenho? \n(impossível desfazer)"
    );
    if (confirma === true) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        comandos = []
        comando = ["b", "destination-out", "#ffffff"];
        comandos.push(comando)
        comandosExec()
        convertToImg()
    }
}

// This mess was made By diego Ferrari Bruno
// good luck finding useful code!
// esta bagunça foi feita pelo Diego,
// boa sorte para encontrar codigos uteis.

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
        oldMode = mode;
        mode = qual;
        removeClass();
        toggleSelect(qual);
        mostraMenu(qual);
    } else {
        mostraMenu(qual);
        if (qual == "cam") {
            removeVideo()
        }
    }
    switch (qual) {
        case "recortar":
            cut()
            mode = qual;
            removeClass();
            break;
        case "rotacionar":
            break;
        case "zoom":
            removeClass();
            zoomIndex++;
            if (zoomIndex > 4) {
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
            setStrokeSize(estrokeWidth);
            cursorColor();
            mudaCorAlpha();
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
            setStrokeSize(strokeWidth);
            setStrokeColor();
            changeGCO();
            memorySwap(globalComposite);
            break;
        case "fundo":
            setStrokeSize(strokeWidth);
            changeGCO();
            memorySwap(globalComposite);
            break;

        case "preencher":
            document.getElementById("preenchercor").style.backgroundColor =
                strokeColor;
            changeGCO();
            break;
        case "picker":
            break;
        case "info":
            break;
        case "undo":
            undo();
            break;
        case "imagem":
            break;
        case _:
            break;
    }
    cursorColor();
}
let tempImg
function cut() {
    swapImg = canvas.toDataURL("image/png");
    blob = dataURItoBlob(swapImg);
    tempImg = document.createElement("img");
    tempImg.src = URL.createObjectURL(blob)

}
function camera() {

    // ok, browser supports it*/
    if (!document.getElementById("videoC")) {

        const botao = document.createElement("div");
        botao.setAttribute("id", "btnChangeCam")
        botao.setAttribute("value", "muda")
        //        botao.setAttribute("class", "bloquinho")
        botao.setAttribute("style", "position: absolute; top: 270px; left:40px; width:32x; height:32px; font-size:32px;")
        botao.innerHTML = "🔃"
        const videoE = document.createElement("video");
        const escala = canvas.height / 320
        videoE.id = "video"
        videoE.height = canvas.height; // in px
        videoE.width = 430 * (escala); // in px
        videoE.setAttribute('style', `position:relative; width:auto; height:auto ;`)

        let vcW = 430 * escala * 2;
        let vcH = 320 * escala * 2;
        const videoC = document.createElement("div");
        videoC.setAttribute("style", `display:flex; width:${vcW}px; height:${vcH}px;`)
        videoC.setAttribute("id", "videoC")
        videoC.appendChild(videoE);
        document.getElementById("tela").appendChild(botao);
        canvasDiv.appendChild(videoC)
        setTimeout(() => win.classList.add("flip"), 900)

        videoE.toggleAttribute("autoplay", "autoplay")
        videoE.toggleAttribute("playsinline", "playsinline")
        if (globalComposite == "destination-over") {
            videoE.setAttribute("class", "destination-over");
        }
        if (
            !"mediaDevices" in navigator ||
            !"getUserMedia" in navigator.mediaDevices
        ) {
            alert("Camera API is not available in your browser");
            return;
        }

        // get page elements
        const video = document.querySelector("#video");
        const canvasV = document.querySelector("#canvasV");
        //Detect camera resolution using pause/play loop.
        var retryCount = 0;
        var retryLimit = 25;
        video.onplaying = function (e) {
            var videoWidth = this.videoWidth;
            var videoHeight = this.videoHeight;
            if (!videoWidth || !videoHeight) {
                if (retryCount < retryLimit) {
                    retryCount++;
                    window.setTimeout(function () {
                        video.pause();
                        video.play();
                    }, 100);
                }
                else {
                    video.onplaying = undefined; //Remove event handler.
                    console.log('Failed to detect camera resolution after ' + retryCount + ' retries. Giving up!');
                }
            }
            else {
                video.onplaying = undefined; //Remove event handler.
                let proporcao = videoWidth / videoHeight
                //diegos magic

                let canvas = document.getElementById("canvas")
                let videoC = document.getElementById("videoC")

                let escala = canvas.width / 320
                let vcW = 430 * escala;
                let vcH = 321 * escala;

                if (proporcao > 1) {
                    canvasV.height = canvas.height
                    canvasV.width = canvas.height * proporcao

                    let offsetW = (parseInt(videoC.style.width, 10) - canvas.width) * escala
                    let offsetH = -canvas.height - 5
                    videoC.setAttribute("style", `margin-top:${offsetH}px; display: flex; width:100%; height:100%; justify-content: center;`)
                } else {
                    proporcao = videoHeight / videoWidth
                    canvasV.width = canvas.width
                    canvasV.height = canvas.width * proporcao

                    let offsetW = (parseInt(videoC.style.height, 10) - canvas.height) * escala
                    let offsetH = - canvas.height * escala - ((canvasV.height - canvas.height) / 2)
                    videoC.setAttribute("style",
                        `margin-top:${offsetH}px; display: flex; width:100%; height:100%; flex-direction: column; justify-content: space-between;`)
                }
            }
        };

        const btnChangeCamera = document.querySelector("#btnChangeCam");

        // switch camera
        btnChangeCamera.addEventListener("click", function () {
            useFrontCamera = !useFrontCamera;
            win.classList.toggle("flip");
            initializeCamera();
        });

        //diego
        video.addEventListener('click', function (e) {

            let W = canvasV.width;
            let H = canvasV.height;
            contextV.drawImage(video, 0, 0, W, H)
            img_b64 = canvasV.toDataURL("image/png");
            blob = dataURItoBlob(img_b64)
            let offsetW = (W - canvas.width) / -2
            let offsetH = (H - canvas.height) / -2

            desenha("f", globalComposite, blob, offsetW, offsetH, canvas.height, canvas.width)
            removeVideo();
        })
        // initialize
        async function initializeCamera() {
            stopVideoStream();
            constraints.video.facingMode = useFrontCamera ? "user" : "environment";

            try {
                videoStream = await navigator.mediaDevices.getUserMedia(constraints);
                video.srcObject = videoStream;
            } catch (err) {
                alert("Could not access the camera");
            }
        }

        initializeCamera();

    }
}
function removeVideo() {
    setTimeout(() => {
        removeElement("videoC")
        removeElement("btnChangeCam")
        if (oldMode == "cam" || oldMode == "zoom") {
            modeTo("apagar")
        } else {
            modeTo(oldMode)
        }
        setTimeout(() => {
            removeClass("flip");
            removeClass();
        }, 200)
        img_b64 = [];
        blob = []
    }, 10)
}
// video constraints
const constraints = {
    video: {
        width: {
            min: 480,
            ideal: 960,
            max: 1920,
        },
        height: {
            min: 320,
            ideal: 640,
            max: 1920,
        },
    },
};

// stop video stream
function stopVideoStream() {
    if (videoStream) {
        videoStream.getTracks().forEach((track) => {
            track.stop();
        });
    }
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
        //    let cor = document.getElementById("H").value - (i*3)
        /*
         paleta += `<span onmousedown='mudaCor("hsla(${cor},${hsla[1] + i * 2}%,${hsla[2] + i * 3
               }%,${hsla[3]
               })")' class='bloquinho' style='background-color:hsla(${cor},${hsla[1] + i * 2
               }%,${hsla[2] + i * 3}%,${hsla[3] * 4 + 0.2});'> </span>`;
               */
        /*  paleta += `<span onmousedown='mudaCor("hsla(${cor},${hue100}%,${hsla[2] + i * 3
               }%,${hsla[3]
               })")' class='bloquinho' style='background-color:hsla(${cor},${hue100}%,${hsla[2] + i * 3}%,${hsla[3] * 4 + 0.2});'> </span>`;
           */
        paleta += `<span onmousedown='mudaCor("hsla(${cor},${hsla[1]}%,${hue100
            }%,${hsla[3]
            })")' class='bloquinho' style='background-color:hsla(${cor},${hsla[1]
            }%,${hue100}%,${hsla[3] * 4});'> </span>`;

    }

    document.getElementById("paleta").innerHTML = paleta;
    document.getElementById("paleta").innerHTML +=
        `<span onmousedown='mudaCor("P")' class='bloquinho' ` +
        "style='background-color:hsla(0, 100%, 0%, " + hsla[3] * 4 + ")'> </span>";
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
    let paleta3 = '<span id="picker" title="Pega cor" class="bloquinho"' +
        'onmousedown="modeTo(`picker`)" style="background-color: rgba(247, 161, 165, 0.15);">💉</span>';
    let c = 0;
    while (c < 7) {
        let cor = (c * 55)
        c++;
        paleta3 += `<span onmousedown='mudaCor("hsla(${cor},100%,50%,${hsla[3]
            })")' class='bloquinho' style='background-color:hsla(${cor},100%,50%,${hsla[3] * 4 + 0.2});'> </span>`;
        document.getElementById("paleta3").innerHTML = paleta3;
    }
} criapaleta3()
let strokeRange = [0.3, 0.5, 0.7, 1, 2]

function initStrokeRange() {
    let r = 2;
    while (r <= 500) {
        r = r * 1.3;
        strokeRange.push(Math.floor(r))
    }
}

function strokeSizeRange(value) {
    setStrokeSize(
        strokeRange[value]
    )
}
function setStrokeSize(value) {
    let brushes = ["mostraCor2", "cursor"];
    for (i in brushes) {
        let tamanho = document.getElementById(brushes[i]);
        if (mode == "pintar" || mode == "cores") {
            strokeWidth = value;
            tamanho.style.width = strokeWidth * zoomFactor + "px";
            tamanho.style.height = strokeWidth * zoomFactor + "px";
            tamanho.style.lineHeight = strokeWidth * zoomFactor + "px";
            tamanho.style.marginTop =
                (strokeWidth / 2) * zoomFactor * -1 + "px";
            tamanho.style.marginLeft =
                (strokeWidth * zoomFactor * -1) / 2 + "px";
            if (i == 0) {
                tamanho.style.backgroundColor = strokeColor;
            }
            stroke = strokeWidth;
            document.getElementById("tpx").value = value;
        } else if (mode == "apagar") {
            estrokeWidth = value;
            tamanho.style.width = estrokeWidth * zoomFactor + "px";
            tamanho.style.height = estrokeWidth * zoomFactor + "px";
            tamanho.style.lineHeight = estrokeWidth * zoomFactor+"px";
          
            tamanho.style.marginTop =
                (estrokeWidth / 2) * zoomFactor * -1 + "px";
            tamanho.style.marginLeft =
                (estrokeWidth * zoomFactor * -1) / 2 + "px";
            stroke = estrokeWidth;
            document.getElementById("tpx2").value = value;
        }
    }
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
        removeClass("destination-over")
    }
    cursor.classList.toggle("cursorIndex");
    cursor.classList.toggle("selected");
    changeGCO();
    modeTo("pintar")
    removeClass()
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
        document.getElementById("A2").value = alpha;
        hsla[0] = hue;
        hsla[1] = saturation;
        hsla[2] = lightness;
        hsla[3] = alpha;
    };
    toHslaObject(strokeColor);
    setStrokeColor();
    criaPaleta();
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
    alert("se você gostou desse app, considere fazer um pix pro Diego continuar o desenvolvimento ou ajude divulgando o app :) 11-962238038 Grato.")
}
function changeLine() {
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
changeLine()
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
    if (zoomFactor==1){
		  setTimeout(
        () =>
		scrollCanva(canvas.width,canvas.height),
        30
    );
		}else{

    setTimeout(
        () =>
            scrollCanva(
                ultimoToque.x * zoomFactor - canvas.width / 2,
                ultimoToque.y * zoomFactor - canvas.height / 2
            ),
        30
    );}
    setTimeout(() => setZoom(zoomFactor, canvasDiv), 10);

    setStrokeSize(strokeWidth);
    document.getElementById("tzoom").value = zoomFactor;
    document.getElementById("zoombar").value =
        zoomScale.indexOf(zoomFactor);
}

function scrollCanva(x, y) {
    win.scrollTop += y;
    win.scrollLeft += x;
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
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
    document.body.style.cursor = "none";
}
function mostra() {
    document.body.style.cursor = "pointer";
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
            break;
        case "picker":
            cursor.innerHTML = '<div style="-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); -ms-transform: scale(-1, 1); transform: scale(-1, 1);width:32px;">💉</div>'
            cursor.style.borderColor = "#00ff0088";
            cursor.style.width = 1 + "px";
            cursor.style.height = 1 + "px";
            cursor.style.margingLeft = 24 + "px";
            cursor.style.margingTop = 24 + "px";
            break;
        case "recortar":
            cursor.innerHTML = "✂️";
            cursor.style.width = 1 + "px";
            cursor.style.height = 1 + "px";
            cursor.style.margingLeft = 24 + "px";
            cursor.style.margingTop = 23 + "px";
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
function Fundo(qual) {
    if (qual === "img") {
        var item = prompt(
            "endereço da imagem de fundo",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/352px-Alan_Turing_Aged_16.jpg"
        );
        if (item == null || item == "") {
            alert("fundo do app removido");
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
            alert("fundo do app removido");
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
}

convertToImg() // importate para q haja pelo menos um comando na lista de comandos.

function convertToImg() {
    img_b64 = canvas.toDataURL("image/png");
    blob = dataURItoBlob(img_b64)
    comando = ["f", "source-over", blob, 0, 0, canvas.width, canvas.height]
    // comandos.unshift(comando)
    comandos.unshift(comando)
}
