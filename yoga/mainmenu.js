var cabeca = document.createElement("div")
cabeca.id = "cabeca"
document.body.appendChild(cabeca)

function menu() {
    return [

        { url: "paint", icon: "🖌️", title: "paint" },
        { url: "colors", icon: "🎨", title: "colors" },
        //{ url: "emoji", icon: "😆", title: "emoji" },
        { url: "erase", icon: "🧼", title: "erase" },
        { url: "zoom", icon: `🔎<span id='x1' class="textOver">${cameraZoom}x</span>`, title: "zoom" },
    ]
    // { url: "camera", icon: "📷", title: "camera" }
}

function criaCabeca() {
    cabeca.innerHTML = "<div id='menu' class='bot shadow' title='Menu pinceis' onclick='limpaCabeca()'>🧘</div>"
    var mainmenu = menu()
    let len = mainmenu.length
    for (i = 0; i < len; i++) {
        let classl = ""
        if (mainmenu[i].title == mode) {
            classl = "selected"
        }
        cabeca.innerHTML += '<div id="' + mainmenu[i].title + '" title="' + mainmenu[i].title + '" class="shadow bot ' + classl + '" onClick="modeTo(' + "'" + mainmenu[i].url + "'" + ')" >' + mainmenu[i].icon + '</div>'
    }
}
setTimeout(() => { criaCabeca() }, 100)
//setTimeout(() => { limpaCabeca() }, 1100)

function limpaCabeca() {
    cabeca.innerHTML = "<div id='yoga'class='bot shadow' title='Menu Pinceis' onclick='criaCabeca()'> 🧘</div>"
    removeSubmenu()
}
function removeSubmenu() {
    if (submenu) {
        document.body.removeChild(submenu)
    }
}
function modeTo(m) {
    mode = m
    toggleMenu(mode)
    criaCabeca()
    if (m == "erase") {
        ctx.globalCompositeOperation = 'destination-out'
        comando = ["GCO", 'destination-out']
        comandos.push(comando)
    } else if (m == "paint") {
        ctx.globalCompositeOperation = 'destination-over'
        comando = ["GCO", "source-over"]
        comandos.push(comando)
    }

}
function toggleMenu(value) {
    let submenu = document.getElementById("submenu")
    if (!submenu) {
        if (value != undefined) {
            let constructor = getmenu(value)
            submenu = document.createElement("div")
            submenu.id = "submenu"
            submenu.classList.add("submenu")
            submenu.innerHTML = constructor
            document.body.appendChild(submenu)
        }
    } else {
        removeSubmenu()
    }

}

function getmenu(value) {
    switch (value) {
        case "zoom":
            return `<span id="zoom2xbot" title="Ampliar" class="bot" onmousedown="zoom(-1)">🔎<span class="textOver">-</span></span>
        <span id="zoom2xbot" title="Ampliar" class="bot" onmousedown="zoom(1)">🔎<span class="textOver">+</span></span>
        <span id="zoom2xbot" title="Ampliar" class="bot" onmousedown="resetZoom()">🔎<span class="textOver">1x</span></span>
        <br>
        <span class="bot" onmousedown="scrollMoveCanva(-320,0)">⬅️</span>
        <span class="bot" onmousedown="scrollMoveCanva(0,-320)">⬆️</span>
        <span class="bot" onmousedown="scrollMoveCanva(0,320)">⬇️</span>
        <span class="bot" onmousedown="scrollMoveCanva(320,0)">➡️</span>
        </div > `
        case "paint":

            return "brushes<br>brushes<br>brushes<br>brushes<br>brushes<br>brushes<br>brushes<br>brushes<br>";
        case "colors":
            return "color picker, color menu.. "
        case "erase": return "stroke range, brushes";
        case "nitidez": return `<span id="oculos" class="botao">👓 <txt name="79">nitidez</txt>
        <label class="toggle">
            <input id="pixel" type="checkbox" value="true" checked onchange="pixel()">
            <span class="knob"></span>
        </label></span>`
    }
}