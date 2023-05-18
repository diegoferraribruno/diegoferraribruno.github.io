var monstro = {

    top: 700,
    left: 850,
    width: 160,
    height: 160,
    scale: 0.25,
    speed: 2.5,
    estado: ["deboas", "persegue"],
    frame: 0,
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
    // monstro.style.filter = "drop-shadow(0px 0px 4px red) hue-rotate(180deg)"
    iD("game").appendChild(monstro)

    monstroimg.onload = function () {
        let monstr = iD("monstro")
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

        if (gamestate == "play") {
            let parado = Math.random() < 0.5 ? false : true;
            if (!parado && player.hidden == false) {
                autoMoveMonstro()

            } else {
                let parado2 = Math.random() < 0.5 ? false : true;
                if (!parado2) {
                    for (i in monstro.keys) {
                        monstro.keys[i] = false;
                    }
                } else {
                    for (i in monstro.keys) {
                        monstro.keys[i] = Math.random() < 0.5 ? false : true;
                    }
                }
            }
        }
        inter = Math.random() * 1000
        bot(inter)
        // send = true;

    }, inter)
}
bot(1000)

function autoMoveMonstro() {


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
var audio2 = new Audio('./game/jumpscare1.ogg');

let pegou = false
function frontMoveMonstro(move) {

    let avatar = iD("monstro")
    if (avatar != null) {
        let newmonstro = {
            left: monstro.left + (move.x * monstro.speed),
            top: monstro.top + (move.y * monstro.speed),
            width: monstro.height,
            height: monstro.height
        }
        let blocs = blocosX.length
        var colidiu = false
        for (i = 0; i < blocs; i++) {

            if (doMonsterCollide(blocosX[i], newmonstro)) {
                colidiu = true;
            }
        }
        let colliders = coliders.length
        for (i = 0; i < colliders; i++) {
            if (doMonsterCollide(coliders[i], newmonstro)) {
                colidiu = true
            }
        }
        if (colidiu === false) {
            if (insideXMonstro(newmonstro)) {
                monstro.left = newmonstro.left
                avatar.style.left = monstro.left + "px";
            }
            if (insideYMonstro(newmonstro)) {
                monstro.top = newmonstro.top
                avatar.style.top = monstro.top + "px";
            }
        }
        let col = doMonsterCollide(player, monstro)
        if (col != null && pegou == false) {
            audio2.play()
            playershake()
            pegou = true

            iD("monstro").classList.add("jumpscare")
            //iD("monstro").style.zIndex = 5
            monstro.keys.ArrowDown = true
            monstro.keys.ArrowRight = true

            setTimeout(() => {
                iD("monstro").classList.remove("jumpscare")
                iD("monstro").style.scale = 0.5
                // iD("monstro").style.zIndex = 0
                monstro.keys.ArrowDown = true
                monstro.keys.ArrowRight = true
                monstro.keys.ArrowUp = false
                monstro.keys.ArrowLeft = false
                pegou = false
            }, 1000)

        }
    }
}
function insideYMonstro(quem = user) {
    if (quem.top < map.y - quem.height * 2 && quem.top > 0 - quem.height) { return true }
    else { return false }
}
function insideXMonstro(quem = user) {
    if (quem.left < map.x + quem.width / 2 && quem.left > - quem.width) { return true }
    else { return false }
}
let doMonsterCollide = function (rect1, rectb) {
    //let rect1 ={}
    let rect2 = {}
    rect2.width = rectb.width
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
setInterval(animaMonstro, 160)
function animaMonstro() {
    let position = 320 * monstro.frame
    let monstr = iD("monstro")
    monstr.style.backgroundPosition = `-${position}px 0px`;
    monstr.style.rotate = -20 * monstro.frame + "deg"
    monstro.frame++
    if (monstro.frame > 2) { monstro.frame = 0 }
}

setInterval(moveMonstro, 15)
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
