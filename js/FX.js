let filters = ["none", "invert", "blur", "grayscale", "sepia", "contrast",]
let fx = 0

function FX(fx, onde) {
    canvasFront.ctx.save()
    if (onde == undefined) {
        onde = canvasFront.ctx
        confirmFX(fx, filters[fx])
    }
    if (fx != 0) {

        if (fx > 3) {
            let quanto = iD(filters[fx] + "Bar").value
            onde.filter = filters[fx] + "(" + quanto + "%)"

        } else if (fx == 1) {

            onde.filter = filters[fx] + "()"
        } else if (fx == 2) {
            let quanto = iD(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + "px)"
        } else if (fx == 3) {
            let quanto = iD(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + ")"

        }
        updatecanvasFront()

    } else {
        onde.filter = filters[fx]
    }

}
function updatecanvasFront() {
    // canvasFront.style.backgroundColor = "#ffffff"
    canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasFront.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvasFront.ctx.drawImage(canvas, 0, 0)
    canvasFront.ctx.restore()
}

function confirmFX(fx, fxname) {
    //removeClass()
    let confirm = iD("confirmFX")
    confirm.classList.remove("esconde")
    // confirm.classList.add("confirm")
    confirm.innerHTML = `aplicar o efeito <br> <div  class="shadow" onClick="applyFX('` + fx + `')"> ` + fxname + ' ✅ </div >' +
        `<div onClick="cancelaFX()"
             class='shadow'">cancela ❌</div>`
}
function applyFX() {

    removeClass()
    img_b64 = canvasFront.toDataURL("image/png");
    desenha("s", "source-over", img_b64, 0, 0, canvas.width, canvas.height)
    canvasFront.filter = filters[0]

    // comandosParaComandosb()
    setTimeout(() => {
        //   comando = ["FX", fx]
        //  comandos.unshift(comando)
        save_frame()
        Alert(alerts[language][14])
        removeClass()
        canvasFront.filter = filters[0]
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }, 300)
}
function cancelaFX() {
    mostraMenu("FX")
    iD("confirmFX").classList.add("esconde")
    canvasFront.filter = filters[0]
    canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasFront.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
function menufx(qual) {
    for (i = 1; i < 6; i++) {
        document.getElementById("fx" + i).classList.add("esconde")

    }
    document.getElementById("fx" + qual).classList.remove("esconde")
}