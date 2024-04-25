const cover = document.getElementById('cover');
const colombina = document.getElementById('colombina');
colombina.style.display = "none";

let blue;
let yellow;
let pink
let imgY;
let imgM;
let imgC;
let ditherType = 'bayer';
let ditherType2 = 'atkinson';

function preload(){
    imgY = loadImage('media/ColombinaRisoY.png');
    imgM = loadImage('media/ColombinaRisoM.png');
    imgC = loadImage('media/ColombinaRisoC.png');
}

function setup() {
    pixelDensity(1);
    const c1 = createCanvas(525, 600);
    c1.parent(colombina);
    console.log(c1);

    blue = new Riso('blue');
    yellow = new Riso('YELLOW');
    pink = new Riso('FLUORESCENTPINK');
}

function draw(){
    background (250);
    let threshold = map(mouseX, 0, width, 0, 255);

    clearRiso();
    let dithered = ditherImage(imgM, ditherType, threshold);
    pink.image(dithered, 0,0);
    let ditheredY = ditherImage(imgY, ditherType2, 255);
    yellow.image(ditheredY, 0,0);
    let ditheredC = ditherImage(imgC, ditherType, 100);
    blue.image(ditheredC,0,0);

    drawRiso();
}

cover.addEventListener('pointerdown', () => {
    currentTime = millis();
    console.log(currentTime)
    // if(millis() = currentTime + 200) {
    //     cover.style.display = "none";
    //     console.log('working!')
    // }
});