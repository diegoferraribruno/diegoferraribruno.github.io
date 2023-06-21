function yoga() {
    let rand = Math.floor(Math.random() * 42) * 64
    let yogat = 'Yoga!?<br><div style="background-Image:url(img/yoga.png); background-position:' + rand + 'px 0px; width:64px; height:77px; display:block; margin:auto" onClick="removeClass()"></div><br>'
    Alert(yogat, 10)
    setTimeout(() => { yoga() }, 1800000)
}
