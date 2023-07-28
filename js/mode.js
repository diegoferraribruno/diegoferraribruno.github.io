let oldMode = mode;

async function modeTo(qual) {
    setTimeout(() => stop(), 300)
    canvasFront.style.backgroundColor = "transparent"
    canvasFront.filter = "none"
    if (qual == "pintar") {
        Alert(`<span title="Pintar" class="bot"><span
        class="icon pintaricon"></span></span>  ${alerts[language][26]}<br> ${alerts[language][7]}`, 1)

    }

    if (mode != qual) {
        if (qual != "recortar") {
            removeClass("flip")
            setTimeout(() => {
                origin.x = 0
                origin.y = 0
            }, 40)
        }
        removeClass();
        toggleSelect(qual);
        if (qual != "apagar") {
            mode = qual
            mostraMenu(qual);

        } else {

            mode = "pintar"
            oldMode = "pintar"
            mostraMenu("pintar");
            Alert(`<span title="Apagar" class="bot"><span
            class="icon eraseicon"></span></span>${alerts[language][9]} ${alerts[language][11]}<br> ${alerts[language][7]}`, 1)
            changeGCO("destination-out")
        }
    } else {
        removeClass();
        if (qual != "apagar") { mostraMenu(qual); }
        if (qual == "cam") {
            removeVideo()
        }
    }
    switch (qual) {
        case "FX":
            canvasFront.classList.remove("esconde")
            updatecanvasFront()
            mode = "FX";
            break;
        case "salvar":
            break;
        case "recortar":
            cut()
            mode = qual;
            break;
        case "redimensionar":

            mode = qual;
            break;
        case "selecionar":

            mode = qual;
            break;
        case "paste":
            updateClipboard()
            mode = qual;
            break;
        case "rotacionar":
            break;
        case "zoomx":
            mode = "zoomx"
            break;
        case "cam":
            mode = qual
            camera();
            changeGCO();
            break;
        case "apagar":
            changeGCO("destination-out");
            break;
        case "pintar":
            mode = qual
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
            mode = qual
            break;
        case "move":
            mode = qual
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
            modeTo(oldMode)
            break;
        case "emoji":
            mode = qual
            setTimeout(() => {
                emojiSizeRange();
            }, 40)
            changeGCO();

            break;
        case "FX":
            break;
        case _:
            break;
    }
}

function glow() {
    isGlowing = !isGlowing
    if (isGlowing === true) {
        ctxF.globalCompositeOperation = 'lighter'
        //context.globalCompositeOperation = 'lighter'

        if (!nightmode) {
            night()
        }
        modeTo("cores")
    } else {
        ctxF.globalCompositeOperation = 'destination-over'
        night()
    }
}