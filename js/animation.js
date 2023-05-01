var anime = document.getElementById("anime")
var fps = 8
var animacao = []


var anime_menu = {
    "prev_frame()": ["⏮️", "Quadro anterior"],
    "play()": ["▶️", "Tocar Animação"],
    "next_frame()": ["⏭️", "Próximo quadro"],
    "swapL()": ["⬅️", "Mover quadro á esquerda"],
    "swapR()": ["➡️", "Mover quadro á direita"],
    "mostraMenu('anime')": ["⏱️", "Ajustes da Animação"],
    "new_frame()": ["➕", "Adiciona Quadro"],
   'lixeira()':["🗑","Arraste um quadro para apaga-lo"]
}

function criaAnime() {

    var uiFilme = document.getElementById('ui_filme')
    let contador = document.createElement("div")
    var ui = document.createElement('div')

    anime.classList.add("anime")
    //<!--🚀-->
    anime.innerHTML = ""
    Object.keys(anime_menu).forEach((key, index) => {
        // setTimeout(() => {
        let item = document.createElement("div")
        item.setAttribute("onClick", key)
        item.id = key
        item.innerText = anime_menu[key][0]
        item.title = anime_menu[key][1]
        item.classList.add("shadow", "bot")
        anime.appendChild(item)
        //}, 80 * index)
    })

    contador.innerHTML = workingframe
    contador.id = "contador"
    ui.classList.add("bot", "shadow")
    ui.title = 'Anime player'
    ui.setAttribute("onclick", "limpaAnime()")
    ui.innerHTML = "🎞️"
    ui.appendChild(contador)
    // uiFilme.innerHTML = "<div  id='ui' class=' bot shadow ' title= onclick='limpaAnime()'> </div>"
    var filme = document.createElement('div')
    filme.id = "filme"
    filme.innerHTML = ""
    //filme.style.display = "block"
    uiFilme.appendChild(ui)
    uiFilme.appendChild(filme)

}

setTimeout(() => {
    criaAnime();
    setTimeout(() => save_frame(), 350)
}, 200)
//setTimeout(() => { limpaAnime() }, 1200)

function limpaAnime() {
    filme.classList.toggle("hideanime")
}
//limpaanime()
/*function criaPlayer() {

    var player = document.createElement('div')
    player.id = "player"
    // player.classList.add("fundo2")
    player.classList.add("fundobranco")

    player.style.width = canvas.width + "px"
    player.style.height = canvas.height + "px"
    player.style.position = "absolute"
    player.style.display = "block"
    player.style.marginLeft = "auto"
    player.style.marginRight = "auto"
    player.style.marginTop = "auto"
    player.style.marginBottom = "auto"
    player.style.borderRadius = "0px"

    // player.style.top = "10px"
    player.backgroundSize = "cover"
    //player.style.left = "10px"
    player.style.border = "1px solid #88ccee"
    player.style.display = "none"
    player.style.zIndex = 1000
    player.setAttribute("onmousedown", "stop()")
    document.getElementById("canvas_div2").appendChild(player)
    setTimeout(() => {
        var inputSprite = document.getElementById('inputSprite');
        inputSprite.addEventListener('change', importSprite);
    }, 10)

}

criaPlayer()*/


function criaBackPlayer() {
    for (i = 0; i < 6; i++) {
        var player = document.createElement('div')
        player.id = "bplayer" + i
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
        document.getElementById("canvas_div").appendChild(player)
    }

}

criaBackPlayer()

let workingframe = 0

function new_frame() {
    undoLevel = 0
    let len = comandos.length
    save_frame()
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    workingframe++
    swapImg = canvas.toDataURL('image/png');
    animacao.splice(workingframe, 0, swapImg);
    changeFrame(workingframe)
    document.getElementById("contador").innerHTML = workingframe

}
function save_frame(imagem = canvas.toDataURL('image/png')) {
    animacao[workingframe] = imagem
    comandos = []
    convertToImg()
    setTimeout(() => {
        adicionaQuadro();
        console.log("save frame de novo")
    }, 50)

}

let playing = 0
var inter

function play() {
    oldMode = mode;
    mode = "play";

    let len = comandos.length
    if (len > 1 && comandos[len - 1][0] != "i") {
        save_frame()
    }
    if (animacao.length > 1) {
        document.getElementById("play()").innerHTML = ' <span onmousedown="stop()" >⏹️</span>'
        clearInterval(inter);
        canvasBack.classList.remove("esconde")
        canvasBack.style.backgroundColor = "#ffffff"
         inter = setInterval(() => {

            playing++;
            if (playing == animacao.length) {
                playing = 0
            }
            playerPlay(playing);


        },
            1000 / fps)
    } else {
        Alert("Por favor,<br> adicione ➕ quadros a sua animação")
    }
}
function stop() {
    if (mode == "play"){
        mode = oldMode
    }
    clearInterval(inter);
    canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasBack.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvasBack.style.backgroundColor = "transparent"
    document.getElementById("play()").innerHTML = "▶️"
}

function playerPlay(frame) {
    canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasBack.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    let blabla = new Image()
    blabla.src = animacao[frame]
    canvasBack.ctx.drawImage(blabla, 0, 0)
    // document.getElementById("player").style.backgroundImage = 'url("' + animacao[frame] + '")';
}

function changeFrame(frame) {
    let old0 = frame
    workingframe = frame

    document.getElementById("contador").innerHTML = workingframe;
    if (frame > 0) {
        let old1 = frame - 1;
        document.getElementById("bplayer" + 1).style.backgroundImage = 'url("' + animacao[old1] + '")'
    }
    if (frame > 1) {
        let old2 = frame - 2
        document.getElementById("bplayer" + 2).style.backgroundImage = 'url("' + animacao[old2] + '")'
    }
    if (frame > 2) {
        let old3 = frame - 3;
        document.getElementById("bplayer" + 4).style.backgroundImage = 'url("' + animacao[old3] + '")'
    }
    if (frame < animacao.length - 1) {
        let old4 = frame + 1;
        document.getElementById("bplayer" + 3).style.backgroundImage = 'url("' + animacao[old4] + '")'
    }
    if (frame < animacao.length - 2) {
        let old5 = frame + 2;
        document.getElementById("bplayer" + 5).style.backgroundImage = 'url("' + animacao[old5] + '")'
    }
    if (background_anim == true) {
        document.getElementById("bplayer0").style.backgroundImage = 'url("' + backgroundSprite.src + '")'
        document.getElementById("bplayer0").style.backgroundPositionX = - canvas.width * workingframe + "px"
        //document.getElementById("bplayer0").style.backgroundSize = "initial"
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    comandos = []
    convertToImg()
    comandosExec()
    if (workingframe < animacao.length) {

        blob = dataURItoBlob(animacao[workingframe]);
        let imagem = new Image();
        imagem.src = URL.createObjectURL(blob);
        imagem.onload = function () {
            comando = ["i", "source-over", imagem, 0, 0, imagem.width, imagem.height]
            let oldGCO = context.globalCompositeOperation
            changeGCO('destination-over')
            context.drawImage(imagem, 0, 0, imagem.width, imagem.height);
            changeGCO(oldGCO)
            comandos.push(comando)
            //updateCanvasBack()
            //desenha("i", globalComposite, imagem, 0, 0, imagem.width, imagem.height)
        }
        scrollFilme()
        //comandosExec()
    }

}

function next_frame() {
    if (animacao.length > 1) {
        let len = comandos.length
        if (len > 1 && comandos[len - 1][0] != "i") {
            save_frame()
            console.log("quadro salvo")
            setTimeout(() => next_frame(), 10)
        } else {
            workingframe++
            if (workingframe >= animacao.length) {
                workingframe = 0
            }
            changeFrame(workingframe)
        }
    } else {
        Alert("Por favor,<br> adicione ➕ quadros a sua animação")

    }

}
function prev_frame() {
    if (animacao.length > 1) {

        let len = comandos.length
        if (len > 1 && comandos[len - 1][0] != "i") {
            save_frame()
            setTimeout(() => {
                workingframe--
                changeFrame(workingframe)

            }, 30)
        } else {

            workingframe--
            if (workingframe < 0) {
                workingframe = animacao.length - 1
                if (workingframe < 0) { workingframe = 0 }
            }
            changeFrame(workingframe)
            document.getElementById("contador").innerHTML = workingframe
        }
    } else {
        Alert("Por favor,<br> adicione ➕ quadros a sua animação")

    }
}


function changeFPS(valor) {
    fps = valor
    stop()
    play()
}
function changeFPSup() {
    fps++
    document.getElementById("fpsnumber").value = fps
    stop()
    play()
}
function changeFPSdown() {
    fps--
    document.getElementById("fpsnumber").value = fps
    stop()
    play()
}
function removeFrame() {
    animacao.splice(workingframe, 1)
    prev_frame()
    adicionaQuadro()
}
function cloneFrame(frame = workingframe) {
    let oldGCO = canvas.globalCompositeOperation
    canvas.globalCompositeOperation = "destination-over"
    animacao.splice(frame + 1, 0, animacao[frame]);

    next_frame()
    adicionaQuadro()
    setTimeout(() => oldGCO = canvas.globalCompositeOperation, 100)
    Alert("🎞️ Quadro " + frame + " duplicado.")

}
var checkSave = setInterval(() => {
    if (comandos.length < 3) {
    } else {
        document.getElementById("new_frame()").classList.toggle("blink")

    }
    /*if (undoLevel == 0) {
        document.getElementById("redo").classList.add("esconde")

    } else {
        document.getElementById("redo").classList.remove("esconde")

    }*/
}, 1400)
let swapImg = new Image()

var background_anim = false

function changeBackGroundAnimation(frame) {

    if (background_anim == true) {
        document.getElementById("bplayer0").style.backgroundImage = 'url("' + backgroundSprite.src + '")'
        document.getElementById("bplayer0").style.backgroundPositionX = - canvas.width * frame + "px"
        document.getElementById("bplayer0").style.backgroundSize = "initial"

    }
}

function sobreporFundo() {
    document.getElementById("bplayer0").style.zIndex = document.getElementById("bplayer0").style.zIndex * -1
}


var animSize = 0
function adicionaQuadro() {
    let filme = document.getElementById("filme")
    filme.innerHTML = ""
    setTimeout(() => {
        let animSize = animacao.length
        for (i = 0; i < animSize; i++) {
            let cont = document.createElement("div")
            cont.id = i
            cont.classList.add("quadrofilme", "light")
            //           cont.style.backgroundImage = 'url("' + animacao[i] + '")';
            cont.addEventListener("dragover", dragOver);
            cont.addEventListener("drop", drop);
            let thumb = document.createElement("div")
            thumb.innerHTML = i
            thumb.style.backgroundImage = 'url("' + animacao[i] + '")';

            thumb.id = i + "thumb"
            thumb.classList.add("thumb")
            thumb.draggable = true
            thumb.addEventListener("click", function (event) {
                if (comandos.length > 1) {
                    swapImg = canvas.toDataURL('image/png');
                    animacao[workingframe] = swapImg
                    //  adicionaQuadro()
                };
                changeFrame(parseInt(event.target.id, 10))
            });
            thumb.addEventListener("dragstart", dragStart);
            thumb.addEventListener("dragend", dragEnd);
            //filme.innerHTML += '<div class="numero naotoque" style="z-index:-1">' + i + '</div>'
            cont.appendChild(thumb)
            filme.appendChild(cont)
            setTimeout(() => {
                document.getElementById("lixeira()").addEventListener("drop", drop);
                document.getElementById("lixeira()").addEventListener("dragover", dragOver);
                document.getElementById("new_frame()").addEventListener("drop", drop);
                document.getElementById("new_frame()").addEventListener("dragover", dragOver);
            }, 10)
            /*   document.getElementById("clone").addEventListener("drop", drop);
               document.getElementById("clone").addEventListener("dragover", dragOver);*/
        }
        scrollFilme()
        //  filme.innerHTML += '<span class="bot" id="clone">🧬 </span>'
    }
        , 10)
}
function scrollFilme(onde = workingframe) {
    filme.scrollLeft = onde * 32

    removeClass("wf")
    let thum = document.getElementById(workingframe + "thumb")
    if (thum) { thum.classList.add("wf") }

}
function lixeira() {
    mostraMenu("lixeira")
}
var dataTransfer = 0
function dragStart(event) {
    if (comandos.length > 1) {
        save_frame()
    }
    dataTransfer = parseInt(event.target.id, 10);
}

function dragEnd(event) {
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault()
    const toContainer = event.currentTarget;
    if (toContainer.id == "lixeira()") {

        animacao.splice(dataTransfer, 1);
        animSize = animacao.length
        adicionaQuadro()
        setTimeout(() => prev_frame(), 10)

    } else if (toContainer.id == "new_frame()") {
        cloneFrame(dataTransfer)
    }
    else if (toContainer !== dataTransfer) {

        Alert("🎞️  " + dataTransfer + " 🔄 " + toContainer.id, 1.5)
        swapItems(toContainer.id, dataTransfer)

    }
}


function quadrosVisiveis(numero) {
    for (i = 0; i < 6; i++) {
        if (i < numero) {

            document.getElementById("bplayer" + i).style.visibility = "visible"
        } else {
            document.getElementById("bplayer" + i).style.visibility = "hidden"

        }

    }
}


function swapL() {
    let a = workingframe
    let b = workingframe - 1
    if (a > 0) {

        moveObjectAtIndex(animacao, a, b)
    } else {
        moveObjectAtIndex(animacao, a, animacao.length - 1)

    }
}


function swapR() {
    let a = workingframe
    let b = workingframe + 1
    if (b < animacao.length) {

        moveObjectAtIndex(animacao, a, b)
    } else {
        moveObjectAtIndex(animacao, a, 0)

    }
}

function moveObjectAtIndex(arr, indexA, indexB) {
    Alert("🎞️  " + indexA + " 🔄 " + indexB, 1.5)

    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
    adicionaQuadro()
    changeFrame(indexB)
};


function swapItems(a = Number, b = Number) {
    animacao[a] = animacao.splice(b, 1, animacao[a])[0];
    adicionaQuadro()
}