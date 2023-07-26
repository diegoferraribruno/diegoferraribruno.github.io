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
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);
    Alert(alerts[language][15] + " " + copyText.value);
}
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


var usuarios = [{
    id: "01",
    nome: "Diego Ferrari Bruno",
    link: "https://diegoferraribruno.github.io",
    bio: "Pai, artista, designer, programador",
}]
