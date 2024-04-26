// Save | Download image from stackoverflow
// Convert canvas to image added to startup .getElementById("btn-download")

function salvaImagem() {
    Historia()
    let nome = iD("filename").value
    if (nome != null && nome != "") {
        var dataURL = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        //downloadImage(dataURL, 'my-canvas.jpeg');
        downloadImage(dataURL, `${nome}.png`);
    } else { Alert(alerts[language][18]) }
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

    if (lines[current].length > 1) {


        Historia()

        let lin = lines.length
        let len = lines[current].length
        if (len == 0) {
            Alert(alerts[language][0] + " " + alerts[language][19])
            return
        }
        if (iD("filename").value == "") {
            Alert(alerts[language][20])
            return
        }
        Alert(alerts[language][21] + "<br>" + alerts[language][17])

        let exp = document.createElement("canvas")
        exp.width = canvas.width * len
        exp.height = canvas.height * lin
        exp.id = "exp";
        exp.style.visibility = "hidden"
        exp.style.position = "absolute"
        iD("tela").appendChild(exp);
        cont = iD("exp").getContext("2d");
        for (l = 0; l < lin; l++) {
            len = lines[l].length
            for (i = 0; i < len; i++) {
                if (lines[l][i]) {
                    blob = dataURItoBlob(lines[l][i]);
                    let imagem = new Image();
                    imagem.src = URL.createObjectURL(blob);
                    let posx = i * canvas.width
                    let posy = l * canvas.height
                    imagem.onload = function () {
                        cont.globalCompositeOperation = "source-over"
                        cont.drawImage(imagem, 0, 0, imagem.width, imagem.height, posx, posy, imagem.width, imagem.height);
                        if (iD("unir").checked && background_anim == true) {
                            if (!iD("sobrepor").checked) {
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
            }
        }


        setTimeout(() => {
            let fname = iD("filename").value + lines[current].length
            var dataURL = iD("exp")
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            if (iD("seq").checked) {
                downloadImage(dataURL, `${fname}.png`);
            }
            spritao.src = dataURL
            spritao.onload = function () {

                window.top.postMessage({
                    id: "1",
                    img: dataURL
                }, '*')

                if (iD("gif").checked) {
                    exp.width = canvas.width
                    exp.height = canvas.height
                    let myanima = new Image()
                    myanima.src = spritao.src
                    myanima.onload = function () {

                        var encoder = new GIFEncoder();
                        encoder.setRepeat(0); //auto-loop
                        encoder.setDelay(1000 / fps);
                        console.log(encoder.start())

                        for (i = 0; i < lines[current].length; i++) {
                            if (isGlowing) {
                                cont.fillStyle = "rgb(10,10,10)"
                            } else {
                                cont.fillStyle = "rgb(255,255,255)" //GIF can't do transparent so do white
                            }
                            cont.fillRect(0, 0, canvas.width, canvas.height);
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
    else {
        salvaImagem()
        Alert("animação muito curta para exporatr um gif animado.")
    }
}


function confirmLink(url) {
    if (url == "apoio.html") {
        criaConteudo()
        apoio()
    } else {
        let canvasD = iD("canvas_div")
        if (canvasD) {
            let confirm = iD("confirm")
            if (!confirm) {
                let item = document.createElement("div")
                item.id = "confirm"
                item.classList.add("confirm")
                item.innerHTML = " Ir para a página:<br> <div  class='shadow'><a href='" + url + "'> " + url + " ✅</a> </div>"
                item.innerHTML += "<div onClick='cancela()' class='shadow'>cancela ❌</div>"
                document.body.appendChild(item)
            } else {
                cancela()
                confirmLink(url)
            }
        } else {
            window.open(url, '_self');
        }
    }
}
function cancela(oque = "confirm") {
    let confirm = iD(oque)
    confirm.parentElement.removeChild(confirm)
}
function criaConteudo() {
    let ap = iD("conteudo")
    if (!ap) {
        var conteudo = document.createElement("div")
        conteudo.id = "conteudo"
        conteudo.classList.add("day")
        conteudo.classList.add("fundobranco")
        document.body.appendChild(conteudo)
    } else {
        cancela("conteudo")
    }
}

function export2txt() {
    let fname = iD("filename").value + ".txt"
    changedBrush = false
    changeBrush()
    setTimeout(() => {
        let canvasInfo = {
            "width": canvas.width,
            "height": canvas.height
        }
        let brushes = Object.keys(newBrushes)
        let pacote = {
            "expBrush": [],
            "canvasInfo": canvasInfo,
            "newBrushes": brushes,
            "customBrushes": customBrushes,
            "animacao": lines[current],
            "clipboard": clipboard,
            "favoritas": favoritas,
            "preferences": { "pixelGood": pixelGood, "dinamicBrush": dinamicBrush }
        }

        let lenb = brushes.length
        Alert('salvando <span class="icon pintaricon"></span> x ' + lenb)
        let lenc = basicBrushes.length
        if (lenc > 9) {
            console.log("maior q 9")
            for (let i = 9; i < lenc; i++) {
                var prush = basicBrushes[i].src;
                console.log(prush)
                pacote["expBrush"].push(prush)
            }
        }
        console.dir(pacote)
        /*   for (i = 0; i < lenb; i++) {
            let bob = newBrushes[brushes[i]][0].src
           expBrush[brushes[i]] = bob
          }
        */

        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(pacote, null, 2)], {
            type: "text/plain"
        }));
        a.setAttribute("download", fname);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, 400)
}