//home page
const cover = document.getElementById('cover');
const canvas = document.querySelectorAll('canvas');
const body = document.querySelector('body');
let fullWidth;
let fullHeight;


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
    pixelDensity(1);
    // const c1 = createCanvas(fullWidth, fullHeight);
    const c1 = createCanvas(525,600);
    c1.parent(colombina);
    // imgCoffsetWidth = (fullWidth/2)-(imgC.width/2);
    // imgCoffsetHeight = (fullHeight/2)-(imgC.height/2);
    // console.log(imgC.width, fullWidth/2);
    // console.log('calculated dimensions:', imgCoffsetWidth, imgCoffsetHeight);

    blue = new Riso('blue');
    yellow = new Riso('YELLOW');
    pink = new Riso('FLUORESCENTPINK');
}

function draw(){
    background (250);
    let threshold = map(mouseX, 0, width, 0, 255);

    clearRiso();
    // pink.image(imgCBG, 0,0);
    let dithered = ditherImage(imgM, ditherType, threshold);
    pink.image(dithered, 0,30);
    let ditheredY = ditherImage(imgY, ditherType2, 255);
    yellow.image(ditheredY, 0,30);
    let ditheredC = ditherImage(imgC, ditherType, 100);
    blue.image(ditheredC, 0,30);

    drawRiso();
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