let startText = 0
let texts = [
  ["", "", "🖐 oie.", "Pode desenhar aqui!", '<span class="icon pintaricon"></span> 👆️'],
  ["", "", "Ou tirar uma 📷", "depois apagar 🧽 e", "no modo por baixo ⭕,"],
  ["", "", "tirar outra 📷", "E fazer uma bela", "foto-montagem!"]
]

document.addEventListener("DOMContentLoaded", startup);

function startup() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    night()
  }
  setTimeout(() => { toggleDinamicBrush(), yoga() }, 500)
  window.addEventListener("resize", checkOrientation, false);
  window.addEventListener("orientationchange", checkOrientation, false);
  iD('inputSprite').addEventListener('change', importSprite);
  setInterval(checkOrientation, 2000);

  /*document.querySelector('emoji-picker').addEventListener('emoji-click', function onEvent(event) {
    trocaEmoji(event.detail.unicode);
    emojipicker();
  });*/
  Fundo("none")
  counter = setInterval(() => undoing(), 600)
  window.onkeydown = function (event) {
    if (event.ctrlKey && event.key === 'c') {
      copySelection();
    } else if (event.ctrlKey && event.key === 'x') {
      copySelection("cut")
    } if (event.ctrlKey && event.key === 'v') {
      //pasteSelection()
      mode = "paste"
    }
    if (event.key === "Escape") {
      removeClass();
      window.parent.focus()
      if (mode == "texto") {
        iD("dropdown-options").classList.add("esconde")
      }
    }
    let activeEl = document.activeElement
    if (activeEl.tagName != "INPUT" && activeEl.tagName != "EMOJI-PICKER" && activeEl.type != "text") {
      if (mode != "emoji" && keyCtrl == false && keyAlt == false) {
        if ((mode == "texto" && !iD("dropdown-options").classList.contains("esconde"))) {

          return
        }
        if (event.key === "Enter" && mode == "recortar") {
          cortar();
        } else if (event.key === "Enter" && mode == "cam") {
          tirafoto()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          nextFrame()
        } else if (event.key === "ArrowLeft") {
          event.preventDefault()
          prev_frame()
        } else if (event.key === "Escape" && mode == "cam") {
          removeVideo();
        } else if (event.key === "z") {
          zoom2x()
        } else if (event.key === "p" || event.key === "b") {
          modeTo("pintar")
          //removeClass()
        } else if (event.key === "e") {
          modeTo("apagar")
          removeClass()
        } else if (event.key === "s") {
          modeTo("selecionar")
        } else if (event.key === "c") {
          mostraMenu("cores")
        } else if (event.key === "v") {
          modeTo("move")
        } else if (event.key === "m") {
          Mirror()
        } else if (event.key === "*") {
          Mandala()
        } else if (event.key === "d") {
          toggleDinamicBrush()
        } else if (event.key === "x") {
          rainbow()
        } else if (event.key === "r") {
          modeTo("rotacionar")
        } else if (event.key === "g") {
          glow()
        } else if (event.key === "+") {
          newFrame()
        } else if (event.key === "Delete") {
          lixeira()
        } else if (event.key === "t") {
          modeTo("texto")
          event.preventDefault()
          const input = document.getElementById("textInput");
          input.focus();
          input.select();
        } else if (event.key == "i") {
          toggleConsole()
        }
      } else if (keyAlt == true) {
        if (event.key === "+") {
          cloneFrame()
        }

      } else if (keyCtrl && event.key === "+") {
        event.preventDefault()
        zoom2x()
        //console.dir(event)
      } else if (keyCtrl && event.key === "-") {
        event.preventDefault()
        zoomMinus()
        //console.dir(event)

      } else if (keyCtrl && event.key === "s") {
        event.preventDefault()
        mostraMenu("salvar")
        //console.dir(event)

      } else if (keyCtrl && event.key === "o") {
        event.preventDefault()
        mostraMenu("imagem")
        //console.dir(event)
      }

      if (event.key === "Enter" && mode == "texto") {
        textToHistory();
      }
      /* else if (event.code === "Space" && keyCtrl == true) {
        if (mode == "play") {
          stop();
        } else {
          play();
        }
      }*/
    }



  }
  setShareLinks();
  //ZOOMf(2)
  setTimeout(() => {
    ZOOMf(2)
    setTimeout(() => {
      modeTo("pintar")
      removeClass();
    }, 50)

  }, 50)



  iD(
    "globalComposite"
  ).innerHTML =
    `<span class="icon2 paintovericon"></span>`;
  window.addEventListener("resize", function (event) {
    resizeScreen();
  });
  resizeScreen();
  iD("undo").addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      undoT();
    },
    { passive: false }
  );
  iD("undo").addEventListener(
    "touchend",
    (event) => {
      event.preventDefault();
      undoTEnd();
    },
    { passive: false }
  );
  iD("redo").addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      redoT();
    },
    { passive: false }
  );
  iD("redo").addEventListener(
    "touchend",
    (event) => {
      event.preventDefault();
      redoTEnd();
    },
    { passive: false }
  );
  iD("lixeira").addEventListener("drop", drop);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("keydown", handleKeys);
  win.addEventListener("gesturestart", prevent, { passive: false });
  win.addEventListener("touchmove", prevent, { passive: false });

  initStrokeRange()
  setTimeout(() => resizeScreen(), 10)
  pixel()

  setTimeout(() => {
    canvas.addEventListener("pointerdown", handleStart);
    //canvas.addEventListener("pointerup", handleUp);
    // iD("canvas_div2").addEventListener("pointerup", handleUp);

    canvas.addEventListener("pointercancel", handleCancel);
    // canvas.addEventListener("pointermove", handleMove);
    win.addEventListener("pointerleave", handleEnd);
    canvas.addEventListener("dragover", dragOver);
    canvas.addEventListener("drop", drop);
    canvas.addEventListener("dragover", dragOver);
    // canvas.addEventListener('touchmove', (e) => handleTouch(e))
    win.addEventListener('wheel', (e) => wheel(e))
    win.addEventListener("pointerup", handleUp);

    win.addEventListener("pointermove", handleMove);


    iD("lixeira()").addEventListener("drop", drop);
    iD("lixeira()").addEventListener("dragover", dragOver);
    iD("newFrame()").addEventListener("drop", drop);
    iD("newFrame()").addEventListener("dragover", dragOver);


    // limpaCabeca();
    apresenta()
  }, 1000);
  setTimeout(() => localize(), 200)
  if (/^pt\b/.test(navigator.language)) {
    setTimeout(() => localize(), 320)

  }
  setTimeout(() => { createNewBrush(); ghost() }, 160)
  loading()

}

var canvasFrontDeg = 0
var canvasFrontScale = 100
var isFlip = false

function flipClip() {
  isFlip = !isFlip
  transformClip()
  if (isFlip) {
    iD("mirror2").innerHTML = `<span class="minicheck"></span>`
  } else {
    iD("mirror2").innerHTML = ``
  }
}

function wheel(e) {
  if (keyCtrl == true) {
    if (mode != "paste") {
      e.preventDefault();
      adjustZoom(-1 * e.deltaY, null, e.clientX, e.clientY)
    } else {
      e.preventDefault();
      canvasFrontScale += redondo((e.deltaY / 100))
      if (canvasFrontScale > 400) {
        canvasFrontScale = 400
      } else if (canvasFrontScale < 1) {
        canvasFrontScale = 1
      }
      iD("canvasfrontscale").value = +canvasFrontScale
      transformClip((e.pageX - offsetX) / zoomFactor
        , (e.pageY - offsetY) / zoomFactor)
    }

  }

  if (keyAlt == true) {
    e.preventDefault();
    canvasFrontDeg += redondo((e.deltaY / 20))
    if (canvasFrontDeg > 360) {
      canvasFrontDeg = 0
    } else if (canvasFrontDeg < 0) {
      canvasFrontDeg = 360
    }
    iD("canvasfrontdeg").value = +canvasFrontDeg
    /*transformClip((e.pageX - offsetX) / zoomFactor
      , (e.pageY - offsetY) / zoomFactor);*/
    transformClip((e.pageX - offsetX) / zoomFactor
      , (e.pageY - offsetY) / zoomFactor)
  }
}

function loading() {
  setTimeout(() => { removeElement("carregando") }, 1000)
}


function transformClip(x = canvas.width / 2, y = canvas.height / 2) {
  canvasFrontScale = +iD("canvasfrontscale").value
  canvasFront.classList.remove("esconde")
  canvasFrontDeg = +iD("canvasfrontdeg").value
  //console.log(deg)
  ctxR.setTransform(1, 0, 0, 1, 0, 0);
  ctxR.clearRect(0, 0, canvasRender.width, canvasRender.height);
  ctxR.save()
  canvasRender.globalCompositeOperation = "source-out"
  //if (iD("rotatecenter").checked == true) {
  origin.x = canvasRender.width / 2;
  origin.y = canvasRender.height / 2;
  //}
  ctxR.translate(origin.x, origin.y)
  ctxR.rotate((canvasFrontDeg * Math.PI) / 180);
  let h = redondo(image2.height * canvasFrontScale / 100)
  let w = redondo(image2.width * canvasFrontScale / 100)
  // ctxR.translate(w, 0);
  if (isFlip) {
    ctxR.scale(-1, 1);
  }
  ctxR.drawImage(image2, - redondo(w / 2), -redondo(h / 2), w, h)
  ctxR.restore()
  setTimeout(() => {
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, canvasRender.width, canvasRender.height);
    ctxF.drawImage(canvasRender, x - canvasRender.width / 2, y - canvasRender.height / 2)
  }, 80)
}


function apresenta() {
  if (comandos.length == 0 && mode == "pintar") {
    ctxF.font = 24 + 'px serif';
    ctxF.textAlign = "center";
    ctxF.textBaseline = "middle";
    let len = texts[startText].length
    for (i = 0; i < len; i++) {
      ctxF.fillText(texts[startText][i], 160, 40 * i + 40)
    }
    setTimeout(() => {
      ctxF.setTransform(1, 0, 0, 1, 0, 0);
      ctxF.clearRect(0, 0, canvas.width, canvas.height);
      setTimeout(() => { apresenta() }
        , 600);
    }, 1800);
    startText++
    if (startText >= texts.length) {
      startText = 0
    }

  }

}
function goodbye(e) {
  if (!e) e = window.event;
  //e.cancelBubble is supported by IE - this will kill the bubbling process.
  e.cancelBubble = true;
  e.returnValue = 'You sure you want to leave?'; //This is displayed on the dialog

  //e.stopPropagation works in Firefox.
  if (e.stopPropagation) {
    e.stopPropagation();
    e.preventDefault();
  }
}
window.onbeforeunload = goodbye; 