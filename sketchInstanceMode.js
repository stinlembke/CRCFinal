//home page
const cover = document.getElementById('cover');
const canvas = document.querySelectorAll('canvas');
const body = document.querySelector('body');
const modeButton = document.getElementById('modeButton');
let fullWidth;
let fullHeight;
let mode = 1;


cover.addEventListener('pointerdown', () =>{
    cover.classList.add('transformCover');
    window.setTimeout(() => {
        cover.remove();
        colombina.style.display = "inherit";
        // body.classList.add('bg');
        // setupBg();
        // drawBg();
        console.log('removed');
        clearRiso();
    }, 2000);
});

modeButton.addEventListener('click', () => {
    mode++;
    if (mode==4) {
        mode = 1;
    }
})

//colombina part
const colombina = document.getElementById('colombina');
colombina.style.display = "none";

colombina.addEventListener('pointerdown', () => {
    colombina.classList.add('transformCover');
    window.setTimeout(() => {
        colombina.remove();
        // colombina.style.display = "inherit";
        console.log('removed 2');
    }, 3000);
});

//riso variables
let blue;
let yellow;
let pink
let imgY;
let imgM;
let imgC;
let ditherType = 'bayer';
let ditherType2 = 'atkinson';

// let imgCoffsetWidth;

function preload(){
    imgY = loadImage('media/ColombinaRisoY.png');
    imgM = loadImage('media/ColombinaRisoM.png');
    imgC = loadImage('media/ColombinaRisoC.png');
    imgCBG = loadImage('media/patternC.jpg');
}

let c1 = (sketch1) => {
    sketch1.setup = () => {
        fullWidth = window.innerWidth;
        fullHeight = window.innerHeight;
        pixelDensity(1);
        const canvas1 = createCanvas(525,600);
        canvas1.parent(colombina);
        // canvas1.position((fullWidth - canvas1.width) / 2, 0);
        cyanLayer = new Riso('blue');
        magentaLayer = new Riso('FLUORESCENTPINK');
        yellowLayer = new Riso('YELLOW');
    };
    sketch1.draw = () => {
        background (250);
        let threshold = sketch1.map(sketch1.mouseX, 0, sketch1.width, 0, 255);

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
        }
    };
};

function draw(){
    background (250);

    //COLOMBINA
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

}

// window.addEventListener('DOMContentLoaded', () => {
//     myFirstCanvas = new p5(c1);
// });

window.addEventListener('resize', () => {
    myFirstCanvas.setup();
    myFirstCanvas.draw();
});

window.addEventListener('load', () => {
    myFirstCanvas = new p5(c1);
    myFirstCanvas.setup();
    myFirstCanvas.draw();
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