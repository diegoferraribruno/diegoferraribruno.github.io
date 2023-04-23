var anime = document.createElement("div")
anime.id = "anime"
document.body.appendChild(anime)


var fps = 6
var animacao = []


var anime_menu = {
    "new_frame()": "➕",
    "prev_frame()": "⏮️",
    "play()": "▶️",
    "next_frame()": "⏭️",
    "anime_ajustes()": "🎚️",
}

function criaAnime() {

    anime.classList.add("anime")
    //<!--🚀-->
    anime.innerHTML = "<div id='lixo' class='bot shadow' onmousedown='lixeira()'>🗑</div><div class='bot shadow' id='clone' onmousedown='cloneFrame()'>🧬 </div>"
    Object.keys(anime_menu).forEach((key, index) => {
        // setTimeout(() => {
        let item = document.createElement("div")
        item.setAttribute("onClick", key)
        item.id = key
        item.innerText = anime_menu[key]
        item.classList.add("shadow")
        item.classList.add("bot")
        anime.appendChild(item)
        //}, 80 * index)
    })

    let contador = document.createElement("div")
    contador.innerHTML = workingframe
    contador.id = "contador"
    var ui = document.createElement('div')
    ui.classList.add("bot", "shadow")
    ui.title = 'Anime player'
    ui.setAttribute("onclick", "limpaAnime()")
    ui.innerHTML = "🎞️"
    var uiFilme = document.createElement('div')
    // uiFilme.innerHTML = "<div  id='ui' class=' bot shadow ' title= onclick='limpaAnime()'> </div>"
    var filme = document.createElement('div')
    filme.id = "filme"
    filme.innerHTML = ""
    ui.appendChild(contador)
    uiFilme.appendChild(ui)
    uiFilme.appendChild(filme)
    document.getElementById("anime").appendChild(uiFilme)

}

setTimeout(() => {
    criaAnime();
    setTimeout(() => save_frame(), 350)
}, 200)
//setTimeout(() => { limpaAnime() }, 1200)

function limpaAnime() {
    anime.classList.toggle("hideanime")
}
//limpaanime()
function criaPlayer() {

    var player = document.createElement('div')
    player.id = "player"
    player.classList.add("fundo2")
    player.style.width = canvas.width + "px"
    player.style.height = canvas.height + "px"
    player.style.position = "absolute"
    player.style.display = "block"
    player.style.top = "10px"
    player.backgroundSize = "cover"
    player.style.left = "10px"
    player.style.border = "1px solid #88ccee"
    player.style.display = "none"
    player.style.zIndex = 1000
    player.setAttribute("onmousedown", "stop()")
    document.getElementById("tela").appendChild(player)
    let menuanime = document.createElement('div')

    menuanime.classList.add("submenu")
    menuanime.classList.add("fundobranco")
    menuanime.id = "menuanime"
    menuanime.innerHTML = `<span class="botao" title="fechar menu enviar imagem" onmousedown="removeClass()">
	 🎚 Ajustes de animação ❎</span>
	 <span class="botao">⏱️ FPS <input type="number" id="fpsnumber" min="1" max="60" step="1" value="6"
      onchange="changeFPS(this.value)" style="width: 50px; margin-left: 8px"> <span onmousedown="play()">▶️</span></span>
                        <span class="botao"  onmousedown="removeFrame()" >🗑 Remover quadro atual <span class="bot">➖</span></span>
                        <span class="botao"  onmousedown="cloneFrame()" >🧬 clonar o quadro atual</span>
                        <span class="botao">
                        Transparencia do quadro <input type="range" id="canvasOpacity" name="transparencia" min="0.01" max="1"
                            oninput="canvasOpacity(this.value)" step="0.01" value="1"></span>
                          `
    document.getElementById("menus").appendChild(menuanime)
    setTimeout(() => {
        var inputSprite = document.getElementById('inputSprite');
        inputSprite.addEventListener('change', importSprite);
    }, 10)

}

criaPlayer()


function criaBackPlayer() {
    for (i = 0; i < 6; i++) {
        var player = document.createElement('div')
        player.id = "bplayer" + i
        player.style.display = "block"
        player.style.width = canvas.width + "px"
        player.style.height = canvas.height + "px"
        player.style.position = "absolute"
        player.style.marginTop = - canvas.height - 4 + "px"
        // player.style.border = "2px solid green"
        player.classList.add("fundo2")
        player.style.zIndex = -1 * i - 1
        player.style.opacity = 0.4
        document.getElementById("canvas_div").appendChild(player)
    }
}

criaBackPlayer()

let workingframe = 0

function new_frame() {
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
    setTimeout(() => { adicionaQuadro() }, 50)

}

let playing = 0
var inter

function play() {
    let len = comandos.length
    if (len > 1 && comandos[len - 1][0] != "i") {
        new_frame()
        console.log("quadro salvo")
        prev_frame()
    }
    if (animacao.length > 0) {
        clearInterval(inter);
        inter = setInterval(() => {
            playerPlay(playing);
            playing++;
            if (playing >= animacao.length) {
                playing = 0;
            };
        },
            1000 / fps)

    } else {
        Alert("Por favor,<br> adicione ➕ quadros a sua animação")
    }
}
function stop() {
    clearInterval(inter);
    document.getElementById("player").style.display = "none"
    document.getElementById("play()").innerHTML = "▶️"
}

function playerPlay(frame) {
    document.getElementById("play()").innerHTML = ' <span onmousedown="stop()" >⏹️</span>'
    document.getElementById("player").style.backgroundImage = 'url("' + animacao[frame] + '")';
    document.getElementById("player").style.backgroundSize = "cover"
    document.getElementById("player").style.display = "block"
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
        document.getElementById("bplayer" + 3).style.backgroundImage = 'url("' + animacao[old3] + '")'
    }
    if (frame > 3) {
        let old4 = frame - 4;
        document.getElementById("bplayer" + 4).style.backgroundImage = 'url("' + animacao[old4] + '")'
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
            updateCanvasBack()
            //desenha("i", globalComposite, imagem, 0, 0, imagem.width, imagem.height)
        }
        scrollFilme()
        //comandosExec()
    }

}

function next_frame() {
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

}
function prev_frame() {

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
}

function anime_ajustes() {
    removeClass()
    mostraMenu("anime")
}
function changeFPS(valor) {
    fps = valor
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

}
var checkSave = setInterval(() => {
    if (comandos.length < 3) {
    } else {
        document.getElementById("new_frame()").classList.toggle("blink")

    }
    if (undoLevel == 0) {
        document.getElementById("redo").classList.add("esconde")

    } else {
        document.getElementById("redo").classList.remove("esconde")

    }
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
            cont.classList.add("quadrofilme")
            cont.style.backgroundImage = 'url("' + animacao[i] + '")';
            cont.addEventListener("dragover", dragOver);
            cont.addEventListener("drop", drop);
            let thumb = document.createElement("div")
            thumb.innerHTML = i
            thumb.style.backgroundImage = 'url("' + animacao[i] + '")';
            //thumb.src = animacao[i];

            thumb.id = i + "thumb"
            thumb.classList.add("thumb")
            thumb.draggable = true
            /* thumb.addEventListener("click", function (event) {
                 if (comandos.length > 1) {
                     swapImg = canvas.toDataURL('image/png');
                     animacao[workingframe] = swapImg
                     adicionaQuadro()
                 };
                 changeFrame(parseInt(event.target.id, 10))
             });*/
            thumb.addEventListener("dragstart", dragStart);
            thumb.addEventListener("dragend", dragEnd);
            //filme.innerHTML += '<div class="numero naotoque" style="z-index:-1">' + i + '</div>'
            cont.appendChild(thumb)
            filme.appendChild(cont)
            //document.getElementById("lixo").addEventListener("onmousedown", lixeira)
            setTimeout(() => {
                document.getElementById("lixo").addEventListener("drop", drop);
                document.getElementById("lixo").addEventListener("dragover", dragOver);
                document.getElementById("clone").addEventListener("drop", drop);
                document.getElementById("clone").addEventListener("dragover", dragOver);
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
    dataTransfer = event.target.id;
    let tomba = document.querySelectorAll(".thumb")
    tomba.forEach(element => {
        if (element.id != event.target.id)
            element.classList.toggle("hidden")
    });
    // setTimeout(() => event.target.classList.toggle("hidden"));
}

function dragEnd(event) {
    event.target.classList.toggle("hidden");
    let tomba = document.querySelectorAll(".thumb")
    tomba.forEach(element => {
        element.classList.remove("hidden")
    });
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault()

    console.log(event)
    const draggedImageId = dataTransfer
    const draggedImage = document.getElementById(draggedImageId);
    const fromContainer = draggedImage.parentNode;
    const toContainer = event.currentTarget;
    if (toContainer.id == "lixo") {

        animacao.splice(fromContainer.id, 1);
        animSize = animacao.length
        adicionaQuadro()
        setTimeout(() => prev_frame(), 10)

    } else if (toContainer.id == "clone") {
        cloneFrame(fromContainer.id)
    }
    else if (toContainer !== fromContainer) {
        console.log(toContainer.id, fromContainer.id)
        swapItems(toContainer.id, fromContainer.id)
        //* fromContainer.appendChild(toContainer.firstElementChild);
        //* toContainer.appendChild(draggedImage);
        adicionaQuadro()
    }
    //}
}
function swapItems(a = Number, b = Number) {

    animacao[a] = animacao.splice(b, 1, animacao[a])[0];

    //let tomba = document.querySelectorAll(".quadrofilme")
    setTimeout(() => {

        let animSize = animacao.length
        for (i = 0; i < animSize; i++) {

            document.getElementById(i).style.backgroundImage = 'url("' + animacao[i] + '")';
            //document.getElementById(i + "thumb").style.backgroundImage = 'url("' + animacao[i] + '")';
        };
    }, 200)
    adicionaQuadro()
}