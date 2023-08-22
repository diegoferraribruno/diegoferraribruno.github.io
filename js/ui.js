let nightmode = false
let rangetipo = "range"
var consoleDiv = false

var isMobile = false;
(async () => {

    if ('userAgentData' in navigator) {
        const uaData = await navigator.userAgentData.getHighEntropyValues(['platform']);
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(uaData.platform);
    } else {
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile) {
        // Code for mobile devices
        console.log("Mobile device detected");
    } else {
        // Code for non-mobile devices
        console.log("Non-mobile device detected");
    }
})();

function Alert(text, time = 2.8) {
    let alert = iD("menualerta")
    alert.classList.add("aparece2")
    let aconteudo = iD("alertconteudo")
    aconteudo.innerHTML = text;
    setTimeout(() => { closeAlert() }, time * 1000)

}
function closeAlert() {
    iD("menualerta").classList.remove("aparece2")
}
function toggleConsole() {
    console.log("console")
    consoleDiv = !consoleDiv
    if (consoleDiv == true) {

        iD("console").classList.remove("esconde")
        iD("console2").classList.remove("esconde")
    } else {
        iD("console").classList.add("esconde")
        iD("console2").classList.add("esconde")
    }

}


function removeElement(id) {
    var elem = iD(id);
    if (elem) {
        return elem.parentNode.removeChild(elem);
    }
}

function toggleSelect(id) {
    removeClass("selected");
    let selected = iD(id)
    if (selected) {
        iD(id).classList.toggle("selected");
    }
}

function mostraMenu(id) {
    removeClass()
    let quem = iD("menu" + id);
    quem.classList.toggle("aparece");
}
function mostraSubMenu(id) {
    let quem = iD("menu" + id);
    quem.classList.toggle("aparece");
}

function removeClass(qual = "aparece") {
    //pega quem tem e remove
    Array.from(document.querySelectorAll(`.${qual}`)).forEach(function (
        el
    ) {
        el.classList.remove(`${qual}`);
    });
}

function hidecustom() {
    iD("custom").classList.toggle("esconde")
}


var previousOrientation = window.orientation;
var checkOrientation = function () {
    if (window.orientation !== previousOrientation) {
        previousOrientation = window.orientation;
        if (mode == "cam") {
            modeTo("cam"); setTimeout(() => {
                modeTo("cam")
            }, 10);
        }

        if (screen.width > screen.height) {

            iD("ferramentas").classList.add("horizontal");
            iD("ferramentas2").classList.add("horizontal2");
            iD("ferramentas3").classList.add("horizontal3");

            iD("menus").style.top = "110px";

        } else {
            iD("ferramentas").classList.remove("horizontal");
            iD("ferramentas2").classList.remove("horizontal2");
            iD("ferramentas3").classList.remove("horizontal3");

            iD("menus").style.top = "0px";

        }
        win.style.width = parseInt(window.innerWidth, 10) - 80 + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 20 + "px";

        let escala = (window.innerWidth - 8) / canvas.width
    }
};

function night() {
    let testarray = document.getElementsByClassName("fundobranco");
    let testarray2 = document.getElementsByClassName("fundo2");
    let filters = document.getElementsByClassName("filter");
    ///console.log("1111111", testarray, " 222222222222 ", testarray2)
    for (let i = 0; i < testarray.length; i++) {
        testarray[i].classList.toggle("dark")
        testarray[i].classList.toggle("light")


    } for (let i = 0; i < testarray2.length; i++) {
        testarray2[i].classList.toggle("fundo2night")

    }
    for (let i = 0; i < filters.length; i++) {
        filters[i].classList.toggle("filterlight")
        filters[i].classList.toggle("filterdark")


    }
    nightmode = !nightmode
    document.body.classList.toggle("dark")
    win.classList.toggle("fundo2night");
}


function Fundo(qual) {
    let alvo = canvasDiv
    if (iD("pagebg").checked == true) {
        alvo = iD("tela")
    }
    if (qual === "img") {
        var item = prompt(
            "endereço da imagem de fundo",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/352px-Alan_Turing_Aged_16.jpg"
        );
        if (item == null || item == "") {
            //alert("fundo do app removido");
            alvo.style.backgroundImage = `none`;

        } else {
            alvo.style.backgroundImage = `url(${item})`;
        }
    } else if (qual === "cam") {
        var item = prompt(
            "endereço da imagem de fundo",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/352px-Alan_Turing_Aged_16.jpg"
        );
        if (item == null || item == "") {
            Alert(alerts[language][23]);
            alvo.style.backgroundImage = `none`;
        } else {
            alvo.style.backgroundImage = `url(${item})`;
        }
    } else if (qual === "black") {
        alvo.style.backgroundColor = "hsla(0, 100%, 0%, 1)";
    } else if (qual === "white") {
        alvo.style.backgroundColor = "hsla(0, 100%, 100%, 1)";
    } else if (qual === "none") {
        alvo.style.backgroundImage = `none`;
        alvo.style.backgroundColor = "hsla(0, 100%, 100%, 0)";
    } else if (qual == "clipboard") {
        alvo.style.backgroundImage = `url(${clipboard[clipboard.length - 1]})`;
        Alert(alerts[language][31])
    } else {
        alvo.style.backgroundImage = `url(${qual})`;
    }

}

function pixel() {
    canvas.classList.toggle("pixel");
    canvasDiv.classList.toggle("pixel");
    canvasFront.classList.toggle("pixel");
    pixelGood = !pixelGood
    context.imageSmoothingEnabled = !context.imageSmoothingEnabled;
    ctxF.imageSmoothingEnabled = !ctxF.imageSmoothingEnabled
    ctxR.imageSmoothingEnabled = !ctxR.imageSmoothingEnabled
    canvasBack.ctx.imageSmoothingEnabled = !canvasBack.ctx.imageSmoothingEnabled

}

function resizeScreen() {
    desenhoDiv.style.width = window.innerWidth + "px";
    desenhoDiv.style.height = window.innerHeight + "px";
    if (screen.width > screen.height) {

        iD("ferramentas").classList.add("horizontal");
        iD("ferramentas2").classList.add("horizontal2");
        iD("ferramentas3").classList.add("horizontal3");

        // alert(`virou, ${screen.width} , ${screen.height}`)
        win.style.width = parseInt(window.innerWidth, 10) - 160 + "px";
        win.style.height = parseInt(window.innerHeight, 10) + "px";
        win.style.top = "0px"
        win.style.left = "80px"
        iD("menus").style.top = "0px";
    } else {
        iD("ferramentas").classList.remove("horizontal");
        iD("ferramentas2").classList.remove("horizontal2");
        iD("ferramentas3").classList.remove("horizontal3");

        win.style.width = parseInt(window.innerWidth, 10) + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 214 + "px";
        win.style.top = "120px"
        win.style.left = "0px"
        iD("menus").style.top = "110px";
    }

    canvasDiv.style.width = canvas.width + "px";
    canvasDiv.style.height = canvas.height + "px";
    win.scrollTop = 0;
    win.scrollLeft = 0;
    setTimeout(() => { autoScroll(); }, 40)

}
function autoScroll() {

    win.scrollTop = 0;
    win.scrollLeft = 0;

    scrollCanva(
        ultimoToque.x * zoomFactor - window.innerWidth / 4,
        ultimoToque.y * zoomFactor - window.innerHeight / 4
    )

}

function changeType() {
    if (rangetipo == 'number') {
        let tipo = 'number'
        rangetipo = 'range'
    } else {
        rangetipo = 'number'
    }
    changeColorMode()
}
