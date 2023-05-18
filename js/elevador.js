let id = "player"
var user = {
    id: "player",
    name: "",
    serverPlayerPos: { x: 180, y: 660 },
    left: 172,
    top: 710,
    width: 32,
    height: 10,
    face: 0,
    hue: 0
}
var gamestate = "pause"
var users = { "player": user }
var game = iD("game")
const gameSize = { width: 1920 * 2, height: 1080 * 2 }
const src = iD("manche");
var container = iD("container")
var send = false
var seguemouse = false
let clientX;
let clientY;
let drag = false;
let keys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    w: false,
    a: false,
    s: false,
    d: false
}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
let mode = "move"
let oldpos = { x: 0, y: 0 }
let player = {
    top: 710,
    left: 172,
    width: 32,
    height: 20,
    hidden: true
}
var speed = 4
container.style.width = screen.width + "px";
container.style.height = screen.height + "px";

src.addEventListener('touchstart', (e) => {
    document.documentElement.style.overflow = 'hidden';
    // Cache the client X/Y coordinates
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
}, false);
src.addEventListener('onmousepress', (e) => {
    document.documentElement.style.overflow = 'hidden';
    // Cache the client X/Y coordinates
    clientX = e.clientX;
    clientY = e.clientY;
}, false);

src.addEventListener('touchmove', (e) => {
    let deltaX;
    let deltaY;
    // Compute the change in X and Y coordinates.
    // The first touch point in the changedTouches
    // list is the touch point that was just removed from the surface.
    deltaX = e.changedTouches[0].clientX - clientX;
    deltaY = e.changedTouches[0].clientY - clientY;
    src.style.left = 45 + deltaX + "px";
    src.style.top = 45 + deltaY + "px";
    if (deltaY < -6) { keys.ArrowUp = true; send = true; } else { keys.ArrowUp = false; };
    if (deltaY > 6) { keys.ArrowDown = true; send = true; } else { keys.ArrowDown = false };
    if (deltaX > 6) { keys.ArrowRight = true; send = true; } else { keys.ArrowRight = false };
    if (deltaX < -6) { keys.ArrowLeft = true; send = true; } else { keys.ArrowLeft = false };

    e.preventDefault();// < testar iphone.
    //iD('manche').innerHTML = "X: "+Math.floor(clientX)+" Y:"+Math.floor(clientY)+"<br />dX: "+Math.floor(deltaX)+" dY: "+Math.floor(deltaY)
    // Process the data…
}, false);

function mouse_down(e) {

    clientX = e.clientX;
    clientY = e.clientY;
    drag = true;
    let t = e.target.id
    if (t == "head-player") {
        seguemouse = true
    }
    console.log(t)
}

function mouse_up(event) {
    for (i in keys) { keys[i] = false }
    drag = false;
    src.style.left = "30px";
    src.style.top = "0px";
    clientX = 0;
    clientY = 0;
    send = true;
    let t = event.target.id
    if (t == 'game' && seguemouse == false) {

        clickmove(event.layerX - player.width / 2, event.layerY - 14)
    }
    if (seguemouse == true) { seguemouse = false }


}

function mouse_position(e) {
    if (seguemouse == true) {
        clickmove(e.clientX, e.clientY)
    }
    if (drag == true) {
        let deltaX;
        let deltaY;
        deltaX = e.clientX - clientX;
        deltaY = e.clientY - clientY;
        src.style.left = 30 + deltaX + "px";
        src.style.top = deltaY + "px";
        if (deltaY < -4) { keys.ArrowUp = true; send = true; } else { keys.ArrowUp = false };
        if (deltaY > 4) { keys.ArrowDown = true; send = true; } else { keys.ArrowDown = false };
        if (deltaX > 4) { keys.ArrowRight = true; send = true; } else { keys.ArrowRight = false };
        if (deltaX < -4) { keys.ArrowLeft = true; send = true; } else { keys.ArrowLeft = false };
    }
}

document.addEventListener('touchend', function (e) {
    for (i in keys) { keys[i] = false }
    send = true;
    src.style.left = "30px";
    src.style.top = "0px";
    document.documentElement.style.overflow = 'auto';

}

);
document.addEventListener('mousedown', function (e) {
    e.preventDefault()
    let t = e.target.id
    if (t == "head-player") {
        seguemouse = true
    }
    // console.log(t)

}

);



function keyDown(e) {
    let mini = e.key
    if (mini.length < 2) {
        mini = mini.toLowerCase()
    }
    if (mini in keys && mode == "move") {
        keys[mini] = true;
        send = true;
        e.preventDefault();
    }
}
function keyUp(e) {
    let mini = e.key
    if (mini.length < 2) {
        mini = mini.toLowerCase()
    }
    if (mini == "t" && mode == "move" && user.name != "") {
        modeTo("chatButton")
    }
    if (mini in keys && mode == "move") {
        e.preventDefault();
        keys[mini] = false;
        send = true;
    }
}
///---- The LOOP---////


//CAMERA

var segue = 1
var windowx = 100
var windowy = window.innerHeight
/*setTimeout(() => {

    container.style.width = windowx + "px";
    container.style.height = windowy + "px";
})*/
iD('joypad').style.top = (windowy - 160) + "px";
iD('joypad').style.left = (windowx / 2 - 100) + "px";
//iD('chat').style.width = windowx + "px";

/*
window.addEventListener('resize', function (event) {
    windowx = window.innerWidth
    windowy = window.innerHeight
    container.style.width = screen.width + "px";
    container.style.height = screen.height + "px";
    iD('joypad').style.top = (windowy - 160) + "px";
});*/

//ANIMATION
var frame = 0
var corpo = iD("corpo-" + id);

setInterval(function () {
    for (i in users) {
        let corpo = iD("corpo-" + users[i].id);
        let position = frame * 32;
        //corpo.style.background: 'url("standing-32.png") '${position}'px 0px';
        corpo.style.backgroundPosition = `-${position}px 0px`;
    }
    frame++;
    if (frame > 3) {
        frame = 0
    }
},
    200);
setInterval(movePlayer, 20)
//let flip = 1;

let automove = false
var TARGET = { x: 0, y: 0 }

function clickmove(x, y) {
    TARGET.x = x
    TARGET.y = y
}
function autoMove() {
    if (keys.ArrowDown == true && player.top >= TARGET.y && TARGET.y != 0) {

        keys.ArrowDown = false
        TARGET.y = 0
    }
    if (keys.ArrowUp == true && player.top <= TARGET.y && TARGET.y != 0) {
        TARGET.y = 0
        keys.ArrowUp = false
    }
    if (keys.ArrowLeft == true && player.left <= TARGET.x && TARGET.x != 0) {

        keys.ArrowLeft = false
        TARGET.x = 0
    }
    if (keys.ArrowRight == true && player.left >= TARGET.x && TARGET.x != 0) {
        TARGET.x = 0
        keys.ArrowRight = false
    }
    if (player.top < TARGET.y && TARGET.y != 0) {
        keys.ArrowDown = true
    }
    if (player.top > TARGET.y && TARGET.y != 0) {
        keys.ArrowUp = true
    }
    if (player.left < TARGET.x && TARGET.x != 0) {
        keys.ArrowRight = true
    }
    if (player.left > TARGET.x && TARGET.x != 0) {
        keys.ArrowLeft = true
    }
    //console.log(player.top, y)
    /* if (player.top <= y + 10 * 2 && player.top >= y - 10 * 2) {
         keys.ArrowDown = false
         keys.ArrowUp = false
         clearInterval(automove)
     }*/

    /*if (player.left < x - speed && player.left > x + speed) {
        keys.ArrowLeft = false
        keys.ArrowRight = false
        clearInterval(automove)
    }*/

}
let playerImg = {
    "danca": "",
    "andar": "",
    "anda": ""
}

function movePlayer() {
    //CAMERA

    autoMove()
    let move = { x: 0, y: 0 }
    corpo = iD("corpo-" + id);
    if (keys.ArrowUp == true && keys.ArrowDown == false || keys.w == true && keys.s == false) {
        move.y = -1
    }
    if (keys.ArrowUp == false && keys.ArrowDown == true || keys.s == true && keys.w == false) {
        move.y = 1
    }
    if (keys.ArrowRight == true && keys.ArrowLeft == false || keys.d == true && keys.a == false) {
        move.x = 1
        corpo.style.backgroundImage = "url('" + playerImg["andar"].src + "')";
    }
    if (keys.ArrowRight == false && keys.ArrowLeft == true || keys.a == true && keys.d == false) {
        move.x = -1

        corpo.style.backgroundImage = "url('" + playerImg["andar"].src + "')";;
    }
    if (move.x < 0) {
        iD("head-" + id).className = "headl";
        iD("corpo-" + id).className = "corpol";
    }
    else if (move.x > 0) {
        iD("head-" + id).className = "head";
        iD("corpo-" + id).className = "corpo";
    }
    frontEnd(move)

    if (move.x == oldpos.x && move.y == oldpos.y) {
        send = false;
    }
    if (send == true) {
        // sendServer(move, "m")
        if (move.x == 0 && move.y == 0) {
            corpo.style.backgroundImage = "url('" + playerImg["danca"].src + "')";;
            send = false;
        }
        oldpos = move;
    }
    if (segue != 0 && (move.x != 0 || move.y != 0)) {
        //disableScroll()
        player = users[id]
        if (player != null) {

            let x1 = player.left - windowx / 2 + 32;
            let y1 = player.top + (player.height * 1.8) - windowy / 4 - 64;
            let wx = container.scrollLeft;
            let wy = container.scrollTop;
            let tx = wx + (x1 - wx) * 0.5;
            let ty = wy + (y1 - wy) * 0.5;
            /*
              container.scrollTo(tx, ty)
              */
            container.scrollTo(tx, ty)

        }
    }

}


async function loadPlayer() {
    let imagename = ["anda", "andar", "danca"]
    for (i in imagename) {
        let nome = imagename[i]
        let sprite = new Image()
        sprite.src = 'game/' + nome + '.png'
        sprite.onload = function () {
            playerImg[nome] = sprite
        }
    }

}
loadPlayer()

function frontEnd(move) {
    let avatar = iD(id)
    if (avatar != null) {
        let newUser = {
            left: user.left + (move.x * speed),
            top: user.top + (move.y * speed),
            width: user.width,
            height: user.height

        }
        let colliders = coliders.length
        let colidiu = false;
        for (i = 0; i < colliders; i++) {
            if (doElsCollide(newUser, coliders[i]) != null) {
                newUser.left = user.left + move.x * speed;
                newUser.top = user.top;
                if (
                    doElsCollide(newUser, coliders[i]) != null
                ) {
                    newUser.left = user.left;
                    newUser.top = user.top + move.y * speed;
                    if (
                        doElsCollide(newUser, coliders[i]) != null
                    ) {
                        move.x = move.x * -1;
                        move.y = move.y * -1;
                        newUser.left =
                            user.left + move.x * speed;
                        newUser.top = user.top + move.y * speed;
                        console.log(true)
                        colidiu = true;
                    }
                }
            }
        }

        if (!insideX(newUser)) {
            newUser.left = user.left
        }
        if (!insideY(newUser)) {
            newUser.top = user.top
        }
        moveBG()
        user.left = newUser.left;
        user.top = newUser.top;
        avatar.style.left = user.left + "px";
        avatar.style.top = user.top + "px";
    }

    let blocs = blocosX.length
    player.hidden = false
    for (i = 0; i < blocs; i++) {

        if (doElsCollide(player, blocosX[i])) { player.hidden = true }
    }
    zIndexTree()
}

iD("bg1").style.backgroundPosition = "10px 0px"

async function moveBG() {
    let bgx = iD("bg1").style.backgroundPositionX
    iD("bg1").style.backgroundPosition = (keys.ArrowLeft + keys.ArrowRight) / 8 + parseFloat(bgx, 10) + 0.1 + "px 0px"
    //iD("bg2").style.backgroundPosition = `-${user.left / 2}px 0px`;

}
let deg = 0
var avatar = iD("player")
function playershake() {
    avatar.style.opacity = 0.8
    avatar.style.rotate = "0 deg"
    var shaking = setInterval(() => {
        deg += 20; avatar.style.rotate = deg + "deg";
        avatar.classList.add("some")
    }, 30)
    setTimeout(() => {
        clearInterval(shaking); setTimeout(() => {
            avatar.style.rotate = "0deg";
            avatar.style.opacity = 1
            user.left = 170
            avatar.style.left = user.left + "px";
            user.top = 10
            avatar.style.top = user.top + "px";
            avatar.classList.remove("some")

        }, 200)
    }, 600)
}
const nuvens = setInterval(moveBG, 200)
var map = {
    x: parseInt(

        iD("map").style.width
        , 10)
    , y: parseInt(iD("map").style.height, 10)
}

function insideX(quem = user) {
    if (quem.left < gameSize.width - quem.width * 2 && quem.left > quem.width / 2) { return true }
    else { return false }
}
function insideY(quem = user) {
    if (quem.top < gameSize.height - quem.height * 2 && quem.top > 0) { return true }
    else { return false }
}

window.onload = function () {
    setTimeout(() => iD("carregandoc").innerHTML = "<span class='carregandoc'>3</span>", 1000)
    setTimeout(() => iD("carregandoc").innerHTML = "<span class='carregandoc'>2</span>", 2000)
    setTimeout(() => iD("carregandoc").innerHTML = "<span class='carregandoc'>1</span>", 3000)
    setTimeout(() => limpaCabeca(), 5000)
    setTimeout(() => { iD("carregando").style.display = "none"; gamestate = "play"; }, 4000)
    setTimeout(() => { keys.ArrowUp = true; setTimeout(() => keys.ArrowUp = false, 1500) }, 3980)

    // window.addEventListener("orientationchange", checkOrientation, false);
}
let orient = setInterval(() => checkO(), 2000);

var previousOrientation = window.orientation;
var checkO = function () {
    if (windowx != window.innerWidth) {
        windowx = window.innerWidth
        windowy = window.innerHeight
        container.style.width = windowx + "px";
        container.style.height = windowy + "px";
        if (windowx > windowy) {

            iD("desenha-container").classList.add("desenha-horizontal")
            iD("desenha-iframe").classList.add("desenha-horizontal")
            iD('joypad').style.left = (windowx - 180) + "px";
            iD('joypad').style.top = (windowy - 140) + "px";
        } else {
            iD('joypad').style.top = (windowy - 160) + "px";
            iD('joypad').style.left = (windowx / 2 - 100) + "px";
            iD("desenha-container").classList.remove("desenha-horizontal")
            iD("desenha-iframe").classList.remove("desenha-horizontal")

        }
    }

};
var blocosX = [];
let blocos = document.getElementsByClassName("bloco")
var linha = 0
var coluna = 0
var coliders = []

function alignBlocos() {
    for (i in blocos) {
        if (i == 4 || i == 8) { linha++; coluna = 0 }
        if (blocos[i].id) {
            let sobra = 30
            let esq = (coluna * 440) + sobra
            let topo = -280 + (linha * 380)
            let bloco = { id: blocos[i].id, left: esq, top: topo, width: 320, height: 340 }
            blocosX.push(bloco)
            // coliders.push(bloco)
            blocos[i].setAttribute("style", "left:" + esq + "px; top:" + topo + "px")
        }
        coluna++
    }
}
alignBlocos();

let doElsCollide = function (rect1, rect2) {
    if (
        rect1.left < rect2.left + rect2.width &&
        rect1.left + rect1.width > rect2.left &&
        rect1.top < rect2.top + rect2.height &&
        rect1.height + rect1.top > rect2.top
    ) {
        return rect1;
    } else {
        return null;
    }
};

function zIndexTree() {
    let colliders = coliders.length
    for (i = 0; i < colliders; i++) {
        let obj = coliders[i]
        if (obj.top + obj.height > player.top + (player.height / 2)) {
            iD(obj.id).style.zIndex = 3
        } else {
            iD(obj.id).style.zIndex = 0
        }
    }
}

function construct() {
    let predio = document.createElement("div")

    predio.style.display = "block"
    predio.style.position = "absolute"
    predio.style.left = "0px";
    predio.style.top = 0 + "px"
    predio.style.width = 1920 * 2 + "px";
    predio.style.height = 1080 * 2 + "px";
    predio.style.backgroundColor = "#110000"
    for (i = 1; i < 5; i++) {
        let floor = document.createElement("div")
        floor.style.display = "block"
        floor.style.position = "absolute"
        floor.style.left = "0px";
        floor.style.top = 440 * i + "px"
        floor.style.width = 1920 * 2 + "px";
        floor.style.height = "180px";
        floor.style.backgroundColor = "#220000"
        predio.appendChild(floor)
    }
    for (i = 0; i < 10; i++) {
        let floor = document.createElement("div")
        floor.id = "col" + i
        floor.style.display = "block"
        floor.style.position = "absolute"
        floor.style.left = "100px";
        floor.style.top = 220 * i + 180 + "px"
        floor.style.width = 1800 * 2 + "px";
        floor.style.height = "40px";
        floor.style.border = "1px red dashed"
        predio.appendChild(floor)
        let treeColide = { id: "col" + i, left: 100, top: 220 * i + 180, width: 1800 * 2, height: 40 }
        coliders.push(treeColide)
    }
    document.getElementById("game").appendChild(predio)

}
construct()
