var zumbi = {
    id: "player",
    name: "",
    serverPlayerPos: { x: 180, y: 660 },
    left: 40,
    top: 1565,
    width: 128,
    height: 200,
    face: 0,
    hue: 0,
    frame:0,
    frames:6,
    speed:20,
    reverse:false,
}
var corpo = iD("corpo-" + id);

setInterval(function () {
        let corpo = iD("zumbi");
        let position = zumbi.frame * 128;
        //corpo.style.background: 'url("standing-32.png") '${position}'px 0px';
        corpo.style.backgroundPosition = `-${position}px 0px`;
    
    zumbi.frame++;
    if (zumbi.frame >= zumbi.frames) {
        zumbi.frame = 0
    }
    if (zumbi.reverse == false)   {
    zumbi.left += zumbi.speed
    } else{
    zumbi.left -= zumbi.speed
    }
    if (zumbi.left > gameSize.width -128)   {
        zumbi.reverse = true
        corpo.className = "headl";
    } else if(zumbi.left <10){
        corpo.className = "head";
        zumbi.reverse=false
        }
    corpo.style.left = zumbi.left+ "px"
},
    90);
//setInterval(movePlayer, 20)
//let flip = 1;

