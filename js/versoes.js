let vers = [
  {
    versao: "9.4",
    notas: [
      "Implementando Camadas (Layers)",
      "mudei layers por lines no código todo",
      "criei thumbnails para alguns layers ficticios mas ainda nao funcionam e também uma camada de canvas por baixo"
    ],
  },
  {
    versao: "9.3.0",
    notas: [
      "aquarela brush mode (desabilitado ainda)",
      "Inicio sem pincel dinamico nem tela de boas vindas",
      "Função flip frame ( espelhar o quadro )",
    ],
  },
  {
    versao: "9.2.0",
    notas: [
      "novo integração do applicativo de desenho",
      "Integração com aplicativo de desenvolvimento de games Rraomip.",
      "Atalhos para KeyUp e KeyDown do teclado para mudança de linha de quadros para facil navegação",
      "fix do mover, rotacionar e redimensionar em modo apagador.",
      "remoção de botoes do menu tamanho da quadro",
    ],
  },
  {
    versao: "9.1.0",
    notas: [
      "Novo menu Sprite sheet - carregar animação",
      "Importação de sequencia de imagens também na vertical, calculando o numero de quadros pelo tamanho da imagem e do quadro pré-definido",
    ],
  },
  {
    versao: "8.9",
    notas: [
      "tela inicial sem splash",
      "Pressao de caneta (tablet) funciona apenas no Google Chrome.",
      "i shortcut for console hide and DOM update only if console is on",
      "animation was not playing if frames were deleted (fixed)",
      "Mudança na cor AB ainda necessita melhorarias...",
      "Menu greetings do texto começa escondido",
      "icons light background color even in darkmode",
    ],
  },
  {
    versao: "8.5",
    notas: [
      "draw text from https://codepen.io/tholman/pen/DByKvO",
      "google fonts",
      "Atalho M para modo Mirror(espelho) e atalho V para moVer",
      "Atalho T para ferramenta de texto",
      "ajuste para velocidade do movimento X expessura do pincel.",
      "Novo menu de fontes e Texto",
      "Novo preview de pincel na posição correta",
    ],
  },
  {
    versao: "7.8",
    notas: [
      "menu de seleção unido ao menu clipboard",
      "Texto funcionando no modo infinito",
      "nova tela de abertura",
      "nova área de colabore e compartillhe",
      "modo Texto, com menu de fontes dinamico",
      "mais atalhos Ctrl+,-,o,s",
      "mode de Cor A -> B. Troca as cores enquanto você pinta",
      "Pintura com luz refeito",
      "new keyboard shortcuts - novos atalhos de teclado",
      "Escala (e rotação) no clipboard",
      "tamanho maximo para o tamanho do pincel dinamico. ",
      "color modes RGB, HSL, HEXAdecimal",
      "Usar cores do pincel customizado",
      "last color swap button",
    ],
  },
  {
    versao: "6.10",
    notas: [
      "scale by center and by touch or click",
      "rectangular custom brushes",
      "cutom brush from clipboard",
      "Varias mudanças no visual icones",
      "Correções Camera e menu da camera",
      "auto night mode",
      "auto language select",
      "Load image and spritesheet from URL",
      "carrega imagems diretamente de um endereço web",
    ],
  },
  {
    versao: "6.8",
    notas: [
      "Varias mudanças no visual e menus",
      "Correções diversas",
      "Modo linha segurando Ctrl",
      "Menu help com atalhos.",
      "Captura de foto em sequencia com ajuste do intervalo",
      "Melhoras visuais no Clipboard e possibilidade de deletar os itens",
      "Modo de desenho Espelho (mirror)",
      "Arrumado undo - redo e recorte",
      "funcao de limite do numero de undo",
      "rainbow ink - tinta arco-íris!",
      "glow ink - tinta brilhante",
      "Mandala mode from <a href='https://jsart.co/150/drawing-mandala-with-js-canvas/'>Dragan Bajcic</a>",
      "new history and executing commands WIP",
    ],
  },
  {
    versao: "5.5.8",
    notas: [
      "clipboard",
      "Canvas drop: arrastar as miniaturas para copiar imagem sobre o quadro (sem touch)",
      "nova função: redimensionar quadro ou animação",
      "nova função: selecionar e copiar para novo quadro",
      "novo função ctrl+v para colar. dai basta clicar para definir o local",
      "usando o Alt e a ScrollWheel do mouse é possivel rotacionar o clipboard",
      "novo zoom com scroll wheel infinito e mais zoom de 0.25",
      "Pressao da caneta funcionando de novo. desculpem havia desligado sem querer",
      "Nova posição escondida do menu de animação",
      "recortar a tela arrumado de novo! rs rs..",
    ],
  },
  {
    versao: "4.3",
    notas: [
      "new shortcut:",
      "ctrl+space = play",
      "space+move = scroll",
      "ctrl+ mouse wheel = zoom in/out",
      "Piceis dinamicos para dispositivos com sensibilidade à pressão, mouse e touch com aumento do pincel de acordo com a velo",
      "troca de comandos por imagens para economizar memoria.",
    ],
  },
  {
    versao: "3.9",
    notas: [
      "Piceis dinamicos para dispositivos com sensibilidade à pressão",
      "troca de comandos por imagens para economizar memoria.",
    ],
  },
  {
    versao: "3.7.1",
    notas: [
      "correção do modo recortar e mudança de icone da tesoura",
      "corrigir criação excessiva de imagens",
      "Yoga! update",
      "Zoom + scroll funcionando",
      "melhoras na interface",
      "botão de switch (nao ta muito bonito) ao invez do checkbox em alguns menus",
    ],
  },
  {
    versao: "3.4",
    notas: [
      "color picker (fix)",
      "cursor do mouse sempre visivel",
      "rotate e mover causava tranparencia (fix)",
      "rotate canvas (pelo centro da tela ou pelo mouse)",
      "move canvas tool",
      "pinceis customizados salvando e carregando!",
      "muita mudança!",
      "Salvar e carregar projeto",
      "cursor removido",
      "modo diurno",
      "carregamento de spritesheet",
      "memoryswap desabilitado vamos ver quantos comandos o app aguenta.",
    ],
  },
  {
    versao: "2.3.0",
    notas: [
      "Localization dos titulos.",
      "salvar e carregar projeto quase funcionando corretamente.",
      "modo noturno diurno na tela de carregamento ",
    ],
  },
  {
    versao: "2.2.4",
    notas: [
      "Localization fixes. Arrumei algumas traduções...",
      "salvar e carregar projeto quase funcionando corretamente.",
      "tela de loading e start no modo noturno",
    ],
  },
  {
    versao: "2.2.1",
    notas: [
      'Localization!<span style="display:inline-block; position:relative; font-size:16px; width:30px; height:30px; top: -6px;">' +
      '🇬🇧<span style="display:inline-block; position:relative; margin-left: -24px; top:5px; font-size: 18px;">' +
      "🇧🇷</span></span> (Not this text yet...)",
      "!Desfazer e reafazer funcionando para cada quadro!",
      "Player agora utiliza o canvas do cursor para mostar a animação",
      "atalhos no teclado: Delete (quadro), + Novo quadro, Espaço (play7stop), setas para os lados trocam o quadro da animação",
      "todos os comandos tiveram que ser reorganizados para funcionar com o historico e nao somente com imagens. provavelmente vai dar muito problema ainda.",
    ],
  },
  {
    versao: "2.0.5",
    notas: [
      "troquei o botao do salvar por 🛟",
      'troquei o botao de adicionar imagem por ➕ <span class="icon2 frameicon"></span>',
      "aplicar e remover o filtro agora funcionando",
      "camera flip somente quando camera frontal :)",
      "desenho da caixa de recorte automatico",
      "cursor e e desenho de recorte acontecem em outra camada evitando muitos problemas",
      "mudança do modo de auto captura da camera por numero de quadros",
      "Arraste o quadro da timeline para o botao + para duplica-lo",
      "ajustes na interface",
      'botoes como este trocados <span class="bot">📷<span style="display: block; position: absolute; margin-top: -20px; font-size:20px;">🎥</span></span>',
      "menu efeitos funcionando corretamente. necessario salvar o quadro depois de aplicar o efeito",
    ],
  },
  {
    versao: "1.9.9",
    notas: [
      "mais configurações de camera",
      "menu Recortar junto do menu Tamanho da imagem",
      "lixeira removida do menu",
      "Brush desenhando no canvas no modo pixel alinhado! agora sim da pra fazr pixelart",
      "cria 4 quadros automaticamente.",
      "menu animação nao some automagicamente",
      "menu zoomx",
      "recortar funcionando",
    ],
  },
  {
    versao: "1.9.4",
    notas: [
      "Timeline da animação com arrasta e solta para mudar os quadros de lugar. tb podese soltar os quadros sobre a lixeira ou sobre o clone :)",
      "📷 controle total das configuraçoes da camera com zoom e tudo mais. ",
      "🪄 Efeitos no quadro (precisa aprimorar) mas funciona",
      "😆 A página principal do site também está ficando divertida! cuidado com o monstro!",
    ],
  },
  {
    versao: "1.8.5",
    notas: [
      "🧽 alerta para modo apagador ativado",
      "♾️ Modo de pintura Infinito (t ile-map, backgrounds, pintura de ladrilho)",
      "<span class='icon custombrushicon'></span>" +
      "função de pincel personalizado. transforma sua arte em um pincel." +
      "<br>(dica abuse da transparencia 💧 e apagador 🧽 para criar belos pincéis ;)",
      "😍 modulo do emoji-picker incorporado ao codigo e tambem com tile paint",
    ],
  },
  {
    versao: "1.7.4",
    notas: [
      "🔴⏱️ Botao de gravaçao automática de quadros por tempo",
      "<img src='img/crop.png'> recortar automático perfeito.",
      "codigos um pouco mais organizados.",
    ],
  },
  {
    versao: "1.6.5",
    notas: [
      "recortando os quadros com maior intervalo de tempo",
      "capturando quadros corretamente com maoir intervalo de tempo",
      "📷 testando troca de camera",
      "🎞️ unir fundo a animação ao exportar para colorir inclusive com opção de sobreposição para pintar por baixo",
      " salve antes de <img src='img/crop.png'> recortar ",
      " adeus mensagem de desenhe aqui.",
    ],
  },
  {
    versao: " 1.5.4",
    notas: [
      "🎚️ Transparencia do quadro",
      "📷 menu camera",
      '<span class="icon alerticon"></span> mudança no sistema de alerta',
      "📷 + 🎞️ camera faz sequencia de quadros conforme o click",
      "(sem quadros brancos)",
      "🎞️  Exporta Gif Animado (<img src='img/crop.png'>recortado inclusive) ",
      "❎ icone fechar janela padronizado",
      "<span class='icon pintaricon'></span> pincel suave como primeira opção",
      "- remoção de quadros aprimorada",
    ],
  },
  {
    versao: " 1.4.4",
    notas: [
      "🎞️carregar Animação como plano de fundo",
      "<img src='img/crop.png'> tesoura funcionando para toda animacão! (3 dias nisso aff)",
      "🪄 historico de pinceis usados",
      "🔲 pincel quadrado tamanho minimo 1 px",
      "🎞️ icone da animação mudou",
      "❎ icone fechar janela mudou",
      "💡 icone fechar janela mudou",
      "👓 Pixels alinhados + nitidez ",
      "🔎 Aproximação máxima passou para <b>32x</b> já que agora podemos desenhar pixels quadrados",
      " botao ➕ mostra o 💾 para lembrar de salvar.",
    ],
  },
  {
    versao: " 1.3.1",
    notas: [
      "1.1 Animação!!!",
      "1.1 Menu animação",
      "1.2 remove quadro",
      "1.2 Menu quadros por segundo",
      "1.3 botao + piscando pra lembrar de salvar o quadro",
      "1.3 botao clonar quadro de animação",
      "1.3.1 player fixo tamanho proporcional",
      "1.3.1 botao play/stop ",
    ],
  },
  {
    versao: " 1.0.3 c",
    notas: [
      "novo sistema de notas de versao",
      "mais ajustes no sistema de zoom",
      "esconde o cursor :)",
    ],
  },
  {
    versao: " 1.0.2",
    notas: [
      "opções de tamanho de tela (uau)",
      "(fix desfazer depois de limpar a tela.)",
      "(versoes.js criado para harmonizar o index.html)",
      "Cŕeditos mais bonitos ",
      "Zoom voltou a centralizar",
    ],
  },
  {
    versao: " 1.0.1",
    notas: [
      "Ferramenta de recorte está de volta 100%",
      "menu salvar com imput.",
      "redimensionar a tela ao enviar arquivo.",
    ],
  },
  {
    versao: " 0.9 beta",
    notas: [
      "menos botoes. mais menus.",
      "cursor do color picker corrigido",
      "menus mais bonitos",
    ],
  },
  {
    versao: " 0.9.9 alpha",
    notas: [
      "19/03/2023",
      "Novo estilo de pintura e pinceis",
      '< a href = "http://tricedesigns.com/sketching-with-html5-canvas-and-brush-images/" target = "blank" >com códigos de Andrew Trice</a >  ' +
      "menu apagar junto do menu pincel.",
    ],
  },
  {
    versao: "0.9.9",
    notas: [
      "arrumei o colorpicker ",
      "menus alterados",
      "emojis!",
      "alteracao do metodo de entrada (pointer)",
      "stopVideoStream quando fecha camera",
      "Novos pinceis dinamicos",
    ],
  },
  {
    versao: "0.9.8 ",
    notas: [
      "javascript e css em arquivos externos.",
      "recorte e rotação (desativado temporariamente) ",
      "contraste das imagens de grade alteradas",
      "incluídos index.css e index.js nas páginas",
      "novo index.html para o app",
      "realinhamento da tela (zoom)",
      "estilo mais minimalista",
    ],
  },
  {
    versao: "0.9.7",
    notas: [
      "nova rotacao do canvas. (em desenvolvimento)",
      "removido o canvas de recorte",
      "zoom 8x",
      "tela desvira depois da camera",
      "nova paleta de cores",
      "Cortar, Rotacionar",
      "menu tamanho da tela",
      "cores nos botoes",
      "importar somente gif bmp jpg",
      "mensagem de suporte depois do download",
    ],
  },
  {
    versao: "0.8",
    notas: [
      "uma série de mudanças e testes para recortar E girar a tela além do gerenciamento da memória",
    ],
  },
  {
    versao: "0.7",
    notas: ["tela vira quando muda camera"],
  },
  {
    versao: "0.6",
    notas: [
      "NOVO gerenciador de memória",
      "touchmovecursor",
      "melhora na troca de ferramenta",
      "desfazer mais leve",
      "Desfazer, refazer atualizado. ",
      "botões maiores e agregados",
      "função camera movida e transparencia arrumada",
      "camera centralizada (tnx Frederico for the help)",
      "seletor de cor (fix).",
    ],
  },
  {
    versao: "0.5 - Turing",
    notas: [
      "foto e fundo com tamanho",
      "inicia no modo noturno",
      "fundo xadrez",
      "Alerta ao fim do Crtl+Z e no Ctrl+Y ",
      "multiplas imagens podem ser inseridas",
      "pinta por cima ou por baixo",
      "night mode",
      "envia imagem.",
      "nova paleta de cores",
      "tamanhos pre definidos de pinceis. ",
      "refazer passo a passo. ",
      "apagador com transparencia propria.",
      "lupa com indicador de zoom. no lugar apropriado",
    ],
  },
  {
    versao: "0.4 (01/23)",
    notas: [
      '-reduzida a quantifdade de "desfazer" disponiveis porem salvaremos uma imagem que sera carregada' +
      'ao fundo o que pode influenciar na qualidade do projeto final.vamos ao teste."}',
    ],
  },
  {
    versao: "0.3",
    notas: [
      "Código refeito para guardar comandos e executa-los nas ações de desfazer e refazer.",
      "(update: 19 / 03 / 2023 isso será mudado muitas vezes!) ",
    ],
  },
  {
    versao: "0.2",

    notas: ["Salvar imagem", "Criação da paleta de cores"],
  },
  {
    versao: "0.1",
    notas: [
      " Uni códigos de Lei Mao com outro código de desenhar linhas de outro tutorial e criei dois modos de pincel além do modo apagar.",
      " Dai pra frente foi só doideira e claro que tudo isso com uma pitada de emojis no final.",
    ],
  },
];
let lavem = "";
function textao() {
  let len = vers.length;
  for (i = 0; i < len; i++) {
    lavem += "<br>";
    lavem += "<b>" + vers[i].versao + "</b><br>";
    let tete = vers[i].notas;
    let lenn = tete.length;
    for (k = 0; k < lenn; k++) {
      lavem += "🔹 " + vers[i].notas[k] + "<br>";
    }
  }
}
textao();
iD("versoes").innerHTML = lavem;
document.title = "Yoga Art " + vers[0].versao;
