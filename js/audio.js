var audioChunks = [];
let blobURL
let blobURL2
function record(){
    
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
    rec = new MediaRecorder(stream);

    rec.ondataavailable = e => {
        console.log("recording...")
        audioChunks.push(e.data);
        console.log(audioChunks)

        
        let blob = new Blob(audioChunks, { 'type': 'audio/ogg; codecs=opus' });
        blobURL = window.URL.createObjectURL(blob)
        cropIt()
        //createPlayer(blobURL);
        
    };
    rec.start(5000)
    
})
.catch(e => console.log(e));
}

function createPlayer(blobURL) {
    var audioPlayer = document.createElement("AUDIO");
    audioPlayer.src = blobURL2;      
    audioPlayer.setAttribute("id", "player");
    audioPlayer.setAttribute("controls", "controls");
    document.body.appendChild(audioPlayer); 
    //audioPlayer.play()
}
const chunks = [];
let crop = {start:1000, end:2000}
function cropIt(){

    const audio = new Audio(blobURL);
    audio.oncanplay = e => {
        audio.play();
       
            const stream = audio.captureStream();
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        if (recorder.state === "recording") {
        recorder.stop()
      };
      chunks.push(e.data)
    }
    recorder.onstop = e => {
        let blob2 = new Blob(audioChunks, { 'type': 'audio/ogg; codecs=opus' });
        blobURL2 = window.URL.createObjectURL(blob2)
        createPlayer(blobURL2);
    }
    recorder.start(crop.end);


}
}
record()