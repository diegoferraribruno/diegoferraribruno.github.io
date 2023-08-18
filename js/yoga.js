
function yoga() {

    removeClass()
    quem = iD("menuyoga");
    quem.classList.toggle("aparece");
    yogaChange()
    setTimeout(() => { yoga() }, 1800000)
    //setTimeout(() => { document.getElementById("menuyoga").classList.remove("aparece") }, 60000)
}
function yogaChange() {
    let rand = Math.floor(Math.random() * 42) * 64
    document.getElementById("yogapose").style.backgroundPosition = rand + 'px 0px';
}