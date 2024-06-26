var lines = [[]];
var current = 0;
var currentLayer = 0
var animacao = [[]];
var anime = iD("anime");
var fps = 8;
var ghostframes = true;

var anime_menu = {
  "ghost()": [`<span class="icon ghosticon"></span>`, "Ghost Frames"],
  "prev_frame()": ['<span class="icon backicon"></span>', "Quadro anterior"],
  "play()": ['<span class="icon playticon"></span>', "Tocar Animação"],
  "nextFrame()": ['<span class="icon nexticon"></span>', "Próximo quadro"],
  // "swapL()": ["⬅️", "Mover quadro á esquerda"],
  // "swapR()": ["➡️", "Mover quadro á direita"],
  "cloneFrame()": [
    '<span class="icon cloneframeicon"></span>',
    "duplicate frame",
  ],
  "newFrame()": [
    '<span class="icon addframeicon"></span>',
    "Adiconar quadro á animação",
  ],
  "lixeira()": [
    '<span class="icon lixeiraicon"></span>',
    "Arraste um quadro para apaga-lo",
  ],
};

function changeLine(val) {
  Historia();
  if (lines[current].length != 0) {
    current = val;
    workingframe = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    let swapImg = canvasFront.toDataURL("image/png");
    if (lines.length <= val) {
      swapImg = canvas.toDataURL("image/png");
      lines.push([]);
      historia.push([]);
      lines[val][0] = swapImg;
      historia[val][0] = [];
      historia[val][0].push(swapImg);
      //  Historia()
    }
    changeFrame(workingframe);
    adicionaQuadro();
  } else {
    Alert("Empty timeline");
  }
}

function changeLineButton(direction) {
  let test = current + direction;
  if (test >= 0) {
    Alert(alerts[language][33] + " " + test);
    iD("layernumber").value = test;
    changeLine(test);
  }
}

function criaAnime() {
  var uiFilme = iD("ui_filme");
  let contador = document.createElement("div");
  var ui = document.createElement("div");

  anime.innerHTML = "";
  Object.keys(anime_menu).forEach((key, index) => {
    let item = document.createElement("div");
    item.setAttribute("onClick", key);
    item.id = key;
    item.innerHTML = anime_menu[key][0];
    item.title = anime_menu[key][1];
    item.classList.add("shadow", "bot");
    anime.appendChild(item);
  });
  anime.innerHTML += `<span id="animebot" title="configurar animação" class="bot" onclick="mostraMenu('anime')"> <span class="bot"> <span class="icon configtimeicon"></span></span>
    </span>`;

  contador.id = "contador";
  contador.setAttribute("style", "color:white; z-index:8");
  contador.innerHTML = current + "-" + workingframe;
  ui.classList.add("bot", "shadow");
  ui.title = "Quadros da animação toque para mostrar/esconder";
  ui.setAttribute("onclick", "limpaAnime()");
  ui.innerHTML = '<span class="icon filmicon"></span>';
  ui.appendChild(contador);
  var filme = document.createElement("div");
  filme.id = "filmecontainer";
  filme.classList.add("filme");
  filme.innerHTML = "";
  uiFilme.appendChild(ui);
  uiFilme.appendChild(filme);
}

setTimeout(() => {
  criaAnime();
  setTimeout(() => {
    Historia();
    // limpaAnime()
  }, 350);
}, 200);

function limpaAnime() {
  let filme = iD("filmecontainer");
  filme.classList.toggle("hideanime2");
  filme.classList.toggle("filme");

  anime.classList.toggle("hideanime");
}

function criaBackPlayer() {
  var player = document.createElement("div");
  player.id = "bplayer0";
  player.style.display = "block";
  player.style.width = canvas.width + "px";
  player.style.height = canvas.height + "px";
  player.style.position = "absolute";
  player.style.marginTop = -canvas.height - 4 + "px";
  player.classList.add("filter");
  player.classList.add("filterlight");
  player.classList.add("fundo2");
  player.style.zIndex = -1 * i - 1;
  player.style.opacity = 0.4;
  iD("canvas_div").appendChild(player);
}

criaBackPlayer();

function newFrame() {
  undoLevel = 0;
  Historia();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  workingframe++;
  swapImg = canvas.toDataURL("image/png");
  lines[current].splice(workingframe, 0, swapImg);
  ctxF.setTransform(1, 0, 0, 1, 0, 0);
  ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  changeFrame(workingframe);
  iD("contador").innerHTML = current + "-" + workingframe;
}

let playing = 0;
var inter;

function play() {
  Historia();
  oldMode = mode;
  mode = "play";
  if (lines[current].length > 1) {
    iD("play()").innerHTML =
      ' <span onmousedown="stop()" class="icon stopicon"></span>';
    clearInterval(inter);
    canvasFront.classList.remove("esconde");

    canvasFront.style.zIndex = 3;
    ctxF.globalAlpha = 1;
    ctxF.globalCompositeOperation = "destination-over";
    if (nightmode) {
      canvasFront.style.backgroundColor = "#333333";
    } else {
      canvasFront.style.backgroundColor = "#eeeeee";
    }
    inter = setInterval(() => {
      playing++;
      if (playing >= lines[current].length) {
        playing = 0;
      }
      playerPlay(playing);
    }, 1000 / fps);
  } else {
    Alert(alerts[language][0]);
  }
}
function stop() {
  if (mode == "play") {
    mode = oldMode;
  }
  clearInterval(inter);
  ctxF.setTransform(1, 0, 0, 1, 0, 0);
  ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
  canvasFront.style.backgroundColor = "transparent";
  iD("play()").innerHTML = '<span class="icon playicon"></span>';
  if (context.globalCompositeOperation == "destination-over") {
    canvasFront.style.zIndex = -1;
  }
}

let playerimg = new Image();
function playerPlay(frame) {
  ctxF.setTransform(1, 0, 0, 1, 0, 0);
  ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
  canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
  canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
  playerimg.src = lines[current][frame];
  ctxF.drawImage(playerimg, 0, 0);
}

function changeFrame(frame) {
  let old0 = frame;
  let oldGCO = context.globalCompositeOperation;
  workingframe = frame;
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = "source-over";
  canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
  canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
  iD("contador").innerHTML = current + "-" + workingframe;

  if (frame > 2) {
    let old3 = frame - 3;
    var image3 = new Image();
    image3.src = lines[current][old3];
    image3.onload = function () {
      canvasBack.ctx.globalAlpha = 0.1;
      canvasBack.ctx.drawImage(
        image3,
        0,
        0,
        canvasBack.width,
        canvasBack.height
      );
    };
  }
  if (frame > 1) {
    let old2 = frame - 2;
    var image2 = new Image();
    image2.src = lines[current][old2];
    image2.onload = function () {
      canvasBack.ctx.globalAlpha = 0.15;
      canvasBack.ctx.drawImage(
        image2,
        0,
        0,
        canvasBack.width,
        canvasBack.height
      );
    };
  }
  if (frame > 0) {
    let old1 = frame - 1;
    var image1 = new Image();
    image1.src = lines[current][old1];
    image1.onload = function () {
      canvasBack.ctx.globalAlpha = 0.2;
      canvasBack.ctx.drawImage(
        image1,
        0,
        0,
        canvasBack.width,
        canvasBack.height
      );
    };
  }
  if (background_anim == true) {
    iD("bplayer0").style.backgroundImage =
      'url("' + backgroundSprite.src + '")';
    iD("bplayer0").style.backgroundPositionX =
      -canvas.width * workingframe + "px";
  }
  if (frame < lines[current].length - 1) {
    let old4 = frame + 1;
    var image4 = new Image();
    image4.src = lines[current][old4];
    image4.onload = function () {
      canvasBack.ctx.globalAlpha = 0.05;
      canvasBack.ctx.drawImage(
        image4,
        0,
        0,
        canvasBack.width,
        canvasBack.height
      );
    };
  }

  var imageFrame = new Image();
  imageFrame.src = lines[current][frame];
  context.globalAlpha = 1;
  imageFrame.onload = function () {
    context.drawImage(imageFrame, 0, 0, imageFrame.width, imageFrame.height);
    undoLevel = 0;
    setTimeout(() => {
      context.globalCompositeOperation = oldGCO;
    }, 60);
    scrollFilme();
  };
}

function resetFrame() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  var imageFrame = new Image();
  imageFrame.src = lines[current][workingframe];
  context.drawImage(imageFrame, 0, 0, canvasBack.width, canvasBack.height);
}

function nextFrame() {
  Historia();
  let len = lines[current].length;
  if (len > 1) {
    workingframe++;
    if (workingframe >= len) {
      workingframe = 0;
    }
    changeFrame(workingframe);
  } else {
    Alert(alerts[language][0]);
  }
}
function prev_frame() {
  Historia();
  let len = lines[current].length;
  if (len > 1) {
    workingframe--;
    if (workingframe < 0) {
      workingframe = len - 1;
      if (workingframe < 0) {
        workingframe = 0;
      }
    }
    changeFrame(workingframe);
    iD("contador").innerHTML = current + "-" + workingframe;
  } else {
    Alert(alerts[language][0]);
  }
}

function changeFPS(valor) {
  fps = valor;
  stop();
  play();
}
function changeFPSup() {
  fps++;
  if (fps > 60) {
    fps = 60;
  }
  iD("fpsnumber").value = fps;
  stop();
  play();
}
function changeFPSdown() {
  fps--;
  if (fps < 1) {
    fps = 1;
  }
  iD("fpsnumber").value = fps;
  stop();
  play();
}
function removeFrame() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  lines[current].splice(workingframe, 1);
  historia[current].splice(workingframe, 1);
  if (lines[current].length > 0) {
    workingframe--;
    if (workingframe < 0) {
      workingframe = lines[current].length - 1;
      if (workingframe < 0) {
        workingframe = 0;
      }
    }
    changeFrame(workingframe);
    iD("contador").innerHTML = current + "-" + workingframe;
  } else {
    changeFrame(0);
  }
  adicionaQuadro();
}
function removeLine() {
  let confir = confirm("Remove animation line?");
  if (confir) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    historia.splice(current, 1);
    lines.splice(current, 1);
    if (lines.length == 0) {
      lines.push([]);
      historia.push([]);
      swapImg = canvas.toDataURL("image/png");
      lines[0][0] = swapImg;
      historia[0][0] = [];
      historia[0][0].push(swapImg);
      //  Historia()
    }
    current--;
    if (current < 0) {
      current = lines.length - 1;
      workingframe = 0;
    } //  adicionaQuadro();

    changeFrame(workingframe);
    adicionaQuadro();
  }
}
function cloneFrame(frame = workingframe) {
  workingframe = frame + 1;
  lines[current].splice(workingframe, 0, lines[current][frame]);
  historia[current].splice(workingframe, 0, historia[current][frame]);
  changeFrame(workingframe);
  adicionaQuadro();
  Alert(
    '<span class="icon cloneframeicon"></span>' +
    alerts[language][1] +
    " " +
    frame +
    " " +
    alerts[language][10]
  );
}

let swapImg = new Image();

var background_anim = false;

function changeBackGroundAnimation(frame) {
  if (background_anim == true) {
    iD("bplayer0").style.backgroundImage =
      'url("' + backgroundSprite.src + '")';
    iD("bplayer0").style.backgroundPositionX = -canvas.width * frame + "px";
    iD("bplayer0").style.backgroundSize = "initial";
  }
}

function sobreporFundo() {
  iD("bplayer0").style.zIndex = iD("bplayer0").style.zIndex * -1;
}

var animSize = 0;

async function adicionaQuadro() {
  let filme = iD("filmecontainer");
  filme.innerHTML = "";
  let newFilme = document.createElement("div");
  newFilme.id = "filme";
  animSize = lines[current].length;
  for (i = 0; i < animSize; i++) {

    let cont = document.createElement("div");
    cont.id = i;
    cont.classList.add("quadrofilme", "light");
    cont.addEventListener("dragover", dragOver);
    cont.addEventListener("drop", drop);
    let thumb = document.createElement("div");
    thumb.innerHTML = i;
    thumb.style.backgroundImage = 'url("' + lines[current][i] + '")';

    thumb.id = i + "thumb";
    thumb.classList.add("thumb");
    thumb.draggable = true;
    thumb.addEventListener("click", function (event) {
      let changeToFrame = parseInt(event.target.id, 10);
      if (changeToFrame != workingframe) {
        workingframe = changeToFrame;
        changeFrame(workingframe);
      }
      toggleLayers()
    });
    thumb.addEventListener("dragstart", dragStart);
    thumb.addEventListener("dragend", dragEnd);
    //let layers = lines[current][i].length
    //layer miniatures
    for (l = 1; l < 3; l++) {
      let contl = document.createElement("div");
      contl.id = i + "_" + l;
      contl.addEventListener("click", function (event) {
        selectLayer(contl.id)
      })
      contl.classList.add("light", "thumbf");
      contl.setAttribute("style", `margin-top:${-30 * l}px`)
      contl.innerHTML = l
      cont.appendChild(contl);

    }
    cont.appendChild(thumb);
    newFilme.appendChild(cont);
  }
  filme.appendChild(newFilme);
  scrollFilme();
}
function scrollFilme(onde = workingframe) {
  iD("filmecontainer").scrollLeft = onde * 32;

  removeClass("wf");
  let thum = iD(workingframe);
  if (thum) {
    thum.classList.add("wf");
  }
}

function selectLayer(l = "1_1") {
  var elements = document.querySelectorAll('.thumbf');

  // Iterate over the selected elements
  elements.forEach(function (element) {
    // Toggle the class "hideanime2"
    element.classList.remove('selected');
  });
  let curentl = document.getElementById(l)
  curentl.classList.add("selected")
  currentLayer = + l[2]
  Alert("Layer: " + l[2])
}
function toggleLayers(l = 0) {
  var elements = document.querySelectorAll('.thumbf');

  // Iterate over the selected elements
  elements.forEach(function (element) {
    // Toggle the class "hideanime2"
    element.classList.toggle('hideanime2');
  });
}

function lixeira() {
  mostraMenu("lixeira");
}
var dataTransfer = 0;
var image2 = new Image();
function dragStart(event) {
  if (event.target.id[0] != "c") {
    dataTransfer = parseInt(event.target.id, 10);
    image2.src = lines[current][dataTransfer];
  } else {
    dataTransfer = event.target.id;
    image2.src = clipboard[parseInt(dataTransfer, 10)];
  }
}

function dragEnd(event) {
  setTimeout(() => {
    dataTransfer = "";
  }, 50);
}

function dragOver(event) {
  event.preventDefault();
  const toContainer = event.currentTarget;
  if (toContainer.id == "canvas") {
    canvasFront.classList.remove("esconde");
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    ctxF.drawImage(
      image2,
      event.layerX - image2.width / 2,
      event.layerY - image2.height / 2
    );
  }
}

function drop(event) {
  event.preventDefault();
  const toContainer = event.currentTarget;
  if (dataTransfer[0] !== "c") {
    if (toContainer.id == "lixeira()" || toContainer.id == "lixeira") {
      console.log(dataTransfer);
      historia[current].splice(dataTransfer, 1);
      lines[current].splice(dataTransfer, 1);
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      workingframe = 0;
      if (lines[current].length == 0) {
        lines[current][workingframe] = [];
        Historia();
      }

      changeFrame(0);
      adicionaQuadro();
    } else if (toContainer.id == "newFrame()") {
      cloneFrame(dataTransfer);
    } else if (toContainer.id == "canvas") {
      ctxF.setTransform(1, 0, 0, 1, 0, 0);
      ctxF.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image2,
        event.layerX - image2.width / 2,
        event.layerY - image2.height / 2
      );
      Historia();
      origin.x = 0;
      origin.y = 0;
    } else if (toContainer !== dataTransfer) {
      Alert(
        '<span class="icon filmicon"></span>  ' +
        dataTransfer +
        " 🔄 " +
        toContainer.id,
        1.5
      );
      swapItems(toContainer.id, dataTransfer);
      workingframe = dataTransfer;
      changeFrame(workingframe);
    }
  } else if (dataTransfer[0] === "c") {
    if (toContainer.id == "lixeira()") {
      clearClipboard();
    }
  }
  setTimeout(() => {
    dataTransfer = "";
  }, 200);
}

function ghost() {
  ghostframes = !ghostframes;
  if (ghostframes == true) {
    canvasBack.classList.remove("esconde");
    Alert(
      '<span class="icon ghosticon"></span>' +
      alerts[language][30] +
      " " +
      alerts[language][7]
    );
  } else {
    canvasBack.classList.add("esconde");
    Alert(
      '<span class="icon ghosticon"></span>' +
      alerts[language][30] +
      " " +
      alerts[language][8]
    );
  }
}

function swapL() {
  let a = workingframe;
  let b = workingframe - 1;
  if (b < 0) {
    b = comandos.length - 1;
  }
  moveObjectAtIndex(lines[current], a, b);
  moveObjectAtIndex(historia[current], a, b);

  changeFrame(b);
  adicionaQuadro();
}

function swapR() {
  let a = workingframe;
  let b = workingframe + 1;
  if (b >= lines[current].length) {
    b = 0;
  }

  moveObjectAtIndex(lines[current], a, b);
  moveObjectAtIndex(historia[current], a, b);
  changeFrame(b);
  adicionaQuadro();
}

function moveObjectAtIndex(arr, indexA, indexB) {
  Alert(
    '<span class="icon filmicon"></span>  ' + indexA + " 🔄 " + indexB,
    1.5
  );
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
}

function swapItems(a = Number, b = Number) {
  comandos[a] = historia[current].splice(b, 1, comandos[a])[0];
  lines[current][a] = lines[current].splice(b, 1, lines[current][a])[0];
  changeFrame(b);
  adicionaQuadro();
}

function compara(a, b) {
  if (a.length - undoLevel == b.length) {
    return true;
  } else {
    return false;
  }
}

//layers should be inside of lines 
setTimeout(() => { Alert("Layers are still beeing implemented use it the app as they do not exist") }, 5000)