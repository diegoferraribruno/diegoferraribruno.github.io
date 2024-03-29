let oldMode = mode;

async function modeTo(qual) {
  if (mode == "FX") {
    cancelaFX();
  }
 if (oldMode == "paste") {
   context.clearRect(0, 0, context.canvas.width, context.canvas.height); context.clearRect(0, 0, context.canvas.width, context.canvas.height);
 }
   setTimeout(() => stop(), 300);
  canvasFront.style.backgroundColor = "transparent";
  canvasFront.filter = "none";
  if (qual == "pintar") {
    Alert(
      `<span title="Pintar" class="bot"><span
        class="icon pintaricon"></span></span>  ${alerts[language][26]}<br> ${alerts[language][7]}`,
      1
    );
  }
  toggleSelect(qual);
  if (mode != qual) {
    if (qual != "recortar") {
      removeClass("flip");
      setTimeout(() => {
        origin.x = 0;
        origin.y = 0;
      }, 40);
    }
    removeClass();
    if (qual != "apagar") {
      mode = qual;
      mostraMenu(qual);
    } else {
      mode = "pintar";
      oldMode = "pintar";
      mostraMenu("pintar");
      Alert(
        `<span title="Apagar" class="bot"><span
            class="icon eraseicon"></span></span>${alerts[language][9]} ${alerts[language][11]}<br> ${alerts[language][7]}`,
        1
      );
      changeGCO("destination-out");
    }
  } else {
    removeClass();
    if (qual != "apagar") {
      mostraMenu(qual);
    }
    if (qual == "cam") {
      removeVideo();
    }
  }
  switch (qual) {
    case "texto":
      mode = qual;
      startTexto();
      iD("fontStrokeColor").style.backgroundColor = strokeColor;
      iD("fontStrokeColor").value = strokeColor;
      iD("fontEstrokeColor").style.backgroundColor = estrokeColor;
      iD("fontEstrokeColor").value = estrokeColor;

      break;
    case "FX":
      canvasFront.classList.remove("esconde");
      updatecanvasFront();
      mode = "FX";
      break;
    case "salvar":
      break;
    case "recortar":
      noErase();
      cut();
      mode = qual;
      break;
    case "redimensionar":
      noErase();
      qualityAlert();
      mode = qual;
      break;
    case "selecionar":
      noErase();
      canvasFront.style.zIndex = 3;
      mode = qual;
      break;
    case "paste":
      noErase();
      updateClipboard();
      transformClip();
      mode = qual;
      break;
    case "rotacionar":
      noErase();
      mode = qual;
      qualityAlert();
      break;
    case "zoomx":
      mode = "zoomx";
      break;
    case "cam":
      mode = qual;
      camera();
      changeGCO();
      break;
    case "apagar":
      changeGCO("destination-out");
      break;
    case "pintar":
      mode = qual;
      setStrokeSize(strokeWidth);
      setStrokeColor();
      changeGCO();

      break;
    case "cores":
      changeGCO();
      break;
    case "fundo":
      changeGCO();
      break;
    case "preencher":
      changeGCO();
      break;
    case "picker":
      mode = qual;
      break;
    case "move":
      noErase();
      mode = qual;
      break;
    case "help":
      Help();
      break;
    case "info":
      break;
    case "undo":
      undo();
      break;
    case "imagem":
      modeTo(oldMode);
      break;
    case "emoji":
      mode = qual;
      setTimeout(() => {
        emojiSizeRange();
      }, 40);
      changeGCO();

      break;
    case "FX":
      break;
    case _:
      break;
  }
}

function qualityAlert() {
  setTimeout(
    () =>
      Alert(
        `
    <span class="iconsmall alerticon"></span><span class="icon2 blur"></span>
     ${textos[language]["58"]}<span class="bot" onmousedown="cloneFrame()"> <span class="icon cloneframeicon"></span>
    <txt name="27">Duplicate frame
    </txt>
    </span>
    `,
        5
      ),
    200
  );
}

function noErase() {
  if (context.globalCompositeOperation == "destination-out") {
    context.globalCompositeOperation = "source-over";
  }
}
