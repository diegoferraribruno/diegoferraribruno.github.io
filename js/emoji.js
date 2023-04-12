var emoji = "😍"

function emojiSizeRange() {
    valor = document.getElementById("emosize").value
    cursor.style.width = 0 + "px";
    cursor.style.height = 0 + "px";
    cursor.style.lineHeight = 1 + "px";
    cursor.style.marginTop = 0 + "px";
    cursor.style.marginLeft = 0 + "px";
    valor = valor * zoomFactor
    document.getElementById("emoExemplo").style.fontSize = valor + "px"
    cursor.innerHTML = '<span id="emoExemplo2" style="position:absolute; display:block; margin-left:-' + valor / 2 + 'px; height:' + valor + 'px; margin-top:-' + valor / 10 + 'px; ">' + emoji + '</span>'
    document.getElementById("emoExemplo2").style.fontSize = valor + "px"
}
function emojipicker() {

    let emojip = document.getElementById("emojipicker");
    if (emojip.style.display == "none") {
        emojip.style.display = "block";
    }
    else {
        emojip.style.display = "none";
    }
}
function trocaEmoji(emo) {
    emoji = emo
    emoExemplo.innerHTML = emo
    emojiSizeRange(document.getElementById("emosize").value)
    emoexemplo = document.getElementById("emoexemplo")

}