let selectionPaths = [];
let currentPath = [];
let isSelecting2 = false;
let selecionado = false;

function drawSelection() {
  selecionado = true;
  ctxF.clearRect(0, 0, canvas.width, canvas.height);

  for (const path of selectionPaths) {
    ctxF.beginPath();

    ctxF.setLineDash([2, 2]);
    ctxF.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) {
      ctxF.lineTo(path[i][0], path[i][1]);
    }
    ctxF.closePath();
    ctxF.fillStyle = "#ff000066";
    ctxF.fill();
  }

  if (currentPath.length > 1) {
    ctxF.beginPath();

    ctxF.setLineDash([2, 2]);
    ctxF.moveTo(currentPath[0][0], currentPath[0][1]);
    for (let i = 1; i < currentPath.length; i++) {
      ctxF.lineTo(currentPath[i][0], currentPath[i][1]);
    }
    ctxF.closePath();
    ctxF.fillStyle = "#ff000066";
    ctxF.strokeStyle = "#ffffff88";
    ctxF.lineWidth = 1;
    ctxF.fill();

    ctxF.stroke();
  }
}
function deleteSelection() {
  if (selecionado) {
    var minX, minY, maxX, maxY, width, height;
    context.globalCompositeOperation = "destination-out"; // Set global composite operation to destination-out
    if (iD("retangularselection").checked == false) {
      for (const path of selectionPaths) {
        context.beginPath();
        context.moveTo(path[0][0], path[0][1]);
        for (let i = 1; i < path.length; i++) {
          context.lineTo(path[i][0], path[i][1]);
        }
        context.closePath();
        context.fillStyle = "#000000"; // Set fill color with opacity

        context.fill(); // Fill the selection shape
      }
      context.globalCompositeOperation = "source-over";
    } else {
      minX = redondo(cropStart.x);
      minY = redondo(cropStart.y);
      maxX = redondo(cropEnd.x);
      maxY = redondo(cropEnd.y);
      if (minX > maxX) {
        minX = redondo(cropEnd.x);
        maxX = redondo(cropStart.x);
      }
      if (minY > maxY) {
        minY = redondo(cropEnd.y);
        maxY = redondo(cropStart.y);
      }

      width = maxX - minX;
      height = maxY - minY;

      context.fillStyle = "#000000";
      context.fillRect(minX, minY, width, height);
      context.globalCompositeOperation = "source-over";
    }
    ctxF.clearRect(0, 0, canvas.width, canvas.height);
    resetSelection();
  }
}
function copySelection(newfr = false) {
  if (selecionado) {
    var minX, minY, maxX, maxY, width, height;
    if (iD("retangularselection").checked == false) {
      minX = Math.min(...selectionPaths.flat().map(([x]) => x));
      minY = Math.min(...selectionPaths.flat().map(([, y]) => y));
      maxX = Math.max(...selectionPaths.flat().map(([x]) => x));
      maxY = Math.max(...selectionPaths.flat().map(([, y]) => y));
    } else {
      minX = redondo(cropStart.x);
      minY = redondo(cropStart.y);
      maxX = redondo(cropEnd.x);
      maxY = redondo(cropEnd.y);
      if (minX > maxX) {
        minX = redondo(cropEnd.x);
        maxX = redondo(cropStart.x);
      }
      if (minY > maxY) {
        minY = redondo(cropEnd.y);
        maxY = redondo(cropStart.y);
      }
    }

    width = maxX - minX;
    height = maxY - minY;

    canvasRender.width = width;
    canvasRender.height = height;
    ctxR.setTransform(1, 0, 0, 1, 0, 0);
    ctxR.clearRect(0, 0, width, height);
    if (width == -Infinity || width == 0 || height == 0) {
      width = canvas.width;
      height = canvas.height;
      minX = 0;
      minY = 0;
      maxX = width;
      maxY = height;
    }
    if (iD("retangularselection").checked) {
      canvasRender.width = width;
      canvasRender.height = height;
      desenhaRetangulo2(minX, minY, maxX, maxY);
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
        ctxR.fillStyle = "#000000";
        ctxR.fill();
      }
    }
    ctxR.globalCompositeOperation = "source-in";

    ctxR.drawImage(canvas, -minX, -minY, canvas.width, canvas.height);
    let image1 = canvasRender.toDataURL();

    image2.src = image1;

    clipboard.push(image1);
    image2.onload = function () {
      let rotationsize = Math.hypot(image2.width + image2.height) * 2;
      canvasRender.width = rotationsize;
      canvasRender.height = rotationsize;
      ctxR.setTransform(1, 0, 0, 1, 0, 0);
      ctxR.clearRect(0, 0, rotationsize, rotationsize);
      transformClip();
      updateClipboard();
    };

    if (newfr == "cut") {
      context.globalCompositeOperation = "destination-out"; // Set global composite operation to destination-out

      if (iD("retangularselection").checked == false) {
        for (const path of selectionPaths) {
          context.beginPath();
          context.moveTo(path[0][0], path[0][1]);
          for (let i = 1; i < path.length; i++) {
            context.lineTo(path[i][0], path[i][1]);
          }
          context.closePath();
          context.fillStyle = "#000000"; // Set fill color with opacity

          context.fill(); // Fill the selection shape
        }
        context.globalCompositeOperation = "source-over";
      } else {
        context.fillStyle = "#000000";
        context.fillRect(minX, minY, width, height);
        context.globalCompositeOperation = "source-over";
      }
    }

    resetSelection();
  } else {
    let image1 = canvas.toDataURL();

    image2.src = image1;
    //canvasRender.width = image2.width
    //canvasRender.height = image2.height
    //console.log(canvasRender.width, canvasRender.height)
    clipboard.push(image1);
    dataTransfer = "c" + (clipboard.length - 1);
    image2.onload = function () {
      let rotationsize = Math.hypot(image2.width + image2.height) * 2;
      canvasRender.width = rotationsize;
      canvasRender.height = rotationsize;
      transformClip();
      updateClipboard();

      if (newfr == "cut") {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, context.canvas.height);
      }
    };
  }
}
//resetSelection
function resetSelection() {
  selectionPaths = [];
  currentPath = [];
  selecionado = false;
}

function desenhaRetangulo2(
  x0 = cropStart.x,
  y0 = cropStart.y,
  x1 = cropEnd.x,
  y1 = cropEnd.y,
  cor = "#ff2200"
) {
  ctxR.clearRect(0, 0, canvasRender.width, canvasRender.height);
  ctxR.globalCompositeOperation = "source-over";
  ctxR.lineWidth = 0.5;
  ctxR.strokeStyle = cor;
  ctxR.fillStyle = "#000000";
  ctxR.rect(0, 0, canvas.width, canvas.height);
  ctxR.fill();
}
let clipboard = [];

function updateClipboard() {
  let content = "";
  let len = clipboard.length;
  let clips = iD("clipboard");
  clips.innerHTML = "";

  for (i = 0; i < len; i++) {
    let newthumb = new Image();
    newthumb.src = clipboard[i];
    newthumb.id = "c" + i;
    dataTransfer = newthumb.id;
    newthumb.classList.add("quadrofilme2", "cursorcopy");
    if (newthumb.id == dataTransfer) {
      newthumb.classList.add("wc");
    }
    newthumb.setAttribute("onclick", "changeImage2(" + i + ")");
    // newthumb.addEventListener("dragstart", dragStart);
    // newthumb.addEventListener("dragend", dragEnd);
    clips.appendChild(newthumb);
  }
}

function changeImage2(n) {
  dataTransfer = "c" + n;
  iD(dataTransfer).classList.add("wC");
  image2.src = clipboard[n];
  image2.onload = function () {
    transformClip();
    setTimeout(() => {
      updateClipboard();
    }, 10);
  };
  toPaste();
}

function toPaste(cola = false) {
  updateClipboard();
  transformClip();
  mode = "paste";
  if (cola == true) {
    drawTo();
    Historia();
  }
}

function clearClipboard() {
  let len = clipboard.length;
  let n;
  if (len > 0) {
    n = dataTransfer.replace(/^\D+/g, ""); // get number from string
    if (n < len) {
      clipboard.splice(n, 1);
      if (n == 0) {
        n = 1;
      }
      dataTransfer = "";
      updateClipboard();
      Alert(
        '<span class="icon clipboardicon"></span><span style="display:block; float:left; margin:4px">' +
          n +
          '<span class="icon lixeiraicon"></span>'
      );
    } else {
      clipboard = [];
      dataTransfer = "";
      updateClipboard();
    }
  } else {
    Alert(' <span class="icon clipboardicon"></span> = 0');
  }
}
