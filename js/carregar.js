var input = iD('input');
input.addEventListener('change', handleFiles);
var input2 = iD('input2');
input2.addEventListener('change', readURL, true);
var imagem = new Image;
var backgroundSprite = new Image;

function handleFiles(e) {

    imagem = new Image;
    imagem.src = URL.createObjectURL(e.target.files[0]);
    imagem.onload = function () {
        {
            let ajustar = iD("ajustar").checked
            if (ajustar === true) {
                tamanho(imagem.width, imagem.height)
            } else if (imagem.width > canvas.width) {
                let proporcao = canvas.width / imagem.width
                imagem.height = imagem.height * proporcao
                imagem.width = imagem.width * proporcao
                let centerx = canvas.width / 2 - imagem.width / 2
                let centery = canvas.height / 2 - imagem.height / 2
            }

            desenha("img", globalComposite, imagem, 0, 0, imagem.width, imagem.height)
            swapImg = canvas.toDataURL('image/png');
            animacao[workingframe] = swapImg
            adicionaQuadro()
        }
    }
}
function readURL() {
    var file = iD("input2").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        var image = new Image();

        image.src = reader.result;

        image.onload = function () {
            if (iD("pagebg").checked) {
                iD("tela").style.backgroundImage = "url(" + reader.result + ")";
            } else {

                if (image.width > canvas.width) {
                    let proporcao = canvas.width / image.width
                    image.height = image.height * proporcao
                    image.width = image.width * proporcao
                }
                canvasDiv.style.backgroundImage = "url(" + reader.result + ")";
                canvasDiv.style.backgroundSize = `${image.width}px ${image.height}px`
            }
        };
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
    }
}

function importSprite(e) {
    imagem = new Image;
    imagem.src = URL.createObjectURL(e.target.files[0]);
    imagem.onload = function () {
        if (iD("loadBackgroundAnimation").checked) {
            background_anim = true
            backgroundSprite.src = URL.createObjectURL(e.target.files[0]);
            backgroundSprite.onload = function () {
                changeBackGroundAnimation(workingframe)
            }
        } else {
            let quadros = imagem.width / canvas.width
            let largura = iD("larguraS").value
            let altura = iD("alturaS").value
            let auto = iD("autodetectar").checked
            if (auto === false) {
                quadros = iD("fnumber").value
                tamanho(largura, altura)
            }
            for (i = 0; i < quadros; i++) {
                workingframe = i
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.drawImage(imagem, i * canvas.width, 0, imagem.width, imagem.height, 0, 0, imagem.width, imagem.height);
                let swapImg = canvas.toDataURL('image/png');
                blobb = dataURItoBlob(swapImg)
                animacao[i] = swapImg
                comandosb[i] = []
                // changeBrush()
                comandosb[i].push(["f", "source-over", swapImg, 0, 0, canvas.width, canvas.height])
                comandos = [["f", "source-over", swapImg, 0, 0, canvas.width, canvas.height]]



            }
            setTimeout(() => {
                adicionaQuadro()
                //changeFrame(workingframe - 1);
                removeClass()
                removeElement("carregando")
                iD("contador").innerHTML = workingframe;
            }, 500)
        }
    }
}


var projeto
let prush = new Image();
let basic = []
var openFile = function (event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
        removeClass()
        newBrushes = {}
        projeto = JSON.parse(reader.result)

        tamanho(projeto["canvasInfo"]["width"], projeto["canvasInfo"]["height"])

        //brushes
        basic = projeto["expBrush"]
        let lend = basic.length
        for (i = 0; i < lend; i++) {
            console.log(basic[i])
            //context.putImageData(basic[i], 0, 0)
            prush.src = basic[i]
            let numero = basicBrushes.length + i
            prush.id = "br" + numero
            prush.setAttribute("onmousedown", "selectBrush(" + numero + ")")
            prush.setAttribute("style", "width:30px; height:32px; margin-top:2px;")
            iD("pinceis3").appendChild(prush)
            basicBrushes.push[prush]
        }

        let brushNames = projeto["newBrushes"]
        let lenb = brushNames.length
        console.log(brushNames)
        removeElement("carregando")
        let len = projeto["comandosb"].length

        Alert(alerts[language][22] + "<br>" + alerts[language][17] + "<br>🖌️ x " + lenb + " <br> 🖼️  x " + len, len * 2)
        for (i = 0; i < lenb; i++) {
            let brushs = brushNames[i].split("-")
            console.log(brushs)
            // let brushs = projeto["newBrushes"][brushNames[i]]
            //let blob = dataURItoBlob(projeto["expBrush"][brushNames[i]])
            /*
                        let newNewBrush = document.createElement("img");
                        console.log("img", projeto["expBrush"][brushNames[i]])
                        newNewBrush.src = projeto["expBrush"][brushNames[i]]
                        //   console.log("brush:" + brush[1])
                        let propert = [
                            newNewBrush,
                            brushs[1],
                            brushs[2],
                            brushs[3],
                        ]
                        lastbrush = brush[1]
                        strokeWidth = brush[2]
                        strokeColor = brush[3]
                        newBrushes[brushNames[i]] = propert
                        */

            //selectedBasicBrush = brushs[1]
            changedBrush = false;
            let cor = brushs[2]
            let tam = brushs[1]
            lastbrush = brushs[0]
            brushName = "" + lastbrush + "-" + tam + "-" + cor
            brushMode = 1
            // brushCanva.crossOrigin = "anonymous"
            brushCanva.height = tam
            brushCanva.width = tam
            brushCtx.fillStyle = cor;
            brushCtx.fillRect(0, 0, tam, tam)
            brushCtx.globalCompositeOperation = 'destination-in'
            brushCtx.drawImage(basicBrushes[lastbrush], 0, 0, tam, tam)
            brushCtx.globalCompositeOperation = 'destination-over'
            let newNewBrush = new Image();
            newNewBrush.src = brushCanva.toDataURL("image/png");
            newBrush.src = newNewBrush.src
            newBrushes[brushName] = [newNewBrush, lastbrush, tam, cor]
            let favbrush = newBrushes[brushName][0]
            favbrush.style.maxHeight = "32px";

            let favBrushButton = document.createElement("div")
            favBrushButton.id = brushName
            favBrushButton.style.height = "30px";
            favBrushButton.style.width = "30px";
            favBrushButton.style.lineHeight = "30px";
            favBrushButton.style.marginRight = "4px";
            favBrushButton.style.verticalAlign = "top"
            favBrushButton.style.display = "inline-block"

            favBrushButton.setAttribute("onmousedown", "favBrush('" + brushName + "')")
            favBrushButton.appendChild(favbrush)
            if (strokeWidth > 10) {
                favBrushButton.innerHTML += "<span class='favbrush'>" + strokeWidth + "</span>"
            } else {
                favBrushButton.innerHTML += "<span style='display:block; position:relative; margin-top:-40px; margin-right:auto; margin-left:auto; text-aling:center; color: #000000cc; font-size:0.75em;'>" + strokeWidth + "</span>"
            }
            iD("pinceis2").prepend(favBrushButton)




            // setTimeout(() => setStrokeColor(brush[3]), 120)
            //setTimeout(() => setStrokeSize(brush[2]), 80)
        }
        setTimeout(() => {
            //comandosb
            let len = projeto["comandosb"].length
            comandosb = []
            for (i = 0; i < len; i++) {
                workingframe = i
                comandos = []
                comandos = projeto["comandosb"][i]
                comandosb[i] = comandos
                animacao[workingframe] = canvas.toDataURL('image/png')
                //save_frame()
                // adicionaQuadro()

            }
            if (i > 1) {

                for (i = 0; i <= len; i++) {
                    setTimeout(() => {
                        //   favBrush(newBrushes[0].key)
                        next_frame()
                    }, 400 * (i + 2))
                }
            } else {
                setTimeout(() => {
                    comandosExec()
                    setTimeout(() => { save_frame() }, 200)
                }, 600)
            }
            //changeBrush()
        }, 400 * (lenb + 2))
        /*   setTimeout(() => {
               favBrush('1-6-hsla(0,0%,0%,1)');
           }
               , 1000 * (lenb + 3))*/
    }
    reader.readAsText(input.files[0]);
};

/* GEAVE UP FOR NOW WITH MULIFILE. NEED TO REMAKE EVERYTHING FROM SCRATCH.

document.getElementById('input').addEventListener('change', function () {
    _readFileDataUrl(this, function (err, files) {
        if (err) { return }
        console.log(files)//contains base64 encoded string array holding the image data 
        let len = files.length
        for (i = 0; i < len; i++) {

            var imagem = new Image()
            imagem.src = files[i]
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            desenha("f", globalComposite, files[i], 0, 0, imagem.width, imagem.height)
            context.drawImage(imagem, canvas.width, 0, imagem.width, imagem.height, 0, 0, imagem.width, imagem.height);
            swapImg = canvas.toDataURL('image/png');
            blobb = dataURItoBlob(swapImg)
            animacao[workingframe] = swapImg
            workingframe++
            //                new_frame()

            //document.body.appendChild(imagem)

            setTimeout(() => {
                adicionaQuadro()
                changeFrame(workingframe - 1);
                removeClass()
                iD("contador").innerHTML = workingframe;
            }, 200 * i)
        }
    });
    removeElement("carregando")
});
var _readFileDataUrl = function (input, callback) {
    var len = input.files.length, _files = [], res = [];
    var readFile = function (filePos) {
        if (!filePos) {
            callback(false, res);
        } else {
            var reader = new FileReader();
            reader.onload = function (e) {
                res.push(e.target.result);
                readFile(_files.shift());
            };
            reader.readAsDataURL(filePos);
        }
    };
    for (var x = 0; x < len; x++) {
        _files.push(input.files[x]);
    }
    readFile(_files.shift());
}
*/