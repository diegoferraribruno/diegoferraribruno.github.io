
var input = document.getElementById('input');
input.addEventListener('change', handleFiles);
var input2 = document.getElementById('input2');
input2.addEventListener('change', readURL, true);
var imagem = new Image;
var backgroundSprite = new Image;

function handleFiles(e) {

    imagem = new Image;
    imagem.src = URL.createObjectURL(e.target.files[0]);
    imagem.onload = function () {
        {
            let ajustar = document.getElementById("ajustar").checked
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
        }
    }
}
function readURL() {
    var file = document.getElementById("input2").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        var image = new Image();

        image.src = reader.result;

        image.onload = function () {
            if (image.width > canvas.width) {
                let proporcao = canvas.width / image.width
                image.height = image.height * proporcao
                image.width = image.width * proporcao
            }
            canvasDiv.style.backgroundImage = "url(" + reader.result + ")";
            canvasDiv.style.backgroundSize = `${image.width}px ${image.height}px`
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
        if (document.getElementById("loadBackgroundAnimation").checked) {
            background_anim = true
            backgroundSprite.src = URL.createObjectURL(e.target.files[0]);
            backgroundSprite.onload = function () {
                changeBackGroundAnimation(workingframe)
            }
        } else {
            let quadros = imagem.width / canvas.width
            let largura = document.getElementById("larguraS").value
            let altura = document.getElementById("alturaS").value
            let auto = document.getElementById("autodetectar").checked
            if (auto === false) {
                quadros = document.getElementById("fnumber").value
                tamanho(largura, altura)
            }
            for (i = 0; i < quadros; i++) {
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.drawImage(imagem, i * canvas.width, 0, imagem.width, imagem.height, 0, 0, imagem.width, imagem.height);
                swapImg = canvas.toDataURL('image/png');
                blobb = dataURItoBlob(swapImg)
                animacao[workingframe] = swapImg
                workingframe++

            }
            setTimeout(() => {
                changeFrame(workingframe - 1);
                removeClass()
                document.getElementById("contador").innerHTML = workingframe;
            }, 200)
        }
    }
}