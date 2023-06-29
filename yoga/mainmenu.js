var cabeca = document.createElement("div")
cabeca.id = "cabeca"
document.body.appendChild(cabeca)

var menu = [
    { url: "paint", icon: "🖌️", title: "paint" },
    { url: "colors", icon: "🎨", title: "colors" },
    { url: "emoji", icon: "😆", title: "emoji" },
    { url: "erase", icon: "🧼", title: "erase" },
    { url: "zoom", icon: "🔎", title: "zoom" },
    { url: "camera", icon: "📷", title: "camera" }
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
    if (m == mode){
        toggleMenu()
    }
    mode = m
    criaCabeca()
    if (m == "erase"){
        ctx.globalCompositeOperation = 'destination-out'
        comando =["GCO",'destination-out']
        comandos.push(comando)
    }else
        if (m == "paint"){
            ctx.globalCompositeOperation = 'destination-over'
            comando =["GCO","source-over"]
            comandos.push(comando)
        }
    
}
function toggleMenu(){
    let menu = ""
    switch (mode){
        case "pintar":

    }

    document.getElementById("menu").innerHTML = menu

}