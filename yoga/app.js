let project = {
    size: {
        with: 3508,
        height: 2480
    },
    offset: { x: 0, y: 0 },
    background: {
        image: undefined,
        transparent: true,
        color: "#ffffff"
    },
    animation: {
        fps: 6,
        frames: 1
    },
    pixelGood: true
}

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

let cameraOffset = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
let cameraZoom = 1
let MAX_ZOOM = 32
let MIN_ZOOM = 0.27
let SCROLL_SENSITIVITY = 0.005

let mode = "paint";
var brush = new Image()
brush.src = "brush5.png"

let isDragging = false
let dragStart = { x: 0, y: 0 }

let ispaint = false

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let initialPinchDistance = null
let lastZoom = cameraZoom
let lastpinch = 4

let strokesize = { x: 32, y: 32 }

let comandos = []

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

    drawText("A4 300 dpi: width: " + project.size.with + " height: " + project.size.height + " ", -255, -70, 20, "courier")
    ctx.restore()

    // requestAnimationFrame(draw)
}

function draw(a, b, c, d) {
    ctx.save()
    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate(cameraOffset.x, cameraOffset.y)
    drawBrush(a, b, c, d)
    ctx.restore()

    // requestAnimationFrame(draw)
}
function redraw() {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Or Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at

    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate(-window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    drawCanvasSize()
    ctx.translate(window.innerWidth / 2, window.innerHeight / 2)

    comandosExec()
    ctx.restore()

    // requestAnimationFrame(draw)
}
draw1()
function drawCanvasSize() {
    var x = 0
    var y = 0;
    var width = project.size.with;
    var height = project.size.height;

    var borderWidth = 2;
    var offset = borderWidth * 2;

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(x - borderWidth, y - borderWidth, width + offset, height + offset);
    ctx.fillStyle = project.background.color;
    if (project.background.transparent) {
        ctx.globalCompositeOperation = 'destination-out'
    }
    ctx.fillRect(x, y, width, height);
    if (project.background.transparent) {
        ctx.globalCompositeOperation = 'destination-over'
    }
}
// Gets the relevant location from a mouse or single touch event
function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY) {
        return { x: e.clientX, y: e.clientY }
    }
}

function drawRect(x, y, width, height) {
    ctx.fillRect(x, y, width, height)
}

function drawText(text, x, y, size, font) {
    ctx.font = `${size}px ${font}`
    ctx.fillText(text, x, y)
}
function comandosExec() {
    let len = comandos.length
    if (len != 0) {
        for (i = 0; i < len; i++) {
            let comando = comandos[i]
            if (comando[0] == "GCO") {
                ctx.globalCompositeOperation = comando[1]
            } else {
                drawBrush(comando[0], comando[1], comando[2], comando[3])
            }
        }
    }
}

async function drawBrush(x1, y1, x2, y2, cont = ctx) {
    let start
    let end
    if (project.pixelGood) {
        start = { x: (x1 / cameraZoom) * cameraZoom, y: (y1 / cameraZoom) * cameraZoom }
        end = { x: (x2 / cameraZoom) * cameraZoom, y: (y2 / cameraZoom) * cameraZoom }
    } else {
        start = { x: x1, y: y1 }
        end = { x: x2, y: y2 }
    }
    var halfBrushW = strokesize.x / 2;
    var halfBrushH = strokesize.y / 2;
    var distance = parseInt(Trig.distanceBetween2Points(start, end));
    var angle = Trig.angleBetween2Points(start, end);
    var x, y;
    cont.lineWidth = strokesize.x;

    for (var z = 0; (z <= distance || z == 0); z++) {
        x = start.x + (Math.sin(angle) * z) - halfBrushW;
        y = start.y + (Math.cos(angle) * z) - halfBrushH;
        if (strokesize.x == 1 || strokesize.y == 1) {
            x = redondo(x) + 1
            y = redondo(y) + 1
        }
        cont.drawImage(brush, x, y, strokesize.x, strokesize.y);
    }
}

var Trig = {
    distanceBetween2Points: function (point1, point2) {

        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    },

    angleBetween2Points: function (point1, point2) {

        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return Math.atan2(dx, dy);
    }
}

function onPointerDown(e) {
    dragStart.x = Math.floor(getEventLocation(e).x / cameraZoom - cameraOffset.x - strokesize.x / 2)
    dragStart.y = Math.floor(getEventLocation(e).y / cameraZoom - cameraOffset.y - strokesize.y / 2)
    if (mode === "paint" || mode === "erase") {
        let comando = [dragStart.x, dragStart.y, dragStart.x, dragStart.y]
        comandos.push(comando)

        draw(dragStart.x, dragStart.y, dragStart.x, dragStart.y)
        ispaint = true
    } else {

        isDragging = true
    }
}

function onPointerUp(e) {
    isDragging = false
    ispaint = false
    initialPinchDistance = null
    lastZoom = cameraZoom
}

function onPointerMove(e) {
    if (ispaint) {
        offsetX = canvas.getBoundingClientRect().left;
        offsetY = canvas.getBoundingClientRect().top;
        let x = getEventLocation(e).x / cameraZoom - cameraOffset.x - offsetX
        let y = getEventLocation(e).y / cameraZoom - cameraOffset.y - offsetY
        let comando = [x, y, dragStart.x, dragStart.y]
        comandos.push(comando)
        draw(x, y, dragStart.x, dragStart.y)
        dragStart.x = x
        dragStart.y = y

    }
    if (isDragging) {
        cameraOffset.x = getEventLocation(e).x / cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y / cameraZoom - dragStart.y
        redraw()
    }

}

function handleTouch(e, singleTouchHandler) {
    if (e.touches.length == 1) {
        singleTouchHandler(e)
    }
    else if (e.type == "touchmove" && e.touches.length == 2) {
        isDragging = false
        handlePinch(e)
    }
}

function handlePinch(e) {
    e.preventDefault()

    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }

    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = Math.abs(touch1.x - touch2.x) / 2 + Math.abs(touch1.y - touch2.y) / 2

    let distX = Math.floor(currentDistance / 50)
    if ((distX % 1) == 0 && distX != lastpinch) {
        lastpinch = distX
        let centerpos = { x: (touch1.x + touch2.x) / 2, y: (touch1.y - touch2.y) / 2 }
        if (initialPinchDistance == null) {
            initialPinchDistance = currentDistance
        }
        else {
            if (currentDistance > initialPinchDistance) {
                adjustZoom(1, null, centerpos.x, centerpos.y)
            } else if (currentDistance < initialPinchDistance) {
                adjustZoom(-1, null, centerpos.x, centerpos.y)
            }

        }
    }
}

function adjustZoom(zoomAmount, zoomFactor, x, y) {

    if (!isDragging) {

        if (zoomAmount > 0) {
            cameraZoom *= 2
        } else if (zoomAmount < 0) {
            cameraZoom /= 2
        }
        else if (zoomFactor) {
            if (zoomFactor > 1) {
                cameraZoom *= 2
            } else if (zoomFactor < 1) {
                cameraZoom /= 2
            }
            //  cameraZoom = zoomFactor * lastZoom
        }
        cameraZoom = Math.min(cameraZoom, MAX_ZOOM)
        cameraZoom = Math.max(cameraZoom, MIN_ZOOM)
        if (cameraZoom == MIN_ZOOM) {
            cameraOffset.x = window.innerWidth / 2
            cameraOffset.y = window.innerHeight / 2
        } else if (cameraZoom > 1 && cameraZoom < 2) {
            cameraZoom = 1
            cameraOffset.x = Math.floor(-dragStart.x + window.innerWidth / 2 / cameraZoom) // 2 cameraOffset.x - Math.abs(cameraOffset.x - x - window.innerWidth / 2) / 4
            cameraOffset.y = Math.floor(-dragStart.y + window.innerHeight / 2 / cameraZoom)// 2 cameraOffset.x - Math.abs(cameraOffset.y - y - window.innerHeight / 2) / 4
        } else {
            cameraOffset.x = Math.floor(-dragStart.x + window.innerWidth / 2 / cameraZoom) // 2 cameraOffset.x - Math.abs(cameraOffset.x - x - window.innerWidth / 2) / 4
            cameraOffset.y = Math.floor(-dragStart.y + window.innerHeight / 2 / cameraZoom)// 2 cameraOffset.x - Math.abs(cameraOffset.y - y - window.innerHeight / 2) / 4
        }
        redraw()
        setTimeout(() => { let x1 = document.getElementById("x1"); if (x1) { x1.innerHTML = cameraZoom + "x" } }, 10)
    }
}

function zoom(value) {
    if (value) {
        adjustZoom(value, null, dragStart.x, dragStart.y)
    } else {
        modeTo("zoom")
        criaCabeca()
    }
}

function resetZoom() {
    cameraZoom = 1
    cameraOffset.x = window.innerWidth / 2
    cameraOffset.y = window.innerHeight / 2
    redraw()

}

function scrollMoveCanva(x, y) {
    cameraOffset.x -= x / cameraZoom
    cameraOffset.y -= y / cameraZoom
    redraw()
}
canvas.addEventListener('mousedown', onPointerDown)
canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
canvas.addEventListener('mouseup', onPointerUp)
canvas.addEventListener('touchend', (e) => handleTouch(e, onPointerUp))
canvas.addEventListener('mousemove', onPointerMove)
canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
canvas.addEventListener('wheel', (e) => { e.preventDefault(); adjustZoom(e.deltaY, null, e.clientX, e.clientY) })

// Ready, set, go