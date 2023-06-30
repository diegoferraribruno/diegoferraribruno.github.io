var cabeca = document.createElement("div")
cabeca.id = "cabeca"
document.body.appendChild(cabeca)

var menu = [
    { url: "paint", icon: "🖌️", title: "paint" },
    { url: "colors", icon: "🎨", title: "colors" },
    //{ url: "emoji", icon: "😆", title: "emoji" },
    { url: "erase", icon: "🧼", title: "erase" },
    { url: "zoom", icon: "🔎", title: "zoom" },
   // { url: "camera", icon: "📷", title: "camera" }
]

function criaCabeca() {
    cabeca.innerHTML = "<div id='menu' class='bot shadow' title='Menu pinceis' onclick='limpaCabeca()'>🧘 </div>"
    let len = menu.length
    for (i = 0; i < len; i++) {
        let classl = ""
        if (menu[i].title == mode){
            classl = "selected"
        }
        cabeca.innerHTML += '<div id="' + menu[i].title + '" title="' + menu[i].title + '" class="shadow bot '+classl+'" onClick="modeTo('+"'" + menu[i].url + "'"+')" >' + menu[i].icon + '</div>'
    }
}
setTimeout(() => { criaCabeca() }, 100)
//setTimeout(() => { limpaCabeca() }, 1100)

function limpaCabeca() {
    cabeca.innerHTML = "<div id='djs'class='bot shadow' title='Menu Pinceis' onclick='criaCabeca()'> 🧘</div>"
}

function modeTo(m)
{
    toggleMenu()

    if (m == mode){
       // toggleMenu()
    }
    mode = m
    criaCabeca()
    if (m == "erase"){
        ctx.globalCompositeOperation = 'destination-out'
        comando =["GCO",'destination-out']
        comandos.push(comando)
    }else        if (m == "paint"){
            ctx.globalCompositeOperation = 'destination-over'
            comando =["GCO","source-over"]
            comandos.push(comando)
        }else if (m == "colors"){
            mode = "paint"
        }
    
}
function toggleMenu(){
    let menu = ""
   /* switch (mode){
        case "paint":
            break;
            case "color":
                break;

    }*/

    document.getElementById("menu").innerHTML = menus[mode]

}


const menus = {"zoom":
`<span id="zoom2xbot" title="Ampliar" class="bot" onmousedown="zoom2x()">🔎</span>
<input id="zoombar" type="range" min="0" max="6" value="1" step="1" style="width:160px"
    onchange="ZOOMf(this.value)">
<input id="tzoom" type="number" min="0.50" max="32" step="1" value="1" onchange="ZOOM(this.value)"
    style="width: 44px">
<span id="oculos" class="botao">
    👓 <txt name="79">nitidez</txt>
    <label class="toggle">
        <input id="pixel" type="checkbox" value="true" checked onchange="pixel()">
        <span class="knob"></span>
    </label></span>
<span class="bot" onmousedown="scrollMoveCanva(-20,0)">⬅️</span>
<span class="bot" onmousedown="scrollMoveCanva(0,-20)">⬆️</span>
<span class="bot" onmousedown="scrollMoveCanva(0,20)">⬇️</span>
<span class="bot" onmousedown="scrollMoveCanva(20,0)">➡️</span>
</div>`,
"paint": "brushes",
"colors":"colorpicker",
"erase":"stroke range, brushes"
}