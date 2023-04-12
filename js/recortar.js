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
        comandosExec()
        setTimeout(() => {
            let swapImg = [];
            let blob = [];
            swapImg = canvas.toDataURL("image/png");
            blob = dataURItoBlob(swapImg);
            let myImg = document.createElement("img");
            myImg.src = URL.createObjectURL(blob);
            myImg.onload = async function () {
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
                canvas.width = W
                canvas.height = H
                canvasDiv.style.width = W + "px"
                canvasDiv.style.height = H + "px"
                let oldGCO = context.globalCompositeOperation;
                changeGCO("source-over");
                context.imageSmoothingEnabled = false;
                let comando = ["f", "source-over", blob, pos.x, pos.y, myImg.width, myImg.height];
                comandos.length = 1
                comandos.push(comando)
                comandosExec()
                tamanho(W, H)
                changeGCO(oldGCO);
                var len = animacao.length
                setTimeout(cortarAnima(x0, y0, x1, y1), 600)
                setTimeout(() => { prev_frame() }, 600 + (50 * len))

            }
        }, 200)

    };
    len = animacao.length
    setTimeout(() => {
        modeTo("salvar")
    }, 300 * len)
}

function cut() {

    swapImg = canvas.toDataURL("image/png");
    save_frame(swapImg)
    blob = dataURItoBlob(swapImg);
    tempImg = document.createElement("img");
    tempImg.src = URL.createObjectURL(blob)

}

function cortarAnima(x1, y1, x2, y2) {
    setTimeout(() => {
        removeClass()
        Alert("recortando o quadro, aguarde.")
    }
        , 10)

    let canvass = document.createElement("canvas")
    let contexts = canvass.getContext("2d");
    canvass.id = "canvass"

    let frame = 0
    let len = animacao.length

    for (i = 0; i < len - 1; i++) {
        framesToCanvas(x1, y1, x2, y2, i)
        console.log(i);
    }

    function framesToCanvas(x2, y2, x1, y1, frame = 0) {
        let imagem = new Image()
        let W = x2 - x1
        let H = y2 - y1
        canvass.width = W
        canvass.height = H
        imagem.width = W
        imagem.height = H
        blob = dataURItoBlob(animacao[frame]);
        imagem.src = URL.createObjectURL(blob);
        imagem.onload =
            function () {
                contexts.setTransform(1, 0, 0, 1, 0, 0);
                contexts.clearRect(0, 0, contexts.canvas.width, contexts.canvas.height);
                contexts.drawImage(imagem, x1, y1, x2, y2, 0, 0, x2, y2);
                canvasToFrame(frame)
            }
    }

    function canvasToFrame(frame = 0) {

        swapImg = canvass.toDataURL('image/png');
        blobb = dataURItoBlob(swapImg)
        newAnima[frame] = swapImg

    }
    setTimeout(() => {
        let len = newAnima.length

        animacao.length = 0
        for (i = 0; i < len; i++) {
            animacao.push(newAnima[i])
        }
        setTimeout(function () {
            swapImg = canvas.toDataURL('image/png');
            blobb = dataURItoBlob(swapImg)
            save_frame(swapImg);

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