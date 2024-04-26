var game = null;
var com = "replace";
window.onmessage = function (e) {
  // inside the iframe this is broken!
  //  console.log(e)
  if (e.data.hasOwnProperty("img")) {
    game = e.data.id;
    com = e.data.com;
    {
      console.log("imag recebida", e.data.img);
      imagem = new Image();
      imagem.src = URL.createObjectURL(e.data.img);
      imagem.onload = function () {
        importSpriteRraomip(imagem, e.data.width, e.data.height);
      };
    }
  }
};

async function export_animBack(code = "playercom") {
  Historia();
  let lin = lines.length;
  let len = lines[current].length;
  Alert(alerts[language][21] + "<br>" + alerts[language][17]);

  let exp = document.createElement("canvas");
  exp.width = canvas.width * len;
  exp.height = canvas.height * lin;
  exp.id = "exp";
  exp.style.visibility = "hidden";
  exp.style.position = "absolute";
  iD("tela").appendChild(exp);
  cont = iD("exp").getContext("2d");
  for (l = 0; l < lin; l++) {
    len = lines[l].length;
    for (i = 0; i < len; i++) {
      if (lines[l][i]) {
        blob = dataURItoBlob(lines[l][i]);
        let imagem = new Image();
        imagem.src = URL.createObjectURL(blob);
        let posx = i * canvas.width;
        let posy = l * canvas.height;
        imagem.onload = function () {
          cont.globalCompositeOperation = "source-over";
          cont.drawImage(
            imagem,
            0,
            0,
            imagem.width,
            imagem.height,
            posx,
            posy,
            imagem.width,
            imagem.height
          );
          if (iD("unir").checked && background_anim == true) {
            if (!iD("sobrepor").checked) {
              cont.globalCompositeOperation = "destination-over";
              cont.drawImage(backgroundSprite, 0, 0, exp.width, exp.height);
            } else {
              cont.globalCompositeOperation = "source-under";
              cont.drawImage(backgroundSprite, 0, 0, exp.width, exp.height);
              cont.globalCompositeOperation = "destination-over";
            }
          }
        };
      }
    }
  }

  setTimeout(() => {
    let swapImg = iD("exp").toDataURL("image/png");
    blobb = dataURItoBlob(swapImg);
    window.top.postMessage(
      { com: code, w: canvas.width, h: canvas.height, id: game, img: blobb },
      "*"
    );
    console.log("exp", blobb);
    removeElement("exp");
  }, 1200 + 100 * len);
}

function createFloatingIcon() {
  var floatingIcon = document.createElement("div");
  floatingIcon.id = "floatingIcon";
  floatingIcon.innerHTML = "🎮";
  floatingIcon.onclick = toggleButtons;
  document.body.appendChild(floatingIcon);
}

// Function to create the floating buttons container
function createFloatingButtons() {
  var floatingButtons = document.createElement("div");
  floatingButtons.id = "floatingButtons";

  var buttons = [
    {
      text: "New Layer Spritesheet ",
      onclick: export_animBack.bind(null, "newLayer"),
    },
    {
      text: "Replace Current Layer image",
      onclick: export_animBack.bind(null, "replace"),
    },
    {
      text: "Create New Player",
      onclick: export_animBack.bind(null, "newplayer"),
    },
    {
      text: "Replace Player Image",
      onclick: export_animBack.bind(null, "player"),
    },
    {
      text: "Current Frame to Sprite-sheet Editor",
      onclick: export_toEditor.bind(null, "singleframe"),
    },
    {
      text: "Current Animation to Sprite-sheet Editor",
      onclick: export_toEditor.bind(null, "timeline"),
    },
    {
      text: "All animations frames to Sprite-sheet Editor",
      onclick: export_toEditor.bind(null, "spritesheet"),
    },
  ];

  buttons.forEach(function (buttonInfo) {
    var button = document.createElement("button");
    button.className = "button";
    button.textContent = buttonInfo.text;
    button.onclick = buttonInfo.onclick;
    floatingButtons.appendChild(button);
  });

  document.body.appendChild(floatingButtons);
  toggleButtons();
}

// Function to toggle the display of the buttons container
function toggleButtons() {
  var buttonsContainer = document.getElementById("floatingButtons");
  buttonsContainer.style.display =
    buttonsContainer.style.display === "none" ? "block" : "none";
}

// Functions for each button action (same as before)

// Call functions to create the elements
createFloatingIcon();
createFloatingButtons();

function export_toEditor(quem) {
  Historia();
  let lin = lines.length;
  let len = lines[current].length;
  Alert(alerts[language][21] + "<br>" + quem + "to Game");
  if (quem == "spritesheet") {
    for (let l = 0; l < lin; l++) {
      len = lines[l].length;
      for (let i = 0; i < len; i++) {
        if (lines[l][i]) {
          let blob = dataURItoBlob(lines[l][i]);
          window.top.postMessage({ com: "toEditor", id: game, img: blob }, "*");
          console.log(quem + " sent to editor");
        }
      }
    }
  } else if (quem == "timeline") {
    for (let i = 0; i < len; i++) {
      if (lines[current][i]) {
        let blob = dataURItoBlob(lines[current][i]);
        window.top.postMessage({ com: "toEditor", id: game, img: blob }, "*");
        console.log(quem + " sent to editor");
      }
    }
  } else if (quem == "singleframe") {
    let blob = dataURItoBlob(lines[current][workingframe]);
    window.top.postMessage({ com: "toEditor", id: game, img: blob }, "*");
    console.log(quem + " sent to editor");
  }
}

function importSpriteRraomip(imagem, w, h) {
  if (iD("loadBackgroundAnimation").checked) {
    background_anim = true;
    backgroundSprite.src = URL.createObjectURL(e.img);
    backgroundSprite.onload = function () {
      changeBackGroundAnimation(workingframe);
    };
  } else {
    let quadros = 1;
    let largura = w;
    let altura = h;
    let auto = iD("autodetectar").checked;

    let lay;
    if (auto === false) {
      //quadros = iD("fnumber").value
      tamanho(largura, altura);

      quadros = imagem.width / largura;
      lay = imagem.height / altura;
      for (l = 0; l < lay - 1; l++) {
        //we already have layer 0 so no need to add all
        lines.push([]);
        historia.push([]);
      }
      // tamanho(largura, altura)
    } else {
      quadros = imagem.width / imagem.height;
      lay = imagem.height / altura;
      // tamanho(imagem.height, imagem.height)
    }
    let startline = current;
    for (l = 0; l < lay; l++) {
      //changeLine(l + startline)
      current = l + startline;
      for (i = 0; i < quadros; i++) {
        workingframe = i;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(
          imagem,
          i * canvas.width,
          l * canvas.height,
          canvas.width,
          canvas.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        let swapImg = canvas.toDataURL("image/png");
        blobb = dataURItoBlob(swapImg);
        lines[current][i] = swapImg;
        historia[current][i] = [];
        historia[current][i].push(swapImg);
      }
    }
    setTimeout(() => {
      changeLine(0);
      adicionaQuadro();
      removeClass();
      iD("contador").innerHTML = current + "-" + workingframe;
    }, 500);
  }
}
