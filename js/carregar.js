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
function readURL2() {
    var item = prompt(
        "endereço da imagem ",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/352px-Alan_Turing_Aged_16.jpg"
    );
    if (item == null || item == "") {
        Alert(":(");

    } else {
        imagem = new Image;
        imagem.crossOrigin = "anonymous"
        imagem.src = item;
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
                Historia()
            }
        }
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
            let quadros = 1
            let largura = iD("larguraS").value
            let altura = iD("alturaS").value
            let auto = iD("autodetectar").checked
            if (auto === false) {
                quadros = iD("fnumber").value
                tamanho(largura, altura)
            } else {
                quadros = imagem.width / imagem.height
                tamanho(imagem.height, imagem.height)
            }
            for (i = 0; i < quadros; i++) {
                workingframe = i
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.drawImage(imagem, i * canvas.width, 0, imagem.width, imagem.height, 0, 0, imagem.width, imagem.height);
                let swapImg = canvas.toDataURL('image/png');
                blobb = dataURItoBlob(swapImg)
                animacao[i] = swapImg
                historia[i] = []
                historia[i].push(swapImg)

            }
            setTimeout(() => {
                adicionaQuadro()
                removeClass()
                iD("carregando").style.display = "none"
                iD("contador").innerHTML = workingframe;
            }, 500)
        }
    }
}
function importSpriteUrl() {
    var item = prompt(
        "endereço da imagem ",
        "https://diegoferraribruno.github.io/img/icon2.png"
    );
    if (item == null || item == "") {
        Alert(":(");

    } else {
        imagem = new Image;
        imagem.crossOrigin = "anonymous"
        imagem.src = item;
        imagem.onload = function () {
            if (iD("loadBackgroundAnimation").checked) {
                background_anim = true
                backgroundSprite.src = item;
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
                } else {
                    tamanho(imagem.height, imagem.height)
                    quadros = imagem.width / imagem.height

                }
                for (i = 0; i < quadros; i++) {
                    workingframe = i
                    context.setTransform(1, 0, 0, 1, 0, 0);
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                    context.drawImage(imagem, i * canvas.width, 0, imagem.width, imagem.height, 0, 0, imagem.width, imagem.height);
                    let swapImg = canvas.toDataURL('image/png');
                    blobb = dataURItoBlob(swapImg)
                    animacao[i] = swapImg
                    historia[i] = []
                    historia[i].push(swapImg)
                }
                setTimeout(() => {
                    adicionaQuadro()
                    removeClass()
                    iD("carregando").style.display = "none"
                    iD("contador").innerHTML = workingframe;
                }, 500)
            }
        }
    }
}

function mostracarregando() {
    removeClass()
    iD("carregando").style.display = "grid"
}
var projeto
let customBr = []
var numero
async function recreateCustomBrush() {
    customBr = projeto["expBrush"]
    let lend = customBr.length
    for (i = 0; i < lend; i++) {
        numero = basicBrushes.length + i
       // console.log(customBr[i])
       // console.log(numero, "numero")
        //context.putImageData(basic[i], 0, 0)
        let prush = new Image();
        prush.src = customBr[i]
        prush.onload = function () {
            brushCanva.width = prush.width
            brushCanva.height = prush.height
            brushCtx.drawImage(prush, 0, 0)


            let newNewBrush2 = new Image();
            //newNewBrush2.crossOrigin = "anonymous"
            newNewBrush2.src = brushCanva.toDataURL("image/png");
            newNewBrush2.onload = function () {


                newNewBrush2.id = "br" + numero
                newNewBrush2.setAttribute("onmousedown", "selectBrush(" + numero + ")")
                newNewBrush2.setAttribute("style", "width:30px; height:32px; margin-top:2px;")
                iD("pinceis3").appendChild(newNewBrush2)
                basicBrushes.push(newNewBrush2)

            }
        }
    }
}
var openFile = function (event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = async function () {

        removeClass()
        newBrushes = {}
        projeto = JSON.parse(reader.result)

        tamanho(projeto["canvasInfo"]["width"], projeto["canvasInfo"]["height"])
        let len = projeto["animacao"].length
        animacao = []
        for (i = 0; i < len; i++) {
            workingframe = i
            animacao[i] = []
            let newimg = projeto["animacao"][i]
            animacao[i].push(newimg)
            historia[i] = []
            historia[i].push(newimg)


        }
        adicionaQuadro()
        setTimeout(() => scrollFilme(len - 1), 1000)
        let lenc = projeto["clipboard"].length
        clipboard = []
        for (i = 0; i < lenc; i++) {
            let newimg = projeto["clipboard"][i]
            clipboard.push(newimg)
        }
        updateClipboard()
        let lenf = projeto["favoritas"].length
        favoritas = []
        for (i = 0; i < lenf; i++) {
            favoritas.push(projeto["favoritas"][i])
        }
        criaPaleta2()
        changeFrame(workingframe)
        //brushes
        await recreateCustomBrush()
        let lenb = projeto["newBrushes"].length
        setTimeout(() => {
            //console.log(projeto, "projeto okkkkk")
            let brushNames = projeto["newBrushes"]
            let lenb = brushNames.length
           // console.log(brushNames)
            iD("carregando").style.display = "none"
            let len = projeto["animacao"].length
            iD("pinceis2").innerHTML = ""
            Alert(alerts[language][22] + "<br>" + alerts[language][17] + "<br>" + lenb + '<span class="icon pintaricon"></span> x <br>' + len + "  <span class='icon2 frameicon'></span>  x ", len * 2)
            for (i = 0; i < lenb; i++) {
                let brushs = brushNames[i].split("-")
              //  console.log(brushs)

                changedBrush = false;
                strokeColor = parseInt(brushs[3])
                strokeHeight = parseInt(brush[2])
                strokeWidth = parseInt(brushs[1])
                lastbrush = parseInt(brushs[0])
                brushName = brushNames[i]
                brushCanva.crossOrigin = "anonymous"
                brushCanva.height = strokeHeight
                brushCanva.width = strokeWidth
                brushCtx.fillStyle = strokeColor;
                brushCtx.fillRect(0, 0, strokeWidth, strokeHeight)
                brushCtx.globalCompositeOperation = 'destination-in'
                brushCtx.drawImage(basicBrushes[lastbrush], 0, 0, strokeWidth, strokeHeight)
                brushCtx.globalCompositeOperation = 'destination-over'
                let newNewBrush = new Image();
                newNewBrush.src = brushCanva.toDataURL("image/png");
                newBrush.src = newNewBrush.src
                newBrushes[brushName] = [newNewBrush, lastbrush, strokeWidth, strokeHeight, strokeColor]
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
        }, 300)
        /* setTimeout(() => {
             //comandosb
             let len = projeto["animacao"].length
             animacao = []
             for (i = 0; i < len; i++) {
                 //workingframe = i
                 animacao[i] = []
                 let newimg = projeto["animacao"][i]
                 animacao[i].push(newimg)
                // animacao[workingframe] = canvas.toDataURL('image/png')
                 //saveFrame()
                  adicionaQuadro()
 
             }
             if (i > 1) {
 
                 for (i = 0; i <= len; i++) {
                     setTimeout(() => {
                         //   favBrush(newBrushes[0].key)
                         nextFrame()
                     }, 400 * (i + 2))
                 }
             } else {
                 setTimeout(() => {
                  //   comandosExec()
                     setTimeout(() => { Historia() }, 200)
                 }, 600)
             }
             //changeBrush()
 
             if (
 
                 projeto["preferences"]["pixelGood"] == false
             ) {
                 pixelGood = false
             } else {
                 pixelGood = true
             }
 
             if (
                 projeto["preferences"]["dinamicBrush"] == true) {
                 dinamicBrush = true
             } else {
                 dinamicBrush = false
                 iD("dinamicBrush").checked = false
             }
 
         }, 400 * (lenb + 2))*/
        /*   setTimeout(() => {
               favBrush('1-6-hsla(0,0%,0%,1)');
           }
               , 1000 * (lenb + 3))*/
    }
    reader.readAsText(input.files[0]);
};