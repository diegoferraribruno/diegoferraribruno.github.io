//variables are in brushes.js

function toggleDinamicInk() {
    dinamicInk = !dinamicInk
}

function mudaCorQ(q = 0, valor) {
    hsla[q] = Number(valor);
    //        if (q == 0){hsla[q]=(hsla[q]*2)%360 }
    strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;

    setStrokeColor();
    criaPaleta();
    if (rainbowAB){rainbow("ab",false)}

}
function mudaCorD(q = 0, valor) {
    hsla[q] = Number(valor);
    //        if (q == 0){hsla[q]=(hsla[q]*2)%360 }
    strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;

}
/*function mudaCorAlpha() {
    let valor = iD("transparenciaE").value
    strokeColor = `hsla(0, 100%, 0%, ${valor})`
}*/
function salvaCor() {
    if (!favoritas.includes(strokeColor)) {
        favoritas.push(strokeColor);
    } else {
        favoritas = favoritas.filter((item) => item !== strokeColor);
    }
    setTimeout(criaPaleta2(), 20);
}

setStrokeColor();

function switchEstroke() {
    let old = strokeColor
    strokeColor = estrokeColor
    mudaCor(strokeColor, true)
    estrokeColor = old
    iD("salvaCor2").style.backgroundColor = old
    if (rainbowAB){rainbow("ab",false)}
    
}
function mudaCor(valor, bloquinho = false) {
   
    if (bloquinho) {
        estrokeColor = strokeColor
        iD("salvaCor2").style.backgroundColor = estrokeColor
        
    }
    if (valor == "P") {
        hsla[0] = 0;
        hsla[1] = 100;
        hsla[2] = 0;
        strokeColor = `hsl(0,100%,0%,${hsla[3]})`;


        //   iD("mostraCor").style.color = strokeColor;

        //     iD("menu").style.visibility = "hidden";
    } else if (valor == "B") {
        hsla[0] = 0;
        hsla[1] = 100;
        hsla[2] = 100;
        strokeColor = `hsla(0,100%,100%,${hsla[3]})`;

        // iD("mostraCor").style.color = strokeColor;
        //     iD("menu").style.visibility = "hidden";
    } else {
        strokeColor = valor;
        toHslaObject(strokeColor);
        //     iD("menu").style.visibility = "hidden";
        // cursorColor();
    }
    // strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
    if (bloquinho) {
        hslaToRgba()
        changeColorMode()
      //  rainbowABcolors = [toHSLAObjectAB(strokeColor), toHSLAObjectAB(estrokeColor)]

      
    }
    if (rainbowAB == true){
        rainbow("ab",false)
    }
    // iD("mostraCor").style.backgroundColor = strokeColor;
    //iD("mostraCor2").style.backgroundColor =
    //   strokeColor;
    //iD("pintar").style.backgroundColor = strokeColor;
    iD("preenchercor").style.backgroundColor = strokeColor;


    setStrokeColor();
    criaPaleta();


}
const toHslaObject = (hslaStr) => {
    const [hue, saturation, lightness, alpha] = hslaStr
        .match(/[\d\.]+/g)
        .map(Number);
    /*   iD("H").value = hue;
       iD("S").value = saturation;
       iD("L").value = lightness;
       iD("A").value = alpha;*/
    hsla[0] = hue;
    hsla[1] = saturation;
    hsla[2] = lightness;
    hsla[3] = alpha;
    return { hue, saturation, lightness , alpha};


};
function criaPaleta() {
    let paleta = `<span onmousedown='mudaCor("B",true)'  class='bloquinho' ` +
        "style='background-color:hsla(0, 100%, 100%, " + hsla[3] * 4 + ")'> </span>";
    let hue100 = 100;
    for (i = 1; i < 15; i++) {
        hue100 -= Math.floor(100 / 14)
        let cor = hsla[0]
        paleta += `<span onmousedown='mudaCor("hsla(${cor},${hsla[1]}%,${hue100
            }%,${hsla[3]
            })",true)' class='bloquinho' style='background-color:hsla(${cor},${hsla[1]
            }%,${hue100}%,${hsla[3] * 4});'> </span>`;

    }

    iD("paleta").innerHTML = paleta;

}

function criaPaleta2() {
    let paleta = "";
    let quantas = favoritas.length;
    for (i = 0; i < quantas; i++) {
        paleta += `<span onmousedown='mudaCor("` + favoritas[i] + `",true)' class='bloquinho' style="background-color:` + favoritas[i] + `"> </span>`
    }
    iD("paleta2").innerHTML = paleta;
}
function criapaleta3() {
    let paleta3 = '';
    let c = 0;
    while (c < 7) {
        let cor = (c * 55)
        c++;
        paleta3 += `<span onmousedown='mudaCor("hsla(${cor},100%,50%,${hsla[3]
            })",true)' class='bloquinho' style='background-color:hsla(${cor},100%,50%,${hsla[3] * 4 + 0.2});'> </span>`;
        iD("paleta3").innerHTML = paleta3;
        iD("paleta3").innerHTML +=
            `<span onmousedown='mudaCor("hsla(0, 0%, 50%, ` + hsla[3] * 4 + `)",true)' class='bloquinho' ` +
            "style='background-color:hsla(0, 0%, 50%, " + hsla[3] * 4 + ")'> </span>";
        iD("paleta3").innerHTML +=
            `<span onmousedown='mudaCor("P",true)' class='bloquinho' ` +
            "style='background-color:hsla(0, 0%, 0%, " + hsla[3] * 4 + ")'> </span>";
    }
} criapaleta3()


function setStrokeColor() {
    strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
    let objs = [
        "salvaCor",
        "pintar",
        "cores",
        "picker",
        "preencher",
        "preenchercor"
    ];

    let quantos = objs.length;
    for (i = 0; i < quantos; i++) {
        iD(objs[i]).style.backgroundColor = strokeColor;
        iD(objs[i]).style.background = `linear-gradient(145deg, ${strokeColor},${strokeColor})`
    }
    iD("rainbowAB").style.background = `linear-gradient(145deg, ${strokeColor},${estrokeColor})`
    changeBrush()

}

criaPaleta();



const RGBAToHSLA = (r = rgba[0], g = rgba[1], b = rgba[2], a = rgba[3]) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    const H = Math.floor(60 * h < 0 ? 60 * h + 360 : 60 * h);
    const S = Math.floor(
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    );
    const L = Math.floor((100 * (2 * l - s)) / 2);
    const A = a;
    hsla[0] = H;
    hsla[1] = S;
    hsla[2] = L;
    hsla[3] = A;
    //hslaToRgba(H, S, L, A)

    return `hsla(${H},${S}%,${L}%,${A})`;

};

function hslaToRgba(h = hsla[0], s = hsla[1], l = hsla[2], A = hsla[3]) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    rgba[0] = redondo(255 * f(0))
    rgba[1] = redondo(255 * f(8))
    rgba[2] = redondo(255 * f(4))
    rgba[3] = A

}

function mudaRGB(q = 0, valor = 0) {
    rgba[q] = Number(valor);

    mudaCor(RGBAToHSLA(rgba[0], rgba[1], rgba[2], rgba[3]))
    strokeColor = `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
    setStrokeColor();
    criaPaleta();


}
function hexadecimal() {
    let hex = iD("hexadecimal").value
    if (hex[0] != "#") {
        hex = "#" + hex
    }
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)

    const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, "g"))

    const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16)

    const getAlphafloat = (a, alpha) => {
        if (typeof a !== "undefined") { return a / 255 }
        if ((typeof alpha != "number") || alpha < 0 || alpha > 1) {
            return 1
        }
        return alpha
    }

    const hexToRGBA = (hex, alpha) => {
        if (!isValidHex(hex)) {
            iD("checkhex").innerHTML = `<span class="close" onClick="hexadecimal()"></span>`;
            if (hex.length < 4) {
                Alert("must have min of 3 max of 9 letters and numbers including the #<br>( 0-9 and a-f )", 2)
            } else {
                Alert("Invalid Hexadecimal color<br>use 0-9 and a-f")
            }
        } else {

            const chunkSize = Math.floor((hex.length - 1) / 3)
            const hexArr = getChunksFromString(hex.slice(1), chunkSize)
            const [r, g, b, a] = hexArr.map(convertHexUnitTo256)
            iD("checkhex").innerHTML = `<span class="icon2small check" onClick="hexadecimal()"></span>`
            return mudaCor(RGBAToHSLA(r, g, b, getAlphafloat(a, alpha)))
        }
    }
    hexToRGBA(hex)

}

function hsl2hex(h = hsla[0], s = hsla[1], l = hsla[2], alpha = hsla[3]) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
        // convert to Hex and prefix "0" if needed
    };
    //alpha conversion
    alpha = Math.round(alpha * 255).toString(16).padStart(2, '0');

    return `#${f(0)}${f(8)}${f(4)}${alpha}`;
}


function changeColorMode(qual = colormode) {

    const control = iD("colorcontrol")

    if (qual == "hsla") {
        colormode = "hsla"
        control.innerHTML = ` <span class="icon2small hueicon"></span>
        <input type="${rangetipo}" id="H" name="cor" min="0" max="359" 
        oninput="mudaCorQ(0,this.value)"
            style="width: 100px;" value="${hsla[0]}"> <br>
        <span class="icon2small contrasticon"></span>
        <input type="${rangetipo}" id="S" name="cor" min="0" max="100" 
        oninput="mudaCorQ(1,this.value)"
            style="width: 100px;" value="${hsla[1]}"> <br>
        <span class="icon2small brightnessicon"></span>
        <input type="${rangetipo}" id="L" name="cor" min="0" max="100" 
        oninput="mudaCorQ(2,this.value)"
            style="width: 100px;" value="${hsla[2]}"> <br>
        <span class="icon2small alphaicon"></span>
        <input type="${rangetipo}" id="A" name="cor" min="0.01" max="1" 
        oninput="mudaCorQ(3,this.value)"
            style="width: 100px;" step="0.01" value="${hsla[3]}"><br>`


    } else if (qual == "rgba") {
        colormode = "rgba"

        control.innerHTML = ` <span class="bloquinho" style="background-color:hsla(0,100%,50%,4.2);">R</span>
        <input type="${rangetipo}" id="Rgba" name="cor" min="0" max="255" oninput="mudaRGB(0,this.value)"
            style="width: 100px;" value="${rgba[0]}"> <br>
        <span class="bloquinho" style="background-color:hsla(135,100%,50%,4.2);">G</span>
        <input type="${rangetipo}" id="rGba" name="cor" min="0" max="255" oninput="mudaRGB(1,this.value)"
            style="width: 100px;" value="${rgba[1]}"> <br>
        <span class="bloquinho" style="background-color:hsla(225,100%,50%,4.2);">B</span>
        <input type="${rangetipo}" id="rgBa" name="cor" min="0" max="255" oninput="mudaRGB(2,this.value)"
        style="width: 100px;" value="${rgba[2]}"> <br>
        <span class="icon2small alphaicon">A</span>
        <input type="${rangetipo}" id="rgbA" name="cor" min="0" max="1" oninput="mudaRGB(3,this.value)"
        style="width: 100px;" step="0.1" value="${rgba[3]}"><br>`



    }
    else if (qual == "hex") {
        colormode = "hex"
        hexa = hsl2hex()
        control.innerHTML = `   #hexadecimal
        <input type="text" id="hexadecimal" oninput="hexadecimal()" size="9"  maxlength="9" minlength="4"
            style="max-width: 80px; font-siz:18px" value="${hexa}"><span class="bot" id="checkhex"><span class="icon2small check" onClick="hexadecimal()"></span></span>`


    }
}

function glow() {
    isGlowing = !isGlowing
    if (isGlowing === true) {
        iD("glow").innerHTML = '<span class="icon2 minicheck"></span>'

        ctxF.globalCompositeOperation = 'lighter'
        //context.globalCompositeOperation = 'lighter'

        if (!nightmode) {
            night()
        }
        modeTo("cores")
    } else {
        ctxF.globalCompositeOperation = 'source-over'
        night()
        iD("glow").innerHTML = ''
    }
}


let rainbowAB = false
let rainbowABcolors
const toHSLAObjectAB = hslaStr => {
    const [hue, saturation, lightness, alpha] = hslaStr
    .match(/[\d\.]+/g)
    .map(Number);
    return { hue, saturation, lightness, alpha };
};

var colorAbigger = false
var satAbigger = false
var lightAbigger = false
var alphaAbigger = false
var colorABdist = 20

function abDistanceChange(value){colorABdist = value; updateAbBar (value)}
function updateAbBar (value){
        iD("abbar").setAttribute("style", `width:${value*3}px; background:linear-gradient(90deg, ${strokeColor},${estrokeColor});display: inline-block; height: 20px; border-radius: 10px;`);}
        
function rainbow(ab = false, bloquinho = true) {
    if (ab == "ab") {
        if (rainbowInk == true) {
            rainbowInk = false
           
        }
        if(bloquinho){rainbowAB = !rainbowAB}
        rainbowABcolors = [toHSLAObjectAB(strokeColor), toHSLAObjectAB(estrokeColor)]
        let difAB0 = rainbowABcolors[0].hue - rainbowABcolors[1].hue
        let difAB1 = rainbowABcolors[0].saturation - rainbowABcolors[1].saturation
        let difAB2 = rainbowABcolors[0].lightness - rainbowABcolors[1].lightness
        let difAB3  = rainbowABcolors[0].alpha - rainbowABcolors[1].alpha

        if (difAB0 > 180 || difAB0 < -180){rainbowABcolors[0].hue +=360}
        difAB0 = rainbowABcolors[0].hue - rainbowABcolors[1].hue
        if(difAB0 > 0){
            colorincrease = -difAB0/colorABdist
            colorAbigger = true
        }else{
            colorincrease = difAB0/colorABdist
            colorAbigger = false
        }

        if(difAB1>0 ){
            lightnessincrease = -difAB1/colorABdist
            lightAbigger = true
        }else{
            lightnessincrease = difAB1/colorABdist
            lightAbigger = false
        }

        if( difAB2> 0){
            satAbigger = true
            satincrease = -difAB2/colorABdist
        }else{satAbigger = false
            satincrease = difAB2/colorABdist
        }
        if(difAB3>0 ){
            alphaAbigger = true
            alphaincrease = -difAB3/colorABdist
        }else{
            alphaAbigger = false
            alphaincrease = difAB3/colorABdist
        }
        
        if (rainbowAB == true) {
            iD("rainbowAB").innerHTML = '<span class="icon2 minicheck">a-b</span>'

            Alert(`<span id="glow" title="glow" class="mais selected" onmousedown="glow()" style="background-image: url('/img/rainbowink.png'); color: #ffffff01;">.</span>` + alerts[language][28] + " a-b<br>" + alerts[language][7])
           iD("menuAB").classList.add("aparece")
           updateAbBar(colorABdist)

        } else {
            iD("rainbowAB").innerHTML = 'a-b'

            Alert(`<span id="glow" title="glow" class="mais selected" onmousedown="glow()" style="background-image: url('/img/rainbowink.png'); color: #ffffff01;">.</span>` + alerts[language][28] + " a-b<br>" + alerts[language][8])
        }

    } else {
        rainbowInk = !rainbowInk
        mudaCorQ(2, 50)
        mudaCorQ(1, 100)

        if (rainbowInk == true) {
            iD("rainbow").innerHTML = '<span class="icon2 minicheck"></span>'

            Alert(`<span id="glow" title="glow" class="mais selected" onmousedown="glow()" style="background-image: url('/img/rainbowink.png'); color: #ffffff01;">.</span>` + alerts[language][28] + "<br>" + alerts[language][7])
        } else {
            iD("rainbow").innerHTML = ''

            Alert(`<span id="glow" title="glow" class="mais selected" onmousedown="glow()" style="background-image: url('/img/rainbowink.png'); color: #ffffff01;">.</span>` + alerts[language][28] + "<br>" + alerts[language][8])
        }
    }
}