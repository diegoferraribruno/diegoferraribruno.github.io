var monstro = {

    top: 520,
    left: 850,
    width: 160,
    height: 160,
    scale: 0.25,
    estado: ["deboas", "persegue"]

}
let monstrokeys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
}

function newMonster() {
    let monstroimg = document.createElement("img")
    monstroimg.src = "/game/monstro.png"
    let monstro = document.createElement("div")
    monstro.id = "monstro"
    monstro.style.display = "block"
    monstro.style.position = "absolute"
    monstro.style.scale = 0.5
    document.getElementById("game").appendChild(monstro)

    monstroimg.onload = function () {
        let monstr = document.getElementById("monstro")
        monstr.style.width = monstroimg.height + "px"
        monstr.style.height = monstroimg.height + "px"
        monstro.width = monstroimg.width
        monstro.height = monstroimg.height
        monstr.style.backgroundImage = "url('" + monstroimg.src + "')"
    }
}
newMonster()

function bot(inter) {
    autoMoveMonstro()
    setTimeout(() => {
        let parado = Math.random() < 0.5 ? false : true;
        if (!parado) {
            for (i in monstrokeys) {
                monstrokeys[i] = Math.random() < 0.5 ? false : true;
            }
        } else {
            autoMoveMonstro()
            let parado2 = Math.random() < 0.5 ? false : true;
            if (!parado2) {
                for (i in monstrokeys) {
                    monstrokeys[i] = false;
                }
            }
        }
        inter = Math.random() * 2000
        bot(inter)
        // send = true;

    }, inter)
}
bot(2000)

function autoMoveMonstro() {
    if (monstrokeys.ArrowDown == true && monstro.top - monstro.height / 2 >= player.top - player.height) {

        monstrokeys.ArrowDown = false
    }
    if (monstrokeys.ArrowUp == true && monstro.top - monstro.height / 2 <= player.top + player.height * 2) {
        monstrokeys.ArrowUp = false
    }
    if (monstrokeys.ArrowLeft == true && monstro.left - monstro.width / 2 <= player.left - player.width) {

        monstrokeys.ArrowLeft = false
    }
    if (monstrokeys.ArrowRight == true && monstro.left - monstro.width / 2 >= player.left + player.width * 2) {
        monstrokeys.ArrowRight = false
    }
    if (monstro.top < player.top - player.height) {
        monstrokeys.ArrowDown = true
    }
    if (monstro.top + monstro.height / 2 > player.top - player.height) {
        monstrokeys.ArrowUp = true
    }
    if (monstro.left - monstro.width / 2 < player.left) {
        monstrokeys.ArrowRight = true
    }
    if (monstro.left + monstro.width / 2 > player.left - player.width) {
        monstrokeys.ArrowLeft = true
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
var audio2 = new Audio('./game/jumpscare1.ogg');

let pegou = false
function frontMoveMonstro(move) {

    let avatar = document.getElementById("monstro")
    if (avatar != null) {
        let newmonstro = {
            left: monstro.left + (move.x * mspeed),
            top: monstro.top + (move.y * mspeed),
            width: monstro.height,
            height: monstro.height
        }
        if (insideX(newmonstro)) {
            monstro.left = newmonstro.left
            avatar.style.left = monstro.left + "px";
            //  moveBG()
        }
        if (insideY(newmonstro)) {
            monstro.top = newmonstro.top
            avatar.style.top = monstro.top + "px";
        }
    }

    let col = doElsCollide(player, monstro)
    if (col != null && pegou == false) {
        audio2.play()
        pegou = true
        document.getElementById("player").style.opacity = 0.5
        document.getElementById("monstro").style.scale = 2
        document.getElementById("monstro").style.zIndex = 5
        setTimeout(() => {
            let avatar = document.getElementById("player")
            avatar.style.opacity = 1
            user.left = 170
            avatar.style.left = user.left + "px";
            user.top = 320
            avatar.style.top = user.top + "px";
            document.getElementById("monstro").style.scale = 0.5
            document.getElementById("monstro").style.zIndex = 0

            pegou = false
        }, 1000)

    }
    // console.log(col)
}

let doElsCollide = function (rect1, rectb) {
    //let rect1 ={}
    let rect2 = {}
    rect2.width = rectb.width / 2
    rect2.left = rectb.left + rectb.width / 2
    rect2.top = rectb.top + rectb.height
    rect2.height = rectb.height / 2
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
//anima
let mframe = 0
setInterval(animaMonstro, 110)
function animaMonstro() {
    let position = 320 * mframe
    let monstr = document.getElementById("monstro")
    monstr.style.backgroundPosition = `-${position}px 0px`;
    monstr.style.rotate = -20 * mframe + "deg"
    mframe++
    if (mframe > 2) { mframe = 0 }
}

setInterval(moveMonstro, 10)
function moveMonstro() {
    //CAMERA

    // autoMove()
    let move = { x: 0, y: 0 }
    //  corpo = document.getElementById("corpo-" + id);
    if (monstrokeys.ArrowUp == true && monstrokeys.ArrowDown == false) {
        move.y = -1
    }
    if (monstrokeys.ArrowUp == false && monstrokeys.ArrowDown == true) {
        move.y = 1
    }
    if (monstrokeys.ArrowRight == true && monstrokeys.ArrowLeft == false) {
        move.x = 1
        // corpo.style.backgroundImage = "url('/game/andaR.png')";
    }
    if (keys.ArrowRight == false && keys.ArrowLeft == true) {
        move.x = -1
        //   corpo.style.backgroundImage = "url('/game/andaR.png')";
    }
    /* if (move.x < 0) {
         document.getElementById("head-" + id).className = "headl";
         document.getElementById("corpo-" + id).className = "corpol";
     }
     else if (move.x > 0) {
         document.getElementById("head-" + id).className = "head";
         document.getElementById("corpo-" + id).className = "corpo";
     }*/
    frontMoveMonstro(move)
    /*
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
                let tx = wx + (x1 - wx) * 0.5;
                let ty = wy + (y1 - wy) * 0.5;
                /*
                  container.scrollTo(tx, ty)

                container.scrollTo(tx, ty)

            }
         }*/

}

var mspeed = 1.5
