let id = "player"
var user = {
    id: "player",
    name: "",
    serverPlayerPos: { x: 120, y: 400 },
    left: 120,
    top: 400,
    width: 64,
    height: 64,
    face: 0,
    hue: 0
}
var users = { "player": user }
var game = document.getElementById("game")
const src = document.getElementById("manche");
var container = document.getElementById("container")
var send = false

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
    top: 400,
    left: 120,
    width: 64,
    height: 64
}

src.addEventListener('touchstart', (e) => {
    document.documentElement.style.overflow = 'hidden';
    // Cache the client X/Y coordinates
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
}, false);
src.addEventListener('onmousepress', (e) => {
    document.documentElement.style.overflow = 'hidden';
    // Cache the client X/Y coordinates
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
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


}

function mouse_up(event) {
    for (i in keys) { keys[i] = false }
    drag = false;
    document.getElementById("manche").style.left = "30px";
    document.getElementById("manche").style.top = "0px";
    clientX = 0;
    clientY = 0;
    send = true;
}

function mouse_position(e) {
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

});



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
setTimeout(() => {

    container.style.width = windowx + "px";
    container.style.height = windowy + "px";
})
document.getElementById('joypad').style.top = (windowy - 160) + "px";
document.getElementById('joypad').style.left = (windowx / 2 - 100) + "px";
//document.getElementById('chat').style.width = windowx + "px";


window.addEventListener('resize', function (event) {
    windowx = window.innerWidth
    windowy = window.innerHeight
    container.style.width = screen.width + "px";
    container.style.height = screen.height + "px";
    document.getElementById('joypad').style.top = (windowy - 160) + "px";
});

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
setInterval(movePlayer, 22)
let flip = 1;
function movePlayer() {
    //CAMERA


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
        corpo.style.backgroundImage = "url('/game/andaR.png')";
    }
    if (keys.ArrowRight == false && keys.ArrowLeft == true || keys.a == true && keys.d == false) {
        move.x = -1
        corpo.style.backgroundImage = "url('/game/andaR.png')";
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
            corpo.style.backgroundImage = "url('game/danca.png')";
            send = false;
        }
        oldpos = move;
    }
    if (segue != 0 && (move.x != 0 || move.y != 0)) {
        //disableScroll()
        player = users[id]
        if (player != null) {

            let x1 = player.left - windowx / 2 + 32;
            let y1 = player.top - windowy / 2 - 64;
            let wx = container.scrollLeft;
            let wy = container.scrollTop;
            let tx = wx + (x1 - wx) * 0.1;
            let ty = wy + (y1 - wy) * 0.1;
            /*
              container.scrollTo(tx, ty)
              */
            container.scrollTo(tx, ty)

        }
    }
}
var speed = 4
container.style.width = screen.width + "px";
container.style.height = screen.height + "px";

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
                top: user.top + (move.y * speed)
            }
            if (insideX(newUser)) {
                user.left = newUser.left
                avatar.style.left = user.left + "px";
                document.getElementById("section").style.backgroundPosition = `-${user.left / 4}px 0px`;
            }
            if (insideY(newUser)) {
                user.top = newUser.top
                avatar.style.top = user.top + "px";
            }
        }
    }
}
var map = {
    x: parseInt(

        document.getElementById("map").style.width
        , 10)
    , y: parseInt(document.getElementById("map").style.height, 10)
}

function insideX(quem = user) {
    if (quem.left < map.x - 32 && quem.left > 16) { return true }
    else { return false }
}
function insideY(quem = user) {
    if (quem.top < map.y - 32 && quem.top > 80) { return true }
    else { return false }
}