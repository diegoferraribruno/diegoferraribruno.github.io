var textConfig = {
    value: "hello",
    font: "Times New Roman",
    size: 16
};

var textostarted = false;
let supportsFontQuery = false;
const dropdown = document.querySelector('.custom-dropdown');
const dropdownOptions = document.querySelector('.dropdown-options');

function startTexto() {
    if (textostarted) return;
    textostarted = true;
    textInput.addEventListener('input', () => {
        textConfig.value = textInput.value;
        updateCanvas();
    });
    fontSizeInput.addEventListener('input', () => {
        fontSize = fontSizeInput.value;
        textConfig.size = `${fontSize}px`;
        updateCanvas();
    });

    textInput.value = textConfig.value

    if ('queryLocalFonts' in window) {
        supportsFontQuery = true;
    }

    if (isMobile || !supportsFontQuery) {
        defaultFonts();
    } else {
        // Use the queryLocalFonts approach
        async function logFontData() {
            try {
                const sampleText = " - AaÃáÁâÂàÀçÇéÉêÊíÍóÓôÔúÚñÑ"; // Add more characters as needed
                const truncatedText = sampleText.substring(0, 18);
                const availableFonts = await window.queryLocalFonts();
                let lastfont = ""
                availableFonts.forEach(fontData => {
                    if (fontData.family != lastfont) {
                        lastfont = fontData.family
                        const option = document.createElement('div');
                        option.id = fontData.family
                        option.classList.add('dropdown-option');
                        option.textContent = fontData.family + truncatedText;
                        option.style.fontFamily = fontData.family + ', sans-serif';
                        option.style.fontSize = '16px';
                        option.addEventListener('click', () => {
                            textConfig.font = fontData.family
                            updateCanvas(); toggleFont();
                            // Perform your action when font is selected
                        });

                        dropdownOptions.appendChild(option);
                    }

                });
            } catch (err) {
                defaultFonts();
                console.error(err.name, err.message);
            }
        }

        logFontData();
    }
    function defaultFonts() {
        // Populate font list with pre-defined font families
        const fontFamilies = [
            'Arial',
            'Arial Black',
            'Arial Narrow',
            'Avenir',
            'Bookman Old Style',
            'Cabin',
            'Calibri',
            'Century Gothic',
            'Comic Sans MS',
            'Copperplate',
            'Courier',
            'Courier New',
            'DejaVu Sans',
            'DejaVu Sans Mono',
            'DejaVu Serif',
            'Droid Sans',
            'Fira Sans',
            'Frank Ruhl Libre',
            'Garamond',
            'Georgia',
            'Helvetica',
            'Helvetica Neue',
            'Impact',
            'Lato',
            'Lucida Console',
            'Lucida Grande',
            'Lucida Sans',
            'Montserrat',
            'Noto Sans',
            'Open Sans',
            'Optima',
            'Oswald',
            'Palatino',
            'Palatino Linotype',
            'Roboto',
            'Roboto Condensed',
            'San Francisco',
            'Segoe UI',
            'Source Sans Pro',
            'Tahoma',
            'Times New Roman',
            'Trebuchet MS',
            'Ubuntu',
            'Ubuntu Condensed',
            'Ubuntu Mono',
            'Verdana'
        ];
        (function (document) {
            var width;
            var body = document.body;

            var container = document.createElement('span');
            container.innerHTML = Array(100).join('wi');
            container.style.cssText = [
                'position:absolute',
                'width:auto',
                'font-size:128px',
                'left:-99999px'
            ].join(' !important;');

            var getWidth = function (fontFamily) {
                container.style.fontFamily = fontFamily;

                body.appendChild(container);
                width = container.clientWidth;
                body.removeChild(container);

                return width;
            };

            // Pre compute the widths of monospace, serif & sans-serif
            // to improve performance.
            var monoWidth = getWidth('monospace');
            var serifWidth = getWidth('serif');
            var sansWidth = getWidth('sans-serif');

            window.isFontAvailable = function (font) {
                return monoWidth !== getWidth(font + ',monospace') ||
                    sansWidth !== getWidth(font + ',sans-serif') ||
                    serifWidth !== getWidth(font + ',serif');
            };
        })(document);


        fontFamilies.forEach(font => {
            if (isFontAvailable(font)) {

                const option = document.createElement('div');
                option.classList.add('dropdown-option');
                option.textContent = font;
                option.id = font
                option.style.fontFamily = font + ', sans-serif';
                option.style.fontSize = '16px';
                option.addEventListener('click', () => {
                    console.log('Font selected:', font);
                    textConfig.font = font
                    updateCanvas(); toggleFont()
                    // Perform your action when font is selected
                });
                dropdownOptions.appendChild(option);
            }

        });
    }

    dropdown.addEventListener('click', () => {
        dropdownOptions.classList.toggle('esconde');
    });

    // Close options when clicking outside the dropdown
    document.addEventListener('click', event => {
        if (!dropdown.contains(event.target)) {
            dropdownOptions.classList.remove('esconde');
        }
    });


}


const textInput = document.getElementById('textInput');
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
    const selectedFont = textConfig.font
    const selectedColor = colorSelect.value;
    const textradius = text.length * fontSize / 2 //might be usefull in the future
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
fontSizeInput.addEventListener('input', () => {
    fontSize = fontSizeInput.value;
    updateCanvas()
});

function toggleFont(id = textConfig.font) {
    removeClass("selectedFont");
    let selected = iD(id)
    if (selected) {
        iD(id).classList.toggle("selectedFont");
    }
}
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