var texto = {
    value: "hello",
    font: "times new Roman",
    size: "20px",
}

const textInput = document.getElementById('textInput');
const fontSelect = document.getElementById('fontSelect');
const fontSizeInput = document.getElementById('fontSizeInput');
const boldButton = document.getElementById('boldButton');
const italicButton = document.getElementById('italicButton');
const colorSelect = document.getElementById('colorSelect');
const drawButton = document.getElementById('drawButton');

function updateCanvas(x = canvas.width / 2, y = canvas.height / 2) {
    const text = textInput.value;
    const selectedFont = fontSelect.value;
    const fontSize = fontSizeInput.value;
    const isBold = boldButton.classList.contains('active');
    const isItalic = italicButton.classList.contains('active');
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
    ctxF.restore()
}


textInput.addEventListener('input', () => {
    updateCanvas();
});
fontSelect.addEventListener('input', () => { updateCanvas() });
fontSizeInput.addEventListener('input', () => { updateCanvas() });
boldButton.addEventListener('click', () => {
    boldButton.classList.toggle('active');
    updateCanvas();
});
italicButton.addEventListener('click', () => {
    italicButton.classList.toggle('active');
    updateCanvas();
});
colorSelect.addEventListener('change', () => { updateCanvas() });
//drawButton.addEventListener('click', () => { updateCanvas() });

const fontFamilyList = [
    'Arial',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Comic Sans MS'];

function getAvailableFonts() {

    console.log(fontFamilyList)

    fontFamilyList.forEach(font => {
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
// Query for all available fonts and log metadata.
async function logFontData() {
    let fontes = []
    try {
        const availableFonts = await window.queryLocalFonts();
        for (const fontData of availableFonts) {
            /*   console.log(fontData.postscriptName);
               console.log(fontData.fullName);
               console.log(fontData.family);
               console.log(fontData.style);*/
            fontFamilyList.push(fontData.family)

        }
        console.log(fontFamilyList)
        getAvailableFonts()
    } catch (err) {
        console.error(err.name, err.message);
    }
}
logFontData()