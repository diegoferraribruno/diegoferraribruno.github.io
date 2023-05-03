var anime = document.getElementById("anime")
var fps = 8
var animacao = []


var anime_menu = {
    "prev_frame()": ["⏮️", "Quadro anterior"],
    "play()": ["▶️", "Tocar Animação"],
    "next_frame()": ["⏭️", "Próximo quadro"],
    "swapL()": ["⬅️", "Mover quadro á esquerda"],
    "swapR()": ["➡️", "Mover quadro á direita"],
   // "mostraMenu('anime')": ["⏱️", "Ajustes da Animação"],
    //"new_frame()": ["➕", "Adiciona Quadro"],
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
    anime.innerHTML +=`<span id="new_frame()" title="Adiconar quadro á animação" class="bot" onclick="new_frame()"> <span class="bot">🎞️<span style="display: block; position: absolute; margin-top: -26px; font-size:20px;">➕</span></span>
    </span>
    <span id="animebot" title="configurar animação" class="bot" onclick="mostraMenu('anime')"> <span class="bot">🎞️<span style="display: block; position: absolute; margin-top: -26px; font-size:20px;">⏱️</span></span>
    </span>`

    contador.innerHTML = workingframe
    contador.id = "contador"
    ui.classList.add("bot", "shadow")
    ui.title = 'Quadros da animação toque para mostrar/esconder'
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
   // let len = comandos.length
   
    save_frame()
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    workingframe++
    swapImg = canvas.toDataURL('image/png');
    animacao.splice(workingframe, 0, swapImg);
    
    let work = []
    comandosb.splice(workingframe, 0, work);
    canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasBack.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    comandos = []
    convertToImg()
    changeFrame(workingframe)
    document.getElementById("contador").innerHTML = workingframe

}
function save_frame(imagem = canvas.toDataURL('image/png')) {
    animacao[workingframe] = imagem
    comandosParaComandosb()
    setTimeout(() => {
        adicionaQuadro();
        console.log("save frame de novo")
    }, 50)

}

let playing = 0
var inter

function play() {
    save_frame()
    oldMode = mode;
    mode = "play";
 /*   let len = comandos.length
    if (len > 1) {
        save_frame()
    }*/
    if (animacao.length > 1) {
        document.getElementById("play()").innerHTML = ' <span onmousedown="stop()">⏹️</span>'
        clearInterval(inter);
        canvasBack.classList.remove("esconde")
        canvasBack.ctx.globalAlpha = 1;
        canvasBack.ctx.globalCompositeOperation = 'destination-over'
        if (nightmode){
        canvasBack.style.backgroundColor = "#333333"

        }else{

            canvasBack.style.backgroundColor = "#eeeeee"
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

    if (workingframe < animacao.length && workingframe >= 0) {
        undoLevel = 0
        comandosExec()

        scrollFilme()
    }

}

function next_frame() {
    save_frame()
    if (animacao.length > 1) {
        let len = comandos.length
            comandosParaComandosb()
            workingframe++
            if (workingframe >= animacao.length) {
                workingframe = 0
            }
            comandosbParaComandos()
            changeFrame(workingframe)
    } else {
        Alert("Por favor,<br> adicione ➕ quadros a sua animação")

    }

}
function prev_frame() {
    save_frame()
    if (animacao.length > 1) {

      
            comandosParaComandosb()
            workingframe--
            if (workingframe < 0) {
                workingframe = animacao.length - 1
                if (workingframe < 0) { workingframe = 0 }
            }
            comandosbParaComandos()
            changeFrame(workingframe)
            document.getElementById("contador").innerHTML = workingframe
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
        comandosb.splice(workingframe, 1)
    
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
   
        if (animacao.length > 0) {
                workingframe--
                if (workingframe < 0) {
                    workingframe = animacao.length - 1
                    if (workingframe < 0) { workingframe = 0 }
                }
                changeFrame(workingframe)
                comandosbParaComandos()
                document.getElementById("contador").innerHTML = workingframe
            //}
        } else {
            comandos = []
            convertToImg()
            comandosb = []
            comandosParaComandosb()
            save_frame()
            changeFrame(0)
          //  Alert("Por favor,<br> adicione ➕ quadros a sua animação")
    
        }
        adicionaQuadro()
       
        
    }
function cloneFrame(frame = workingframe) {
    workingframe = frame +1
    animacao.splice(workingframe, 0, animacao[frame]);
    comandosb.splice(workingframe, 0, comandosb[frame]);
    comandos=[]
    comandosbParaComandos()
    changeFrame(workingframe)
    adicionaQuadro()
    Alert("🎞️ Quadro " + frame + " duplicado.")

}
function checksave (){

    let compa = compara(comandos,comandosb[workingframe])
    console.log(comandos.length, comandosb[workingframe].length)
    if (compa == false){
        document.getElementById("new_frame()").classList.toggle("blink")
       comandosParaComandosb()
       save_frame()
    }else{
        document.getElementById("new_frame()").classList.remove("blink")

    }
}
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
         animSize = animacao.length
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
            workingframe = parseInt(event.target.id, 10)
            comandos = [] 
            comandosbParaComandos()
            changeFrame(workingframe)

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
      //  save_frame()
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
        comandosb.splice(dataTransfer, 1);
        animacao.splice(dataTransfer, 1);
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        workingframe = 0
        if (animacao.length == 0)  {
            comandos = []
            convertToImg()
            comandosExec()
            comandosb = []
            comandosParaComandosb()
            save_frame()
            //  Alert("Por favor,<br> adicione ➕ quadros a sua animação")
            
        }
        comandos = [] 
        comandosbParaComandos()
        changeFrame(0)
        adicionaQuadro()



    } else if (toContainer.id == "new_frame()") {
        cloneFrame(dataTransfer)
    }
    else if (toContainer !== dataTransfer) {

        Alert("🎞️  " + dataTransfer + " 🔄 " + toContainer.id, 1.5)
        swapItems(toContainer.id, dataTransfer)
        workingframe = dataTransfer
        comandos = [] 
        comandosbParaComandos()
        changeFrame(workingframe)

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
    if (b < 0) {
    b = comandosb.length -1
}
        moveObjectAtIndex(animacao, a, b)
        moveObjectAtIndex(comandosb, a, b)
    
    changeFrame(b)
    adicionaQuadro()
}


function swapR() {
    let a = workingframe
    let b = workingframe + 1
    if (b >= animacao.length) {
        b= 0
    }
    
            moveObjectAtIndex(animacao, a, b)
            moveObjectAtIndex(comandosb, a, b)
    changeFrame(b)
    adicionaQuadro()
}

function moveObjectAtIndex(arr, indexA, indexB) {
    Alert("🎞️  " + indexA + " 🔄 " + indexB, 1.5)
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
    
};


function swapItems(a = Number, b = Number) {
    comandosb[a] = comandosb.splice(b, 1, comandosb[a])[0];
    animacao[a] = animacao.splice(b, 1, animacao[a])[0];
    changeFrame(b)
       adicionaQuadro()
    }

function compara(a,b){
    if (a.length-undoLevel == b.length){
        return true
    }else{
        return false
    }
}