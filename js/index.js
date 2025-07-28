var cabeca = document.createElement("div")
cabeca.id = "cabeca"
document.body.appendChild(cabeca)

var usuarios = [{
    id: "01",
    nome: "Diego Ferrari Bruno",
    link: "https://diegoferraribruno.github.io",
    bio: "Pai, artista, designer, programador",
}, {
    id: "02",
    nome: "Ravi F. P. B.",
    link: "https://diegoferraribruno.github.io/ravi/index.html",
    bio: "Filho, artista, matemático",
}]

function createAvatar(id = 0, onde = "bio2") {

    var avatar = document.createElement("img")
    avatar.src = "./avatar/" + usuarios[id].id + ".png"
    avatar.classList.add('mini')
    avatar.setAttribute("style", "float:right; margin-left:6px; margin-right:6px;")
    iD(onde).appendChild(avatar)
    iD(onde).innerHTML +=
        "<b>" + usuarios[id].nome + "</b><br>" + usuarios[id].bio +
        "<br><a href='" + usuarios[id].link + "' target='blank'>link</a>";
}

var menu = [{ url: "desenho.html", icon: "🎨", title: "Desenho" },
{ url: "funnybunny01.html", icon: "🐇", title: "Funny Bunny Game" },
{ url: "index.html", icon: "😆", title: "principal" },
{ url: "apoio.html", icon: "💸", title: "Apoio" },
{ url: "alfabeto.html", icon: "🔫", title: "jogo alfabeto" },
{ url: "https://diegoferraribruno.itch.io", icon: "🎮", title: "Itch.io" }
]

function criaCabeca() {
    cabeca.innerHTML = "<div  id='djs' class='bot shadow' title='Links do diego' onclick='limpaCabeca()'> </div>"
    //<!--🚀-->

    /*  Object.keys(menu).forEach((key, index) => {
          setTimeout(() => {
  
              let item = document.createElement("div")
              item.setAttribute("onClick", "confirmLink('" + key + "')")
              //item.href = key
              //item.target = "iframe"
              item.innerText = menu[key]
              item.classList.add("shadow")
              item.classList.add("bot")
              cabeca.appendChild(item)
          }, 80 * index)
      })*/
    let len = menu.length
    for (i = 0; i < len; i++) {
        let item = document.createElement("div")
        item.setAttribute("title", menu[i].title)
        item.setAttribute("onClick", "confirmLink('" + menu[i].url + "')")
        //item.href = key
        //item.target = "iframe"
        item.innerText = menu[i].icon
        item.classList.add("shadow")
        item.classList.add("bot")
        cabeca.appendChild(item)
    }
}
setTimeout(() => { criaCabeca() }, 100)
//setTimeout(() => { limpaCabeca() }, 1100)

function limpaCabeca() {
    cabeca.innerHTML = "<div id='djs'class='bot shadow' title='Links do diego' onclick='criaCabeca()'> </div>"
}
//limpaCabeca()
function confirmLink(url) {
    if (url == "apoio.html") {
        criaConteudo()
        apoio()
    } else {
        let canvasD = iD("canvas_div")
        if (canvasD) {
            let confirm = iD("confirm")
            if (!confirm) {
                let item = document.createElement("div")
                item.id = "confirm"
                item.classList.add("confirm")
                item.innerHTML = " Ir para a página:<br> <div  class='shadow'><a href='" + url + "'> " + url + " ✅</a> </div>"
                item.innerHTML += "<div onClick='cancela()' class='shadow'>cancela ❌</div>"
                document.body.appendChild(item)
            } else {
                cancela()
                confirmLink(url)
            }
        } else {
            window.open(url, '_self');
        }
    }
}
function cancela(oque = "confirm") {
    let confirm = iD(oque)
    confirm.parentElement.removeChild(confirm)
}
function criaConteudo() {
    let ap = iD("conteudo")
    if (!ap) {
        var conteudo = document.createElement("div")
        conteudo.id = "conteudo"
        conteudo.classList.add("day")
        conteudo.classList.add("fundobranco")
        iD("menus").appendChild(conteudo)
    } else {
        cancela("conteudo")
    }
}
function apoio() {
    let ap = iD("conteudo")
    if (ap) {
        let apoioHTML = `
			    <div onClick='cancela("conteudo")' style=' float:right'class='bot'>❎</div>
           Este website é um projeto de
            <a href="https://github.com/diegoferraribruno"> código livre</a> em constante evolução.<br><br>
           Se desejar contribuir financeiramente com seu desenvolvedor, você pode via:</b>
					<a href="https://github.com/sponsors/diegoferraribruno"> Github Sponsors</a> ou fazendo um PIX para:<br>
			 <input type="text" size="26" value="f6aecef5-e60b-408e-97e1-30ee3927c0c0" id="myInput" readonly>

<button onclick="copyPix()">Copiar</button><br><br>
Ajude também a divulguar:</b><br>
					https://diegoferraribruno.github.io<br><br>
				Grato pela sua atenção<br><br>
				</div>
            <div id="bio2"></div>`
        iD("conteudo").innerHTML = apoioHTML

        createAvatar(0, "bio2")
    }

}

function copyPix() {
    var copyText = iD("myInput");
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    Alert(alerts[language][15] + copyText.value);
}
