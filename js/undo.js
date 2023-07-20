
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
var historia = [[],[]]

function drawTo(GCO = context.globalCompositeOperation,
     source = canvasFront,
     target = context,
     x0 = 0, 
     y0 = 0, 
     width = canvasFront.width, 
     height = canvasFront.height)
    { target.globalCompositeOperation = GCO
        target.drawImage(source,x0,y0,width,height)
}

function goback(pos){
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var imageFrame = new Image;
    imageFrame.src = historia[workingframe][pos]
    drawTo(context.globalCompositeOperation,
        imageFrame,
        context,
        0, 
        0, 
        canvas.width, 
        canvas.height)
    
}
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
    let len = historia[workingframe].length;
    if (undoLevel < len - 1) {
        undoLevel++
        goback(len-undoLevel-1)
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
    let len = historia[workingframe].length;
    if (undoLevel > 0) {
        undoLevel--
        goback(len-undoLevel-1)
    } else {
        audio.play();
        redoTEnd()
    }
}