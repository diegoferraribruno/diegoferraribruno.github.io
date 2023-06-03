let oldMode = mode;

async function modeTo(qual) {
    setTimeout(() => stop(), 300)
    canvasFront.style.backgroundColor = "transparent"
    canvasFront.filter = "none"
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
            Alert(`<span title="Apagar" class="bot" onmousedown="modeTo('apagar')">🧽</span>  ${alerts[language][9]} ${alerts[language][11]} <br> ${alerts[language][7]}`, 1)
            changeGCO("destination-out")
            //cursorColor()
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
            // mode = qual;
            break;
        case "recortar":
            /*  let len = comandos.length
              if (len > 1 && comandos[len - 1][0] != "i") {
                  new_frame()
                  console.log("quadro salvo")
              }*/
            cut()

            mode = qual;
            //removeClass();
            break;
        case "rotacionar":
            break;
        case "zoomx":
            //removeClass();
            /*  */
            mode = "zoomx"
            break;
        case "cam":
            mode = qual
            camera();
            changeGCO();
            // memorySwap();
            break;
        case "apagar":

            // cursorColor()
            /*brushMode = 0;
            setStrokeSize(estrokeWidth);
            cursorColor();
            mudaCorAlpha();*/
            changeGCO("destination-out");
            break;
        case "pintar":
            mode = qual
            setStrokeSize(strokeWidth);
            setStrokeColor();
            changeGCO();
            // memorySwap();
            break;
        case "cores":
            changeGCO();
            //  memorySwap();
            break;
        case "fundo":

            changeGCO();
            // memorySwap();
            break;

        case "preencher":

            changeGCO();
            break;
        case "picker":
            mode = qual
            // cursorColor()
            break;
        case "move":
            mode = qual
            // cursorColor()
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
            // setStrokeSize(strokeWidth);
            // setStrokeColor();
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
    //cursorColor();
}
