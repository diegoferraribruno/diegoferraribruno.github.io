var language = "pt_BR"
function localize() {
    if (language == "pt_BR") {
        language = "en"
        iD("localize").innerHTML =
            '<span style="display:inline-block; position:relative; font-size:16px; width:30px; height:30px; top: -6px;">' +
            '🇧🇷<span style="display:inline-block; position:relative; margin-left: -24px; top:8px; font-size: 18px;">' +
            '🇬🇧</span></span>'

    } else {
        language = "pt_BR"
        iD("localize").innerHTML =
            '<span style="display:inline-block; position:relative; font-size:16px; width:30px; height:30px; top: -6px;">' +
            '🇬🇧<span style="display:inline-block; position:relative; margin-left: -24px; top:8px; font-size: 18px;">' +
            '🇧🇷</span></span>'
    }
    Array.from(document.querySelectorAll('txt'))
        .forEach(function (el) {
            let name = el.getAttribute("name")
            el.innerHTML = textos[language][name]
        });
    localizeTitles()
}

function localizeTitles() {
    Array.from(getAllElementsWithAttribute("title"))
        .forEach(function (el) {
            if (el.getAttribute("id")) {
                let KEY = "" + el.id
                el.setAttribute("title", titles[language][KEY])
            } else if (el.classList.contains("close")) {
                el.setAttribute("title", "Close Menu")
            }
        });
}


function getAllElementsWithAttribute(attribute) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
            // Element exists with attribute. Add to array.
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

var alerts = {
    "pt_BR": {
        0: "Por favor,<br> adicione ➕ quadros a sua animação",
        1: "Quadro",
        2: "Modo foto única 📷.",
        3: "Modo sequencia de quadros 🎥 🎞️.",
        4: "Camera API indisponível no seu navegador",
        5: "Não foi possivel acessar a camera",
        6: "Modo infinito",
        7: "Ativado - <h5>Desenhe além das bordas da tela</h5>",
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
        0: "Please,<br> add ➕ frames to your animation",
        1: "Frame",
        2: "Single shot mode 📷.",
        3: "Sequence of frames mode 🎥 🎞️.",
        4: "Camera API is not available in your browser",
        5: "Could not access the camera",
        6: "Infinity paint mode",
        7: "Activated - <h5>draw over the edges of the canvas</h5>",
        8: "Deactivated",
        9: "",
        10: "duplicated",
        11: "Ereaser mode",
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
let textos = {
    "pt_BR": {
        "1": "Toque numa áre pintada para capturar sua cor",
        "2": "Toque numa áre pintada para capturar sua cor",
        "3": "<b>⚠️Atenção!⚠️</b><br>",
        "4": "Este é um App de diversão!<br>durante o processo de criação e exportação, a imagem perderá qualidade!<br> Dito isto, espero que você se divirta!<br>",
        "5": "Feito por:",
        "6": " com códigos de:",
        "7": "e uma turma aí do",
        "8": "Mudanças nas versões:",
        "9": "Tamanho atual:",
        "10": "Largura: ",
        "11": "Altura:",
        "12": "recorte manual",
        "13": "limite 30 quadros",
        "14": "Apagador",
        "15": "Use o 📌 para guardar sua cor.",
        "16": "Pinceis personalizados",
        "17": "Tranformar a tela em pincel?",
        "18": "Configurações do quadro",
        "19": "Tamanho do quadro",
        "20": "Transparencia do quadro",
        "21": "Quadros fantasmas visiveis",
        "22": "Adicionar Fundo falso:",
        "23": "Preencher tudo ",
        "24": "Velocidade da Animação🎞️",
        "25": "Quadros Por Segundo",
        "26": "Remover quadro atual",
        "27": "clonar o quadro",
        "28": "Mudar ordem do quadro",
        "29": "Carregar imagem",
        "30": "Ajustar tela ao tamanho da imagem ",
        "31": "Enviar uma animação",
        "32": "Auto detectar quadros ",
        "33": "Carregar como plano de fundo?",
        "34": "Sobrepor plano de fundo",
        "35": "quantidade de quadros",
        "36": "Largura:",
        "37": "Altura:",
        "38": "Remover Filtros",
        "39": "Invertido",
        "40": "Desfoque",
        "41": "Sepia",
        "42": "Contraste",
        "43": "Salvar quadro atual",
        "44": "Título:",
        "45": "Exportar sequencia de quadros",
        "46": "Exportar Gif animado:",
        "47": "Unir quadro com fundo",
        "48": "Título:",
        "49": "Exportar projeto",
        "50": "Carregar Projeto",
        "51": "Recortar automaticamente ",
        "52": "Recortar para seleção",
        "53": "⚠️ impossivel desfazer",
        "54": "limpar quadro",
        "55": "Apagar toda aanimação",
        "56": "Remover quadro atual",
        "57": "Rotacionar a tela",
        "58": "A imagem irá perder definição. <br> Sugestão: duplique o quadro antes de rotacionar",
        "59": "Brightness / brilho",
        "60": "Modo de exposição Manual",
        "61": "exposureTime",
        "62": "Compensação de exposição",
        "63": "Saturação",
        "64": "Contraste",
        "65": "Definição",
        "66": "Distancia focal",
        "68": "Pan",
        "69": "Tilt",
        "70": "balancço do branco e cor Manual",
        "71": "Temperatura da cor",
        "72": "Balanço do branco ",
        "73": "Modo de Foco Manual",
        "74": "Novo projeto",
        "75": "apresenta",
        "76": "Usar como fundo do app",
        "77": "Mover o quadro",
        "78": "Rotacionar pelo centro da tela"
    },
    "en": {
        "1": "Touch a painted area to pick it's color",
        "2": "Touch a painted area to pick it's color",
        "3": "<b>⚠️Atention!⚠️</b><br>",
        "4": "This is a fun app!<br>  during creation and exporting , image will loose some quality! That said, i hope you have fun!<br>",
        "5": "Made By:",
        "6": "whith code from:",
        "7": "and a gang from ",
        "8": "Version Changes:",
        "9": "Current Size:",
        "10": "Width: ",
        "11": "Height:",
        "12": "Manual crop",
        "13": "limit to 30 frames",
        "14": "Ereaser",
        "15": "Use the 📌 to save your colors.",
        "16": "Personalized brushes",
        "17": "New brush from canvas art?",
        "18": "Canvas Settings",
        "19": "Canvas Size",
        "20": "Canvas Opacity",
        "21": "Ghost frames",
        "22": "Add fake background:",
        "23": "Fill all ",
        "24": "Animation speed 🎞️",
        "25": "Frames Per Second",
        "26": "Remove current Frame",
        "27": "Clone frame",
        "28": "Change Frame Order",
        "29": "Load image",
        "30": "Ajust canvas to image size",
        "31": "Load an animation sprite-sheet",
        "32": "Auto-detect frames",
        "33": "Load as a background animation?",
        "34": "Background animation over canvas",
        "35": "Amount of frames",
        "36": "width:",
        "37": "height:",
        "38": "Remove Filters",
        "39": "Invert",
        "40": "Blur",
        "41": "Sepia",
        "42": "Contrast",
        "43": "Export current frame",
        "44": "Title: ",
        "45": "Create sprite-sheet",
        "46": "Export animated Gif",
        "47": "Unite canvas with background",
        "48": "Title:",
        "49": "Export project",
        "50": "Load Project",
        "51": "Auto-crop Canvas ",
        "52": "Crop to Selection",
        "53": "⚠️ impossible undo",
        "54": "Clear Canvas",
        "55": "Erease all animation",
        "56": "Remove current frame",
        "57": "Rotate canvas",
        "58": "Image will loose definition. <br>Sugestion: duplicate frames before rotating",
        "59": "Brightness",
        "60": "Manual exposure Mode",
        "61": "exposureTime",
        "62": "Exposure compensation",
        "63": "Aaturation",
        "64": "Contrast",
        "65": "Sharpness",
        "66": "Focus Distance",
        "68": "Pan",
        "69": "Tilt",
        "70": "Manual white Balance / color",
        "71": "ColorTemperature",
        "72": "White balace ",
        "73": "Manual Focus Mode",
        "74": "New Project",
        "75": "presents",
        "76": "use as page background",
        "77": "Move the canva",
        "78": "Rotate by canvas center"
    }
}
var titles = {
    "pt_BR": {
        "fundo": "Configurações",
        "zoomx": "Ampliar",
        "undo": "desfazer",
        "redo": "refazer",
        "salvar": "salvar imagem",
        "localize": "change language",
        "prev_frame()": "Quadro anterior",
        "play()": "Tocar Animação",
        "next_frame()": "Próximo quadro",
        "swapL()": "Mover quadro á esquerda",
        "swapR()": "Mover quadro á direita",
        "lixeira()": "Arraste um quadro para apaga-lo",
        "new_frame()": "Adiconar quadro á animação",
        "animebot": "configurar animação",
        "pintar": "pintar",
        "cores": "cores",
        "picker": "Pega cor",
        "apagar": "Apagar",
        "emoji": "pintar emoji",
        "formatos": "formato do quadro",
        "formatos2": "formatos do quadro",
        "cam": "foto",
        "imagem": "Carregar imagem / projeto",
        "mostraCor2": "cores",
        "picker2": "Pega cor",
        "preencher": "Preencher",
        "mostraCor": "cores",
        "salvaCor": "Favoritar",
        "canvasmenu": "Propriedades do quadro",
        "info": "Informações",
        "zoom2xbot": "Ampliar",
        "input": "Enviar Arquivo de imagem",
        "inputSprite": "Adicionar sequencia de imagem",
        "btnChangeCam": "Trocar camera",
        "stopMotion": "Modo de captura",
        "recMotion": "Gravar automaticamente",
        "zoom": "Zoom",
        "grayscaleBar": "escala de cinza",
        "autorecortarbot": "Recotar automaticamente",
        "recortarbot": "Recotar para seleção",
        "brightness": "brightness",
        "iso": "iso",
        "exposureTime": "exposureTime",
        "exposureCompensation": "exposureCompensation",
        "saturation": "saturation",
        "contrast": "contrast",
        "sharpness": "sharpness",
        "colorTemperature": "colorTemperature",
        "whiteBalace": "whiteBalace",
        "focusDistance": "focusDistance",
        "pan": "Pan",
        "tilt": "Tilt",
        "localizeA": "change language",
        "apresenta": "apresenta",
        "night": "modo escuro / claro",
        "nigth2": "modo escuro / claro",
        "desenho": "Desenho"
    },
    "en": {

        "fundo": "Settings",
        "zoomx": "Zoom",
        "undo": "Undo",
        "redo": "Redo",
        "salvar": "Save image",
        "localize": "Trocar para Português?",
        "prev_frame()": "Previous Frame",
        "play()": "Play Animation",
        "next_frame()": "Next frame",
        "swapL()": "Move frame to the left",
        "swapR()": "Move frame to the right",
        "lixeira()": "Drag a frame here to erease it",
        "new_frame()": "Add a new frame to the animation",
        "animebot": "Animation Settings",
        "pintar": "Paint",
        "cores": "Colors",
        "picker": "Color Picker",
        "apagar": "Ereaser",
        "emoji": "Emoji paint",
        "formatos": "Canvas size",
        "formatos2": "Canvas size",
        "cam": "Camera",
        "imagem": "Load image / project",
        "mostraCor2": "Colors",
        "picker2": "Color Picker",
        "Preencher": "Fill",
        "mostraCor": "Colors",
        "salvaCor": "Keep Color",
        "canvasmenu": "Canvas Settings",
        "info": "Information",
        "zoom2xbot": "Zoom in",
        "input": "Open image file",
        "inputSprite": "Sprite-sheet file",
        "btnChangeCam": "Switch camera",
        "stopMotion": "Capture mode",
        "recMotion": "Auto-Record",
        "zoom": "Zoom",
        "grayscaleBar": "shades of gray",
        "autorecortarbot": "auto crop canvas",
        "recortarbot": "crop to selection",
        "brightness": "brightness",
        "iso": "iso",
        "exposureTime": "Exposure Time",
        "exposureCompensation": "Exposure Compensation",
        "saturation": "saturation",
        "contrast": "contrast",
        "sharpness": "sharpness",
        "colorTemperature": "Color Temperature",
        "whiteBalace": "White Balace",
        "focusDistance": "Focus Distance",
        "pan": "Pan",
        "tilt": "Tilt",
        "localizeA": "Portugues?",
        "night": "switch light or dark",
        "night2": "switch light or dark",
        "apresenta": "presents",
        "desenho": "Drawing"

    }
}