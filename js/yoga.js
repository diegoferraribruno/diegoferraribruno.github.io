function yoga() {
    let rand = Math.floor(Math.random() * 42) * 64
    let yoga = 'Yoga!?<br><div style="background-Image:url(img/yoga.png); background-position:' + rand + 'px 0px; width:64px; height:77px; display:block; margin:auto" ></div><br>'
    Alert(yoga, 10)
    setTimeout(() => { yoga() }, 1800000)
}
yoga()