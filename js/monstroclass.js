
class Personagem { // Criação de uma classe em JavasScript é uma função que cria um objeto.
    constructor(nome, arma, largura, altura, imagem) { //quando a classe for chamada, ela executara primeiramente este construtor
        this.nome = nome;
        this.arma = arma;
        this.width = largura;
        this.height = altura;
        this.img = imagem

    }
    ataque() {
        return this.nome + " ataca com " + this.arma;
    }
}
class Lobo extends Personagem {
    constructor(nome, arma, tipo) {
        super(nome, arma) // <- busca na função extendida as propriedades cria um link a plavra "this".
        this.tipo = tipo
        console.log(this)
    }
    chegou() {
        return "Chegou " + this.nome + " " + this.tipo + "..."
    }
}
class Porquinho extends Personagem {
    constructor(nome, arma, material) {
        super(nome, arma) // <- Super importante! busca na função extendida as propriedades e cria o link a plavra "this".
        this.material = material;
    }
    fazerCasa() {
        return this.nome + " construiu uma casa de " + this.material + " com " + this.arma + "."
    }
    fuga(pronde = "caldeirão!") {
        if (this.nome != "Prático") { // Este sinal significa se != não for igual a "Prático" Mais a frente veja que
            return this.nome + " fugiu para casa de " + pronde.nome
        }
        else {
            return this.nome + " cozinha " + lobo.nome + " no " + pronde + ". <br/> fim..."
        }
    }
}
const cicero = new Porquinho('Cícero', 'bambu', 'lama')
const heitor = new Porquinho('Heitor', 'madeira', 'pau')
const pratico = new Porquinho('Prático', 'tijolos', 'cimento')
const lobo = new Lobo('o Lobo', 'assoprão', 'Mau')
function conta() {
    let roteiro = [
        "Era uma vez 3 porquinhos...",
        cicero.fazerCasa(),
        heitor.fazerCasa(),
        pratico.fazerCasa(),
        lobo.chegou(cicero),
        cicero.ataque(),
        lobo.ataque(cicero),
        cicero.fuga(heitor),
        lobo.chegou(),
        heitor.ataque(),
        lobo.ataque(),
        cicero.fuga(pratico),
        heitor.fuga(pratico),
        lobo.chegou(),
        lobo.ataque(),
        pratico.ataque(),
        lobo.ataque(),
        pratico.fuga(), "<br/>fim..?<br/>aperte f12 e veja como essa história ta sendo contada"
    ]

}



var monstros = {
}

function newMonster(id) {

    let modelo = {
        
            top: 400,
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
    monstros[id] = modelo
    let monstroimg = document.createElement("img")
    monstroimg.src = "/game/monstro"+ id +".png"
    let monstro = document.createElement("div")
    monstro.id = "monstro"+ id
    monstro.style.display = "block"
    monstro.style.position = "absolute"
    monstro.style.scale = 0.5
    monstro.style.zIndex = 4
    // monstro.style.filter = "brightness(0.6)"
    monstro.style.filter = "drop-shadow(2px 2px 4px red) hue-rotate(0deg)"
    iD("game").appendChild(monstro)

    monstroimg.onload = function () {
        let monstr = iD("monstro"+ id)
        monstr.style.width = monstroimg.height + "px"
        monstr.style.height = monstroimg.height + "px"
        monstro.width = monstroimg.width
        monstro.height = monstroimg.height
        //monstr.appendChild(monstroimg)
        monstr.style.backgroundImage = "url('" + monstroimg.src + "')"
    }
}
for (let i=1; i<3; i++){newMonster(i)}

function bot(inter) {

    setTimeout(() => {
        for (let id=1; id<3; id++){
        if (gamestate == "play") {
            let parado = Math.random() < 0.5 ? false : true;
            if (!parado && player.hidden == false) {
                autoMoveMonstro()

            } else {
                let parado2 = Math.random() < 0.5 ? false : true;
                if (!parado2) {
                    for (i in monstros[id].keys) {
                        monstros[id].keys[i] = false;
                    }
                } else {
                    for (i in monstros[id].keys) {
                        monstros[id].keys[i] = Math.random() < 0.5 ? false : true;
                    }
                }
            }
        }
        inter = Math.random() * 1000
        bot(inter)
        // send = true;
    }
    }, inter)
}
bot(1000)

function autoMoveMonstro() {

    for (i=1; i<3;i++){
        let monster = monstros[i]
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
}
var audio2 = new Audio('./game/jumpscare1.ogg');

let pegou = false
function frontMoveMonstro(id, move) {
    let monster = monstros[id]
    let avatar = iD("monstro"+id)
    if (avatar != null) {
        let newmonstro = {
            left: monster.left + (move.x *monster.speed),
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
            audio2.play()
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
    for (i=1; i<3;i++){
        let monster = monstros[i]
    let position = 320 * monster.frame
    let monstr = iD("monstro"+i)
    monstr.style.backgroundPosition = `-${position}px 0px`;
    monstr.style.rotate = -20 * monster.frame + "deg"
    monster.frame++
    if (monster.frame > 2) { monster.frame = 0 }
    }
}

setInterval(moveMonstro, 30)
function moveMonstro() {
    for (let i=1; i<3; i++){
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

    frontMoveMonstro(i,move)
}
}
