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
        if (i < undoLevel - 1 && (comandos[i][0] == "s")) {
            posicao = i;
        }
    }
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
    if (undoLevel > 0) {
        undoLevel--
        comandosExec(posicao)
    } else {
        audio.play();
        redoTEnd()
    }
}




function memorySwap(GCO) {
    let len = comandos.length;
    if (len > 500) {
        swapImg = canvas.toDataURL('image/png');
        blobb = dataURItoBlob(swapImg)
        comando = ["s", "source-over", blobb, 0, 0, canvas.width, canvas.height];
        swaps.push(comando)
        swapImg = []
        blobb = []
        comando = []

        setTimeout(() => {
            comandos = []
            let lenb = swaps.length
            if (lenb > 8) { swaps.shift() }
            lenb = swaps.length
            for (i = 0; i < lenb; i++) {
                comandos.push(swaps[i]);
            }
            // clearBrushes()
        }, 40)
    }
}
