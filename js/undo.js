
let desfazendo = false;
let refazendo = false;
var counter;
var counterU;
let swapT
let blobb
let swaps = new Array()
let posicoes = new Array(0)
var executing = false
var undoLevel = -1
var historia = [[], []]
var historiaLimite = 8

function drawTo(GCO = context.globalCompositeOperation,
    source = canvasFront,
    target = context,
    x0 = 0,
    y0 = 0,
    width = canvasFront.width,
    height = canvasFront.height) {
    target.globalCompositeOperation = GCO
    target.drawImage(source, x0, y0, width, height)
}

function goback(pos = undoLevel) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var imageFrame = new Image;
    imageFrame.src = historia[workingframe][pos]
    let oldGCO = context.globalCompositeOperation
    setTimeout(() => drawTo("source-over",
        imageFrame,
        context,
        0,
        0,
        imageFrame.width,
        imageFrame.height)
        , 10)
    setTimeout(() => changeGCO(oldGCO), 40)

}

function undo() {
    let lenH = historia[workingframe].length;
    undoLevel--
    if (undoLevel < 0) {
        undoLevel = lenH - 2
    }
    goback(undoLevel)

}
function redo() {
    let lenH = historia[workingframe].length;
    undoLevel++
    if (undoLevel > lenH - 1) {
        undoLevel = lenH - 1
    }
    goback(undoLevel)

}

function undoT() {
    desfazendo = true
    undoing()
}
function undoTEnd() {
    desfazendo = false
}
/*function undo() {
    let len = historia[workingframe].length;
    if (undoLevel < len - 1) {
        undoLevel++
        pos = len - undoLevel - 1
        goback(pos)
    } else {
        audio.play();
        undoTEnd()
    }
}*/
function redoTEnd() {
    refazendo = false
}
function redoT() {
    refazendo = true
    undoing()
}



function undoing() {
    if (desfazendo == true && refazendo == false) {
        undo()
    }
    if (refazendo == true && desfazendo == false) {
        redo()
    }
}

/*function redo() {
    let len = historia[workingframe].length;
    if (undoLevel > 0) {
        undoLevel--
        goback(len - undoLevel - 1)
    } else {
        audio.play();
        redoTEnd()
    }
}
*/
function Historia(imagem = canvas.toDataURL('image/png')) {
    if (!historia[workingframe]) historia.push([])
    let len = historia[workingframe].length
    if (len > historiaLimite) historia[workingframe].shift()
    if (String(historia[workingframe][len - 1]) != String(imagem)) { historia[workingframe].push(imagem) }
    animacao[workingframe] = imagem
    setTimeout(() => {
        adicionaQuadro();
    }, 50)

}
function historiaLimiteChange(value) {
    historiaLimite = value
    Alert(alerts[language][27] + historiaLimite)
}