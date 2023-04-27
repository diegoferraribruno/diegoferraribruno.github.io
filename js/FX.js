let filters = ["none", "invert", "blur", "grayscale", "sepia", "contrast",]
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
    if (fx != 0) {

        if (fx > 3) {
            let quanto = document.getElementById(filters[fx] + "Bar").value

            context.filter = filters[fx] + "(" + quanto + "%)"

        } else if (fx == 1) {

            context.filter = filters[fx] + "()"
        } else if (fx == 2) {
            let quanto = document.getElementById(filters[fx] + "Bar").value

            context.filter = filters[fx] + "(" + quanto + "px)"
        } else if (fx == 3) {
            let quanto = document.getElementById(filters[fx] + "Bar").value

            context.filter = filters[fx] + "(" + quanto + ")"

        }
        Alert("filtro " + filters[fx] + " aplicado")
        comando = ["FX", fx]
        comandos.push(comando)

    } else {

        context.filter = filters[fx]
        Alert("filtro " + filters[fx] + " aplicado")
        comando = ["FX", fx]
        comandos.push(comando)
    }
    setTimeout(() => { restoreCanvas() }
        , 30)
}