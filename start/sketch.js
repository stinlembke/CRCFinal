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

// cover.addEventListener('pointerdown', () => {
//     currentTime = millis();
//     // console.log(currentTime)
//     // if(millis() = currentTime + 200) {
//     //     cover.style.display = "none";
//     //     console.log('working!')
//     // }
// });

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

function setup() {
    fullWidth = window.innerWidth;
    fullHeight = window.innerHeight;
    // let canvasWidth = fullWidth * 0.8;
    // let canvasHeight = fullHeight * 0.8;
    pixelDensity(1);
    // const c1 = createCanvas(fullWidth, fullHeight);
    const c1 = createCanvas(525,600);
    // const c1 = createCanvas(canvasWidth, canvasHeight);
    c1.parent(colombina);
    // imgCoffsetWidth = (fullWidth/2)-(imgC.width/2);
    // imgCoffsetHeight = (fullHeight/2)-(imgC.height/2);
    // console.log(imgC.width, fullWidth/2);
    // console.log('calculated dimensions:', imgCoffsetWidth, imgCoffsetHeight);

    cyanLayer = new Riso('blue');
    magentaLayer = new Riso('FLUORESCENTPINK');
    yellowLayer = new Riso('YELLOW');
}

function draw(){
    background (250);

    //COLOMBINA
    let threshold = map(mouseX, 0, width, 0, 255);

    // clearRiso();
    // pink.image(imgCBG, 0,0);
    
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