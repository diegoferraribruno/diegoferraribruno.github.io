
var animacao = []
var anime = iD("anime")
var fps = 8

var anime_menu = {
    "prev_frame()": ['<span class="icon backicon"></span>', "Quadro anterior"],
    "play()": ['<span class="icon playticon"></span>', "Tocar Animação"],
    "next_frame()": ['<span class="icon nexticon"></span>', "Próximo quadro"],
    // "swapL()": ["⬅️", "Mover quadro á esquerda"],
    // "swapR()": ["➡️", "Mover quadro á direita"],
    'lixeira()': ['<span class="icon lixeiraicon"></span>', "Arraste um quadro para apaga-lo"]
}

function criaAnime() {

    var uiFilme = iD('ui_filme')
    let contador = document.createElement("div")
    var ui = document.createElement('div')

    anime.innerHTML = `<span id="animebot" title="configurar animação" class="bot" onclick="mostraMenu('anime')"> <span class="bot"> <span class="icon configtimeicon"></span></span>
    </span>`

    Object.keys(anime_menu).forEach((key, index) => {

        let item = document.createElement("div")
        item.setAttribute("onClick", key)
        item.id = key
        item.innerHTML = anime_menu[key][0]
        item.title = anime_menu[key][1]
        item.classList.add("shadow", "bot")
        anime.appendChild(item)

    })
    anime.innerHTML += `<span id="new_frame()" title="Adiconar quadro á animação" class="bot" onclick="new_frame()"> <span class="bot"><span class="icon addframeicon"></span></span>
    </span>`


    contador.innerHTML = workingframe
    contador.id = "contador"
    contador.setAttribute("style", "color:white; z-index:8")
    ui.classList.add("bot", "shadow")
    ui.title = 'Quadros da animação toque para mostrar/esconder'
    ui.setAttribute("onclick", "limpaAnime()")
    ui.innerHTML = '<span class="icon filmicon"></span>'
    ui.appendChild(contador)
    var filme = document.createElement('div')
    filme.id = "filmecontainer"
    filme.classList.add("filme")
    filme.innerHTML = ""
    uiFilme.appendChild(ui)
    uiFilme.appendChild(filme)

}

setTimeout(() => {
    criaAnime();
    setTimeout(() => {
        Historia()
        limpaAnime()
    }, 350)
}, 200)

function limpaAnime() {
    let filme = iD("filmecontainer")
    filme.classList.toggle("hideanime2")
    filme.classList.toggle("filme")

    anime.classList.toggle("hideanime")
}


function criaBackPlayer() {

    var player = document.createElement('div')
    player.id = "bplayer0"
    player.style.display = "block"
    player.style.width = canvas.width + "px"
    player.style.height = canvas.height + "px"
    player.style.position = "absolute"
    player.style.marginTop = - canvas.height - 4 + "px"
    player.classList.add("filter")
    player.classList.add("filterlight")
    player.classList.add("fundo2")
    player.style.zIndex = -1 * i - 1
    player.style.opacity = 0.4
    iD("canvas_div").appendChild(player)
}


criaBackPlayer()

function new_frame() {
    undoLevel = 0
    Historia()
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    workingframe++
    swapImg = canvas.toDataURL('image/png');
    animacao.splice(workingframe, 0, swapImg);
    let work = []
    // comandos.splice(workingframe, 0, work);
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //comandos[workingframe] = []
    //changeBrush()
    // convertToImg()
    changeFrame(workingframe)
    iD("contador").innerHTML = workingframe

}


let playing = 0
var inter

function play() {
    Historia()
    oldMode = mode;
    mode = "play";
    if (animacao.length > 1) {
        iD("play()").innerHTML = ' <span onmousedown="stop()" class="icon stopicon"></span>'
        clearInterval(inter);
        canvasFront.classList.remove("esconde")
        ctxF.globalAlpha = 1;
        ctxF.globalCompositeOperation = 'destination-over'
        if (nightmode) {
            canvasFront.style.backgroundColor = "#333333"
        } else {
            canvasFront.style.backgroundColor = "#eeeeee"
        }
        inter = setInterval(() => {
            playing++;
            if (playing == animacao.length) {
                playing = 0
            }
            playerPlay(playing);
        },
            1000 / fps)
    } else {
        Alert(alerts[language][0])
    }
}
function stop() {
    if (mode == "play") {
        mode = oldMode
    }
    clearInterval(inter);
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvasFront.style.backgroundColor = "transparent"
    iD("play()").innerHTML = '<span class="icon playicon"></span>'
}

function playerPlay(frame) {

    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
    let blabla = new Image()
    blabla.src = animacao[frame]
    ctxF.drawImage(blabla, 0, 0)
}

function changeFrame(frame) {
    let old0 = frame
    let oldGCO = context.globalCompositeOperation
    workingframe = frame
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "source-over"
    canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
    iD("contador").innerHTML = workingframe;

    if (frame > 2) {
        let old3 = frame - 3;
        var image3 = new Image;
        image3.src = animacao[old3]
        image3.onload = function () {
            canvasBack.ctx.globalAlpha = 0.1
            canvasBack.ctx.drawImage(image3, 0, 0, canvasBack.width, canvasBack.height)
        }
    }
    if (frame > 1) {
        let old2 = frame - 2
        var image2 = new Image;
        image2.src = animacao[old2]
        image2.onload = function () {
            canvasBack.ctx.globalAlpha = 0.15
            canvasBack.ctx.drawImage(image2, 0, 0, canvasBack.width, canvasBack.height)
        }
    }
    if (frame > 0) {
        let old1 = frame - 1;
        var image1 = new Image;
        image1.src = animacao[old1]
        image1.onload = function () {

            canvasBack.ctx.globalAlpha = 0.2
            canvasBack.ctx.drawImage(image1, 0, 0, canvasBack.width, canvasBack.height)
        }
    }
    if (background_anim == true) {
        iD("bplayer0").style.backgroundImage = 'url("' + backgroundSprite.src + '")'
        iD("bplayer0").style.backgroundPositionX = - canvas.width * workingframe + "px"
    }
    if (frame < animacao.length - 1) {
        let old4 = frame + 1;
        var image4 = new Image;
        image4.src = animacao[old4]
        image4.onload = function () {
            canvasBack.ctx.globalAlpha = 0.05
            canvasBack.ctx.drawImage(image4, 0, 0, canvasBack.width, canvasBack.height)
        }
    }

    var imageFrame = new Image;
    imageFrame.src = animacao[frame]
    //context.globalAlpha = 0.1
    imageFrame.onload = function () {

        context.drawImage(imageFrame, 0, 0, imageFrame.width, imageFrame.height)
        undoLevel = 0
        setTimeout(() => { context.globalCompositeOperation = oldGCO }, 60)
        scrollFilme()
    }

}

function resetFrame() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    var imageFrame = new Image;
    imageFrame.src = animacao[workingframe]
    context.drawImage(imageFrame, 0, 0, canvasBack.width, canvasBack.height)
}

function next_frame() {
    Historia()
    let len = animacao.length
    if (len > 1) {
        workingframe++
        if (workingframe >= len) {
            workingframe = 0
        }
        changeFrame(workingframe)
    } else {
        Alert(alerts[language][0])
    }

}
function prev_frame() {
    Historia()
    let len = animacao.length
    if (len > 1) {
        workingframe--
        if (workingframe < 0) {
            workingframe = len - 1
            if (workingframe < 0) { workingframe = 0 }
        }
        changeFrame(workingframe)
        iD("contador").innerHTML = workingframe
    } else {
        Alert(alerts[language][0])
    }
}

function changeFPS(valor) {
    fps = valor
    stop()
    play()
}
function changeFPSup() {
    fps++
    if (fps > 60) { fps = 60 }
    iD("fpsnumber").value = fps
    stop()
    play()
}
function changeFPSdown() {
    fps--
    if (fps < 1) { fps = 1 }
    iD("fpsnumber").value = fps
    stop()
    play()
}
function removeFrame() {

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    animacao.splice(workingframe, 1)
    historia.splice(workingframe, 1)
    if (animacao.length > 0) {
        workingframe--
        if (workingframe < 0) {
            workingframe = animacao.length - 1
            if (workingframe < 0) { workingframe = 0 }
        }
        changeFrame(workingframe)
        iD("contador").innerHTML = workingframe

    } else {

        changeFrame(0)
    }
    adicionaQuadro()


}
function cloneFrame(frame = workingframe) {
    workingframe = frame + 1
    animacao.splice(workingframe, 0, animacao[frame]);
    historia.splice(workingframe, 0, historia[frame]);
    changeFrame(workingframe)
    adicionaQuadro()
    Alert("🎞️ " + alerts[language][1] + " " + frame + " " + alerts[language][10])

}

let swapImg = new Image()

var background_anim = false

function changeBackGroundAnimation(frame) {

    if (background_anim == true) {
        iD("bplayer0").style.backgroundImage = 'url("' + backgroundSprite.src + '")'
        iD("bplayer0").style.backgroundPositionX = - canvas.width * frame + "px"
        iD("bplayer0").style.backgroundSize = "initial"

    }
}

function sobreporFundo() {
    iD("bplayer0").style.zIndex = iD("bplayer0").style.zIndex * -1
}


var animSize = 0

async function adicionaQuadro() {
    let filme = iD("filmecontainer")
    filme.innerHTML = ""
    let newFilme = document.createElement("div")
    newFilme.classList.add("filme")
    newFilme.id = "filme"
    animSize = animacao.length
    for (i = 0; i < animSize; i++) {
        let cont = document.createElement("div")
        cont.id = i
        cont.classList.add("quadrofilme", "light")
        cont.addEventListener("dragover", dragOver);
        cont.addEventListener("drop", drop);
        let thumb = document.createElement("div")
        thumb.innerHTML = i
        thumb.style.backgroundImage = 'url("' + animacao[i] + '")';

        thumb.id = i + "thumb"
        thumb.classList.add("thumb")
        thumb.draggable = true
        thumb.addEventListener("click", function (event) {
            let changeToFrame = parseInt(event.target.id, 10)
            if (changeToFrame != workingframe) {
                workingframe = changeToFrame
                changeFrame(workingframe)
            }

        });
        thumb.addEventListener("dragstart", dragStart);
        thumb.addEventListener("dragend", dragEnd);
        cont.appendChild(thumb)
        newFilme.appendChild(cont)

    }
    filme.appendChild(newFilme)
    scrollFilme()
}
function scrollFilme(onde = workingframe) {
    filme.scrollLeft = onde * 32

    removeClass("wf")
    let thum = iD(workingframe + "thumb")
    if (thum) { thum.classList.add("wf") }

}
function lixeira() {
    mostraMenu("lixeira")
}
var dataTransfer = 0
var image2 = new Image;
function dragStart(event) {
    if (event.target.id[0] != "c") {
        dataTransfer = parseInt(event.target.id, 10);
        image2.src = animacao[dataTransfer]
    }
    else {
        dataTransfer = event.target.id
        image2.src = clipboard[parseInt(dataTransfer, 10)]

    }
}

function dragEnd(event) {
}

function dragOver(event) {
    event.preventDefault();
    const toContainer = event.currentTarget;
    if (toContainer.id == "canvas") {
        canvasFront.classList.remove("esconde")
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, canvas.width, canvas.height);
        ctxF.drawImage(image2, event.layerX - image2.width / 2, event.layerY - image2.height / 2)
    }
}

function drop(event) {
    event.preventDefault()
    const toContainer = event.currentTarget;
    if (dataTransfer[0] != "c") {
        if (toContainer.id == "lixeira()" || toContainer.id == "lixeira") {

            console.log(dataTransfer)
            historia.splice(dataTransfer, 1);
            animacao.splice(dataTransfer, 1);
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            workingframe = 0
            if (animacao.length == 0) {
                animacao[workingframe] = []
                Historia()
            }

            changeFrame(0)
            adicionaQuadro()


        } else if (toContainer.id == "new_frame()") {

            cloneFrame(dataTransfer)
        } else if (toContainer.id == "canvas") {
            ctxF.setTransform(1, 0, 0, 1, 0, 0);
            ctxF.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image2, event.layerX - image2.width / 2, event.layerY - image2.height / 2)
            Historia()
            origin.x = 0
            origin.y = 0

        }
        else if (toContainer !== dataTransfer) {

            Alert('<span class="icon filmicon"></span>  ' + dataTransfer + " 🔄 " + toContainer.id, 1.5)
            swapItems(toContainer.id, dataTransfer)
            workingframe = dataTransfer
            changeFrame(workingframe)

        }
    } else {
        if (toContainer.id == "lixeira()") {
            clearClipboard()
        }

    }
}

function clearClipboard() {
    let n = dataTransfer.replace(/^\D+/g, '');// get number from string
    if (n < clipboard.length) {
        clipboard.splice(n, 1);
        Alert(n)
    } else {
        clipboard = []
    }
    setTimeout(() => { updateClipboard() }, 10)
}

function quadrosVisiveis() {
    canvasBack.classList.toggle("esconde")
}


function swapL() {
    let a = workingframe
    let b = workingframe - 1
    if (b < 0) {
        b = comandos.length - 1
    }
    moveObjectAtIndex(animacao, a, b)
    moveObjectAtIndex(historia, a, b)

    changeFrame(b)
    adicionaQuadro()
}


function swapR() {
    let a = workingframe
    let b = workingframe + 1
    if (b >= animacao.length) {
        b = 0
    }

    moveObjectAtIndex(animacao, a, b)
    moveObjectAtIndex(historia, a, b)
    changeFrame(b)
    adicionaQuadro()
}

function moveObjectAtIndex(arr, indexA, indexB) {
    Alert('<span class="icon filmicon"></span>  ' + indexA + " 🔄 " + indexB, 1.5)
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;

};


function swapItems(a = Number, b = Number) {
    comandos[a] = historia.splice(b, 1, comandos[a])[0];
    animacao[a] = animacao.splice(b, 1, animacao[a])[0];
    changeFrame(b)
    adicionaQuadro()
}

function compara(a, b) {
    if (a.length - undoLevel == b.length) {
        return true
    } else {
        return false
    }
}