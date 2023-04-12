// Save | Download image from stackoverflow
// Convert canvas to image added to startup .getElementById("btn-download")

function salvaImagem() {
    let nome = document.getElementById("filename").value
    if (nome != null && nome != "") {
        var dataURL = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        //downloadImage(dataURL, 'my-canvas.jpeg');
        downloadImage(dataURL, `${nome}.png`);
    } else { Alert("Favor Preencher o nome do arquivo") }
}

//function downloadImage(data, filename = 'untitled.jpeg') {
function downloadImage(data, filename = "untitled.png") {
    var a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { confirmLink("apoio.html") }, 1200);
    //
}
var cont
var spritao = new Image();

async function export_anim() {
    let len = animacao.length
    if (len == 0) {
        Alert("Adicione ➕ quadros a sua animação antes de exportar.")
        return
    }
    if (document.getElementById("filenameS").value == "") {
        Alert("escreva um titulo para seu arquivo de imagem .png")
        return
    }
    Alert("Seu arquivo esta sendo preparado.<br> Por favor, aguarde...")

    let exp = document.createElement("canvas")
    exp.width = canvas.width * len
    exp.height = canvas.height
    exp.id = "exp";
    exp.style.visibility = "hidden"
    exp.style.position = "absolute"
    document.getElementById("tela").appendChild(exp);
    cont = document.getElementById("exp").getContext("2d");

    for (i = 0; i < len; i++) {
        blob = dataURItoBlob(animacao[i]);
        let imagem = new Image();
        imagem.src = URL.createObjectURL(blob);
        let pos = i * canvas.width
        imagem.onload = function () {
            cont.globalCompositeOperation = "source-over"
            cont.drawImage(imagem, 0, 0, imagem.width, imagem.height, pos, 0, imagem.width, imagem.height);
            if (document.getElementById("unir").checked && background_anim == true) {
                if (!document.getElementById("sobrepor").checked) {
                    cont.globalCompositeOperation = "destination-over"
                    cont.drawImage(backgroundSprite, 0, 0, exp.width, exp.height)

                } else {
                    cont.globalCompositeOperation = "source-under"
                    cont.drawImage(backgroundSprite, 0, 0, exp.width, exp.height)
                    cont.globalCompositeOperation = "destination-over"
                }

            }
        }
    }


    setTimeout(() => {
        let fname = document.getElementById("filenameS").value
        var dataURL = document.getElementById("exp")
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        if (document.getElementById("seq").checked) {
            downloadImage(dataURL, `${fname}.png`);
        }
        spritao.src = dataURL
        spritao.onload = function () {

            if (document.getElementById("gif").checked) {
                exp.width = canvas.width
                exp.height = canvas.height
                let myanima = new Image()
                myanima.src = spritao.src
                myanima.onload = function () {

                    var encoder = new GIFEncoder();
                    encoder.setRepeat(0); //auto-loop
                    encoder.setDelay(1000 / fps);
                    console.log(encoder.start())

                    for (i = 0; i < animacao.length; i++) {
                        cont.fillStyle = "rgb(255,255,255)"
                        cont.fillRect(0, 0, canvas.width, canvas.height); //GIF can't do transparent so do white
                        cont.drawImage(myanima, - canvas.width * i, 0, myanima.width, myanima.height)
                        encoder.addFrame(cont);
                    }
                    encoder.finish();
                    encoder.download(fname + ".gif");
                }

            }
            removeElement("exp")

        }
    }, 1200 + (100 * len))
}