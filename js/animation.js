var anime = document.createElement("div")
anime.id = "anime"
document.body.appendChild(anime)
const fps = 15
var animacao = []


var anime_menu = {
    "new_frame()": "➕",
    "prev_frame()": "⏮️",
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
    let contador = document.createElement("div")
    contador.innerHTML = workingframe
     contador.id = "contador"
    contador.classList.add("shadow")
    contador.classList.add("bot")
   anime.appendChild(contador)
}

setTimeout(() => { criaAnime() }, 10)
setTimeout(() => { limpaAnime() }, 1200)

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
	for (i=1;i<5;i++){
    var player = document.createElement('div')
    player.id = "bplayer"+i
    player.style.width = canvas.width + "px"
    player.style.height = canvas.height + "px"
    player.style.position = "absolute"
    player.style.marginTop = - canvas.height -4+ "px"
   // player.style.border = "2px solid green"
    player.style.backgroundColor = "#ffffff"
    player.style.zIndex = -1*i
    player.style.opacity = 0.3
    document.getElementById("canvas_div").appendChild(player)
}
}

criaBackPlayer()

let workingframe = 0
function new_frame() {
    swapImg = canvas.toDataURL('image/png');
    blobb = dataURItoBlob(swapImg)
    save_frame(swapImg)
    //swapImg = []
    //blobb = []
    len = animacao.length

    workingframe++
    changeFrame(workingframe)
document.getElementById("contador").innerHTML = workingframe

}
function save_frame(imagem) {
	animacao[workingframe] = imagem
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
	let old0 = frame

	if (frame > 0 ){
		let old1 = frame-1;
		document.getElementById("bplayer"+1).style.backgroundImage = 'url("' + animacao[old1] + '")'
	}
	if (frame > 1 ){
		let old2 = frame-2
		document.getElementById("bplayer"+2).style.backgroundImage = 'url("' + animacao[old2] + '")'
	}
	if (frame > 2 ){
		let old3 = frame-3;
		document.getElementById("bplayer"+3).style.backgroundImage = 'url("' + animacao[old3] + '")'
	}
		if (frame > 3 ){
		let old4 = frame-4;
		document.getElementById("bplayer"+4).style.backgroundImage = 'url("' + animacao[old4] + '")'
	}
	Fundo("none")
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	comandos = []
	      convertToImg()
        comandosExec()
	if (workingframe < animacao.length){

	    blob = dataURItoBlob(animacao[workingframe]);
	     console.log(blob)
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
    workingframe++
    if (workingframe > animacao.length) {
        workingframe=0
    }
    changeFrame(workingframe)
document.getElementById("contador").innerHTML = workingframe

}
function prev_frame() {
    workingframe--
    if (workingframe < 0) {
        workingframe=animacao.length-1
    }
    changeFrame(workingframe)
    /* let imagem = animacao[playing]
     context.drawImage(imagem, 0, 0, imagem.width, imagem.height);*/
document.getElementById("contador").innerHTML = workingframe
}
var cont

function export_anim() {
    Alert("Sprite-frame sendo baixado.")
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

