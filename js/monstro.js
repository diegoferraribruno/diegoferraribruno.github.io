var monstros = {
}

function newMonster(id) {

    let modelo = {

        top: 400,
        left: Math.random() * 300,
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
    monstros[id] = modelo;
    monstros[id].left = Math.random() * 1920
    monstros[id].speed = Math.random() * 4

    monstros[id].top = Math.random() * 600 + 320
    let monstroimg = document.createElement("img")
    monstroimg.src = "/game/monstro" + id + ".png"
    let monstro = document.createElement("div")
    monstro.id = "monstro" + id
    monstro.style.display = "block"
    monstro.style.position = "absolute"
    monstro.style.scale = 0.5
    monstro.style.zIndex = 4
    // monstro.style.filter = "brightness(0.6)"
    monstro.style.filter = "drop-shadow(2px 2px 4px red) hue-rotate(0deg)"
    iD("game").appendChild(monstro)

    monstroimg.onload = function () {
        let monstr = iD("monstro" + id)
        monstr.style.width = monstroimg.height + "px"
        monstr.style.height = monstroimg.height + "px"
        monstro.width = monstroimg.width
        monstro.height = monstroimg.height
        //monstr.appendChild(monstroimg)
        monstr.style.backgroundImage = "url('" + monstroimg.src + "')"
    }
}
for (let i = 0; i < 4; i++) { newMonster(i) }

var bot = 0
function movebot(inter) {
    iD("monstro2").style.filter = "drop-shadow(2px 2px 4px red) hue-rotate(" + Math.random() * 375 + "deg)"
    bot++
    if (bot >= 4) { bot = 0 }
    // console.log("!bot move", bot)
    setTimeout(() => {
        if (gamestate == "play") {
            let parado = Math.random() < 0.3 ? false : true;
            if (!parado && player.hidden == false) {
                autoMoveMonstro(bot)

            } else {
                let parado2 = Math.random() < 0.3 ? false : true;
                if (!parado2) {
                    for (i in monstros[bot].keys) {
                        monstros[bot].keys[i] = false;
                    }
                } else {
                    for (i in monstros[bot].keys) {
                        monstros[bot].keys[i] = Math.random() < 0.5 ? false : true;
                    }
                }
            }
        }
        inter = Math.random() * 1000
        movebot(inter)
        // send = true;

    }, inter)
}

movebot(1000)

function autoMoveMonstro(id) {

    let monster = monstros[id]
    if (monster.keys.ArrowDown == true && monster.top - monster.height / 2 >= player.top - player.height) {

        monster.keys.ArrowDown = false
    }
    if (monster.keys.ArrowUp == true && monster.top - monster.height / 2 <= player.top + player.height * 2) {
        monster.keys.ArrowUp = false
    }
    if (monster.keys.ArrowLeft == true && monster.left - monster.width / 2 <= player.left - player.width) {

        monster.keys.ArrowLeft = false
    }
    if (monster.keys.ArrowRight == true && monster.left - monster.width / 2 >= player.left + player.width * 2) {
        monster.keys.ArrowRight = false
    }
    if (monster.top < player.top - player.height) {
        monster.keys.ArrowDown = true
    }
    if (monster.top + monster.height / 2 > player.top - player.height) {
        monster.keys.ArrowUp = true
    }
    if (monster.left - monster.width / 2 < player.left) {
        monster.keys.ArrowRight = true
    }
    if (monster.left + monster.width / 2 > player.left - player.width) {
        monster.keys.ArrowLeft = true
    }
}
var audio1 = new Audio('./game/jumpscare1.ogg');
var audio2 = new Audio('./game/jumpscare2.ogg');
var audio3 = new Audio('./game/jumpscare3.ogg');
var audios = { 0: audio1, 1: audio1, 2: audio2, 3: audio3 }

let pegou = false
function frontMoveMonstro(id, move) {
    let monster = monstros[id]
    let avatar = iD("monstro" + id)

    if (avatar != null) {
        let newmonstro = {
            left: monster.left + (move.x * monster.speed),
            top: monster.top + (move.y * monster.speed),
            width: monster.height,
            height: monster.height
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
                monster.left = newmonstro.left
                avatar.style.left = monster.left + "px";
            }
            if (insideYMonstro(newmonstro)) {
                monster.top = newmonstro.top
                avatar.style.top = monster.top + "px";
            }
        }
        let col = doMonsterCollide(player, monster)
        if (col != null && pegou == false) {
            audios[id].play()
            playershake()
            pegou = true

            avatar.classList.add("jumpscare")
            //iD("monstro").style.zIndex = 5
            monster.keys.ArrowDown = true
            monster.keys.ArrowRight = true

            setTimeout(() => {
                avatar.classList.remove("jumpscare")
                avatar.style.scale = 0.5
                // iD("monstro").style.zIndex = 0
                monster.keys.ArrowDown = true
                monster.keys.ArrowRight = true
                monster.keys.ArrowUp = false
                monster.keys.ArrowLeft = false
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
    for (i = 0; i < 4; i++) {
        let monster = monstros[i]
        let position = 320 * monster.frame
        let monstr = iD("monstro" + i)
        monstr.style.backgroundPosition = `-${position}px 0px`;
        monstr.style.rotate = -20 * monster.frame + "deg"
        monster.frame++
        if (monster.frame > 2) { monster.frame = 0 }
    }
}

setInterval(moveMonstro, 15)
function moveMonstro() {
    for (let i = 0; i < 4; i++) {
        let move = { x: 0, y: 0 }
        let monster = monstros[i]

        if (monster.keys.ArrowUp == true && monster.keys.ArrowDown == false) {
            move.y = -1
        }
        if (monster.keys.ArrowUp == false && monster.keys.ArrowDown == true) {
            move.y = 1
        }
        if (monster.keys.ArrowRight == true && monster.keys.ArrowLeft == false) {
            move.x = 1
        }
        if (monster.keys.ArrowRight == false && monster.keys.ArrowLeft == true) {
            move.x = -1
        }

        frontMoveMonstro(i, move)
    }
}
