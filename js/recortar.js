var tempImg
var autoCropMax = { x: 0, y: 0 }
var autoCropMin = { x: canvas.width, y: canvas.height };
let cropStart = { x: 0, y: 0 }
var cropEnd = { x: 0, y: 0 };
var newAnima = []
var x2size = 1;

function resetAutoCrop() {
    console.log("reset")
    autoCropMax.x = 0
    autoCropMax.y = 0
    autoCropMin.x = canvas.width
    autoCropMin.y = canvas.height
}
async function autoCrop(x, y, width = 0, height = 0) {
    if (autoCropMax.x < x + redondo(width / 2)) {
        autoCropMax.x = x + redondo(width / 2)
    }
    if (autoCropMax.y < y + redondo(height / 2)) {
        autoCropMax.y = y + redondo(height / 2)
    }
    if (autoCropMin.x > x - redondo(width / 2)) {
        autoCropMin.x = x - redondo(width / 2)
    }
    if (autoCropMin.y > y - redondo(height / 2)) {
        autoCropMin.y = y - redondo(height / 2)
    }
}

function cortar(autoCortar = false) {
    if (autoCortar == true) {
        cropStart.x = autoCropMin.x
        cropStart.y = autoCropMin.y
        cropEnd.x = autoCropMax.x
        cropEnd.y = autoCropMax.y
        setTimeout(() => resetAutoCrop()
            , 1800)
    }
    if (cropEnd.x != 0) {

        limpaRetangulo()
        Historia()
        setTimeout(() => {
            let noy = []
            let nox = []
            let pos = { x: -cropStart.x, y: -cropStart.y }
            if (cropEnd.x < cropStart.x) {
                nox = [cropStart.x, cropEnd.x]
                pos.x = -cropEnd.x;
            } else {
                nox = [cropEnd.x, cropStart.x]
            }
            if (cropEnd.y < cropStart.y) {
                noy = [cropStart.y, cropEnd.y]
                pos.y = -cropEnd.y;
            } else {
                noy = [cropEnd.y, cropStart.y]
            }
            let x0 = redondo(nox[0])
            let y0 = redondo(noy[0])
            let x1 = redondo(nox[1])
            let y1 = redondo(noy[1])
            let W = x0 - x1;
            let H = y0 - y1;
            let oldGCO = context.globalCompositeOperation;
            changeGCO("source-over");
            context.imageSmoothingEnabled = false;
            tamanho(W, H)
            changeGCO(oldGCO);
            var len = animacao.length
            setTimeout(cortarAnima(x0, y0, x1, y1), 600)
            setTimeout(() => { prev_frame() }, 600 + (50 * len))

        }, 200)

    } else { removeClass() };
}

function cut() {
    var cropEnd = { x: 0, y: 0 };
    setTimeout(() => {
        canvasFront.classList.remove("esconde")
        if (cropEnd.x == 0) {

            desenhaRetangulo(autoCropMin.x, autoCropMin.y, autoCropMax.x, autoCropMax.y, "#22b000")
        }
    }, 800)

    swapImg = canvas.toDataURL("image/png");
    blob = dataURItoBlob(swapImg);
    tempImg = document.createElement("img");
    tempImg.src = URL.createObjectURL(blob)

}

function cortarAnima(x1, y1, x2, y2) {
    setTimeout(() => {
        removeClass()
        Alert(alerts[language][16] + "<br>" + alerts[language][17])
    }
        , 10)



    let frame = 0
    let len = animacao.length

    for (i = 0; i <= len; i++) {
        if (i < len) {

            framesToCanvas(x1, y1, x2, y2, i)
        } else {
            setTimeout(() => {
                ctxF.setTransform(1, 0, 0, 1, 0, 0);
                ctxF.clearRect(0, 0, canvasFront.width, canvasFront.height);
                canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
                canvasBack.ctx.clearRect(0, 0, canvasFront.width, canvasFront.height);

                setTimeout(() => { for (i = 0; i < len - 1; i++) { changeFrame(i) } }, 200)

            }, 100)
        }

    }

    function framesToCanvas(x2, y2, x1, y1, frame = 0) {
        let imagem = new Image()
        let W = x2 - x1
        let H = y2 - y1
        canvasFront.width = W
        canvasFront.height = H
        canvasBack.width = W
        canvasBack.height = H
        imagem.width = W
        imagem.height = H
        blob = dataURItoBlob(animacao[frame]);
        imagem.src = URL.createObjectURL(blob);
        imagem.onload =
            function () {
                ctxF.setTransform(1, 0, 0, 1, 0, 0);
                ctxF.clearRect(0, 0, canvasFront.width, canvasFront.height);
                ctxF.drawImage(imagem, x1, y1, x2, y2, 0, 0, x2, y2);
                canvasToFrame(frame)
            }
    }


    setTimeout(() => {
        let len = newAnima.length
        animacao.length = 0
        for (i = 0; i < len; i++) {
            animacao.push(newAnima[i])
        }
        setTimeout(function () {
            setTimeout(() => { adicionaQuadro() }, 30)
            autoCropMax = { x: 0, y: 0 }
            autoCropMin = { x: canvas.width, y: canvas.height };
            cropEnd.x = 0;
            cropEnd.y = 0;
        }, 10)

    }, 100 * len)


}
function canvasToFrame(frame = 0) {
    swapImg = canvasFront.toDataURL('image/png');
    newAnima[frame] = swapImg
    comando = ["s", "source-over", swapImg, 0, 0, canvas.width, canvas.height];
    comandos[workingframe] = []
    comandos[workingframe].push(comando)
    workingframe = frame
    // comandosParaComandosb()

}

function x2(w = iD("largura").value, h = iD("altura").value) {
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
        `\t\t\t\t\t\t${w}px x ${h}px\n\n`
    );
    if (resultado === true) {
        tamanho(w, h)
    }

}

function tamanhom() {
    removeClass();
    iD("menutamanho").classList.toggle("aparece")
}
function tamanho2(W = iD("largura2").value, H = iD("altura2").value) {
    tamanho(W, H)
}
function tamanho3(W = iD("largura2").value, H = iD("altura2").value) {
    iD("largura2").value = W
    iD("altura2").value = H
}
function tamanho(W = iD("largura").value, H = iD("altura").value) {
    iD("carregando").style.display = "none"
    canvasBack = iD("canvasBack")
    canvasDiv.style.width = W + "px"; //add 30px for scroll
    canvasDiv.style.height = H + "px"; //add 30px for scroll
    canvas.width = W;
    canvas.height = H;
    canvasBack.width = W;
    canvasBack.height = H;
    canvasBack.style.marginLeft = -W + "px"
    iD("bplayer0").style.width = W + "px"
    iD("bplayer0").style.height = H + "px"
    iD("bplayer0").style.marginTop = - H - 4 + "px"
    canvasFront.width = W;
    canvasFront.height = H;
    canvasFront.style.marginLeft = -W + "px"

    if (W < screen.width || H < screen.height) {
        ZOOMf(2)
    } else {
        ZOOMf(0)
    }
    iD("largura").value = W
    iD("altura").value = H
    setCenter()
    if (W > 640) {
        historiaLimiteChange(4)
    }
    // setTimeout(() => comandosExec(), 100)
}


function desenhaRetangulo(x0 = cropStart.x, y0 = cropStart.y, x1 = cropEnd.x, y1 = cropEnd.y, cor = "#ff2200") {

    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    ctxF.globalCompositeOperation = "source-over"
    ctxF.lineWidth = 0.5
    ctxF.strokeStyle = cor;

    ctxF.stroke();
    ctxF.setLineDash([2, 2]);
    ctxF.beginPath();
    ctxF.strokeStyle = '#ffffff88'; // Set stroke color with opacity
    ctxF.lineWidth = 1;

    ctxF.rect(
        x0,
        y0,
        (x1 - x0),
        (y1 - y0)
    );

    ctxF.stroke();
    ctxF.fillStyle = '#ff000066'; // Set fill color with opacity
    ctxF.fill();


}
function limpaRetangulo() {
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    ctxF.globalCompositeOperation = "source-over"
}