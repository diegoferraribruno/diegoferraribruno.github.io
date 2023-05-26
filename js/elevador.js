let id = "player"
var user = {
    id: "player",
    name: "",
    serverPlayerPos: { x: 180, y: 660 },
    left: 50,
    top: 1320,
    width: 32,
    height: 10,
    face: 0,
    hue: 0
}
var gamestate = "pause"
var users = { "player": user }
var game = iD("game")
const gameSize = { width: 1920 * 2, height: 1410 }
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
    top: 1320,
    left: 50,
    width: 32,
    height: 20,
    hidden: true
}
var speed = 7
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
    if (seguemouse == false && event.target.id != "manche") {
        let extra = 0
        let stepParent = hasClass(event.target, "step")
        if (stepParent) {
            extra = parseInt(document.getElementById(event.target.id).parentElement.style.top, 10)
        }
        clickmove(event.layerX + parseInt(event.target.style.left, 10) - player.width / 2, event.layerY - 14 + parseInt(event.target.style.top, 10) + extra)

    }
    if (seguemouse == true) { seguemouse = false }


}
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
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
        [layer]
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
            top: user.top + (move.y * speed / 1.4),
            width: user.width,
            height: user.height

        }

        let dorstepcolliders = coliders[2].length
        for (i = 0; i < dorstepcolliders; i++) {
            if (doElsCollide(newUser, coliders[2][i]) != null) {
                if (move.y == 1) {
                    move.y = move.y * -1;

                    layer = 0
                    iD("predio").style.display = "block"
                    iD("rooms").style.display = "none"

                } else if (move.y == -1) {
                    move.y = move.y * -1;
                    layer = 1
                    iD("rooms").style.display = "block"
                    iD("predio").style.display = "none"

                }
                /* newUser.left = user.left + move.x * speed;
                 newUser.top = user.top;*/
            }
        }
        let colliders = coliders[layer].length
        let colidiu = false;
        for (i = 0; i < colliders; i++) {
            if (doElsCollide(newUser, coliders[layer][i]) != null) {
                newUser.left = user.left + move.x * speed;
                newUser.top = user.top;
                if (
                    doElsCollide(newUser, coliders[layer][i]) != null
                ) {
                    newUser.left = user.left;
                    newUser.top = user.top + move.y * speed / 1.4;
                    if (
                        doElsCollide(newUser, coliders[layer][i]) != null
                    ) {
                        move.x = move.x * -1;
                        move.y = move.y * -1;
                        newUser.left =
                            user.left + move.x * speed;
                        newUser.top = user.top + move.y * speed / 1.4;
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
    // zIndexTree()
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
    setTimeout(() => iD("carregandoc").innerHTML = "<span class='carregandoc'>3</span>", 500)
    setTimeout(() => iD("carregandoc").innerHTML = "<span class='carregandoc'>2</span>", 1000)
    setTimeout(() => iD("carregandoc").innerHTML = "<span class='carregandoc'>1</span>", 1500)
    //setTimeout(() => limpaCabeca(), 5000)
    setTimeout(() => { iD("carregando").style.display = "none"; gamestate = "play"; }, 2000)
    // setTimeout(() => { keys.ArrowUp = true; setTimeout(() => keys.ArrowUp = false, 1500) }, 3980)

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


            iD('joypad').style.left = (windowx - 180) + "px";
            iD('joypad').style.top = (windowy - 140) + "px";
        } else {
            iD('joypad').style.top = (windowy - 160) + "px";
            iD('joypad').style.left = (windowx / 2 - 100) + "px";

        }
    }

};
var blocosX = [];
let blocos = document.getElementsByClassName("bloco")
var linha = 0
var coluna = 0
var coliders = [[], [], []]
var layer = 0

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

async function zIndexTree() {
    let colliders = coliders[layer].length
    for (i = 0; i < colliders; i++) {
        let obj = coliders[layer][i]
        if (obj.top + obj.height > player.top + (player.height / 2)) {
            iD(obj.id).style.zIndex = 3
        } else {
            iD(obj.id).style.zIndex = 0
        }
    }
}

function construct() {
    let predio = document.createElement("div")
    predio.id = "predio"
    predio.style.display = "block"
    predio.style.position = "absolute"
    predio.style.left = "0px";
    predio.style.top = 0 + "px"
    predio.style.width = 1920 * 2 + "px";
    predio.style.height = 1080 * 2 + 600 + "px";
    predio.classList.add("floor")
    let variant = 0
    for (f = 0; f < 4; f++) {
        //createWall
        let floor = document.createElement("div")
        floor.classList.add("floor")
        floor.style.display = "block"
        floor.style.position = "absolute"
        floor.style.left = "0px";
        floor.style.top = 400 * f + "px"
        floor.style.width = 1920 * 2 + "px";
        floor.style.height = "200px";
        floor.style.backgroundColor = "#100000"
        floor.style.border = "4px #211200 solid";
        if (f == 0) {
            floor.style.backgroundColor = "#111111"

        }
        if (f != 0) {

            for (b = 1; b < 6; b++) {
                let light = document.createElement("div")
                light.classList.add("glowing-light")
                light.style.left = 640 * b - 340 + "px"
                floor.appendChild(light)
            }
        }
        predio.appendChild(floor)
    }
    for (i = 0; i < 3; i++) {
        // colliders / paredes
        if (i % 2 == 0) { variant = 1920 * 2 - 400 }
        else { variant = 0 }
        let wall = document.createElement("div")
        wall.id = "wall" + i
        wall.style.display = "block"
        wall.style.verticalAlign = "bottom"
        wall.style.position = "absolute"
        wall.style.left = "0px";
        wall.style.top = 400 * i + 200 + "px"
        wall.style.width = 1600 * 2 + "px";
        wall.style.height = "200px";

        //stairs
        for (d = 0; d < 10; d++) {
            let step = document.createElement("div")
            step.id = "step" + i + d
            step.classList.add("step")
            step.style.display = "block"
            step.style.position = "absolute"
            step.style.left = 20 * d + variant + 20 + "px";
            step.style.top = 20 * d + "px"
            step.style.width = 140 + "px";
            step.style.height = "20px";
            step.style.backgroundColor = "rgb(40, 5, 5)"
            if (d % 2 == 0) {
                step.style.backgroundColor = "rgb(30, 6, 6)"

            }
            let stepWidth = 20
            let stepCollide = { id: "step" + i + d, left: 20 * d + variant, top: 20 * d + 400 * i + 200, width: stepWidth, height: 20 }
            if (d == 9) {

                let stepWidth = 200;
                //   step.style.left = 0 + variant + "px";
                //  step.style.width = stepWidth + "px";
                stepCollide.width = stepWidth
                stepCollide.left = 0 + variant
            }
            wall.appendChild(step)

            coliders[layer].push(stepCollide)

        }
        for (d = 0; d < 10; d++) {
            //steptwo
            if (i % 2 == 0) { variant = 1920 * 2 - 380 }
            else { variant = 0 }
            let step = document.createElement("div")
            step.style.display = "block"
            step.style.position = "absolute"
            step.id = "stepb" + i + d
            step.style.left = 20 * d + variant + "px";
            step.style.top = 20 * d + "px"
            step.style.width = 20 + "px";
            step.style.height = (200 - (d * 20)) + "px";
            step.style.backgroundColor = "#110000"
            let stepWidth = 20
            if (d == 0) {
                //step.style.width = 200 + "px";
                stepWidth = 200
            }

            wall.appendChild(step)
            let stepBcollider = { id: "stepb" + i + d, left: 20 * d + 160 + variant, top: 20 * d + 400 * i + 200, width: stepWidth, height: 20 }
            coliders[layer].push(stepBcollider)

        }
        //wall.style.border = "1px red dashed"
        for (c = 1; c < 3; c++) {
            let doorstep = document.createElement("div")
            doorstep.id = "doorstep" + i + c
            doorstep.style.display = "inline-block"
            doorstep.style.position = "absolute"
            doorstep.style.width = "100px"
            doorstep.style.height = "10px"
            doorstep.style.left = 640 * c - 280 + "px"
            doorstep.style.top = i * 400 + 400 + "px"
            doorstep.style.zIndex = 6
            doorstep.style.backgroundColor = "#55551122"
            document.getElementById("game").appendChild(doorstep)
            /*let stepBcollider = { id: "doorstep" + i + c, left: 640 * c - 280, top: i * 400 + 388, width: 100, height: 16 }
            coliders[2].push(stepBcollider)*/


        }
        /* bacana isso aqui! mas ta bugado precisa melhorar!
         let stepBcollider = { id: "doorstep" + i + c, left: 180, top: 380, width: 100, height: 20 }
         coliders[2].push(stepBcollider)
         */
        for (c = 1; c < 6; c++) {
            let door = document.createElement("div")
            door.innerHTML = `<span style="pointer-events: none; display:block; position:relative; float:left">.</span><span style='pointer-events: none; display:block; position:relative; width:60px; height:45px; top:14px; font-size:20px; color:#333333; font-family:serif; text-align:center; border:4px solid #170d01; margin-left:auto; margin-right:auto; padding-top: 6px; padding-right:2px'>${3 - i}${c}</span> <span style='pointer-events: none; display:block; position:relative; width:60px; height:45px; font-size:20px; color:#333333; font-family:serif; text-align:center; border:4px solid #170d01; margin-left:auto; margin-right:auto; top:32px'></span>`
            door.style.fontSize = "76px"
            door.classList.add("step")
            door.style.bottom = "-4px"
            //door.style.marginTop = -148 + "px"
            door.style.display = "inline-block"
            door.style.position = "absolute"
            door.style.textAlign = "center"
            door.style.width = "90px"
            door.style.height = "146px"
            door.style.backgroundColor = "#100505"
            door.style.left = 640 * c - 280 + "px"
            door.style.borderRadius = "2px";
            door.style.border = "5px  #181000 solid";
            //door.style.borderBottomColor = "black"
            //door.style.borderTopColor = "#040200"
            door.style.borderColor = " rgb(6, 10, 0) rgb(12, 18, 8) rgb(10, 3, 1)";
            door.style.borderBottomWidth = "6px"
            door.style.borderTopWidth = "6px"
            //  door.setAttribute("onclick", `enterRoom(${5 - i}${c})`)
            door.style.color = "#907000"
            door.id = `porta${3 - i}${c}`

            //        door.style.filter = "brightness(0.2)"
            wall.appendChild(door)
        }
        predio.appendChild(wall)
        let stairSpace = 0
        if (i % 2 != 0) { stairSpace = 380 }
        let wallColide = { id: "wall" + i, left: stairSpace, top: 400 * i + 200, width: 1920 * 2 - 400, height: 200 }

        coliders[layer].push(wallColide)
    }
    document.getElementById("game").appendChild(predio)

}
construct()
function showcolliders() {
    layer = 1
    let len = coliders[layer].length
    for (i = 0; i < len; i++) {

        let step = document.createElement("div")
        step.style.display = "block"
        step.style.position = "absolute"
        step.id = "colliderx" + i
        step.style.left = coliders[layer][i].left + "px";
        step.style.top = coliders[layer][i].top + "px"
        step.style.width = coliders[layer][i].width + "px";
        step.style.height = coliders[layer][i].height + "px";
        step.style.backgroundColor = "#00ff0055"
        step.style.border = "8px yellow dashed"
        step.style.zIndex = 5;
        document.getElementById("game").appendChild(step)
    }

}


var fotos = [
    {
        legenda: "<a href='http://diegoferraribruno.github.io/desenho.html' target='new'>App do diego</a>",
        imagem: "desenho0.png"
    },
    { legenda: "Ravi e Diego", imagem: "desenho2.png", stars: 0 },
    { legenda: "Diego, Diego, Diego e...", imagem: "desenho3.png" },
    { legenda: "android feito no androis", imagem: "desenho4.png" },
    //{ legenda: "Arte feita com antigo pincel", imagem: "desenho5.png" },
    //{ legenda: "Arte feita no app", imagem: "desenho6.png" },
    //{ legenda: "Arte feita no app", imagem: "desenho7.png" },
    { legenda: "Arte feita no app", imagem: "desenho8.png" },
    { legenda: "montagem usando o app", imagem: "desenho9.png" },
    { legenda: "Che o gato", imagem: "desenho10.png" },
    { legenda: "macaco digital", imagem: "desenho11.png" },
    { legenda: "paisagem?", imagem: "desenho12.png" },
    { legenda: "O que diz minha avó:", imagem: "desenho13.png" },
    { legenda: "projeto de pincel", imagem: "desenho14.png" },
    { legenda: "projeto de pincel", imagem: "desenho15.png" },
    { legenda: "projeto de pincel", imagem: "desenho16.png" },
    { legenda: "ladrilho infinito final", imagem: "desenho17.png" },


]

function criaImagem(x) {
    let floor = x % 5
    console.log(floor)
    let img = document.createElement("img")
    img.id = "foto" + x
    img.src = "./galeria/01/" + fotos[x].imagem
    img.setAttribute("onclick", "trocaFoto(" + x + ")")
    img.style.position = "absolute"
    img.style.display = "block"
    img.classList.add("mini2")

    img.style.top = (x + 1) * 80 - (floor * 80) + 180 + "px"

    img.style.left = 640 * floor + 700 + "px"
    //largura maxima da img
    iD("predio").appendChild(img)
}

// como fazer um loop para cada foto com a palavra for:
let quantasfotos = fotos.length
function criaGaleria() {
    for (i = 0; i < quantasfotos; i++) {
        criaImagem(i)
    }
}

criaGaleria() //executa a função
function trocaFoto(x) {
    let displayfoto = document.getElementById("foto" + x)
    displayfoto.classList.toggle("expand")
}

var rooms = {
    11: {}

}

function enterRoom(y) {
    layer = 1
    document.getElementById("predio").style.display = "none"
    let pos = document.getElementById("porta" + y)
    let newRoom = document.createElement("div")
    newRoom.id = "new" + y
    newRoom.classList.add("room")
    newRoom.style.left = parseInt(pos.left, 10) - 70 + "px"
    newRoom.style.top = parseInt(pos.top, 10) - 100 + "px"
    document.getElementById("game").appendChild(newRoom)

}
function createRoom() {

    let predio = document.createElement("div")
    predio.id = "rooms"
    predio.style.display = "block"
    predio.style.position = "absolute"
    predio.style.left = "0px";
    predio.style.top = 0 + "px"
    predio.style.width = 1920 * 2 + "px";
    predio.style.height = 1080 * 2 + "px";
    predio.classList.add("floor")
    //document.getElementById("predio").style.display = "none"
    for (f = 0; f < 4; f++) {
        //createWall
        let floor = document.createElement("div")
        floor.classList.add("floor")
        floor.style.display = "block"
        floor.style.position = "absolute"
        floor.style.left = "0px";
        floor.style.top = 400 * f + 200 + "px"
        floor.style.width = 1920 * 2 + "px";
        floor.style.height = "200px";
        floor.style.backgroundColor = "#220303"
        floor.style.border = "4px #211200 solid";
        floor.id = "floor" + f
        for (g = 0; g < 7; g++) {
            let furniture = document.createElement("span")
            furniture.style.fontSize = "110px"
            furniture.innerHTML = "🛏️     🛋️    <span style='font-size:80px'>🛁</span> "
            let fur = document.createElement("span")
            fur.style.fontSize = "50px"
            // fur.style.float = "right"
            // fur.style.width = "320px"
            fur.innerHTML = " 🪴   🚽"
            furniture.style.display = "inline-block"
            furniture.style.position = "absolute"
            furniture.style.display = "inline-block"
            furniture.style.position = "absolute"
            furniture.style.left = 640 * g + "px";
            furniture.style.top = -120 + "px"
            furniture.style.width = 640 + "px";
            furniture.style.height = "200px";
            furniture.appendChild(fur)
            floor.appendChild(furniture)
        }
        predio.appendChild(floor)
        let roomCollide = { id: "room" + i + d, left: 0, top: 400 * f - 400, width: 1920 * 2, height: 200 }
        coliders[1].push(roomCollide)
    }
    for (f = 0; f < 3; f++) {
        //createWall
        let floor = document.createElement("div")
        floor.classList.add("floor")
        floor.style.display = "block"
        floor.style.position = "absolute"
        floor.style.left = 640 * f + "px";
        floor.style.top = "0px"
        floor.style.width = "20px";
        floor.style.height = 1080 * 2 + "px";
        floor.style.backgroundColor = "#005500"
        floor.style.border = "4px #211200 solid";
        floor.id = "floor" + f + "v"
        predio.appendChild(floor)
        let roomCollide = { id: "room" + i + d + "v", left: 640 * f, top: 0, width: 20, height: 1080 * 2 }
        coliders[1].push(roomCollide)


    }
    predio.style.display = "none"
    document.getElementById("game").appendChild(predio)
}
createRoom()
//showcolliders()

