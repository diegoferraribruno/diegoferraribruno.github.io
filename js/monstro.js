var monstro = {

    top: 520,
    left: 850,
    width: 160,
    height: 160,
    scale: 0.25,
    speed: 1.5,
    estado: ["deboas", "persegue"],
    keys: {
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
        ArrowLeft: false,
    }
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
    setTimeout(() => {
        let parado = Math.random() < 0.5 ? false : true;
        if (!parado) {
            for (i in monstro.keys) {
                monstro.keys[i] = Math.random() < 0.5 ? false : true;
            }
        } else {
            autoMoveMonstro()
            let parado2 = Math.random() < 0.5 ? false : true;
            if (!parado2) {
                for (i in monstro.keys) {
                    monstro.keys[i] = false;
                }
            }
        }
        inter = Math.random() * 2000
        bot(inter)
        // send = true;

    }, inter)
}
bot(2000)

function autoMoveMonstro(quem = monstro) {
    let monstro = quem

    if (player.hidden == false) {

        if (monstro.keys.ArrowDown == true && monstro.top - monstro.height / 2 >= player.top - player.height) {

            monstro.keys.ArrowDown = false
        }
        if (monstro.keys.ArrowUp == true && monstro.top - monstro.height / 2 <= player.top + player.height * 2) {
            monstro.keys.ArrowUp = false
        }
        if (monstro.keys.ArrowLeft == true && monstro.left - monstro.width / 2 <= player.left - player.width) {

            monstro.keys.ArrowLeft = false
        }
        if (monstro.keys.ArrowRight == true && monstro.left - monstro.width / 2 >= player.left + player.width * 2) {
            monstro.keys.ArrowRight = false
        }
        if (monstro.top < player.top - player.height) {
            monstro.keys.ArrowDown = true
        }
        if (monstro.top + monstro.height / 2 > player.top - player.height) {
            monstro.keys.ArrowUp = true
        }
        if (monstro.left - monstro.width / 2 < player.left) {
            monstro.keys.ArrowRight = true
        }
        if (monstro.left + monstro.width / 2 > player.left - player.width) {
            monstro.keys.ArrowLeft = true
        }
    }
}
var audio2 = new Audio('./game/jumpscare1.ogg');

let pegou = false
function frontMoveMonstro(move) {

    let avatar = document.getElementById("monstro")
    if (avatar != null) {
        let newmonstro = {
            left: monstro.left + (move.x * monstro.speed),
            top: monstro.top + (move.y * monstro.speed),
            width: monstro.height,
            height: monstro.height
        }
        if (insideX(newmonstro)) {
            monstro.left = newmonstro.left
            avatar.style.left = monstro.left + "px";
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
    let move = { x: 0, y: 0 }
    if (monstro.keys.ArrowUp == true && monstro.keys.ArrowDown == false) {
        move.y = -1
    }
    if (monstro.keys.ArrowUp == false && monstro.keys.ArrowDown == true) {
        move.y = 1
    }
    if (monstro.keys.ArrowRight == true && monstro.keys.ArrowLeft == false) {
        move.x = 1
    }
    if (monstro.keys.ArrowRight == false && monstro.keys.ArrowLeft == true) {
        move.x = -1
    }

    frontMoveMonstro(move)


}
