var cabeca = document.createElement("div")
cabeca.id = "cabeca"
document.body.appendChild(cabeca)

var menu = [
    { url: "paint", icon: "🖌️", title: "Pintar" },
    { url: "colors", icon: "🎨", title: "Cores" },
    { url: "emoji", icon: "😆", title: "emoji" },
    { url: "erase", icon: "🧼", title: "apagar" },
    { url: "zoom", icon: "🔎", title: "zoom" },
    { url: "camera", icon: "📷", title: "camera" }
]

function criaCabeca() {
    cabeca.innerHTML = "<div id='djs' class='bot shadow' title='Menu pinceis' onclick='limpaCabeca()'>🧘 </div>"

    let len = menu.length
    for (i = 0; i < len; i++) {
        cabeca.innerHTML += '<div title="' + menu[i].title + '" class="shadow bot" onClick="' + menu[i].url + '()" >' + menu[i].icon + '</div>'
    }
}
setTimeout(() => { criaCabeca() }, 100)
//setTimeout(() => { limpaCabeca() }, 1100)

function limpaCabeca() {
    cabeca.innerHTML = "<div id='djs'class='bot shadow' title='Menu Pinceis' onclick='criaCabeca()'> 🧘</div>"
}
