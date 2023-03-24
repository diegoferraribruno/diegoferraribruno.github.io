var anime = document.createElement("div")
anime.id = "anime"
document.body.appendChild(anime)
const fps = 15
var animacao = []


var anime_menu = {
    "new_frame()": "➕",
    "prev_frame": "⏮️",
    "play()": "▶️",
    "next_frame()": "⏭️",
    "anime_ajustes()": "🎚️",
    "export_anim()": "🎞️",
    // "Identifica": "🪪",
}

function criaAnime() {
    anime.innerHTML = "<div  id='ui' class='bot shadow' title='Anime player' onclick='limpaAnime()'> 📽️</div>"
    //<!--🚀-->

    Object.keys(anime_menu).forEach((key, index) => {
        setTimeout(() => {
            let item = document.createElement("div")
            item.setAttribute("onClick", key)
            //item.href = key
            //item.target = "iframe"
            item.innerText = anime_menu[key]
            item.classList.add("shadow")
            item.classList.add("bot")
            anime.appendChild(item)
        }, 80 * index)
    })
}

setTimeout(() => { criaAnime() }, 10)
setTimeout(() => { limpaAnime() }, 500)

function limpaAnime() {
    anime.innerHTML = "<div id='ui'class='bot shadow' title='Links do diego' onclick='criaAnime()'>📽️</div>"
}
//limpaanime()
function criaPlayer() {

    var player = document.createElement('div')
    player.id = "player"
    player.classList.add("light")
    player.style.width = canvas.width + "px"
    player.style.height = canvas.height + "px"
    player.style.position = "absolute"
    player.style.border = "1px solid red"
    player.style.visibility = "hidden"
    player.setAttribute("onmousedown", "stop()")
    document.getElementById("canvas_div2").appendChild(player)

}

criaPlayer()

function criaBackPlayer() {

    var player = document.createElement('div')
    player.id = "bplayer"
    player.style.width = canvas.width + "px"
    player.style.height = canvas.height + "px"
    player.style.position = "absolute"
    player.style.border = "2px solid green"
    player.style.zIndex = -1
    player.style.opacity = 0.5
    player.setAttribute("onmousedown", "stop()")
    document.getElementById("canvas_div2").appendChild(player)

}

criaBackPlayer()

function new_frame() {
    len = animacao.length
    swapImg = canvas.toDataURL('image/png');
    blobb = dataURItoBlob(swapImg)
    animacao.push(swapImg)
    //swapImg = []
    //blobb = []
    changeFrame(len)


}


let playing = 0
var inter

function play() {
    clearInterval(inter);
    inter = setInterval(() => { playerPlay(playing); playing++; if (playing >= animacao.length) { playing = 0; }; }, 200)
}
function stop() {
    clearInterval(inter);
    document.getElementById("player").style.visibility = "hidden"
}

function playerPlay(frame) {
    document.getElementById("player").style.backgroundImage = 'url("' + animacao[frame] + '")';
    document.getElementById("player").style.visibility = "visible"
}

function changeFrame(frame) {
    document.getElementById("bplayer").style.backgroundImage = 'url("' + animacao[frame] + '")'
    Fundo("none")
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    comandos = []
    comandosExec()
}



function next_frame() {
    playing++
    if (playing >= animacao.length) {
        playing--
    }
    changeFrame(playing)


}
function prev_frame() {
    playing--
    if (playing < 0) {
        playing++
    }
    changeFrame(playing)
    /* let imagem = animacao[playing]
     context.drawImage(imagem, 0, 0, imagem.width, imagem.height);*/

}
var cont

function export_anim() {
    Alert("sinto muito, função ainda em desenvolvimento. Salve as imagens individualmente, quadro a quadro...")
    let len = animacao.length
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
        let pos = i * 320
        imagem.onload = function () {
            cont.drawImage(imagem, 0, 0, imagem.width, imagem.height, pos, 0, imagem.width, imagem.height);
        }
    }

    setTimeout(() => {
        var dataURL = document.getElementById("exp")
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        //downloadImage(dataURL, 'my-canvas.jpeg');
        downloadImage(dataURL, `anima1.png`);
    }, 400)
    setTimeout(() => {
        removeElement("exp")
    }, 1000)
}

function anime_ajustes() {

    Alert("🎚️ ajustes ainda em construcao")
}

