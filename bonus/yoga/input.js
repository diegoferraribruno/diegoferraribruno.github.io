// Gets the relevant location from a mouse or single touch event
function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY) {
        return { x: e.clientX, y: e.clientY }
    }
}


function onPointerDown(e) {
    dragStart.x = Math.floor(getEventLocation(e).x)
    dragStart.y = Math.floor(getEventLocation(e).y)
    if (mode === "paint" || mode === "erase") {
        let comando = [dragStart.x, dragStart.y, dragStart.x, dragStart.y, strokesize.x, strokesize.y]
        comandos.push(comando)

        draw(dragStart.x, dragStart.y, dragStart.x, dragStart.y, strokesize.x, strokesize.y)
        ispaint = true
    } else {

        isDragging = true
    }
}

function onPointerUp(e) {
    isDragging = false
    if (ispaint) { canvasFrontToImg() }
    ispaint = false
    initialPinchDistance = null
    lastZoom = cameraZoom

}

function onPointerMove(e) {
    if (e.clientX && e.clientY) {

        let x0 = getEventLocation(e).x
        let y0 = getEventLocation(e).y
        if (ispaint) {
            offsetX = canvasFront.getBoundingClientRect().left;
            offsetY = canvasFront.getBoundingClientRect().top;
            let x = x0 - offsetX
            let y = y0 - offsetY
            draw(x, y, dragStart.x, dragStart.y, strokesize.x, strokesize.y)
            let comando = [x, y, dragStart.x, dragStart.y, strokesize.x, strokesize.y]
            comandos.push(comando)
            dragStart.x = x
            dragStart.y = y

        }
        if (isDragging) {
            cameraOffset.x = x0 / cameraZoom - dragStart.x
            cameraOffset.y = y0 / cameraZoom - dragStart.y
            redraw()
        }
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
        else if (mode = "zoom") {
            if (currentDistance > initialPinchDistance) {
                adjustZoom(1, null, centerpos.x, centerpos.y)
            } else if (currentDistance < initialPinchDistance) {
                adjustZoom(-1, null, centerpos.x, centerpos.y)
            }

        } else if (mode == "paint") {
            let comando = [touch1.x, touch1.y, touch2.x, touch2.y, strokesize.x, strokesize.y]
            comandos.push(comando)
            draw(touch1.x, touch1.y, touch2.x, touch2.y, strokesize.x, strokesize.y)
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
