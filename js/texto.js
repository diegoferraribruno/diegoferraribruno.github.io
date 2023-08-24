var textConfig = {
    value: "Hello World",
    font: "Times New Roman",
    size: 16
};

var textostarted = false;
let supportsFontQuery = false;
const dropdown = document.querySelector('.custom-dropdown');
const dropdownOptions = document.querySelector('.dropdown-options');

const fontFamilies = [
    'Amatic SC',
    'Arial',
    'Arial Black',
    'Arial Narrow',
    'Avenir',
    'Avenir Next',
    'Bookman Old Style',
    'Bitter',
    'Cabin',
    'Caveat',
    'Calibri',
    'Century Gothic',
    'Comic Sans MS',
    'Copperplate',
    'Courier',
    'Courier New',
    'Crimson Text',
    'DejaVu Sans',
    'DejaVu Sans Mono',
    'DejaVu Serif',
    'Dancing Script',
    'Droid Sans',
    'Exo',
    'Fira Sans',
    'Frank Ruhl Libre',
    'Garamond',
    'Georgia',
    'Helvetica',
    'Helvetica Neue',
    'Impact',
    'Indie Flower',
    'Lato',
    'Lobster',
    'Lora',
    'Lucida Console',
    'Lucida Grande',
    'Lucida Sans',
    'Montserrat',
    'Muli',
    'Noto Sans',
    'Open Sans',
    'Optima',
    'Oswald',
    'Palatino',
    'Palatino Linotype',
    'Playfair Display',
    'Poppins',
    'PT Sans',
    'Quicksand',
    'Raleway',
    'Roboto',
    'Roboto Condensed',
    'Roboto Mono',
    'Roboto Slab',
    'San Francisco',
    'Segoe UI',
    'Source Sans Pro',
    'Source Serif Pro',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Ubuntu',
    'Ubuntu Condensed',
    'Ubuntu Mono',
    'Verdana',
    'Pacifico',
    'Permanent Marker',
    'Slabo'
];



function startTexto() {
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
    const sampleText = " - AaÃáÁâÂàÀçÇéÉêÊíÍóÓôÔúÚñÑ"; // Add more characters as needed
    const truncatedText = sampleText.substring(0, 18);

    if (isMobile || !supportsFontQuery) {
        defaultFonts();
    } else {
        function addFontToList(newFont) {
            const lowerCasefontFamilies = fontFamilies.map(font => font.toLowerCase());
            const lowerCaseNewFont = newFont.toLowerCase();

            if (!lowerCasefontFamilies.includes(lowerCaseNewFont)) {
                const newIndex = lowerCasefontFamilies.findIndex(font => font > lowerCaseNewFont);
                if (newIndex === -1) {
                    // Append the new font to the end of the list
                    fontFamilies.push(newFont);
                } else {
                    // Insert the new font at the appropriate position
                    fontFamilies.splice(newIndex, 0, newFont);
                }
                // console.log(`${newFont} has been added to the list.`);
            } else {
                //  console.log(`${newFont} already exists in the list.`);
            }
        }
        // Use the queryLocalFonts approach
        async function logFontData() {
            try {
                const availableFonts = await window.queryLocalFonts();
                let lastfont = ""
                availableFonts.forEach(fontData => {
                    if (fontData.family != lastfont) {
                        addFontToList(fontData.family)

                        // Perform your action when font is selected


                    }
                });

            }

            catch (err) {
                console.error(err.name, err.message);

            } finally { defaultFonts(); }
        }
        //  defaultFonts();
        logFontData();
    }
    function defaultFonts() {
        // Populate font list with pre-defined font families

        fontFamilies.forEach(font => {
            if (isFontAvailable(font)) {

                const option = document.createElement('div');
                option.id = font
                option.classList.add('dropdown-option');
                option.textContent = font + truncatedText;
                option.style.fontFamily = font + ', sans-serif';
                option.style.fontSize = '16px';
                option.addEventListener('click', () => {
                    textConfig.font = font
                    updateCanvas(); toggleFont();
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
            dropdownOptions.classList.add('esconde');
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

function loadFont(fontName = "roboto") {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}`;
    document.head.appendChild(link);
    Alert("loading Google font: " + fontName)
    setTimeout(() => { checkFontLoaded(fontName) })

}

let fontTry = 0
function checkFontLoaded(fontName) {
    setTimeout(() => {
        const isFontLoaded = document.fonts.check(`1em '${fontName}'`);

        if (isFontLoaded) {
            Alert(fontName + " loaded", 0.5)
            fontFamilies.unshift(0, fontName)
            console.log(`${fontName} font is loaded.`);
            // Populate font list with pre-defined font families
            while (dropdownOptions.firstChild) {
                dropdownOptions.removeChild(dropdownOptions.firstChild);
            }
            startTexto()
            textConfig.font = fontName
            toggleFont(fontName)

        } else {
            fontTry++
            if (fontTry > 10) {
                Alert("it is taking to long to load that font.. try again")
                fontTry = 0


            } else {

                console.log(`${fontName} font is not yet loaded.`);
                checkFontLoaded(fontName, 0.5)
            }
            // Handle the case where the font is not loaded yet
        }
    }, 1000)
}



const availableFonts = [
    "roboto",
    "open+sans",
    "lato",
    "Quicksand",
    "Pacifico",
    "Amatic+SC",
    "Indie+Flower",
    "Fredoka+One",
    "Caveat",
    "Satisfy",
    "Roboto+Condensed",
    "Dancing+Script",
    "Raleway",
    "Comfortaa",
    "Cabin+Sketch",
    "Josefin+Sans",
    "Shadows+Into+Light",
    "Permanent+Marker",
    "Rock+Salt",
    "Mansalva",
    "Nunito",
    "Alegreya+Sans+SC",
    "Crimson+Pro"
];

// You can create a dropdown/select element to allow the user to choose a font
const fontSelect = document.getElementById('fontSelect'); // Make sure to have an element with the id 'fontSelect'

availableFonts.forEach(font => {
    const option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    fontSelect.appendChild(option);
});

fontSelect.addEventListener('change', function () {
    const selectedFont = fontSelect.value;
    loadFont(selectedFont);
});
