let blue;
let yellow;
let pink
let imgY;
let imgM;
let imgC;
let ditherType = 'bayer';
let ditherType2 = 'atkinson';

function preload(){
    imgY = loadImage('ColombinaRisoY.png');
    imgM = loadImage('ColombinaRisoM.png');
    imgC = loadImage('ColombinaRisoC.png');
}

function setup() {
    pixelDensity(1);
    createCanvas(525, 600);

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