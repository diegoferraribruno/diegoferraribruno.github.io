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
    link: "https://diegoferraribruno.github.io",
    bio: "Filho, artista, matemático",
}]

function createAvatar(id = 0, onde = "bio") {

    var avatar = document.createElement("img")
    avatar.src = "./avatar/" + usuarios[id].id + ".png"
    avatar.classList.add('mini')
    avatar.setAttribute("style", "float:right; margin-left:6px; margin-right:6px;")
    document.getElementById(onde).appendChild(avatar)
    document.getElementById(onde).innerHTML +=
        "<b>" + usuarios[id].nome + "</b><br>" + usuarios[id].bio +
        "<br><a href='" + usuarios[id].link + "' target='blank'>link</a>";
}

var menu = {
    "desenho.html": "🎨",
    "galeria.html": "🖼️",
    "apoio.html": "💸",
    "alfabeto.html": "🔫",
    "index.html": "📔 ",
    "https://diegoferraribruno.itch.io": "🎮"
    // "Identifica": "🪪",
}

function criaCabeca() {
    cabeca.innerHTML = "<div  id='djs' class='bot shadow' title='Links do diego' onclick='limpaCabeca()'> </div>"
    //<!--🚀-->

    Object.keys(menu).forEach((key, index) => {
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
    })
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
        let canvasD = document.getElementById("canvas_div")
        if (canvasD) {
            let confirm = document.getElementById("confirm")
            if (!confirm) {
                let item = document.createElement("div")
                item.id = "confirm"
                item.classList.add("confirm")
                item.innerHTML = " Ir para a página:<br> <div  class='shadow'><a href='" + url + "'> " + menu[url] + " " + url + " ✅</a> </div>"
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
    let confirm = document.getElementById(oque)
    confirm.parentElement.removeChild(confirm)
}
function criaConteudo() {
    let ap = document.getElementById("conteudo")
    if (!ap) {
        var conteudo = document.createElement("div")
        conteudo.id = "conteudo"
        conteudo.classList.add("day")
        document.body.appendChild(conteudo)
    } else {
        cancela("conteudo")
    }
}
function apoio() {
    let ap = document.getElementById("conteudo")
    if (ap) {
        let apoioHTML = `
			    <div onClick='cancela("conteudo")' style=' float:right'class='bot'>❌</div>
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
        document.getElementById("conteudo").innerHTML = apoioHTML

        createAvatar(0, "bio2")
    }

}

function copyPix() {
    var copyText = document.getElementById("myInput");
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    Alert("Chave PIX copiada: " + copyText.value);
}
