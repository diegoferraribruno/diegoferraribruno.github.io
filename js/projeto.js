var project = {
    date: Date,
    currentFrame: 0,
    canvasSize: {
        width: canvas.width,
        height: canvas.height
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
                    comandos: [],
                    settings: {
                        FX: "none",
                        top: 0,
                        left: 0,
                        isMask: false,
                    }
                },
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

