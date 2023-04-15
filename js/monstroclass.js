
class Personagem { // Criação de uma classe em JavasScript é uma função que cria um objeto.
    constructor(nome, arma, largura, altura, imagem) { //quando a classe for chamada, ela executara primeiramente este construtor
        this.nome = nome;
        this.arma = arma;
        this.width = largura;
        this.height = altura;
        this.img = 

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