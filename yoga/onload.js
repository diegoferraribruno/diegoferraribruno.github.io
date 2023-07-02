document.addEventListener("DOMContentLoaded", startup);

function startup() {
    canvasFront.addEventListener('mousedown', onPointerDown)
    canvasFront.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
    canvasFront.addEventListener('mouseup', onPointerUp)
    canvasFront.addEventListener('touchend', (e) => handleTouch(e, onPointerUp))
    canvasFront.addEventListener('mousemove', onPointerMove)
    canvasFront.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
    canvasFront.addEventListener('wheel', (e) => { e.preventDefault(); adjustZoom(-1 * e.deltaY, null, e.clientX, e.clientY) })
    draw1()
}


function draw1() {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Or Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at

    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate(-window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    drawCanvasSize()

    ctx.translate(window.innerWidth / 2, window.innerHeight / 2)

    ctx.fillStyle = "#00dd55"
    drawRect(-35, -35, 20, 20)
    drawRect(15, -35, 20, 20)
    drawRect(-35, 15, 70, 20)

    ctx.fillStyle = "#fff"
    drawText("Yoga Paint", -255, -130, 32, "courier")
    drawText("Center and zoom Canvas", -255, -100, 32, "courier")

    ctx.rotate(-31 * Math.PI / 180)
    ctx.fillStyle = `#${(Math.round(Date.now() / 40) % 4096).toString(16)}`
    drawText("HD", 50, -120, 32, "courier")

    ctx.fillStyle = "#fff"
    ctx.rotate(31 * Math.PI / 180)

    drawText("A4 300 dpi: width: " + art.size.width + " height: " + art.size.height + " ", -255, -70, 20, "courier")
    ctx.restore()
}