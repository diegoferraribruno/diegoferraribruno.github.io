let nightmode = false

function Alert(text, time = 2) {
    let alert = iD("menualerta")
    alert.classList.add("aparece2")
    let aconteudo = iD("alertconteudo")
    aconteudo.innerHTML = text;
    setTimeout(() => { closeAlert() }, time * 1000)

}
function closeAlert() {
    iD("menualerta").classList.remove("aparece2")
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

            iD("menus").style.top = "100px";

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
    if (qual === "img") {
        var item = prompt(
            "endereço da imagem de fundo",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/352px-Alan_Turing_Aged_16.jpg"
        );
        if (item == null || item == "") {
            //alert("fundo do app removido");
            canvasDiv.style.backgroundImage = `none`;
        } else {
            canvasDiv.style.backgroundImage = `url(${item})`;
        }
    } else if (qual === "cam") {
        var item = prompt(
            "endereço da imagem de fundo",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/352px-Alan_Turing_Aged_16.jpg"
        );
        if (item == null || item == "") {
            Alert(alerts[language][23]);
            canvasDiv.style.backgroundImage = `none`;
        } else {
            canvasDiv.style.backgroundImage = `url(${item})`;
        }
    } else if (qual === "black") {
        canvasDiv.style.backgroundColor = "hsla(0, 100%, 0%, 1)";
    } else if (qual === "white") {
        canvasDiv.style.backgroundColor = "hsla(0, 100%, 100%, 1)";
    } else if (qual === "none") {
        canvasDiv.style.backgroundImage = `none`;
        canvasDiv.style.backgroundColor = "hsla(0, 100%, 100%, 0)";
    } else {
        canvasDiv.style.backgroundImage = `url(${qual})`;
    }
}

function pixel() {
    canvas.classList.toggle("pixel");
    canvasDiv.classList.toggle("pixel");
    pixelGood = !pixelGood
    context.imageSmoothingEnabled = !context.imageSmoothingEnabled;
    canvasFront.ctx.imageSmoothingEnabled = !canvasFront.ctx.imageSmoothingEnabled
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
        iD("menus").style.top = "0px";
    } else {
        iD("ferramentas").classList.remove("horizontal");
        iD("ferramentas2").classList.remove("horizontal2");
        iD("ferramentas3").classList.remove("horizontal3");

        win.style.width = parseInt(window.innerWidth, 10) + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 170 + "px";
        iD("menus").style.top = "90px";
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
        ultimoToque.x * zoomFactor - window.innerWidth / 2,
        ultimoToque.y * zoomFactor - window.innerHeight / 2
    )

}