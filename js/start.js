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

  setTimeout(() => { yoga() }, 1200)
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
    let activeEl = document.activeElement
    // console.log(event.key)
    if (activeEl.tagName != "INPUT" && activeEl.tagName != "EMOJI-PICKER" && activeEl.type != "text" && keyCtrl == false) {
      if (mode != "emoji" && keyCtrl == false) {
        if (event.key === "Enter" && mode == "recortar") {
          cortar();
        } else if (event.key === "Enter" && mode == "cam") {
          tirafoto()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          next_frame()
        } else if (event.key === "ArrowLeft") {
          event.preventDefault()
          prev_frame()
        } else if (event.key === "Escape" && mode == "cam") {
          removeVideo();
        } else if (event.key === "Escape") {
          removeClass();
          window.parent.focus()
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
          Mirror()
        } else if (event.key === "m") {
          modeTo("move")
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
          new_frame()
        } else if (event.key === "Delete") {
          removeFrame()
        }
      }/* else if (event.code === "Space" && keyCtrl == true) {
        if (mode == "play") {
          stop();
        } else {
          play();
        }
      }*/
    }

  }

  ZOOMf(2)
  setTimeout(() => {
    ZOOMf(1)
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
    canvas.addEventListener("pointerup", handleUp);
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
    iD("new_frame()").addEventListener("drop", drop);
    iD("new_frame()").addEventListener("dragover", dragOver);


    // limpaCabeca();
    apresenta()
  }, 1000);
  setTimeout(() => localize(), 200)
  if (/^pt\b/.test(navigator.language)) {
    setTimeout(() => localize(), 320)

  }
  setTimeout(() => { createNewBrush() }, 160)
  loading()

}

var canvasFrontDeg = 0
function wheel(e) {
  if (keyCtrl == true) {
    e.preventDefault(); adjustZoom(-1 * e.deltaY, null, e.clientX, e.clientY)

  }

  if (keyAlt == true) {
    e.preventDefault();
    canvasFrontDeg += redondo((e.deltaY / 20))
    if (canvasFrontDeg > 360) {
      canvasFrontDeg = 0
    } else if (canvasFrontDeg < 0) {
      canvasFrontDeg = 360
    }
    rotateFront(canvasFrontDeg, (e.pageX - offsetX) / zoomFactor
      , (e.pageY - offsetY) / zoomFactor);
    iD("canvasfrontdeg").value = +canvasFrontDeg

  }
}


function updateCanvasFrontDeg() {
  canvasFrontDeg = +iD("canvasfrontdeg").value
  rotateFront(canvasFrontDeg, canvasRender.width / 2, canvasRender.height / 2)
  canvasFront.classList.remove("esconde")
}
function loading() {
  setTimeout(() => { removeElement("carregandoa") }, 10000)
}

function rotateFront(deg, x, y) {
  //console.log(deg)
  ctxR.setTransform(1, 0, 0, 1, 0, 0);
  ctxR.clearRect(0, 0, canvas.width, canvas.height);
  ctxR.save()
  canvasRender.globalCompositeOperation = "source-out"
  //if (iD("rotatecenter").checked == true) {
  origin.x = canvasRender.width / 2;
  origin.y = canvasRender.height / 2;
  //}
  ctxR.translate(origin.x, origin.y)
  ctxR.rotate((deg * Math.PI) / 180);

  ctxR.drawImage(image2, - image2.width / 2, -image2.height / 2)
  ctxR.restore()
  setTimeout(() => {
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
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