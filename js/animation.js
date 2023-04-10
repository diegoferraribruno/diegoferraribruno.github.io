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
    "modeTo('salvar')": "📥",
    // "Identifica": "🪪",
}

function criaAnime() {

    anime.classList.add("anime")
    anime.innerHTML = "<div  id='ui' class=' bot shadow ' title='Anime player' onclick='limpaAnime()'> 🎞️</div>"
    //<!--🚀-->

    Object.keys(anime_menu).forEach((key, index) => {
        setTimeout(() => {
            let item = document.createElement("div")
            item.setAttribute("onClick", key)
            item.id = key

            //item.href = key
            //item.target = "iframe"
            item.innerText = anime_menu[key]
            item.classList.add("shadow")
            item.classList.add("bot")
            anime.appendChild(item)
        }, 80 * index)
    })
    let contador = document.createElement("div")
    contador.innerHTML = workingframe
    contador.id = "contador"
    //contador.classList.add("shadow")
    //contador.classList.add("bot")
    document.getElementById("ui").appendChild(contador)
}

setTimeout(() => { criaAnime() }, 200)
//setTimeout(() => { limpaAnime() }, 1200)

function limpaAnime() {
    anime.classList.toggle("hideanime")
}
//limpaanime()
function criaPlayer() {

    var player = document.createElement('div')
    player.id = "player"
    player.classList.add("light")
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
                        <span class="botao"  onmousedown="removeFrame()" >🗑 Remover quadro atual ➖</span>
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

function importSprite(e) {
    imagem = new Image;
    imagem.src = URL.createObjectURL(e.target.files[0]);
    imagem.onload = function () {
        if (document.getElementById("loadBackgroundAnimation").checked) {
            background_anim = true
            backgroundSprite.src = URL.createObjectURL(e.target.files[0]);
            backgroundSprite.onload = function () {
                changeBackGroundAnimation(workingframe)
            }
        } else {
            let quadros = imagem.width / canvas.width
            let largura = document.getElementById("larguraS").value
            let altura = document.getElementById("alturaS").value
            let auto = document.getElementById("autodetectar").checked
            if (auto === false) {
                quadros = document.getElementById("fnumber").value
                tamanho(largura, altura)
            }
            for (i = 0; i < quadros; i++) {
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.drawImage(imagem, i * canvas.width, 0, imagem.width, imagem.height, 0, 0, imagem.width, imagem.height);
                swapImg = canvas.toDataURL('image/png');
                blobb = dataURItoBlob(swapImg)
                animacao[workingframe] = swapImg
                workingframe++

            }
            setTimeout(() => {
                changeFrame(workingframe - 1);
                removeClass()
                document.getElementById("contador").innerHTML = workingframe;
            }, 200)
        }
    }
}

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
        player.classList.add("filter")
        player.style.zIndex = -1 * i - 1
        player.style.opacity = 0.4
        document.getElementById("canvas_div").appendChild(player)
    }
}

criaBackPlayer()

let workingframe = 0

function new_frame() {
    let len = comandos.length
    if (len > 1 && comandos[len - 1][0] != "i") {

        swapImg = canvas.toDataURL('image/png');
        save_frame(swapImg)
        workingframe++
        changeFrame(workingframe)
        document.getElementById("contador").innerHTML = workingframe

    } else {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        swapImg = canvas.toDataURL('image/png');
        blobb = dataURItoBlob(swapImg)
        animacao.splice(workingframe + 1, 0, swapImg);
        next_frame()
    }

}
function save_frame(imagem) {
    animacao[workingframe] = imagem
}

let playing = 0
var inter

function play() {
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
            context.drawImage(imagem, 0, 0, imagem.width, imagem.height);
            comandos.push(comando)
            //desenha("i", globalComposite, imagem, 0, 0, imagem.width, imagem.height)
        }
        //comandosExec()
    }

}

function next_frame() {
    let len = comandos.length
    if (len > 1 && comandos[len - 1][0] != "i") {
        new_frame()
        console.log("quadro salvo")
    } else {
        workingframe++
        if (workingframe >= animacao.length) {
            workingframe = 0
        }
        changeFrame(workingframe)
        document.getElementById("contador").innerHTML = workingframe
    }

}
function prev_frame() {
    workingframe--
    if (workingframe < 0) {
        workingframe = animacao.length - 1
        if (workingframe < 0) { workingframe = 0 }
    }
    changeFrame(workingframe)
    document.getElementById("contador").innerHTML = workingframe
}
var cont
var spritao = new Image();
async function export_anim() {
    let len = animacao.length
    if (len == 0) {
        Alert("Adicione ➕ quadros a sua animação antes de exportar.")
        return
    }
    if (document.getElementById("filenameS").value == "") {
        Alert("escreva um titulo para seu arquivo de imagem .png")
        return
    }
    Alert("Seu arquivo esta sendo preparado.<br> Por favor, aguarde...")

    let exp = document.createElement("canvas")
    exp.width = canvas.width * len
    exp.height = canvas.height
    exp.id = "exp";
    exp.style.visibility = "hidden"
    exp.style.position = "absolute"
    document.getElementById("tela").appendChild(exp);
    cont = document.getElementById("exp").getContext("2d");

    for (i = 0; i < len; i++) {
        blob = dataURItoBlob(animacao[i]);
        let imagem = new Image();
        imagem.src = URL.createObjectURL(blob);
        let pos = i * canvas.width
        imagem.onload = function () {
            cont.globalCompositeOperation = "source-over"
            cont.drawImage(imagem, 0, 0, imagem.width, imagem.height, pos, 0, imagem.width, imagem.height);
            if (document.getElementById("unir").checked && background_anim == true) {
                if (!document.getElementById("sobrepor").checked) {
                    cont.globalCompositeOperation = "destination-over"
                    cont.drawImage(backgroundSprite, 0, 0, exp.width, exp.height)

                } else {
                    cont.globalCompositeOperation = "source-under"
                    cont.drawImage(backgroundSprite, 0, 0, exp.width, exp.height)
                    cont.globalCompositeOperation = "destination-over"
                }

            }
        }
    }


    setTimeout(() => {
        let fname = document.getElementById("filenameS").value
        var dataURL = document.getElementById("exp")
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        if (document.getElementById("seq").checked) {
            downloadImage(dataURL, `${fname}.png`);
        }
        spritao.src = dataURL
        spritao.onload = function (){

        if (document.getElementById("gif").checked) {
            exp.width = canvas.width
            let myanima = new Image()
            myanima.src = spritao.src
            myanima.onload = function () {

                var encoder = new GIFEncoder();
                encoder.setRepeat(0); //auto-loop
                encoder.setDelay(1000 / fps);
                console.log(encoder.start())

                for (i = 0; i < animacao.length; i++) {
                    cont.fillStyle = "rgb(255,255,255)"
                    cont.fillRect(0, 0, canvas.width, canvas.height); //GIF can't do transparent so do white
                    cont.drawImage(myanima, - canvas.width * i, 0, myanima.width, myanima.height)
                    console.log(encoder.addFrame(cont));
                }
                encoder.finish();
                encoder.download(fname+".gif");
            }

        } else {
            removeElement("exp")
        }
    }
    }, 1600)
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
}
function cloneFrame() {
    animacao.splice(workingframe + 1, 0, animacao[workingframe]);
    next_frame()
}
var checkSave = setInterval(() => {
    if (comandos.length < 3) {
       // document.getElementById("new_frame()").innerHTML = "➕"
    } else {
       // document.getElementById("new_frame()").innerHTML = "💾"
        document.getElementById("new_frame()").classList.toggle("blink")

    }
    if (undoLevel == 0) {
        document.getElementById("redo").classList.add("esconde")

    } else {
        document.getElementById("redo").classList.remove("esconde")

    }
}, 1400)
let swapImg = new Image()

let newAnima = []

function cortarAnima(x1, y1, x2, y2) {
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
        //imagem = new Image();
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
        swapImg = canvas.toDataURL('image/png');
        blobb = dataURItoBlob(swapImg)
        save_frame(swapImg)
        setTimeout(function () {
            swapImg = canvas.toDataURL('image/png');
            blobb = dataURItoBlob(swapImg)
            new_frame();
        }, 10)

    }, 100
    )

}
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
