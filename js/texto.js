var textConfig = {
    value: ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", " ", "😃", " "],
    font: "Times New Roman",
    size: 16
};
const textInput = document.getElementById('textInput');
const fontSizeInput = document.getElementById('fontSizeInput');
const boldButton = document.getElementById('boldButton');
const italicButton = document.getElementById('italicButton');
const colorSelect = document.getElementById('colorSelect');
const drawButton = document.getElementById('drawButton');

var isBold = false
var isItalic = false
var fontSize = fontSizeInput.value;
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
    "Noto Emoji",
    "Noto Color Emoji",
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


function arrayToString(array) {
    return array.join('');
}
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
    loadGreetings()
    if (textostarted) return;
    textostarted = true;
    textInput.addEventListener('input', () => {

        textInputer()
    });
    textInput.addEventListener('focus', () => {
        textInputer()
    })
    fontSizeInput.addEventListener('input', () => {
        fontSize = fontSizeInput.value;
        textConfig.size = `${fontSize}px`;
        updateCanvas();
    });

    textInput.value = arrayToString(textConfig.value)

    if ('queryLocalFonts' in window) {
        supportsFontQuery = true;
    }
    const sampleText = "AaÃáÁâÂàÀçÇéÉêÊíÍóÓôÔúÚñÑ"; // Add more characters as needed
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
                createNewButton(font, truncatedText)
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


        // Close the dropdown if the user clicks outside of it
        /*    if (!event.target.matches('.dropbtn')) {
                const drop = iD("greetingsDropdown");
    
                if (drop.style.display === "block") {
                    drop.style.display = "none";
                }
    
            }*/
    });


}

function textInputer() {
    const resultArray = transformStringToArray(textInput.value).filter(item => item.trim() !== ""); // Filter out empty and whitespace strings
    resultArray.push(" ")
    textConfig.value = resultArray
    updateCanvas();
}

// Define the emoji regex pattern


function transformStringToArray(inputString) {
    const resultArray = inputString.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]|\s/gu);
    return resultArray;
}
// Convert surrogate pairs to emoji characters

function createNewButton(font, truncatedText) {
    const option = document.createElement('div');
    font = font.replace(/\+/g, ' ');
    option.id = font
    option.classList.add('dropdown-option');
    option.textContent = font + " - " + truncatedText
    option.style.fontFamily = font
    option.style.fontSize = '16px';
    option.addEventListener('click', () => {
        textConfig.font = font
        updateCanvas();
        toggleFont();
    });
    if (truncatedText[0] == "G") {
        dropdownOptions.insertBefore(option, dropdownOptions.firstChild);
    } else {
        dropdownOptions.appendChild(option);
    }
}


function updateCanvas(x = canvas.width / 2, y = canvas.height / 2) {
    const text = textInput.value;
    const selectedColor = colorSelect.value;
    const textradius = text.length * fontSize / 2 //might be usefull in the future
    ctxF.save()
    ctxF.textAlign = "center";
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    ctxF.font = `${isBold ? 'bold' : ''} ${isItalic ? 'italic' : ''} ${fontSize}px ${textConfig.font}`;
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
    } else if (rainbowInk) {
        ctxF.fillStyle = strokeColor;

    }
    else {
        ctxF.fillStyle = selectedColor;
    }
    if (textBrush) {

        ctxF.fillText(textConfig.value[0], redondo(x), redondo(y - fontSize / 2));
        if (infinitypaint) {
            ctxF.fillText(textConfig.value[0], redondo(x), redondo(y - fontSize / 2) + canvas.height);
            ctxF.fillText(textConfig.value[0], redondo(x), redondo(y - fontSize / 2) - canvas.height);
            ctxF.fillText(textConfig.value[0], redondo(x) + canvas.width, redondo(y - fontSize / 2));
            ctxF.fillText(textConfig.value[0], redondo(x) - canvas.width, redondo(y - fontSize / 2));

        }
    } else {
        ctxF.fillText(text, redondo(x), redondo(y - fontSize / 2));

    }
    if (infinitypaint && !textBrush) {
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
        textInput.style.fontFamily = id
    }
}
boldButton.addEventListener('click', () => {
    isBold = !isBold
    if (isBold) {
        boldButton.innerHTML = "<span class='icon2 minicheck'></span>"
        textInput.style.fontWeight = "bold"
        dropdownOptions.style.fontWeight = "bold"

    } else {
        boldButton.innerHTML = ""
        textInput.style.fontWeight = "normal"
        dropdownOptions.style.fontWeight = "normal"
    }
    updateCanvas();
});
italicButton.addEventListener('click', () => {
    isItalic = !isItalic
    if (isItalic) {
        italicButton.innerHTML = "<span class='icon2 minicheck'></span>"
        textInput.style.fontStyle = "italic"
        dropdownOptions.style.fontStyle = "italic"

    } else {
        italicButton.innerHTML = ""
        textInput.style.fontStyle = "normal"
        dropdownOptions.style.fontStyle = "normal"

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
    if (!iD(fontName.replace(/\+/g, ' '))) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName}`;
        document.head.appendChild(link);
        Alert("loading Google font: " + fontName)
        setTimeout(() => { checkFontLoaded(fontName) })
    } else {
        fontName = fontName.replace(/\+/g, ' ')
        textConfig.font = fontName
        Alert(fontName + " already loaded", 2);
        toggleFont(fontName);
        updateCanvas()
        //  dropdownOptions.classList.remove("esconde")
        return
    }

}

let fontTry = 0
function checkFontLoaded(fontName) {
    setTimeout(() => {

        if (isFontAvailable(fontName)) {
            fontName = fontName.replace(/\+/g, ' ');
            Alert(fontName + " loaded", 2)

            fontFamilies.push(fontName)
            console.log(`${fontName} font is loaded.`);

            setTimeout(() => {
                createNewButton(fontName, "Google Font")
                textConfig.font = fontName;
                toggleFont(fontName);
                updateCanvas()
                dropdownOptions.classList.remove("esconde")
            }, 100)



        } else {
            fontTry++
            if (fontTry > 6) {
                Alert(`it is taking to long to load ${fontName} .. try another one`)
                fontTry = 0

            } else {
                checkFontLoaded(fontName, 0.5)
            }
        }
    }, 1000)
}

const availableFonts = [
    "Select To load",
    "Acme",
    "Aclonica",
    "Alegreya+Sans+SC",
    "Amatic+SC",
    "Archivo",
    "Baloo",
    "Barlow",
    "Bebas+Neue",
    "Cabin+Sketch",
    "Caveat",
    "Changa",
    "Comfortaa",
    "Crimson+Pro",
    "Dancing+Script",
    "Fredoka+One",
    "Indie+Flower",
    "Inter",
    "Josefin+Sans",
    "Lato",
    "Mansalva",
    "Merriweather",
    "Montserrat",
    "Noto+Sans",
    "Noto+Serif",
    "Noto+Emoji",
    "Noto+Color+Emoji",
    "Nunito",
    "Open+Sans",
    "Oswald",
    "Pacifico",
    "Permanent+Marker",
    "Playfair+Display",
    "Poppins",
    "PT+Sans",
    "Quicksand",
    "Raleway",
    "Roboto",
    "Roboto+Condensed",
    "Roboto+Slab",
    "Rock+Salt",
    "Satisfy",
    "Shadows+Into+Light",
    "Source+Sans+Pro",
    "Source+Serif+Pro",
    "Work+Sans",

];

// You can create a dropdown/select element to allow the user to choose a font
const fontSelect = document.getElementById('fontSelect'); // Make sure to have an element with the id 'fontSelect'

availableFonts.forEach(font => {
    const option = document.createElement('option');
    option.value = font;
    option.textContent = font.replace(/\+/g, ' ');;
    fontSelect.appendChild(option);
});

fontSelect.addEventListener('change', function () {
    const selectedFont = fontSelect.value;
    loadFont(selectedFont);
});

//Text Brush area

var position = { x: 0, y: window.innerHeight / 2 };
var textCounter = 0;
var angleDistortion = 6;
var textSpacing = 1.6
// Drawing variables
var mouse = { x: 0, y: 0, down: false }

var textBrush = false

function drawText() {

    var selectedColor = colorSelect.value
    if (rainbowInk) {
        value = hsla[0] + 3
        if (value > 360) { value = 0 }
        mudaCorD(0, value)
        selectedColor = strokeColor
    }
    const text = textConfig.value
    if (textBrush) {
        var d = distance(position, mouse) - 4;
        var fontSize2 = fontSize - 4 + d / 2;
        var letter = text[textCounter];
        var stepSize = textWidth(letter, fontSize2) * textSpacing;
        function drawrotate() {
            context.rotate(angle);
            context.font = `${isBold ? 'bold' : ''} ${isItalic ? 'italic' : ''} ${fontSize2 / textSpacing}px ${textConfig.font}`;
            if (rainbowAB) {
                isRainbowAB()
                context.fillStyle = strokeColor;
            } else if (isGlowing) {
                context.shadowColor = strokeColor; // string

                // Horizontal distance of the shadow, in relation to the text.
                context.shadowOffsetX = 0; // integer

                // Vertical distance of the shadow, in relation to the text.
                context.shadowOffsetY = 0; // integer

                // Blurring effect to the shadow, the larger the value, the greater the blur.
                context.shadowBlur = 6; // integer
                context.fillStyle = "#fffffff5";
            }
            else {
                context.fillStyle = selectedColor;
            }
            context.fillText(letter, 0, 0);
        }
        if (d > stepSize * textSpacing) {
            var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);
            context.save();
            context.translate(position.x, position.y);
            drawrotate()
            context.restore();
            if (infinitypaint) {
                context.save()
                context.translate(position.x - canvas.width, position.y);
                drawrotate()
                context.restore();

                context.save()
                context.translate(position.x + canvas.width, position.y);
                drawrotate()
                context.restore();

                context.save()
                context.translate(position.x, position.y + canvas.height);
                drawrotate()
                context.restore();
                context.save()
                context.translate(position.x, position.y - canvas.height);
                drawrotate()
                context.restore();
            } else if (mandala) {
                context.save();
                context.translate(position.x, position.y);
                drawrotate()
                context.restore();
                ctxR.clearRect(0, 0, canvas.width, canvas.height);
                ctxR.save();
                ctxR.translate(position.x, position.y);
                ctxR.rotate(angle);

                ctxR.font = `${isBold ? 'bold' : ''} ${isItalic ? 'italic' : ''} ${fontSize2 / textSpacing}px ${textConfig.font}`;
                if (rainbowAB) {
                    isRainbowAB()
                    ctxR.fillStyle = strokeColor;
                } else if (isGlowing) {
                    ctxR.shadowColor = strokeColor; // string

                    // Horizontal distance of the shadow, in relation to the text.
                    ctxR.shadowOffsetX = 0; // integer

                    // Vertical distance of the shadow, in relation to the text.
                    ctxR.shadowOffsetY = 0; // integer

                    // Blurring effect to the shadow, the larger the value, the greater the blur.
                    ctxR.shadowBlur = 6; // integer
                    ctxR.fillStyle = "#fffffff5";
                }
                else {
                    ctxR.fillStyle = selectedColor;
                }
                ctxR.fillText(letter, 0, 0);
                ctxR.restore();
                _start = 0;
                origin.x = canvas.width / 2;
                origin.y = canvas.height / 2

                for (var i = 0; i < slices; i++) {
                    _start += _angle;
                    ctxF.globalAlpha = 1;
                    ctxF.save()
                    // canvasFront.globalCompositeOperation = "source-out"

                    ctxF.translate(origin.x, origin.y)
                    ctxF.rotate(_start);
                    ctxF.drawImage(canvasRender, -origin.x, -origin.y)
                    ctxF.restore()
                }

            }
            textCounter++;
            if (textCounter > text.length - 1) {
                textCounter = 0;
            }
            //console.log (position.x + Math.cos( angle ) * stepSize)
            position.x = position.x + Math.cos(angle) * stepSize;
            position.y = position.y + Math.sin(angle) * stepSize;
        }
    }
}

function distance(pt, pt2) {

    var xs = 0;
    var ys = 0;

    xs = pt2.x - pt.x;
    xs = xs * xs;

    ys = pt2.y - pt.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

function textWidth(string, size) {
    context.font = size + "px " + textConfig.font;
    if (ctxF.fillText) {
        return ctxF.measureText(string).width * textSpacing + size / 16;
    } else if (context.mozDrawText) {
        return ctxF.mozMeasureText(string) * textSpacing + size / 16;
    }

};

function toggleTextBrush() {
    textBrush = !textBrush
    if (textBrush == true) {
        iD("textBrush").innerHTML = "<span class='icon2 check'></span>"

    } else {
        iD("textBrush").innerHTML = ""

    }
}
//let language = "en"
const seasonalGreetings = {
    "en": [
        "🥳 Happy Birthday 🎂",
        "Merry Christmas 🎄",
        "Happy New Year 🎉",
        "Happy Halloween 🎃",
        "Happy Thanksgiving 🦃",
        "Happy Valentine's Day 💘",
        "Happy Easter 🐣",
        "Happy Fourth of July 🇺🇸",
        "Happy Hanukkah 🕎",
        "Happy Diwali 🪔",
        "Happy St. Patrick's Day ☘️",
        "Happy Independence Day 🎆",
        "Happy Labor Day 🛠️",
        "Happy Veterans Day 🇺🇸",
        "Happy Mother's Day 👩‍👧‍👦",
        "Happy Father's Day 👨‍👧‍👦",
        "Happy Anniversary 💑",
        "Happy Graduation 🎓",
        "Happy Retirement 🎈",
        "Happy Spring 🌸",
        "Happy Summer ☀️",
        "Happy Fall 🍂",
        "Happy Winter ❄️",
        "Happy Chinese New Year 🧧"
    ], "pt_BR": [
        "🥳 Feliz Aniversário 🎂",
        "Feliz Natal 🎄",
        "Feliz Ano Novo 🎉",
        "Feliz Halloween 🎃",
        "Feliz Dia de Ação de Graças 🦃",
        "Feliz Dia dos Namorados 💘",
        "Feliz Páscoa 🐣",
        "Feliz Quatro de Julho 🇺🇸",
        "Feliz Hanukkah 🕎",
        "Feliz Diwali 🪔",
        "Feliz Dia de São Patrício ☘️",
        "Feliz Dia da Independência 🎆",
        "Feliz Dia do Trabalho 🛠️",
        "Feliz Dia dos Veteranos 🇺🇸",
        "Feliz Dia das Mães 👩‍👧‍👦",
        "Feliz Dia dos Pais 👨‍👧‍👦",
        "Feliz Aniversário de Casamento 💑",
        "Feliz Formatura 🎓",
        "Feliz Aposentadoria 🎈",
        "Feliz Primavera 🌸",
        "Feliz Verão ☀️",
        "Feliz Outono 🍂",
        "Feliz Inverno ❄️",
        "Feliz Ano Novo Chinês 🧧"
    ]
}
function loadGreetings() {
    const greet = seasonalGreetings[language]
    const len = greet.length
    const drop = iD("greetingsDropdown")
    drop.innerHTML = ""
    for (i = 0; i < len; i++) {
        let opt = document.createElement("div")

        opt.setAttribute("onclick", "changeText('" + seasonalGreetings[language][i] + "')")

        opt.innerHTML = seasonalGreetings[language][i]
        drop.appendChild(opt)
    }

    toggleDropdown()
}
function changeText(value) {
    textInput.value = value

    textInputer()
    toggleDropdown()
}

function toggleDropdown() {
    const dropdown = document.getElementById("greetingsDropdown");
    if (dropdown.style.display === "none") {
        dropdown.style.display = "block"
    } else {
        dropdown.style.display = "none"
    }
}