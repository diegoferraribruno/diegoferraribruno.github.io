let nightmode = false

function Alert(text) {
    let alert = document.getElementById("menualerta")
    alert.classList.add("aparece2")
    let aconteudo = document.getElementById("alertconteudo")
    aconteudo.innerHTML = text;
    setTimeout(() => { closeAlert() }, 2000)

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
    let testarray2 = document.getElementsByClassName("light");
    for (let i = 0; i < testarray.length; i++) {
        testarray[i].classList.toggle("dark")
    } for (let i = 0; i < testarray2.length; i++) {
        testarray2[i].classList.toggle("dark")
    }
    nightmode = !nightmode
    if (nightmode) {
        Fundo2('black')
    } else {
        Fundo2("white")
    }

}

