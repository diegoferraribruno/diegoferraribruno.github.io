
var useFrontCamera = true;
var stop_motion = false;

function stopMotion() {
    stop_motion = !stop_motion
    iD("video").classList.toggle("destination-over")
    if (stop_motion == false) {
        iD("stopMotion").innerHTML = '<span class="icon2 cameraicon"></span>'

        canvas.style.opacity = 1
        Alert(alerts[language][2], 2);
    } else {
        Alert(alerts[language][3], 2);
        iD("stopMotion").innerHTML = '<span class="icon filmicon"></span>'
        canvas.style.opacity = 0.3
    }
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

let fotografando = false
function camera() {

    if (!iD("videoC")) {
        const botao2 = iD("stopMotion")
        const botao = iD("btnChangeCam")

        const videoE = document.createElement("video");
        const escala = canvas.height / canvas.width
        videoE.id = "video"
        videoE.height = canvas.height; // in px
        videoE.width = redondo(430 * (escala)); // in px
        videoE.setAttribute('style', ` width:auto; height:auto;`)
        if (stop_motion == true) videoE.setAttribute("class", "destination-over")


        let vcW = redondo(430 * escala * 2);
        let vcH = redondo(320 * escala * 2);
        const videoC = document.createElement("div");
        videoC.setAttribute("style", `display:flex; width:${vcW}px; height:${vcH}px; position:absolute; top:0px;`)
        videoC.setAttribute("id", "videoC")
        videoC.appendChild(videoE);
        canvasDiv.appendChild(videoC)


        fotografando = false
        if (stop_motion == true) {
            botao2.innerHTML = '<span class="icon filmicon"></span>'
            videoC.style.opacity = 0.6
            Alert(alerts[language][3]);

            canvas.style.opacity = 0.3
        } else {
            botao2.innerHTML = ' <span class="icon2 cameraicon"></span>'
            Alert(alerts[language][2]);
            videoC.style.opacity = 1
            canvas.style.opacity = 1
        }
        videoE.toggleAttribute("autoplay", "autoplay")
        videoE.toggleAttribute("playsinline", "playsinline")
        if (globalComposite == "destination-over") {
            videoE.setAttribute("class", "destination-over");
        }
        if (
            !"mediaDevices" in navigator ||
            !"getUserMedia" in navigator.mediaDevices
        ) {
            Alert(alerts[language][4]);
            return;
        }

        // get page elements
        const video = document.querySelector("#video");
        const canvasV = document.querySelector("#canvasV");
        //Detect camera resolution using pause/play loop.
        var retryCount = 0;
        var retryLimit = 25;
        video.onplaying = function (e) {
            var videoWidth = this.videoWidth;
            var videoHeight = this.videoHeight;
            if (!videoWidth || !videoHeight) {
                if (retryCount < retryLimit) {
                    retryCount++;
                    window.setTimeout(function () {
                        video.pause();
                        video.play();
                    }, 100);
                }
                else {
                    video.onplaying = undefined; //Remove event handler.
                    console.log('Failed to detect camera resolution after ' + retryCount + ' retries. Giving up!');
                }
            }
            else {
                video.onplaying = undefined; //Remove event handler.
                let proporcao = videoWidth / videoHeight

                let canvas = iD("canvas")
                let videoC = iD("videoC")

                let escala = canvas.width / 320
                let vcW = 430 * escala;
                let vcH = 321 * escala;

                if (proporcao > 1) {
                    canvasV.height = canvas.height
                    canvasV.width = canvas.height * proporcao

                    let offsetW = (parseInt(videoC.style.width, 10) - canvas.width) * escala
                    let offsetH = -canvas.height - 5
                    videoC.setAttribute("style", `display: flex; width:100%; height:100%; justify-content: center; position:absolute; top:0px;`)
                } else {
                    proporcao = videoHeight / videoWidth
                    canvasV.width = canvas.width
                    canvasV.height = canvas.width * proporcao

                    let offsetW = (parseInt(videoC.style.height, 10) - canvas.height) * escala
                    let offsetH = - canvas.height * escala - ((canvasV.height - canvas.height) / 2)
                    videoC.setAttribute("style",
                        ` position:absolute; top:0px; display: flex; width:100%; height:100%; flex-direction: column; justify-content: space-between;`)
                }
            }
        };

        video.addEventListener('click', tirafoto)

        initializeCamera();

    }
}

function changeRecSpeed(value) {
    recspeed = value * 1000
}
let recspeed = 1000

function recMotion() {
    let vezes = iD("times").value
    if (iD("anime").classList.contains("hideanime")) {
        limpaAnime()

    }
    if (workingframe > 0) {
        newFrame()
    }
    //tirafoto()
    for (i = 0; i < vezes; i++) {
        setTimeout(() => {

            let W = canvasV.width;
            let H = canvasV.height;
            let offsetW = (W - canvas.width) / -2
            let offsetH = (H - canvas.height) / -2
            contextV.drawImage(video, 0, 0, W, H)
            context.drawImage(canvasV, offsetW, offsetH, W, H)

            Historia()
            //desenha("f", globalComposite, blob, offsetW, offsetH, canvas.height, canvas.width)
            setTimeout(() => {
                // saveFrame(blob)
                newFrame()
                Alert("🔴 Rec", (recspeed - 200) / 1000)
            }, 10)

        }, recspeed * i)
    }
    setTimeout(() => { removeVideo(); removeFrame() }, recspeed * i + 100)
}
async function tirafoto() {
    if (fotografando == false) {
        fotografando = true
        let W = canvasV.width;
        let H = canvasV.height;
        let offsetW = (W - canvas.width) / -2
        let offsetH = (H - canvas.height) / -2
        contextV.drawImage(video, 0, 0, W, H)
        if (
            !isCanvasBlank(canvasV)
        ) {
            if (stop_motion == false) {
                drawTo(globalComposite, canvasV, context, offsetW, offsetH, W, H)
                setTimeout(() => {

                    Historia()
                    removeVideo();
                    fotografando = false

                }, 200)
            } else {

                if (!isCanvasBlank(canvas)) {
                    newFrame()
                }
                setTimeout(() => {
                    drawTo(globalComposite, canvasV, context, offsetW, offsetH, W, H)
                    setTimeout(() => {
                        Historia()
                        fotografando = false
                        if (!isCanvasBlank(canvas)) {
                            newFrame()
                        }
                    }, 200)
                }, 20)
            }
        }
    }
}



const select = iD('select');
const button = iD('sbutton');
const cameras = []
var selectedCam = 0
function gotDevices(mediaDevices) {
    select.appendChild(document.createElement('option'));
    let count = 1;
    mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = mediaDevice.deviceId;
            cameras.push(mediaDevice.deviceId)
            const label = mediaDevice.label || `Camera ${count++}`;
            const textNode = document.createTextNode(label);
            option.appendChild(textNode);
            select.appendChild(option);
         //   console.log(mediaDevice)
        }
    });
}
function trocaCamera() {
    setTimeout(() => {
        constraints.video.deviceId = { exact: select.value };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
                currentStream = stream;
                video.srcObject = stream;
                initializeCamera();
                return navigator.mediaDevices.enumerateDevices();
            })
            .catch(error => {
                console.error(error);
            });
    }, 0)
    stopVideoStream()


}

function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d', [{ willReadFrequently: true }]);

    const pixelBuffer = new Uint32Array(context.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    return !pixelBuffer.some(color => color !== 0);
}
function canvasOpacity(value) {
    canvas.style.opacity = value
    let vid = iD("video")
    if (vid) { vid.style.opacity = value }
}

function changeCamera() {
    selectedCam++
    if (selectedCam == cameras.length) {
        selectedCam = 0
    }
    constraints.video.deviceId = { exact: cameras[selectedCam] };

    initializeCamera();
}
function flipCamera() {
    win.classList.toggle("flip");
}
function removeVideo() {
    canvas.style.opacity = 1
    setTimeout(() => {
        stopVideoStream()
        removeElement("video")
        removeElement("videoC")
        if (oldMode == "cam" || oldMode == "zoomx") {
            modeTo("apagar")
        } else {
            modeTo(oldMode)
        }
        setTimeout(() => {
            removeClass("flip");
            removeClass();
        }, 200)
        img_b64 = [];
        blob = []
    }, 10)
}

// video constraints
const constraints = {
    video: {
        width: {
            min: 480,
            ideal: 1920,
            max: 1920,
        },
        height: {
            min: 320,
            ideal: 1080,
            max: 1080,
        },
    },
    advanced: [{
        exposureMode: 'manual'
    },
    {
        whiteBalanceMode: 'manual',
    },
    {
        focusMode: "manual"
    }]
};

// stop video stream

function stopVideoStream() {
    if (videoStream) {
        videoStream.getTracks().forEach((track) => {
            track.stop();
        });
    }
}


async function initializeCamera() {
    stopVideoStream();
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";
    if (constraints.video.facingMode == "user") { win.classList.add("flip"); } else {
        win.classList.remove("flip");
    }
    var capabilities = navigator.mediaDevices.getSupportedConstraints()
    try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;

        const [track] = videoStream.getVideoTracks();

        //  cam config menu
        try {
            capabilities = track.getCapabilities();
            const settings = track.getSettings();
            for (const [key, value] of Object.entries(capabilities)) {


                if (value[0] == "manual") {
                    let constr = { "advanced": [{ [key]: "continuous" }] }
                    let checkbo = iD([key])
                    checkbo.oninput = async function () {
                        if (checkbo.checked == true) {
                            valor = 'manual'
                        } else if (checkbo.checked == false) {
                            valor = 'continuous'
                        }
                        await videoStream.getVideoTracks()[0].applyConstraints({ advanced: [{ [key]: valor }] })
                      //  console.log(valor)
                    }
                    track.applyConstraints(constr)
                    //console.log(`${key}: ${value}`);
                }
            }
            const comumConstraints = ["sharpness", "contrast", "saturation", "exposureTime", "colorTemperature", 'brightness', 'focusDistance', 'pan', 'tilt', 'zoom', "exposureCompensation", "iso"]
            for (const ptz of comumConstraints) {
                // Check whether pan/tilt/zoom is available or not.
                const inputdiv = iD(ptz + "Div")
                //console.log(inputdiv)
                if (ptz in settings) {

                    inputdiv.style.display = "inline-block"
                    // Map it to a slider element.
                    const input = iD(ptz);
                    input.min = capabilities[ptz].min;
                    input.max = capabilities[ptz].max;
                    input.step = capabilities[ptz].step;
                    input.value = settings[ptz];
                    // input.disabled = false;
                    input.oninput = async function () {
                        await videoStream.getVideoTracks()[0].applyConstraints({ advanced: [{ [ptz]: input.value }] })
                    }
                } else {
                    inputdiv.style.display = "none"
                    const input = iD(ptz).style.visibility = "hidden"
                }
            }
            // automenu
            const jatem = ["whiteBalanceMode", "focusMode", "exposureMode"]
            const comum = iD("comumConstraints")
            comum.innerHTML = ' <span class="iconsmall alerticon"></span> Extras <span class="iconsmall alerticon"></span>'
            for (const [pts, value] of Object.entries(capabilities)) {
                if (!(comumConstraints.includes(pts) || jatem.includes(pts))) {

                    const config = document.createElement('div');
                    config.innerHTML = pts
                    comum.appendChild(config)
                    // Map it to a slider element.
                    const input = document.createElement('input');

                    input.id = pts
                    input.value = settings[pts];
                    //input.value = value
                    if (typeof value === 'object' &&
                        !Array.isArray(value) &&
                        value !== null) {


                        if (capabilities[pts].step) {

                            input.type = "range"
                            input.min = capabilities[pts].min;
                            input.max = capabilities[pts].max;
                            input.step = capabilities[pts].step;
                            input.value = settings[pts];
                        }
                    } else if (Array.isArray(value)) {
                        if (value[0] == "manual") {

                            config.innerHTML += " manual "
                            input.type = "checkbox"
                            input.checked == false

                        }
                    }
                    else {
                        input.value = settings[pts];
                    }


                    config.appendChild(input)
                    input.oninput = async function () {
                        await videoStream.getVideoTracks()[0].applyConstraints({ advanced: [{ [pts]: input.value }] })
                    }
                }
            }
            //end automenu
        } catch {
            iD("camoptions").innerHTML = "Sinto muito.<br>Seu navegador não possui a função de acesso aos recursos avançados.<br>Use o Google Chrome para usar este menu e mudar as configurações da camera"

        }

    } catch (err) {
        console.log(err)
        Alert(alerts[language][5]);
    }
}