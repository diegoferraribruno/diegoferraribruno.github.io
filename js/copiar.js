let selectionPaths = [];
let currentPath = [];
let isSelecting2 = false;

function drawSelection() {
  canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
  //canvasFront.ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Replace 'image' with your actual image variable

  for (const path of selectionPaths) {
    canvasFront.ctx.beginPath();

    canvasFront.ctx.setLineDash([2, 2]);
    canvasFront.ctx.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) {
      canvasFront.ctx.lineTo(path[i][0], path[i][1]);
    }
    canvasFront.ctx.closePath();
    canvasFront.ctx.fillStyle = '#ff000066'; // Set fill color with opacity
    canvasFront.ctx.fill(); // Fill the selection shape
  }

  if (currentPath.length > 1) {
    canvasFront.ctx.beginPath();

    canvasFront.ctx.setLineDash([2, 2]);
    canvasFront.ctx.moveTo(currentPath[0][0], currentPath[0][1]);
    for (let i = 1; i < currentPath.length; i++) {
      canvasFront.ctx.lineTo(currentPath[i][0], currentPath[i][1]);
    }
    canvasFront.ctx.closePath();
    canvasFront.ctx.fillStyle = '#ff000066'; // Set fill color with opacity
    canvasFront.ctx.strokeStyle = '#ffffff88'; // Set stroke color with opacity
    canvasFront.ctx.lineWidth = 1;
    canvasFront.ctx.fill(); // Fill the current selection shape

    canvasFront.ctx.stroke()
  }
}

function copySelection(newfr = false) {
  var minX, minY, maxX, maxY, width, height
  if (iD("retangularselection").checked == false) {
    minX = Math.min(...selectionPaths.flat().map(([x]) => x));
    minY = Math.min(...selectionPaths.flat().map(([, y]) => y));
    maxX = Math.max(...selectionPaths.flat().map(([x]) => x));
    maxY = Math.max(...selectionPaths.flat().map(([, y]) => y));
  } else {
    minX = cropStart.x
    minY = cropStart.y
    maxX = cropEnd.x
    maxY = cropEnd.y
    if (minX > maxX) {
      minX = cropEnd.x
      maxX = cropStart.x
    }
    if (minY > maxY) {
      minY = cropEnd.y
      maxY = cropStart.y

    }
  }

  width = maxX - minX;
  height = maxY - minY;

  canvasRender.width = width;
  canvasRender.height = height;
  ctxR.setTransform(1, 0, 0, 1, 0, 0);
  ctxR.clearRect(0, 0, context.canvas.width, context.canvas.height);

  if (iD("retangularselection").checked) {
    canvasRender.width = width;
    canvasRender.height = height;
    desenhaRetangulo2()


  } else {
    canvasRender.width = width;
    canvasRender.height = height;
    for (const path of selectionPaths) {
      ctxR.beginPath();
      ctxR.moveTo(path[0][0] - minX, path[0][1] - minY);
      for (let i = 1; i < path.length; i++) {
        ctxR.lineTo(path[i][0] - minX, path[i][1] - minY);
      }
      ctxR.closePath();
    }

    ctxR.fillStyle = '#000000';
    ctxR.fill(); // Fill the selection shape
  }
  ctxR.globalCompositeOperation = 'source-in'; // Set global composite operation to source-in
  ctxR.drawImage(canvas, -minX, -minY, canvas.width, canvas.height);
  let image1 = canvasRender.toDataURL()

  image2.src = image1
  //canvasRender.width = image2.width
  //canvasRender.height = image2.height
  //console.log(canvasRender.width, canvasRender.height)
  image2.onload = function () {
    clipboard.push(image1)
    canvasRender.width = canvas.width
    canvasRender.height = canvas.height
    ctxR.setTransform(1, 0, 0, 1, 0, 0);
    ctxR.clearRect(0, 0, context.canvas.width, context.canvas.height);

    ctxR.drawImage(image2, canvasRender.width / 2 - image2.width / 2, canvasRender.height / 2 - image2.height / 2)

  }
  if (newfr) {

    //new frame
    undoLevel = 0
    save_frame()
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    workingframe++
    swapImg = canvasRender.toDataURL('image/png');
    animacao.splice(workingframe, 0, swapImg);
    let work = []
    comandosb.splice(workingframe, 0, work);
    canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasFront.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    comandos = []
    comando = ["s", "source-over", swapImg, minX, minY, canvasFront.width, canvasFront.height];
    comandos.push(comando)
    comandosParaComandosb()
    changeBrush()
    changeFrame(workingframe)
    iD("contador").innerHTML = workingframe
  }
  //reset canvas size
}

// Cut the selection by copying and clearing the canvas
function cutSelection() {
  //copySelection(); precisa Dividir em cutstart cutmove e cutend
  var minX, minY, maxX, maxY, width, height
  if (iD("retangularselection").checked == false) {
    minX = Math.min(...selectionPaths.flat().map(([x]) => x));
    minY = Math.min(...selectionPaths.flat().map(([, y]) => y));
    maxX = Math.max(...selectionPaths.flat().map(([x]) => x));
    maxY = Math.max(...selectionPaths.flat().map(([, y]) => y));
  } else {
    minX = cropStart.x
    minY = cropStart.y
    maxX = cropEnd.x
    maxY = cropEnd.y
    if (minX > maxX) {
      minX = cropEnd.x
      maxX = cropStart.x
    }
    if (minY > maxY) {
      minY = cropEnd.y
      maxY = cropStart.y

    }
  }

  width = maxX - minX;
  height = maxY - minY;

  canvasFront.width = width;
  canvasFront.height = height;

  if (iD("retangularselection").checked) {
    canvasFront.width = width;
    canvasFront.height = height;
    desenhaRetangulo2()


  } else {
    canvasFront.width = width;
    canvasFront.height = height;
    for (const path of selectionPaths) {
      canvasFront.ctx.beginPath();
      canvasFront.ctx.moveTo(path[0][0] - minX, path[0][1] - minY);
      for (let i = 1; i < path.length; i++) {
        canvasFront.ctx.lineTo(path[i][0] - minX, path[i][1] - minY);
      }
      canvasFront.ctx.closePath();
    }

    canvasFront.ctx.fillStyle = '#000000';
    canvasFront.ctx.fill(); // Fill the selection shape
  }
  canvasFront.ctx.globalCompositeOperation = 'source-in'; // Set global composite operation to source-in
  canvasFront.ctx.drawImage(canvas, -minX, -minY, canvas.width, canvas.height);
  let image1 = canvasFront.toDataURL()
  image2.src = image1
  image2.onload = function () {

    /*  canvasRender.width = image2.width
      canvasRender.height = image2.height*/
    //rotateFront(0)
    ctxR.drawImage(image2, canvasRender.width / 2 - image2.width / 2, canvasRender.height / 2 - image2.height / 2)
    clipboard.push(image1)
  }
  // copy selection


  //context.clearRect(0, 0, canvas.width, canvas.height);
  // make a hole
  context.globalCompositeOperation = 'destination-out'; // Set global composite operation to destination-out

  for (const path of selectionPaths) {
    context.beginPath();
    context.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) {
      context.lineTo(path[i][0], path[i][1]);
    }
    context.closePath();
    context.fillStyle = '#000000'; // Set fill color with opacity

    context.fill(); // Fill the selection shape
  }
  context.globalCompositeOperation = "source-over"
  canvasFront.width = canvas.width;
  canvasFront.height = canvas.height;
  //  context.drawImage(image2, minX, minY, canvasFront.width, canvasFront.height); // Redraw the image
}


function desenhaRetangulo2(x0 = cropStart.x, y0 = cropStart.y, x1 = cropEnd.x, y1 = cropEnd.y, cor = "#ff2200") {

  ctxR.clearRect(0, 0, canvas.width, canvas.height);
  ctxR.globalCompositeOperation = "source-over"
  ctxR.lineWidth = 0.5
  ctxR.strokeStyle = cor;
  ctxR.beginPath();
  ctxR.rect(
    0, 0, canvas.width,
    canvas.height,
  );

  ctxR.fill();


}
let clipboard = []
function updateClipboard() {
  let content = ""
  let len = clipboard.length
  let clips = iD("clipboard")
  clips.innerHTML = ""
  for (i = 0; i < len; i++) {
    let newthumb = new Image()
    newthumb.src = clipboard[i]
    newthumb.id = i
    newthumb.classList.add("quadrofilme", "light")
    newthumb.setAttribute("onclick", "changeImage2(" + i + ")")
    clips.appendChild(newthumb)
  }
}

function changeImage2(n) {
  image2.src = clipboard[n]
  ctxR.drawImage(image2, canvasRender.width / 2 - image2.width / 2, canvasRender.height / 2 - image2.height / 2)
}