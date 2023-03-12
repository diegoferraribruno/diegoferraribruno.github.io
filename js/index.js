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

function createAvatar(id = 0, onde="bio") {

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
    "calculadora.html": "➗",
    "https://diegoferraribruno.itch.io": "🎮"
    // "Identifica": "📛",
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
setTimeout(() => { limpaCabeca() }, 1100)

function limpaCabeca() {
    cabeca.innerHTML = "<div id='djs'class='bot shadow' title='Links do diego' onclick='criaCabeca()'> </div>"
}
//limpaCabeca()
function confirmLink(url) {
	if (url == "apoio.html"){
		criaConteudo()
		apoio()
		}else{
		let canvasD = document.getElementById("canvas_div")
		if (canvasD){
			let confirm = document.getElementById("confirm")
			if (!confirm) {
				let item = document.createElement("div")
				item.id = "confirm"
				item.classList.add("confirm")
				item.innerHTML = "Ir para a página:<a href='" + url + "'> " + menu[url] + " " + url + "<br>Confirma ✅</a> "
				item.innerHTML += "<div onClick='cancela()'>cancela ❌</div>"
				document.body.appendChild(item)
			} else {
				cancela()
				confirmLink(url)
			}
		}else{
			window.open(url,'_self');
		}
	}
}
function cancela(oque="confirm") {
    let confirm = document.getElementById(oque)
    confirm.parentElement.removeChild(confirm)
}
function criaConteudo (){
	let ap = document.getElementById("conteudo")
	if(!ap){
		var conteudo = document.createElement("div")
		conteudo.id = "conteudo"
		document.body.appendChild(conteudo)
	}else{
		cancela("conteudo")
		}
}
function apoio(){
	let ap = document.getElementById("conteudo")
	if(ap){
		let apoioHTML = `
		<div id="apoio" style=" display:inline-block; width: 320px; vertical-align: top;">
			    <div onClick='cancela("conteudo")' style=' float:right'class='bot shadow'>❌</div>
            Olá visitante, estes APPs foram desenvolvidos por mim e
            <a href="https://github.com/diegoferraribruno"> todo o código é livre e aberto.</a><br><br>
           Espero que você encontre alguma diversão ou aprenda algo por aqui e se desejar contribuir
          com este jovem pai/desenvolvedor, saiba que você pode:<br>
					<br>
				1 - Divulguar meu site portifolio:<br>
					https://diegoferraribruno.github.io<br>
					<!--social links.<br>-->
					2 - apoio financeiro via
					<a href="https://github.com/sponsors/diegoferraribruno"> Github Sponsors.</a><br>

				<!--img src="galeria/01/desenho2.png" style="display:inline-block; max-width: 320px; height: 300px; margin: 4px;"-->
			<!-- 3 - fazendo um pix anonimo e sincero:<br> para (futura chave pix...) <br>-->
				Grato pela sua atenção<br><br>
				</div>
            <div id="bio2"></div>`
	 document.getElementById("conteudo").innerHTML = apoioHTML

	 createAvatar(0,"bio2")}

	}

