
const cursor = document.getElementById("cursor");

function cursorMove(e) {
    var x = e.clientX
    var y = e.clientY

    cursor.style.left = x - 1 + "px";
    cursor.style.top = y + 1 + "px";
    document.body.style.cursor = "none";
    cursor.style.visibility = "visible";
}
function mostra() {
    /*    if (mode != "recortar") {
            comandosExec()
        }*/
    document.body.style.cursor = "pointer";
    cursor.style.visibility = "hidden";
}

function cursorColor() {

    switch (mode) {
        case "apagar":
            break;
        case "pintar":
            if (context.globalCompositeOperation == "destination-out") {

                setTimeout(() => { cursor.style.backgroundImage = "none"; }, 65)
            }
            cursor.innerHTML = "";
            cursor.style.borderColor = strokeColor;
            break;
        case "zoomx":
            cursor.innerHTML = "🖐";
            setTimeout(() => { cursor.style.backgroundImage = "none"; }, 20)
            break;
        case "picker":

            cursor.innerHTML = '<div style="-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); -ms-transform: scale(-1, 1); transform: scale(-1, 1);width:32px; margin-top:12px; margin-left:' + ((strokeWidth / 2) - 3) + 'px;">💉</div>'
            cursor.style.borderColor = "#000000ee";
            cursor.style.width = 2 + "px";
            cursor.style.height = 1 + "px";
            cursor.style.margingLeft = 24 + "px";
            cursor.style.margingTop = 52 + "px";
            cursor.style.opacity = 0.7
            cursor.style.textAlign = "center"
            cursor.style.padding = "auto"
            cursor.style.backgroundImage = "none"
            break;
        case "recortar":

            cursor.innerHTML = '<div style="width:32px; margin-top:0px; margin-left:-12px;">✂️</div>'
            cursor.style.width = 2 + "px";
            cursor.style.height = 1 + "px";
            cursor.style.margingLeft = 24 + "px";
            cursor.style.margingTop = 52 + "px";
            cursor.style.opacity = 1
            break;
        case "cam":
            cursor.innerHTML = "📷";
            break;


        default:
            cursor.innerHTML = "";
            cursor.style.borderColor = strokeColor;
            break;
    }
}
let out = true
function handleMoveOut(evt) {
    out = checkOverCanvas(evt.pageX, evt.pageY)
    if (!out) {
        restoreCanvas()
    }
}