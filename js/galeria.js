var foto = iD("foto")
var userId = "01"
var fotoN = 0


var fotos = [
    {
        legenda: "<a href='http://diegoferraribruno.github.io/desenho.html' target='new'>App do diego</a>",
        imagem: "desenho0.png"
    },
    { legenda: "Ravi e Diego", imagem: "desenho2.png", stars: 0 },
    { legenda: "Diego, Diego, Diego e...", imagem: "desenho3.png" },
    { legenda: "android feito no androis", imagem: "desenho4.png" },
    //{ legenda: "Arte feita com antigo pincel", imagem: "desenho5.png" },
    //{ legenda: "Arte feita no app", imagem: "desenho6.png" },
    //{ legenda: "Arte feita no app", imagem: "desenho7.png" },
    { legenda: "Arte feita no app", imagem: "desenho8.png" },
    { legenda: "montagem usando o app", imagem: "desenho9.png" },
    { legenda: "Che o gato", imagem: "desenho10.png" },
    { legenda: "macaco digital", imagem: "desenho11.png" },
    { legenda: "paisagem?", imagem: "desenho12.png" },
    { legenda: "O que diz minha avó:", imagem: "desenho13.png" },
    { legenda: "projeto de pincel", imagem: "desenho14.png" },
    { legenda: "projeto de pincel", imagem: "desenho15.png" },
    { legenda: "projeto de pincel", imagem: "desenho16.png" },
    { legenda: "ladrilho infinito final", imagem: "desenho17.png" },


]
//fotodafe.setAttribute("onclick", "trocaFoto()")

function trocaFoto(qual = 0) { //define o valor padrao para a variavel 'qual' = 0
    foto.setAttribute("src", "./galeria/" + userId + "/" + fotos[qual].imagem);
    iD("legenda").innerHTML = "<b>" + fotos[qual].legenda + "</b>";
}

// para a Galeria criamos uma função que cria elemento img,
// definimos a fonte (src) e a adiciona ao div galeria

function criaImagem(x) {
    let img = document.createElement("img")
    img.src = "./galeria/" + userId + "/" + fotos[x].imagem
    img.setAttribute("onclick", "trocaFoto(" + x + ")")
    img.classList.add("mini")
    img.classList.add("shadow")
    //largura maxima da img
    iD("galeria").appendChild(img)
}

// como fazer um loop para cada foto com a palavra for:
let quantasfotos = fotos.length
function criaGaleria() {
    for (i = 0; i < quantasfotos; i++) {
        criaImagem(i)
    }
}

criaGaleria() //executa a função

function scrollg(x) {
    if (x > 0) {
        fotoN += 1
    } else {
        fotoN -= 1
    }
    if (fotoN < 0) {
        fotoN = 0
    } else if (fotoN >= quantasfotos) {
        fotoN = quantasfotos - 1
    }
    if (fotoN < quantasfotos && fotoN >= 0) {
        trocaFoto(fotoN)
        iD("galeria").scrollLeft += x
    }
}