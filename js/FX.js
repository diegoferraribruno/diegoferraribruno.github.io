let filters = ["none", "invert", "blur", "grayscale", "sepia", "contrast",]
let fx = 0

function FX(fx, onde) {
    if (onde == undefined) {
        onde = canvasBack.ctx
        confirmFX(fx, filters[fx])
    }
    if (fx != 0) {

        if (fx > 3) {
            let quanto = document.getElementById(filters[fx] + "Bar").value
            onde.filter = filters[fx] + "(" + quanto + "%)"

        } else if (fx == 1) {

            onde.filter = filters[fx] + "()"
        } else if (fx == 2) {
            let quanto = document.getElementById(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + "px)"
        } else if (fx == 3) {
            let quanto = document.getElementById(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + ")"

        }
        updateCanvasBack()
        /* comando = ["FX", fx]
         comandos.push(comando)*/

    } else {
        onde.filter = filters[fx]
    }

}
function updateCanvasBack() {
    canvasBack.style.backgroundColor = "#ffffff"
    canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasBack.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvasBack.ctx.drawImage(canvas, 0, 0)
}

function confirmFX(fx, fxname) {
    removeClass()
    let confirm = document.getElementById("confirm")
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
function applyFX(fx) {

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(canvasBack, 0, 0)
    let confirm = document.getElementById("confirm")
    confirm.parentElement.removeChild(confirm)
    removeClass()
    setTimeout(() => {
        save_frame()
        Alert(alerts[language][14])
        removeClass()

    }, 300)
}
function cancelaFX() {
    let confirm = document.getElementById("confirm")
    confirm.parentElement.removeChild(confirm)
    mostraMenu("FX")
    canvasBack.filter = filters[0]
}