var comandos = [];
var comandosb = [];
let desfazendo = false;
let refazendo = false;
var counter;
var counterU;
let swapT
let blobb
let swaps = new Array()
let posicoes = new Array(0)
var executing = false
var undoLevel = 0

function undoing() {
    if (desfazendo == true && refazendo == false) {
        undo()
    }
    if (refazendo == true) {
        redo()
    }

}

function undoT() {
    desfazendo = true
    undoing()
}
function undoTEnd() {
    desfazendo = false
}
function undo() {
    let len = comandos.length;
    let posicao = 1
    for (i = 0; i < len; i++) {
        if (i < undoLevel - 1 && comandos[i][0] == "s") {
            posicao = i;
        }
    }
    if (posicao < 0) { posicao = 0 }
    if (undoLevel < len - 1) {
        undoLevel++
        comandosExec(posicao)
    } else {
        audio.play();
        undoTEnd()
    }
}
function redoTEnd() {
    refazendo = false
}
function redoT() {
    refazendo = true
    undoing()
}
function redo() {
    let len = comandos.length;
    let posicao = 0
    for (i = 0; i < len; i++) {
        if (i < undoLevel && comandos[i][0] == "s") {
            posicao = i;
        }
    }
    if (undoLevel > 1) {
        undoLevel--
        comandosExec(posicao)
    } else {
        audio.play();
        redoTEnd()
    }
}

const empty = canvas.toDataURL('image/png');



function memorySwap() {
    let len = comandos.length;
    let quantos = 0
    if (len > 1) {
        for (let c = 0; c < len; c++) {
            if (comandos[c][0] == "s") {
                swaps.push(comandos[c])
                quantos++
                if (quantos > 20) { swaps.shift() }
            }
        }

        let CBS = []
        for (let c = 0; c < len; c++) {
            if (comandos[c][0] == "CB") {
                CBS = comandos[c]
            }
        }
        swaps.push(CBS)
        swapImg = canvas.toDataURL('image/png');
        comando = ["s", "source-over", swapImg, 0, 0, canvas.width, canvas.height];
        swaps.push(comando)
        comandos = []
        comando = ["s", "source-over", empty, 0, 0, canvas.width, canvas.height];
        comandos.push(comando)
        lenb = swaps.length
        for (i = 0; i < lenb; i++) {
            comandos.push(swaps[i]);
        }
        swaps = []
        comandosParaComandosb()
        // clearBrushes()
    }
}


function comandosParaComandosb() {

    let len = comandos.length - undoLevel
    comandosb[workingframe] = []
    for (i = 0; i < len; i++) {
        comandosb[workingframe].push(comandos[i])
    }
}
function comandosbParaComandos() {
    let len = comandosb[workingframe].length
    comandos = []
    for (i = 0; i < len; i++) {
        comandos.push(comandosb[workingframe][i])
    }

}