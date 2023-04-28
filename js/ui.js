let nightmode = false

function Alert(text, time = 2) {
    let alert = document.getElementById("menualerta")
    alert.classList.add("aparece2")
    let aconteudo = document.getElementById("alertconteudo")
    aconteudo.innerHTML = text;
    setTimeout(() => { closeAlert() }, time * 1000)

}
function closeAlert() {
    document.getElementById("menualerta").classList.remove("aparece2")
}

function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

function toggleSelect(id) {
    removeClass("selected");
    document.getElementById(id).classList.toggle("selected");
}

function mostraMenu(id) {
    removeClass()
    let quem = document.getElementById("menu" + id);
    quem.classList.toggle("aparece");
}
function mostraSubMenu(id) {
    let quem = document.getElementById("menu" + id);
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
    document.getElementById("custom").classList.toggle("esconde")
}


//function handleOrientation() {
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

            document.getElementById("ferramentas").classList.add("horizontal");
            document.getElementById("ferramentas2").classList.add("horizontal2");
            document.getElementById("menus").style.top = "100px";

            // alert(`virou, ${screen.width} , ${screen.height}`)

        } else {
            document.getElementById("ferramentas").classList.remove("horizontal");
            document.getElementById("ferramentas2").classList.remove("horizontal2");
            document.getElementById("menus").style.top = "0px";

        }
        win.style.width = parseInt(window.innerWidth, 10) - 80 + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 20 + "px";

        let escala = (window.innerWidth - 8) / canvas.width

        document.getElementById("player").style.height = H * escala + "px"
        document.getElementById("player").style.width = W * escala + "px"
        document.getElementById("player").style.left = "4px"
        document.getElementById("player").style.top = "4px"

        // orientation changed, do your magic here
    }
};

function night() {
    let testarray = document.getElementsByClassName("fundobranco");
    let testarray2 = document.getElementsByClassName("fundo2");
    let filters = document.getElementsByClassName("filter");
    console.log("1111111", testarray, " 222222222222 ", testarray2)
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
    for (i = 0; i < 5; i++) {
        document.getElementById("bplayer" + i).classList.toggle("fundo2night")
        document.getElementById("bplayer" + i).classList.toggle("fundo2")
    }


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
            Alert("fundo do app removido");
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

}
pixel()


function resizeScreen() {
    desenhoDiv.style.width = window.innerWidth + "px";
    desenhoDiv.style.height = window.innerHeight + "px";
    if (screen.width > screen.height) {

        document.getElementById("ferramentas").classList.add("horizontal");
        document.getElementById("ferramentas2").classList.add("horizontal2");
        // alert(`virou, ${screen.width} , ${screen.height}`)
        win.style.width = parseInt(window.innerWidth, 10) - 80 + "px";
        win.style.height = parseInt(window.innerHeight, 10) + "px";
        document.getElementById("menus").style.top = "0px";
    } else {
        document.getElementById("ferramentas").classList.remove("horizontal");
        document.getElementById("ferramentas2").classList.remove("horizontal2");
        win.style.width = parseInt(window.innerWidth, 10) + "px";
        win.style.height = parseInt(window.innerHeight, 10) - 132 + "px";
        document.getElementById("menus").style.top = "90px";
    }
    canvasDiv.style.width = canvas.width + "px";
    canvasDiv.style.height = canvas.height + "px";
    if (document.getElementById("player").style.height > window.innerWidth) {
        let escala = (window.innerWidth - 8) / canvas.width

        document.getElementById("player").style.height = canvas.height * escala + "px"
        document.getElementById("player").style.width = canvas.width * escala + "px"
        document.getElementById("player").style.left = "4px"
        document.getElementById("player").style.top = "4px"
    }
    setTimeout(() => comandosExec(), 40)
}