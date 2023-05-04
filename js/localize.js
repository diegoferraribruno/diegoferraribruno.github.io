var language = "en"
function localize() {
    if (language == "pt_BR") {
        language = "en"
        document.getElementById("localize").innerHTML = "🇬🇧"

    } else {
        language = "pt_BR"
        document.getElementById("localize").innerHTML = "🇧🇷"
    }
}
var alerts = {
    "pt_BR": {
        0: "Por favor,<br> adicione ➕ quadros a sua animação",
        1: "Quadro",
        2: "Modo foto única 📷.",
        3: "Modo sequencia de quadros 🎥 🎞️.",
        4: "Camera API is not available in your browser",
        5: "Could not access the camera",
        6: "Modo infinito",
        7: "Ativado",
        8: "Desativado",
        9: "Modo",
        10: "duplicado",
        11: "apagador",
        12: "⚠️ Pintando <b>por trás</b> do quadro.",
        13: "⚠️ Pintando por <b>cima</b> do quadro.",
        14: 'Efeito aplicado',
        15: "Chave PIX copiada: ",
        16: "recortando o quadro.<br>",
        17: "Por favor, aguarde.",
        18: "Por favor, preencher o nome do arquivo",
        19: "antes de exportar sua animação.",
        20: "escreva um titulo para seu arquivo de imagem",
        21: "Seu arquivo esta sendo preparado.",
        22: "importando seu projeto",
        23: "imagem de fundo removida"
    },
    "en": {
        0: "Please,<br> ada ➕ frames to your animation",
        1: "Frame",
        2: "Single shot mode 📷.",
        3: "Sequence of frames mode 🎥 🎞️.",
        4: "Camera API is not available in your browser",
        5: "Could not access the camera",
        6: "Infinity paint mode",
        7: "Activated",
        8: "Deactivated",
        9: "Mode",
        10: "duplicated",
        11: "ereaser",
        12: "⚠️ Painting <b>behind</b> the canvas",
        13: "⚠️ Painting <b>over</b> the canvas",
        14: 'Applied Effect',
        15: "PIX key copied to clipboard: ",
        16: "Croping the canvas.<br>",
        17: "Please, Wait.",
        18: "Please, fill the file name field.",
        19: "before exporting your animation",
        20: "write a title for you image file",
        21: "your file is beeing prepared.",
        22: "importing your project",
        23: "background image removed"
    }
}
let example = alerts[language][0]