var texto = {
    value: "hello",
    font: "times new Roman",
    size: "20px",
}
var textostarted = false

function startTexto() {
    if (textostarted) return;
    textInput.value = "Texto"
    textostarted = true
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|/i.test(navigator.userAgent);
    const supportsQueryLocalFonts = 'fonts' in document;
    if (isMobile && !supportsQueryLocalFonts) {
        defaultFonts()
    } else {
        // Use the queryLocalFonts approach
        async function logFontData() {
            try {
                const availableFonts = await window.queryLocalFonts();
                availableFonts.forEach(fontData => {
                    const sampleText = " - AaÃáÁâÂàÀçÇéÉêÊíÍóÓôÔúÚñÑ"; // Add more characters as needed
                    const option = document.createElement('option');
                    const truncatedText = sampleText.substring(0, 18); // Max length 26 characters
                    option.textContent = fontData.family + truncatedText;
                    option.style.fontFamily = fontData.family + ', sans-serif';
                    option.style.fontSize = "16px"
                    option.value = fontData.family;
                    fontSelect.appendChild(option);
                });
            } catch (err) {
                defaultFonts()
                console.error(err.name, err.message);
            }
        }

        logFontData();
    }
    function defaultFonts() {
        // Populate font list with pre-defined font families
        const fontFamilies = [
            'Arial',
            'Times New Roman',
            'Courier New',
            'Verdana',
            'Helvetica',
            'Tahoma',
            'Comic Sans MS'
            // ... Add more font families as needed
        ];

        fontFamilies.forEach(font => {
            const sampleText = " - AaÃáÁâÂàÀçÇéÉêÊíÍóÓôÔúÚñÑ"; // Add more characters as needed
            const option = document.createElement('option');
            const truncatedText = sampleText.substring(0, 18); // Max length 26 characters
            option.textContent = font + truncatedText;
            option.style.fontFamily = font + ', sans-serif';
            option.style.fontSize = "16px"
            option.value = font;
            fontSelect.appendChild(option);
        });
    }
}
const textInput = document.getElementById('textInput');
const fontSelect = document.getElementById('fontSelect');
const fontSizeInput = document.getElementById('fontSizeInput');
const boldButton = document.getElementById('boldButton');
const italicButton = document.getElementById('italicButton');
const colorSelect = document.getElementById('colorSelect');
const drawButton = document.getElementById('drawButton');

var isBold = false
var isItalic = false
var fontSize = fontSizeInput.value;

function updateCanvas(x = canvas.width / 2, y = canvas.height / 2) {
    const text = textInput.value;
    const selectedFont = fontSelect.value;

    const selectedColor = colorSelect.value;
    const textradius = text.length * fontSize / 2
    ctxF.save()
    ctxF.textAlign = "center";
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    ctxF.font = `${isBold ? 'bold' : ''} ${isItalic ? 'italic' : ''} ${fontSize}px ${selectedFont}, sans-serif`;
    if (rainbowAB) {
        gradient = ctxF.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", strokeColor);
        gradient.addColorStop("1.0", estrokeColor);
        // Fill with gradient
        ctxF.fillStyle = gradient;
    } else if (isGlowing) {
        ctxF.shadowColor = strokeColor; // string

        // Horizontal distance of the shadow, in relation to the text.
        ctxF.shadowOffsetX = 0; // integer

        // Vertical distance of the shadow, in relation to the text.
        ctxF.shadowOffsetY = 0; // integer

        // Blurring effect to the shadow, the larger the value, the greater the blur.
        ctxF.shadowBlur = 6; // integer
        ctxF.fillStyle = "#fffffff5";
    }
    else {
        ctxF.fillStyle = selectedColor;
    }
    ctxF.fillText(text, redondo(x), redondo(y - fontSize / 2));
    if (tilepaint) {
        fillInfinity(text, redondo(x), redondo(y - fontSize / 2))
    }

    ctxF.restore()
}
function fillInfinity(text, x, y) {
    ctxF.fillText(text, x + canvas.width, y);
    ctxF.fillText(text, x - canvas.width, y);
    ctxF.fillText(text, x, y - canvas.width);
    ctxF.fillText(text, x, y + canvas.width);
}


textInput.addEventListener('input', () => {
    updateCanvas();
});
fontSelect.addEventListener('input', () => { updateCanvas(); addFavFont(); });
fontSizeInput.addEventListener('input', () => {
    fontSize = fontSizeInput.value;
    updateCanvas()
});
function addFavFont(lst = fontSelect) {
    var selected = new Array();
    var options = lst.getElementsByTagName("option");
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
            selected.push(options[i]);
            lst.removeChild(options[i]);
        }
    }
    for (var i = 0; i < selected.length; i++) {
        lst.insertBefore(selected[i], options[0]);
    }
};
boldButton.addEventListener('click', () => {
    isBold = !isBold
    if (isBold) {
        boldButton.innerHTML = "<span class='icon2 minicheck'></span>"
    } else {
        boldButton.innerHTML = ""
    }
    updateCanvas();
});
italicButton.addEventListener('click', () => {
    isItalic = !isItalic
    if (isItalic) {
        italicButton.innerHTML = "<span class='icon2 minicheck'></span>"
    } else {
        italicButton.innerHTML = ""
    }
    updateCanvas();
});
colorSelect.addEventListener('change', () => { updateCanvas() });
//drawButton.addEventListener('click', () => { updateCanvas() });

function changeFontUp() {
    fontSize = Math.floor(fontSizeInput.value) + 1
    fontSizeInput.value = fontSize
    updateCanvas();
}
function changeFontDown() {
    fontSize = Math.floor(fontSizeInput.value) - 1
    fontSizeInput.value = fontSize
    updateCanvas();
}
function clearTextInput() {
    textInput.value = ""
}