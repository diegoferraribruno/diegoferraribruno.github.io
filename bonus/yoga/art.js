const art = {
    date: Date,
    size: {
        width: 3508,
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
        frames: 1,
        currentFrame: 0,
        currentLayer: 0,
        curretObject: 0,
    },
    usedBrushes: [],
    customBrushes: [],
    sounds: {},
    images: {},
    pixelGood: false,
    tilePaint: true,
    frame: {
        0: {
            layer: {
                0: {
                    objects: [],
                    settings: {
                        FX: "none",
                        top: 0,
                        left: 0,
                        isMask: false,
                    }
                },
                1: {
                    objects: [],
                    settings: {
                        FX: "none",
                        top: 0,
                        left: 0,
                        isMask: false,
                    }
                }
            }
        },
        1: {
            layer: {
                0: {
                    comandos: [],
                    settings: {
                        FX: "none",
                        top: 0,
                        left: 0,
                        isMask: false,
                    }
                }, //f rame 0 layer 0 is empty
                1: {
                    comandos: [],
                    settings: {
                        FX: "none",
                        top: 0,
                        left: 0,
                        isMask: false,
                    }
                }
            }
        }

    }
}

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')
let canvasFront = document.getElementById("canvasFront")
let ctxF = canvasFront.getContext('2d')
let canvasRender = document.getElementById("canvasRender")
let ctxR = canvasRender.getContext('2d')

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

canvasFront.width = window.innerWidth
canvasFront.height = window.innerHeight

let initialPinchDistance = null
let lastZoom = cameraZoom
let lastpinch = 4

let strokesize = { x: 32, y: 32 }

let comandos = []
let layers = {
    0: []
}

var images = []
let dimensions = {
    x1: art.size.width,
    x2: 1,
    y1: art.size.height,
    y2: 1
}
