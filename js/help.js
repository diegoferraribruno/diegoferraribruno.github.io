let shortcuts = {
    "en": {

        "All modes": {
            "Ctrl + C": "copy full canvas if nothing is selected",
            "Ctrl + V": "enter paste mode with the last copied (or selected) image to be drawn when touch or click ends over the canvas",
            "Ctrl + X": "same as copy, but makes a hole at the selection area",
            "Ctrl + Z": "press and hold it to go back a few steps on your drawing history",
            "Ctrl + Z": "press and hold it to go foward a few steps on your drawing history",
            "Shift + Scroll-wheel": "zomm in and zoom out",
            "b or p": " Paint Brush mode",
            "c": "Show Color Menu",
            "d": "Toggle Dinamic size Brush on/off",
            "e": "Eraser Mode",
            "g": "Toggle Glowing ink on/off",
            "m": "Move canvas mode",
            "r": "Rotate canvas mode",
            "s": "Enter Selection mode",
            "v": "Toggle Mirror mode on/off",
            "x": "Toggle Rainbow Ink on/off",
            "*": "Toggle Mandala mode on/off",
            "esc": "close menus",
            "+": "add a new frame to the animation",
            "delete": "delete the current animation frame",
            "z": "will double zoom size until 32x than back to 0.25x",
            "Ctrl + Space bar": "play animation",
            "->": "arrow right will change to next frame",
            "<-": "arrow left will change to previous frame",

        },
        "Drawing mode": {
            "Ctrl + draw": "holding Ctrl Key while drawing will draw a straight line",
            "Space bar": "holding space bar will let you scroll the canvas if it is bigger than the screen"
        },
        "Selecting Mode": {
            "Shift": "Holding shift key will let you ad more shapes to your selection (does not work with rectangular)"
        },
        "Paste mode": {
            "Alt + Scroll-wheel": "will Rotate your selection before paste"
        }

    },
    "pt_BR": {
        "Em todos os Modos": {
            "Ctrl + C": "Copia o quadro todo para o clipboard caso nada esteja selecionado",
            "Ctrl + V": "Entra no modo colar com a ultima imagem copiada(ou selecionada) para ser desenhada na posição do fim do click ou toque",
            "Ctrl + X": "O mesmo que copiar mas deixa um buraco na área selecionada",
            "Ctrl + Z": "pressione para voltar no histórico",
            "Ctrl + Z": "pressione para avançar no histórico",
            "Shift + Scroll-wheel": "aumenta e reduz o zoom",
            "b or p": "Modo Pincel",
            "c": "Menu Cores",
            "d": "Tamanho do pincel dinamico on/off",
            "e": "Modo apagar",
            "g": "Modo Pintura de luz (liga o modo noturno tambem)",
            "m": "Modo mover",
            "r": "Modo rotacionar",
            "s": "Modo Seleção",
            "v": "Modo Espelho on/off",
            "x": "Toggle Rainbow Ink",
            "*": "Modo Mandala (liga desliga)",
            "esc": "Fecha menus",
            "+": "Adiciona novo quadro a animação",
            "delete": "remove o quadro atual da animação",
            "z": "dobra o zoom até 32x e volta para 0.25x",
            "Ctrl + Space bar": "Toca a animação",
            "->": "Seta para direita, passa para o próximo quadro",
            "<-": "Seta para esquerda, passa para o quadro anterior",

        },
        "Modo Desenho": {
            "Ctrl + draw": "Segure o Ctrl enquanto desenha para fazer linhas retas",
            "Space bar": "Pressione a barra de espaço para navegar pela tela se o quadro for maior q a tela"
        },
        "Modo Seleção": {
            "Shift": "Segurando o Shift você pode adicionar mais formas à sua seleção (nao funciona para retangular)"
        },
        "Modo Colar": {
            "Alt + Scroll-wheel": "Ira rotacionar sua imagem antes de colar"
        }
    }
}
let help = iD("helpcontent")

function Help() {
    help.innerHTML = `<span class="botao" onclick="localize()">
    <span id="localize2" title="change language" class="mais">
        🇧🇷
    </span> Mudar para português?
    </span>
    <span class="botao" onclick="shortCuts()">Shortcuts / atalhos</span>
    <span class="botao" onclick="videoTutorial()">
        <span class="icon playicon"></span>Video tutorial
    </span>
    <span id="info" title="Informações" class="bot" onmousedown="mostraMenu('info')">ℹ️</span> ${textos[language][82]}
    `
}

function shortCuts() {
    help.innerHTML = ""
    let len = shortcuts.len
    help.innerHTML = "Shortcuts <br>"
    let itens = shortcuts[language]
    Object.keys(itens).forEach((key, index) => {
        help.innerHTML += "<br><b>" + key + "<b><br><br>"
        let newkey = itens[key]
        Object.keys(newkey).forEach((key, index) => {
            help.innerHTML += "<li><b>" + key + "</b> : " + newkey[key] + "</li>"
        })
    })

}
function videoTutorial() {
    help.innerHTML = '<span class="icon playticon"></span> em breve<br> Video tutorial<br> comming soon<br>'
}