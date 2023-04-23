var zoomFactor = 1;
var zoomScale = [0.5, 1, 2, 4, 8, 16, 32];
var zoomIndex = 1;

function toggleHand() {
    if (mode != "zoom") {
        oldMode = mode;
        mode = "zoom";
        toggleSelect("hand");
        cursorColor("zoom");
    } else {
        modeTo(oldMode);
        cursorColor(oldMode);
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

        document.getElementById("canvas_div2").style.width = canvas.width + "px";
        document.getElementById("canvas_div2").style.height = canvas.height + "px";
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;
    resizeScreen();
}

function ZOOMf(a) {
    let escala = zoomScale[a];
    ZOOM(escala);
}
function ZOOM(a) {
    setZoom(a, canvasDiv);
    //  setZoom(a, canvas_window);
    resetCanva();
    setTimeout(function () {
        win.scrollTop = 0;
        win.scrollLeft = 0;
    }, 10);
    zoomFactor = Number(a);
    setTimeout(
        () =>
            scrollCanva(
                ultimoToque.x * zoomFactor - 160,
                ultimoToque.y * zoomFactor - 160
            ),
        30
    );
    setTimeout(() => setZoom(zoomFactor, canvasDiv), 10);

    setStrokeSize(strokeWidth);
    document.getElementById("tzoom").value = zoomFactor;
    document.getElementById("zoombar").value =
        zoomScale.indexOf(zoomFactor);
    document.getElementById("x1").innerHTML = zoomFactor + "x";

}

function scrollCanva(a, b) {
    win.scrollLeft += a;
    win.scrollTop += b;
}
function resetCanva() {
    let objects = ["canvas_window", "canvas_div"];
    for (i in objects.length) {
        document.getElementById(objects[i]).style.width = "320px";
        document.getElementById(objects[i]).style.height = "320px";
    }
}
function zoom2x() {
    zoomIndex++;
    if (zoomIndex > 6) {
        zoomIndex = 0;
    }
    ZOOMf(zoomIndex);
    setTimeout(function () {
        document.getElementById("x1").innerHTML = zoomFactor + "x";
        scrollCanva(-620 * zoomFactor, -620 * zoomFactor);
    }, 10);
    cursorColor();
    toggleSelect(qual);
    resizeScreen()
}