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

function createAvatar(id = 0) {

    var avatar = document.createElement("img")
    avatar.src = "./avatar/" + usuarios[id].id + ".png"
    avatar.classList.add('mini')
    avatar.setAttribute("style", "float:left; margin-left:6px; margin-right:6px;")
    document.getElementById("bio").appendChild(avatar)
    document.getElementById("bio").innerHTML +=
        "<b>" + usuarios[id].nome + "</b><br>" + usuarios[id].bio +
        "<br><a href='" + usuarios[id].link + "' target='blank'>link</a>";
}

createAvatar()
