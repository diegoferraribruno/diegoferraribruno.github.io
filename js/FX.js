let filters = ["none", "invert", "blur", "grayscale", "sepia", "contrast", "brightness", "lumakey", "hue-rotate"]
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
        if (fx == 4 || fx == 5 || fx == 6) {
            let quanto = iD(filters[fx] + "Bar").value
            onde.filter = filters[fx] + "(" + quanto + "%)"

        } else if (fx == 8) {
            let quanto = iD(filters[fx] + "Bar").value
            onde.filter = filters[fx] + "(" + quanto + "deg)"
        }
        updatecanvasFront()
        if (fx == 7) {
            let quanto = iD(filters[fx] + "Bar").value
            lumaKey(quanto)
        }
        canvasOpacity(0)
    } else {
        onde.filter = filters[fx]
    }
}

function updatecanvasFront() {
    ctxF.setTransform(1, 0, 0, 1, 0, 0);
    ctxF.clearRect(0, 0, context.canvas.width, context.canvas.height);
    ctxF.drawImage(canvas, 0, 0)
    ctxF.restore()
}

function confirmFX(fx, fxname) {
    let confirm = iD("confirmFX")
    menufx(fx)
    confirm.classList.remove("esconde")
    "display: none;"
    confirm.innerHTML = `<span  class="shadow" onClick="applyFX('` + fx + `')"> <span class="icon2 check"></span></span>` +
        `<span onClick="cancelaFX(true)"
         class='shadow'"><span class="close"></span></span>`
}
function applyFX() {
    menufx()

    removeClass()
    img_b64 = canvasFront.toDataURL("image/png");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawTo()
    Historia(img_b64)
    canvasFront.filter = filters[0]
    setTimeout(() => {
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

function cancelaFX(show = false) {
    if (show) {
        setTimeout(() =>
            mostraMenu("FX")
            , 1000)
        menufx()
    }

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
    ctxF.clearRect(0, 0, canvas.width, canvas.height);

    var imgd = context.getImageData(0, 0, canvas.width, canvas.height),
        pix = imgd.data
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
}
