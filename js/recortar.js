var tempImg
var autoCropMax = { x: 0, y: 0 }
var autoCropMin = { x: canvas.width, y: canvas.height };
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
    if (autoCropMax.x < x + (width / 2)) {
        autoCropMax.x = x + (width / 2)
    }
    if (autoCropMax.y < y + (height / 2)) {
        autoCropMax.y = y + (height / 2)
    }
    if (autoCropMin.x > x - (width / 2)) {
        autoCropMin.x = x - (width / 2)
    }
    if (autoCropMin.y > y - (height / 2)) {
        autoCropMin.y = y - (height / 2)
    }
}

function cortar(autoCortar = false) {
    if (autoCortar == true) {
        origin.x = autoCropMin.x
        origin.y = autoCropMin.y
        cropEnd.x = autoCropMax.x
        cropEnd.y = autoCropMax.y
        setTimeout(() => resetAutoCrop()
            , 1800)
    }
    if (cropEnd.x != 0) {

        limpaRetangulo()
        save_frame()
        setTimeout(() => {
            let noy = []
            let nox = []
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
        canvasBack.classList.remove("esconde")
        if (cropEnd.x == 0) {

            desenhaRetangulo(autoCropMin.x, autoCropMin.y, autoCropMax.x, autoCropMax.y, "#22b000")
        }
    }, 30)

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
                canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
                canvasBack.ctx.clearRect(0, 0, canvasBack.width, canvasBack.height);
                setTimeout(() => { for (i = 0; i < len; i++) { changeFrame(i) } }, 200)

            }, 100)
        }

    }

    function framesToCanvas(x2, y2, x1, y1, frame = 0) {
        let imagem = new Image()
        let W = x2 - x1
        let H = y2 - y1
        canvasBack.width = W
        canvasBack.height = H
        imagem.width = W
        imagem.height = H
        blob = dataURItoBlob(animacao[frame]);
        imagem.src = URL.createObjectURL(blob);
        imagem.onload =
            function () {
                canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
                canvasBack.ctx.clearRect(0, 0, canvasBack.width, canvasBack.height);
                canvasBack.ctx.drawImage(imagem, x1, y1, x2, y2, 0, 0, x2, y2);
                canvasToFrame(frame)
            }
    }

    function canvasToFrame(frame = 0) {
        swapImg = canvasBack.toDataURL('image/png');
        newAnima[frame] = swapImg
        blobb = dataURItoBlob(swapImg)
        comando = ["s", "source-over", blobb, 0, 0, canvas.width, canvas.height];
        comandos = []
        comandos.push(comando)
        workingframe = frame
        comandosParaComandosb()

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
        `\t\t\t\t\t\t${w}px x ${h}px\n\n`
    );
    if (resultado === true) {
        //dobra o tamanho do canva
        zoomIndex = 0;
        modeTo("zoomx");
        canvasDiv.style.width = w + "px"; //add 30px for scroll
        canvasDiv.style.height = h + "px"; //add 30px for scroll
        canvas.width = w;
        canvas.height = h;
        win.style.width = parseInt(window.innerWidth, 10) - 60 + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 42 + "px";
        document.getElementById("largura").value = w
        document.getElementById("altura").value = h
    }
    setTimeout(() => comandosExec(), 40)
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
    canvasBack.width = W;
    canvasBack.height = H;
    canvasBack.style.marginLeft = -W + "px"
    for (i = 0; i < 6; i++) {
        document.getElementById("bplayer" + i).style.width = W + "px"
        document.getElementById("bplayer" + i).style.height = H + "px"
        document.getElementById("bplayer" + i).style.marginTop = - H - 4 + "px"
    }

    /* document.getElementById("player").style.height = H + "px"
     document.getElementById("player").style.width = W + "px"
     document.getElementById("player").style.backgroundSize = "cover";
 
     if (W > window.innerWidth) {
         let escala = (window.innerWidth - 8) / W
 
         document.getElementById("player").style.height = H * escala + "px"
         document.getElementById("player").style.width = W * escala + "px"
         document.getElementById("player").style.left = "4px"
         document.getElementById("player").style.top = "4px"
 
     }*/
    if (W < screen.width || H < screen.height) {
        zoomIndex = 0;
        modeTo("zoomx");
    } else {
        zoomIndex = 6;
        modeTo("zoomx");
    }
    document.getElementById("largura").value = W
    document.getElementById("altura").value = H
}


function desenhaRetangulo(x0 = origin.x, y0 = origin.y, x1 = cropEnd.x, y1 = cropEnd.y, cor = "#ff2200") {

    canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasBack.ctx.globalCompositeOperation = "source-over"
    canvasBack.ctx.lineWidth = 0.5
    canvasBack.ctx.strokeStyle = cor;

    canvasBack.ctx.stroke();
    canvasBack.ctx.setLineDash([1, 1]);
    canvasBack.ctx.beginPath();
    canvasBack.ctx.rect(
        x0,
        y0,
        (x1 - x0),
        (y1 - y0)
    );
    canvasBack.ctx.stroke();


}
function limpaRetangulo() {
    canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasBack.ctx.globalCompositeOperation = "source-over"
}