var zoomFactor = 1;
var zoomScale = [0.5, 1, 2, 4, 8, 16, 32];
var zoomIndex = 1;
var scrollWindow = { x: 0, y: 0 }
function toggleHand() {
    if (mode != "zoomx") {
        oldMode = mode;
        mode = "zoomx";
        toggleSelect("hand");
        //  cursorColor("zoomx");
    } else {
        modeTo(oldMode);
        //  cursorColor(oldMode);
    }
}


////// ZOOM and scroling
function setZoom(zoom, el) {
    transformOrigin = [0, 0];
    el = el || instance.getContainer();
    var p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString =
            transformOrigin[0] + "% " + transformOrigin[1] + "%";

    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;

        iD("canvas_div2").style.width = canvas.width + "px";
        iD("canvas_div2").style.height = canvas.height + "px";
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;
    resizeScreen();
    canvas.focus()
}

function ZOOMf(a) {
    let escala = zoomScale[a];
    ZOOM(escala);
}
function ZOOM(a) {
    setZoom(a, canvasDiv);
    //  setZoom(a, canvas_window);
    resetCanva();

    zoomFactor = Number(a);
    setZoom(zoomFactor, canvasDiv)
    setStrokeSize(strokeWidth);
    iD("tzoom").value = zoomFactor;
    iD("zoombar").value =
        zoomScale.indexOf(zoomFactor);
    iD("x1").innerHTML = zoomFactor + "x";

}

function scrollMoveCanva(a, b) {
    win.scrollLeft += a * zoomFactor;
    win.scrollTop += b * zoomFactor;
}
function scrollCanva(a, b) {
    win.scrollLeft = a;
    win.scrollTop = b;
}
function resetCanva() {
    let objects = ["canvas_window", "canvas_div"];
    for (i in objects.length) {
        iD(objects[i]).style.width = "320px";
        iD(objects[i]).style.height = "320px";
    }
    win.scrollTop = 0;
    win.scrollLeft = 0;
    setTimeout(autoScroll(), 100)

}
function zoom2x() {
    zoomIndex++;
    if (zoomIndex > 6) {
        zoomIndex = 0;
    }
    ZOOMf(zoomIndex);
    /*  setTimeout(function () {
         ZOOM()
      }, 10);*/
    // cursorColor();
    //toggleSelect(qual);
    //resizeScreen()
}

function handleTouch(e) {
    if (e.type == "touchmove" && e.touches.length == 2 && mode == "zoomx") {
        isGrabing = false
        handlePinch(e)
    }
}
let lastpinch = 4
function handlePinch(e) {
    e.preventDefault()

    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }

    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = Math.abs(touch1.x - touch2.x) / 2 + Math.abs(touch1.y - touch2.y) / 2

    let distX = Math.floor(currentDistance / 50)
    if ((distX % 1) == 0 && distX != lastpinch) {
        lastpinch = distX

        let centerpos = { x: (touch1.x + touch2.x) / 2, y: (touch1.y - touch2.y) / 2 }
        if (initialPinchDistance == null) {
            initialPinchDistance = currentDistance
        }
        else if (mode = "zoom") {
            if (currentDistance > initialPinchDistance) {
                adjustZoom(1, null, centerpos.x, centerpos.y)
            } else if (currentDistance < initialPinchDistance) {
                adjustZoom(-1, null, centerpos.x, centerpos.y)
            }

        }/* else if (mode == "paint") {
        let comando = [touch1.x, touch1.y, touch2.x, touch2.y, strokesize.x, strokesize.y]
        comandos.push(comando)
        draw(touch1.x, touch1.y, touch2.x, touch2.y, strokesize.x, strokesize.y)
      }*/
    }
}
function adjustZoom(zoomAmount, zoomFactor, x, y) {

    if (!isGrabing) {

        if (zoomAmount > 0) {
            if (zoomIndex <= 6) {
                zoomIndex++;
                // zoomIndex = 0;
                ZOOMf(zoomIndex);
            }
        } else if (zoomAmount < 0) {
            if (zoomIndex > 0) {
                zoomIndex--;
                // zoomIndex = 0;
                ZOOMf(zoomIndex);
            }
        }
        else if (zoomFactor) {
            if (zoomFactor > 1) {
                if (zoomIndex <= 6) {
                    zoomIndex++;
                    // zoomIndex = 0;
                    ZOOMf(zoomIndex);
                }
            } else if (zoomFactor < 1) {
                if (zoomIndex > 0) {
                    zoomIndex--;
                    // zoomIndex = 0;
                    ZOOMf(zoomIndex);
                }
            }
            //  cameraZoom = zoomFactor * lastZoom
        }
    }
}