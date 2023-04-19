let filters = ["none", "grayscale(1)", "sepia(80%)", "contrast(150%)", "contrast(300%)", "blur(2px)", "invert()"]
let fx = 0
function FX(qual) {
    if (qual == undefined) {
        fx++;
        if (fx >= filters.length) {
            fx = 0
        }
    } else {
        fx = qual
    }
    context.filter = filters[fx]
    comando = ["FX", fx]
    comandos.push(comando)
    setTimeout(() =>
        comandosExec()
        , 2)
}