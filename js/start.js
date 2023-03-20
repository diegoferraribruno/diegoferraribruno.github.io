let startText = 0
let texts = [["🖐 😍 - oie.", "desenhe aqui.", "🖌️ 👆️"], ["Ou tire uma 📷", "depois apague 🧽,", "use o modo por trás ⭕,"], ["e tire outra 📷", "para fazer uma bela", "foto-montagem."]]
function start() {

  setTimeout(() => {

    if (comandos.length == "1") {
      // alert("desenha no xadrez")
      context.font = 24 + 'px serif';
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(texts[startText][0], 160, 120)
      context.fillText(texts[startText][1], 160, 160)
      context.fillText(texts[startText][2], 160, 200)
      setTimeout(() => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        comandosExec();
      }, 2500);
      startText++
      if (startText >= texts.length) {
        startText = 0
      }
      start()
      limpaCabeca();

    }
  }, 2700);
}
start()
