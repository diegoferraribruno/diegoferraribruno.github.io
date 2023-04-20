
var useFrontCamera = true;
var stop_motion = true

function stopMotion() {
    stop_motion = !stop_motion
    document.getElementById("video").classList.toggle("destination-over")
    if (stop_motion == false) {
        document.getElementById("stopMotion").innerHTML = "📷"

        canvas.style.opacity = 1
        Alert("Modo foto 📷.");
    } else {
        Alert("Modo sequencia de quadros 🎞️.");
        document.getElementById("stopMotion").innerHTML = "🎞️"
        canvas.style.opacity = 0.3
    }
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

let fotografando = false
function camera() {

    // ok, browser supports it*/
    if (!document.getElementById("videoC")) {
        const botao2 = document.getElementById("stopMotion")

        // botao2.setAttribute("onmousedown", "stopMotion()")
        //botao2.setAttribute("style", "position: absolute; top: 180px; left:40px; width:32x; height:32px; font-size:32px; opacity:0.5 ")


        const botao = document.getElementById("btnChangeCam")
        //botao.setAttribute("value", "muda")
        //        botao.setAttribute("class", "bloquinho")
        //botao.setAttribute("style", "position: absolute; top: 220px; left:40px; width:32x; height:32px; font-size:32px; opacity:0.5 ")
        //botao.innerHTML = "🔃"
        const videoE = document.createElement("video");
        const escala = canvas.height / 320
        videoE.id = "video"
        videoE.height = canvas.height; // in px
        videoE.width = redondo(430 * (escala)); // in px
        videoE.setAttribute('style', `position:relative; width:auto; height:auto;`)
        if (stop_motion == true) videoE.setAttribute("class", "destination-over")


        let vcW = redondo(430 * escala * 2);
        let vcH = redondo(320 * escala * 2);
        const videoC = document.createElement("div");
        videoC.setAttribute("style", `display:flex; width:${vcW}px; height:${vcH}px; `)
        videoC.setAttribute("id", "videoC")
        videoC.appendChild(videoE);
        //videoC.appendChild(botao);
        //videoC.appendChild(botao2);

        canvasDiv.appendChild(videoC)
        setTimeout(() => win.classList.add("flip"), 900)
        fotografando = true
        if (stop_motion == true) {
            botao2.innerHTML = "🎞️"
            videoC.style.opacity = 0.6
            Alert("Modo sequencia de quadros 🎞️.");

            canvas.style.opacity = 0.3
        } else {
            botao2.innerHTML = "📷"
            Alert("Modo foto 📷.");
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
            Alert("Camera API is not available in your browser");
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

                let canvas = document.getElementById("canvas")
                let videoC = document.getElementById("videoC")

                let escala = canvas.width / 320
                let vcW = 430 * escala;
                let vcH = 321 * escala;

                if (proporcao > 1) {
                    canvasV.height = canvas.height
                    canvasV.width = canvas.height * proporcao

                    let offsetW = (parseInt(videoC.style.width, 10) - canvas.width) * escala
                    let offsetH = -canvas.height - 5
                    videoC.setAttribute("style", `margin-top:${offsetH}px; display: flex; width:100%; height:100%; justify-content: center;`)
                } else {
                    proporcao = videoHeight / videoWidth
                    canvasV.width = canvas.width
                    canvasV.height = canvas.width * proporcao

                    let offsetW = (parseInt(videoC.style.height, 10) - canvas.height) * escala
                    let offsetH = - canvas.height * escala - ((canvasV.height - canvas.height) / 2)
                    videoC.setAttribute("style",
                        `margin-top:${offsetH}px; display: flex; width:100%; height:100%; flex-direction: column; justify-content: space-between;`)
                }
            }
        };

        video.addEventListener('click', tirafoto)

        initializeCamera();

    }
}
function recMotion() {
    let vezes = document.getElementById("times").value * fps
    for (i = 0; i < vezes; i++) {
        setTimeout(() => {
            let W = canvasV.width;
            let H = canvasV.height;
            let offsetW = (W - canvas.width) / -2
            let offsetH = (H - canvas.height) / -2
            contextV.drawImage(video, 0, 0, W, H)
            if (
                !isCanvasBlank(canvasV)
            ) {
                img_b64 = canvasV.toDataURL("image/png");
                blob = dataURItoBlob(img_b64)
                if (blob != undefined) {

                    desenha("f", globalComposite, blob, offsetW, offsetH, canvas.height, canvas.width)
                } setTimeout(() => {

                    swapImg = canvas.toDataURL('image/png');

                    save_frame(swapImg)

                    workingframe++
                    changeFrame(workingframe)
                    document.getElementById("contador").innerHTML = workingframe
                }, 40)
            }
        }, 500 * i)
    }
}
async function tirafoto() {
    //console.log 
    if (fotografando == true) {
        fotografando = false
        let W = canvasV.width;
        let H = canvasV.height;
        let offsetW = (W - canvas.width) / -2
        let offsetH = (H - canvas.height) / -2
        contextV.drawImage(video, 0, 0, W, H)
        if (
            !isCanvasBlank(canvasV)
        ) {
            img_b64 = canvasV.toDataURL("image/png");
            blob = dataURItoBlob(img_b64)
            if (blob != undefined) {

                desenha("f", globalComposite, blob, offsetW, offsetH, canvas.height, canvas.width)
            }
        }
    }
    if (stop_motion == false) {
        removeVideo();
    } else {
        if (
            !isCanvasBlank(canvas)
        ) setTimeout(() => {

            swapImg = canvas.toDataURL('image/png');

            save_frame(swapImg)

            workingframe++
            changeFrame(workingframe)
            document.getElementById("contador").innerHTML = workingframe
        }, 30)
        /*   contextV.setTransform(1, 0, 0, 1, 0, 0);
        contextV.clearRect(0, 0, W, H);
        contextV.setTransform(1, 0, 0, 1, 0, 0);
        contextV.clearRect(0, 0, W, H);*/


        //audio2.play()
    }
    setTimeout(() => fotografando = true, 100)
}



const select = document.getElementById('select');
const button = document.getElementById('sbutton');
const cameras = []
var selectedCam = 0
function gotDevices(mediaDevices) {
    //select.innerHTML = '';
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
            console.log(mediaDevice)
        }
    });
}
function trocaCamera() {
    setTimeout(() => {
        constraints.video.deviceId = { exact: select.value };
        //camera()
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
                currentStream = stream;
                video.srcObject = stream;
                initializeCamera();
                return navigator.mediaDevices.enumerateDevices();
            })
            //.then(gotDevices)
            .catch(error => {
                console.error(error);
            });
    }, 0)
    stopVideoStream()
    //removeVideo()
    /*    if (typeof currentStream !== 'undefined') {
        stopMediaTracks(currentStream);
        }*/


}

function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(context.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    return !pixelBuffer.some(color => color !== 0);
}
function canvasOpacity(value) {
    canvas.style.opacity = value
    let vid = document.getElementById("video")
    if (vid) { vid.style.opacity = value }
}

function changeCamera() {
    //useFrontCamera = !useFrontCamera;
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
        //removeElement("btnChangeCam")
        if (oldMode == "cam" || oldMode == "zoom") {
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
            ideal: 960,
            max: 1920,
        },
        height: {
            min: 320,
            ideal: 640,
            max: 1920,
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

    try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;

        const [track] = videoStream.getVideoTracks();
        imageCapture = new ImageCapture(track);

        const capabilities = track.getCapabilities();
        const settings = track.getSettings();

        for (const [key, value] of Object.entries(capabilities)) {

            if (value[0] == "manual") {
                //console.log("criar checkbox:" + [key])
                let constr = { "advanced": [{ [key]: "continuous" }] }
                let checkbo = document.getElementById([key])
                checkbo.oninput = async function () {
                    if (checkbo.checked == true) {
                        valor = 'manual'
                    } else if (checkbo.checked == false) {
                        valor = 'continuous'
                    }
                    await videoStream.getVideoTracks()[0].applyConstraints({ advanced: [{ [key]: valor }] })
                    console.log(valor)
                }
                track.applyConstraints(constr)
                console.log(`${key}: ${value}`);
            }
        }

        // Warning: Chrome requires advanced constraints.
        for (const ptz of ["sharpness", "contrast", "saturation", "exposureTime", "colorTemperature", 'brightness', 'focusDistance', 'pan', 'tilt', 'zoom']) {
            // Check whether pan/tilt/zoom is available or not.
            const inputdiv = document.getElementById(ptz + "Div")
            console.log(inputdiv)
            if (ptz in settings) {
                inputdiv.style.display = "inline-block"
                // Map it to a slider element.
                const input = document.getElementById(ptz);
                const ilabel =
                    console.log(ptz, capabilities[ptz])
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
                //  const input = document.getElementById(ptz).style.visibility = "hidden"
            }
        }

    } catch (err) {
        console.log(err)
        Alert("Could not access the camera");
    }
}
