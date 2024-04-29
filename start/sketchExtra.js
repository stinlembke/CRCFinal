//home page
const cover = document.getElementById('cover');
const canvas = document.querySelectorAll('canvas');
const body = document.querySelector('body');
const modeButton = document.getElementById('modeButton');
let fullWidth;
let fullHeight;
let mode = 1;

//Home Page Page Turn Animation
cover.addEventListener('pointerdown', () =>{
    cover.classList.add('transformCover');
    window.setTimeout(() => {
        cover.remove();
        colombina.style.display = "inherit";
        console.log('removed');
        clearRiso();
    }, 2000);
});

//mode button to change dithering to halftone
modeButton.addEventListener('click', () => {
    mode++;
    if (mode==4) {
        mode = 1;
    }
})

//colombina starter
const colombina = document.getElementById('colombina');
colombina.style.display = "none";

//Colombina Sketch Page Turn
colombina.addEventListener('pointerdown', () => {
    colombina.classList.add('transformCover');
    window.setTimeout(() => {
        colombina.remove();
        // colombina.style.display = "inherit";
        console.log('removed 2');
    }, 3000);
});

//p5 riso var calls
let blue;
let yellow;
let pink
let imgY;
let imgM;
let imgC;
let ditherType = 'bayer';
let ditherType2 = 'atkinson';

let imgCoffsetWidth;

function preload(){
    imgY = loadImage('media/ColombinaRisoY.png');
    imgM = loadImage('media/ColombinaRisoM.png');
    imgC = loadImage('media/ColombinaRisoC.png');
    imgCBG = loadImage('media/patternC.jpg');
}

let c1 = function(sketch) {
    sketch.setup = function() {
        fullWidth = window.innerWidth;
        fullHeight = window.innerHeight;
        pixelDensity(1);
        const c1 = createCanvas(525,600);
        c1.parent(colombina);
        cyanLayer = new Riso('blue');
        magentaLayer = new Riso('FLUORESCENTPINK');
        yellowLayer = new Riso('YELLOW');
    }
    sketch.draw = function() {
        background (250);
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
};

new p5(c1);

// function draw(){
//     background (250);

//     //COLOMBINA
//     let threshold = map(mouseX, 0, width, 0, 255);

//     // clearRiso();
//     // pink.image(imgCBG, 0,0);
    
//     //MODE WRANGLING
//     if (mode==1) {
//         clearRiso();
//         let ditheredC = ditherImage(imgC, ditherType, 100);
//         cyanLayer.image(ditheredC, 0,30);
//         let ditheredM = ditherImage(imgM, ditherType, threshold);
//         magentaLayer.image(ditheredM, 0,30);
//         let ditheredY = ditherImage(imgY, ditherType2, 255);
//         yellowLayer.image(ditheredY, 0,30);
//         drawRiso();
//     } else if (mode==2) { 
//         clearRiso();
//         let halftoneC = halftoneImage(imgC, 'circle', 2, 45, threshold);
//         cyanLayer.image(halftoneC, 0,30);
//         let halftoneM = halftoneImage(imgM, 'circle', 2, 45, 250);
//         magentaLayer.image(halftoneM, 0,30);
//         let halftoneY = halftoneImage(imgY, 'circle', 2, 45, 200);
//         yellowLayer.image(halftoneY, 0,30);
//         drawRiso();
//     } else if (mode == 4){

//     }

// }

window.addEventListener('resize', () => {
    setup();
    draw();
});

window.addEventListener('load', () => {
    setup();
    draw();
});

    // let canvasWidth = fullWidth * 0.8;
    // let canvasHeight = fullHeight * 0.8;
        // imgCoffsetWidth = (fullWidth/2)-(imgC.width/2);
    // imgCoffsetHeight = (fullHeight/2)-(imgC.height/2);
    // console.log(imgC.width, fullWidth/2);
    // console.log('calculated dimensions:', imgCoffsetWidth, imgCoffsetHeight);


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