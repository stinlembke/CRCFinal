//home page
const cover = document.getElementById('cover');
const canvas = document.querySelectorAll('canvas');
const body = document.querySelector('body');

const colombina = document.getElementById('colombina');
// const cCanvas = document.querySelectorAll('canvas');
colombina.style.display = "none";
const pierrot = document.getElementById('pierrot');
pierrot.style.display = "none";
let myCanvas;

//tracking dithering & halftone
const modeButton = document.getElementById('modeButton');
let fullWidth;
let fullHeight;
let page = 0;
let mode = 1;


cover.addEventListener('pointerdown', () =>{
    cover.classList.add('transformCover');
    window.setTimeout(() => {
        cover.remove();
        colombina.style.display = "block";
        page = 1;
        setup();
        draw();
        console.log('removed');
        clearRiso();
    }, 1000);
});

modeButton.addEventListener('click', () => {
    mode++;
    if (mode==4) {
        mode = 1;
    }
})

colombina.addEventListener('pointerdown', () => {
    colombina.classList.add('transformCover');
    window.setTimeout(() => {
        colombina.remove();
        pierrot.style.display = "inherit";
        page = 2;
        console.log('removed 2');
        clearRiso();
    }, 2000);
});

//RISO VARIABLES
let blue;
let yellow;
let pink
let imgY;
let imgM;
let imgC;
let ditherType = 'bayer';
let ditherType2 = 'atkinson';

function preload(){
    //colombina images
    imgY = loadImage('media/ColombinaRisoY.png');
    imgM = loadImage('media/ColombinaRisoM.png');
    imgC = loadImage('media/ColombinaRisoC.png');
    // imgCBG = loadImage('media/patternC.jpg');

    //pierrot images
    pY = loadImage('media/pierrotY.PNG');
    pM = loadImage('media/pierrotM.png');
    pC = loadImage('media/pierrotC.png');
}

function setup() {
    fullWidth = window.innerWidth;
    fullHeight = window.innerHeight;
    pixelDensity(1);
    myCanvas = createCanvas(525,600);
    myCanvas.parent(colombina);

    cyanLayer = new Riso('blue');
    magentaLayer = new Riso('FLUORESCENTPINK');
    yellowLayer = new Riso('YELLOW');
    orangeLayer = new Riso('ORANGE');
}

function draw(){
    background (250);

    if (page==1){
        //for dithering & halftone intensity
        let threshold = map(mouseX, 0, width, 0, 255);
        
        //MODE WRANGLING
        if (mode==1) {
            clearRiso();
            let ditheredC = ditherImage(imgC, ditherType, 100);
            cyanLayer.image(ditheredC, 0,30);
            let ditheredM = ditherImage(imgM, ditherType, threshold);
            magentaLayer.image(ditheredM, 0,30);
            let ditheredY = ditherImage(imgY, ditherType2, 255);
            yellowLayer.image(ditheredY, 0,30);
            drawRiso();
        } else if (mode==2) { 
            clearRiso();
            let halftoneC = halftoneImage(imgC, 'circle', 2, 45, threshold);
            cyanLayer.image(halftoneC, 0,30);
            let halftoneM = halftoneImage(imgM, 'circle', 2, 45, 250);
            magentaLayer.image(halftoneM, 0,30);
            let halftoneY = halftoneImage(imgY, 'circle', 2, 45, 200);
            yellowLayer.image(halftoneY, 0,30);
            drawRiso();
        } else if (mode == 4){

        }
    } else if (page=2){
        myCanvas.parent(pierrot);

        clearRiso();

        yellowLayer.image(pY,0,-10);
        orangeLayer.image(pM,0,0);

        drawRiso();
        
    }

}

window.addEventListener('resize', () => {
    setup();
    draw();
});

window.addEventListener('load', () => {
    setup();
    draw();
});

//colombina bg
// function setupBg (){
//     pixelDensity(1);
//     const cBg = createCanvas(window.innerWidth, window.innerHeight);
//     cBg.parent(body);
// }

// function drawBg(){
//     pink.image(cBg,0,0);
//     drawRiso();
// }