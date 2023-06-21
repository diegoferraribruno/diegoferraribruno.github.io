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
    let confirm = iD("confirm")
    if (!confirm) {
        let item = document.createElement("div")
        item.id = "confirm"
        item.classList.add("confirm")
        item.innerHTML = `aplicar o efeito <br> <div  class="shadow" onClick="applyFX('` + fx + `')"> ` + fxname + ' ✅ </div >' +
            `<div onClick="cancelaFX()"
             class='shadow'">cancela ❌</div>`
        document.body.appendChild(item)
    } else {
        cancelaFX()
        confirmFX(fx)

    }
}
function applyFX() {

    let confirm = iD("confirm")
    confirm.parentElement.removeChild(confirm)
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

    let confirm = iD("confirm")
    confirm.parentElement.removeChild(confirm)
    mostraMenu("FX")
    canvasFront.filter = filters[0]
}
function menufx(qual) {
    iD("fx" + qual).style.removeClass("esconde")
}