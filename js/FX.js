let filters = ["none", "invert", "blur", "grayscale", "sepia", "contrast", "brightness", "remove-White", "hue-rotate"]
let fx = 0

function FX(fx, onde) {
    ctxF.save()
    if (onde == undefined) {
        onde = ctxF
        confirmFX(fx, filters[fx])
    }
    if (fx != 0) {

        if (fx == 1) {

            onde.filter = filters[fx] + "()"
        } else if (fx == 2) {
            let quanto = iD(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + "px)"
        } else if (fx == 3) {
            let quanto = iD(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + ")"

        }
        if (fx == 4 || fx == 5) {
            let quanto = iD(filters[fx] + "Bar").value
            onde.filter = filters[fx] + "(" + quanto + "%)"

        }
        else if (fx == 6) {
            let quanto = iD(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + ")"

        } else if (fx == 8) {
            let quanto = iD(filters[fx] + "Bar").value
            console.log(quanto)
            onde.filter = filters[fx] + "(" + quanto + "deg)"

        }
        updatecanvasFront()
        canvasOpacity(0)

    } else {
        onde.filter = filters[fx]

    }


}
function updatecanvasFront() {
    // canvasFront.style.backgroundColor = "#ffffff"
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
    ctxF.drawImage(canvas, 0, 0)
    ctxF.restore()
}

function confirmFX(fx, fxname) {
    //removeClass()
    let confirm = iD("confirmFX")
    menufx(fx)
    confirm.classList.remove("esconde")
    "display: none;"
    confirm.innerHTML = `<div  class="shadow" onClick="applyFX('` + fx + `')">  ✅ </div >` +
        `<div onClick="cancelaFX()"
         class='shadow'">`+ textos[language]["80"] + ` ❌</div>`
}
function applyFX() {
    menufx()

    removeClass()
    img_b64 = canvasFront.toDataURL("image/png");
    desenha("s", "source-over", img_b64, 0, 0, canvas.width, canvas.height)
    canvasFront.filter = filters[0]

    // comandosParaComandosb()
    setTimeout(() => {
        //   comando = ["FX", fx]
        //  comandos.unshift(comando)
        save_frame()
        canvasOpacity(100)

        Alert(alerts[language][14], 0.8)
        canvasFront.filter = filters[0]
        ctxF.setTransform(1, 0, 0, 1, 0, 0);
        ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }, 300)
    setTimeout(() => {

        mostraMenu("FX")
    }
        , 1000)
}
function cancelaFX() {
    setTimeout(() =>
        mostraMenu("FX")
        , 1000)
    menufx()

    canvasFront.filter = filters[0]
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvasOpacity(100)
}


function menufx(qual = undefined) {
    let confirm = iD("confirmFX")
    if (qual == undefined) {
        confirm.classList.add("esconde")
        for (i = 0; i < 9; i++) {
            document.getElementById("fx" + i).style.display = "block"

        }
    } else {
        confirm.classList.remove("esconde")
        for (i = 0; i < 9; i++) {
            document.getElementById("fx" + i).style.display = "none"

        }
        document.getElementById("fx" + qual).style.display = "block"
    }
}


function lumaKey(range) {

    var imgd = context.getImageData(0, 0, canvas.width, canvas.height),
        pix = imgd.data,
        newColor = { r: 0, g: 0, b: 0, a: 0 };

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = pix[i],
            g = pix[i + 1],
            b = pix[i + 2];

        // If its white then change it
        if (r >= range && g >= range && b >= range) {
            // Change the white to whatever.
            pix[i] = newColor.r;
            pix[i + 1] = newColor.g;
            pix[i + 2] = newColor.b;
            pix[i + 3] = newColor.a;
        }
    }

    ctxF.putImageData(imgd, 0, 0);
    img_b64 = canvasFront.toDataURL("image/png");
    desenha("s", "source-over", img_b64, 0, 0, canvas.width, canvas.height)
    setTimeout(() => save_frame(), canvas.width / 2)

}
