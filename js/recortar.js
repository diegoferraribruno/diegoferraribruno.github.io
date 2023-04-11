let tempImg

async function autoCrop(x,y,width=0,height=0){
    if (autoCropMax.x < x+(width/2)){
        autoCropMax.x = x+(width/2)
    }
    if (autoCropMax.y < y+(height/2)){
        autoCropMax.y = y+(height/2)
    }
    if (autoCropMin.x > x-(width/2)){
        autoCropMin.x = x-(width/2)
    }
    if (autoCropMin.y > y-(height/2)){
        autoCropMin.y = y-(height/2)
    }
}
function cortar(auto=false) {
    if (auto == true){
        origin.x = autoCropMin.x
        origin.y = autoCropMin.y
        cropEnd.x = autoCropMax.x
        cropEnd.y = autoCropMax.y
        setTimeout(() => {
        autoCropMax = { x: 0, y: 0 }
        autoCropMin = { x: canvas.width, y: canvas.height };}
        ,1000)
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
                //for (i = 0; 1 < len; i++) {
                setTimeout(cortarAnima(x0, y0, x1, y1), 1200)
                //}


            }
        }, 100)

    };
    setTimeout(() => {
        modeTo("recortar")
    }, 200)
}



function cut() {

    swapImg = canvas.toDataURL("image/png");
    save_frame(swapImg)
    blob = dataURItoBlob(swapImg);
    tempImg = document.createElement("img");
    tempImg.src = URL.createObjectURL(blob)

}



function cortarAnima(x1, y1, x2, y2) {
    setTimeout(()=>Alert("recortando o quadro, aguarde."),10)
    let canvass = document.createElement("canvas")
    let contexts = canvass.getContext("2d");
    canvass.id = "canvass"

    let frame = 0
    let len = animacao.length

    for (i = 0; i < len; i++) {
        framesToCanvas(x1, y1, x2, y2, i)
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

    }, 100*len
    )
     len = newAnima.length
    setTimeout(() => {
        prev_frame()
    }, 120*len
    )
    
}
