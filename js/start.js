let startText = 0
let texts = [
  ["", "", "🖐 oie.", "Pode desenhar aqui!", "🖌️ 👆️"],
  ["", "", "Ou tirar uma 📷", "depois apagar 🧽 e", "no modo por baixo ⭕,"],
  ["", "", "tirar outra 📷", "E fazer uma bela", "foto-montagem!"]
]

document.addEventListener("DOMContentLoaded", startup);

function startup() {
  setTimeout(() => { yoga() }, 1000)
  window.addEventListener("resize", checkOrientation, false);
  window.addEventListener("orientationchange", checkOrientation, false);
  iD('inputSprite').addEventListener('change', importSprite);
  setInterval(checkOrientation, 2000);

  document.querySelector('emoji-picker').addEventListener('emoji-click', function onEvent(event) {
    trocaEmoji(event.detail.unicode);
    emojipicker();
  });
  Fundo("none")
  counter = setInterval(() => undoing(), 70)
  window.onkeydown = function (event) {
    let activeEl = document.activeElement
    // console.log(event.key)
    if (activeEl.tagName != "INPUT" && activeEl.tagName != "EMOJI-PICKER" && activeEl.type != "text") {
      if (mode != "emoji") {
        if (event.ctrlKey && event.key === 'c') {
          copySelection();
        } else if (event.ctrlKey && event.key === 'x') {
          cutSelection();
        }
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
        } else if (event.key === "z" && keyCtrl == false) {
          zoom2x()
        } else if (event.key === "p" || event.key === "b") {
          modeTo("pintar")
          removeClass()
        } else if (event.key === "e") {
          modeTo("apagar")
          removeClass()
        } else if (event.code === "Space" && keyCtrl == true) {

          if (mode == "play") {
            stop();
          } else {
            play();
          }

        } else if (event.key === "+" && keyCtrl == false) {
          new_frame()
        } else if (event.key === "Delete") {
          removeFrame()
        }
      }
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
    `<span style="position:relative; width:32px; display:inline-block; left:4px; ` +
    `padding-top: 0px;">🔲</span> <span style="color:white;` +
    `position:absolute;  display:block; width:20px; left: 3px; top:-5px;" title="Pintando por cima">⭕</span> `;
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
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("keydown", handleKeys);
  desenhoDiv.addEventListener("gesturestart", prevent, { passive: false });
  win.addEventListener("touchmove", prevent, { passive: false });

  initStrokeRange()
  setTimeout(() => resizeScreen(), 10)
  pixel()

  setTimeout(() => {
    canvas.addEventListener("pointerdown", handleStart);
    canvas.addEventListener("pointerup", handleUp);
    // iD("canvas_div2").addEventListener("pointerup", handleUp);

    canvas.addEventListener("pointercancel", handleCancel);
    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleEnd);
    // canvas.addEventListener('touchmove', (e) => handleTouch(e))
    win.addEventListener('wheel', (e) => wheel(e))


    // limpaCabeca();
    apresenta()
  }, 1000);
  setTimeout(() => { localize(), createNewBrush() }, 160)
  loading()

}
function wheel(e) {
  if (keyCtrl == true) {
    e.preventDefault(); adjustZoom(-1 * e.deltaY, null, e.clientX, e.clientY)

  }
}
function loading() {
  setTimeout(() => { removeElement("carregandoa") }, 10000)
}

function apresenta() {
  if (comandos.length == 0 && mode == "pintar") {
    canvasFront.ctx.font = 24 + 'px serif';
    canvasFront.ctx.textAlign = "center";
    canvasFront.ctx.textBaseline = "middle";
    let len = texts[startText].length
    for (i = 0; i < len; i++) {
      canvasFront.ctx.fillText(texts[startText][i], 160, 40 * i + 40)
    }
    setTimeout(() => {
      canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
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