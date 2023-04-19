let id = "player"
var user = {
    id: "player",
    name: "",
    serverPlayerPos: { x: 120, y: 400 },
    left: 140,
    top: 120,
    width: 32,
    height: 100,
    face: 0,
    hue: 0
}
var users = { "player": user }
var game = document.getElementById("game")
const src = document.getElementById("manche");
var container = document.getElementById("container")
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
    top: 120,
    left: 140,
    width: 32,
    height: 100,
    hidden: false
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
    document.getElementById("manche").style.left = 45 + deltaX + "px";
    document.getElementById("manche").style.top = 45 + deltaY + "px";
    if (deltaY < -6) { keys.ArrowUp = true; send = true; } else { keys.ArrowUp = false; };
    if (deltaY > 6) { keys.ArrowDown = true; send = true; } else { keys.ArrowDown = false };
    if (deltaX > 6) { keys.ArrowRight = true; send = true; } else { keys.ArrowRight = false };
    if (deltaX < -6) { keys.ArrowLeft = true; send = true; } else { keys.ArrowLeft = false };

    e.preventDefault();// < testar iphone.
    //document.getElementById('manche').innerHTML = "X: "+Math.floor(clientX)+" Y:"+Math.floor(clientY)+"<br />dX: "+Math.floor(deltaX)+" dY: "+Math.floor(deltaY)
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
    document.getElementById("manche").style.left = "30px";
    document.getElementById("manche").style.top = "0px";
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
        document.getElementById("manche").style.left = 30 + deltaX + "px";
        document.getElementById("manche").style.top = deltaY + "px";
        if (deltaY < -4) { keys.ArrowUp = true; send = true; } else { keys.ArrowUp = false };
        if (deltaY > 4) { keys.ArrowDown = true; send = true; } else { keys.ArrowDown = false };
        if (deltaX > 4) { keys.ArrowRight = true; send = true; } else { keys.ArrowRight = false };
        if (deltaX < -4) { keys.ArrowLeft = true; send = true; } else { keys.ArrowLeft = false };
    }
}

document.addEventListener('touchend', function (e) {
    for (i in keys) { keys[i] = false }
    send = true;
    document.getElementById("manche").style.left = "30px";
    document.getElementById("manche").style.top = "0px";
    document.documentElement.style.overflow = 'auto';

}

);
document.addEventListener('mousedown', function (e) {
    e.preventDefault()
    let t = e.target.id
    if (t == "head-player") {
        seguemouse = true
    }
    console.log(t)

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
var windowx = window.innerWidth
var windowy = window.innerHeight
/*setTimeout(() => {

    container.style.width = windowx + "px";
    container.style.height = windowy + "px";
})*/
document.getElementById('joypad').style.top = (windowy - 160) + "px";
document.getElementById('joypad').style.left = (windowx / 2 - 100) + "px";
//document.getElementById('chat').style.width = windowx + "px";

/*
window.addEventListener('resize', function (event) {
    windowx = window.innerWidth
    windowy = window.innerHeight
    container.style.width = screen.width + "px";
    container.style.height = screen.height + "px";
    document.getElementById('joypad').style.top = (windowy - 160) + "px";
});*/

//ANIMATION
var frame = 0
var corpo = document.getElementById("corpo-" + id);

setInterval(function () {
    for (i in users) {
        let corpo = document.getElementById("corpo-" + users[i].id);
        let position = frame * 32;
        //corpo.style.background: 'url("standing-32.png") '${position}'px 0px';
        corpo.style.backgroundPosition = `-${position}px 0px`;
    }
    frame++;
    if (frame > 3) {
        frame = 0
    }
},
    150);
setInterval(movePlayer, 10)
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
    corpo = document.getElementById("corpo-" + id);
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
        document.getElementById("head-" + id).className = "headl";
        document.getElementById("corpo-" + id).className = "corpol";
    }
    else if (move.x > 0) {
        document.getElementById("head-" + id).className = "head";
        document.getElementById("corpo-" + id).className = "corpo";
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
            let y1 = player.top + (player.height) - windowy / 4 - 64;
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


    if (id != "player") {
        users[id].left = Math.floor(users[id].left + (move.x * speed) + (users[id].serverPlayerPos.x - users[id].left) * 0.1);
        users[id].top = Math.floor(users[id].top + (move.y * speed) + (users[id].serverPlayerPos.y - users[id].top) * 0.1);

        for (i in users) {
            let avatar = document.getElementById(users[i].id)
            if (avatar != null) {
                users[i].left = users[i].left + (users[i].serverPlayerPos.x - users[i].left) * speed
                users[i].top = users[i].top + (users[i].serverPlayerPos.y - users[i].top) * speed
                avatar.style.left = users[i].left + "px";
                avatar.style.top = users[i].top + "px";
            }
        }
    }
    else {
        let avatar = document.getElementById(id)
        if (avatar != null) {
            let newUser = {
                left: user.left + (move.x * speed),
                top: user.top + (move.y * speed),
                width: user.width,
                height: user.height

            }
            if (insideX(newUser)) {
                user.left = newUser.left
                avatar.style.left = user.left + "px";
                moveBG()
            }
            if (insideY(newUser)) {
                user.top = newUser.top
                avatar.style.top = user.top + "px";
            }
        }
    }

    let blocs = blocosX.length
    player.hidden = false
    for (i = 0; i < blocs; i++) {

        if (doElsCollide(player, blocosX[i])) { player.hidden = true }
    }

}
document.getElementById("bg1").style.backgroundPosition = "10px 0px"
async function moveBG() {
    let bgx = document.getElementById("bg1").style.backgroundPositionX
    document.getElementById("bg1").style.backgroundPosition = (keys.ArrowLeft + keys.ArrowRight) / 8 + parseFloat(bgx, 10) + 0.1 + "px 0px"
    //document.getElementById("bg2").style.backgroundPosition = `-${user.left / 2}px 0px`;

}
const nuvens = setInterval(moveBG, 40)
var map = {
    x: parseInt(

        document.getElementById("map").style.width
        , 10)
    , y: parseInt(document.getElementById("map").style.height, 10)
}

function insideX(quem = user) {
    if (quem.left < map.x - quem.width * 2 && quem.left > quem.width / 2) { return true }
    else { return false }
}
function insideY(quem = user) {
    if (quem.top < map.y - quem.height * 2 && quem.top > 0) { return true }
    else { return false }
}



var blocosX = [];
let blocos = document.getElementsByClassName("bloco")

function alignBlocos() {
    for (i in blocos) {
        if (blocos[i].id) {
            let esq = (i * 440) + 16
            let topo = -280
            let bloco = { id: blocos[i].id, left: i * esq, top: topo, width: 320, height: 320 }
            blocosX.push(bloco)
            blocos[i].setAttribute("style", "left:" + esq + "px; top:" + topo + "px")
        }
    }
}
alignBlocos();
let doElsCollide = function (rect1, rect2) {
    //let rect1 ={}

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