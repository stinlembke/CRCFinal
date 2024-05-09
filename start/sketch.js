//home page
const cover = document.getElementById('cover');
const canvas = document.querySelectorAll('canvas');
const body = document.querySelector('body');

const normalEye = new Image();
const bayerEye = new Image();
normalEye.src = 'media/normalEye.png';
bayerEye.src = 'media/bayerEye.png';

const colombina = document.getElementById('colombina');
const pierrot = document.getElementById('pierrot');
const color1Dropdown = document.getElementById('color1Dropdown');
const color2Dropdown = document.getElementById('color2Dropdown');
const color3Dropdown = document.getElementById('color3Dropdown');
const color4Dropdown = document.getElementById('color4Dropdown');
const saveButton = document.getElementById('saveButton');
const modeButton = document.getElementById('modeButton');
const clicknDragText = document.querySelector('h3');
clicknDragText.style.display = "none";
colombina.style.display = "none";
pierrot.style.display = "none";
saveButton.style.display = 'none';
modeButton.style.display = 'none';
color1Dropdown.style.display = 'none';
color2Dropdown.style.display = 'none';
color3Dropdown.style.display = 'none';
color4Dropdown.style.display = 'none';

let myCanvas;
let fullWidth;
let fullHeight;
let page = 0;
let mode = 1;

//page turn for colombina page
cover.addEventListener('pointerdown', () =>{
    cover.classList.add('transformCover');
    window.setTimeout(() => {
        cover.remove();
        colombina.style.display = "block";
        modeButton.style.display = 'inherit';
        saveButton.style.display = 'inherit';
        color1Dropdown.style.display = 'inherit';
        color2Dropdown.style.display = 'inherit';
        color3Dropdown.style.display = 'inherit';
        page = 1;
        mode=1;
        setup();
        draw();
        console.log('removed');
        clearRiso();
    }, 1000);
});

//turning colombina page and creating pierrot page
colombina.addEventListener('pointerdown', () => {
    colombina.classList.add('transformCover');
    window.setTimeout(() => {
        colombina.remove();
        pierrot.style.display = "inherit";
        page = 2;
        mode=1;
        color2Dropdown.style.display = "none";
        color4Dropdown.style.display = "inline";
        console.log('removed 2');
        clearRiso();
    }, 2000);
});

//tracking dithering & halftone
modeButton.addEventListener('click', () => {
    mode++;
    if (mode==3) {
        mode = 1;
        modeButton.style.backgroundImage = 'url("media/bayerEye.png")';
    }
    console.log(mode);
});

//exporting image
saveButton.addEventListener('click', () => {
    exportRiso();
});

//RISO VARIABLES
let imgY, imgM, imgC;
let bayer = 'bayer';
let atkinson = 'atkinson';

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

let firstLayer, secondLayer, thirdLayer, fourthLayer;
let firstLayerIndex, secondLayerIndex, thirdLayerIndex, fourthLayerIndex;

function setup() {
    fullWidth = window.innerWidth;
    fullHeight = window.innerHeight;
    pixelDensity(1);
    myCanvas = createCanvas(525,600);
    myCanvas.parent(colombina);
    
    const getRisoColorIndex = colorName => RISOCOLORS.findIndex(colorObj => colorObj.name === colorName);

    firstLayerIndex = getRisoColorIndex("BLUE");
    secondLayerIndex = getRisoColorIndex('FLUORESCENTPINK');
    thirdLayerIndex = getRisoColorIndex('YELLOW');
    fourthLayerIndex = getRisoColorIndex('ORANGE');

    firstLayer = new Riso('BLUE');
    secondLayer = new Riso('FLUORESCENTPINK');
    thirdLayer = new Riso('YELLOW');
    fourthLayer = new Riso('ORANGE');
}

let thresholdY, thresholdX;
let thresholdXPosition, thresholdYPosition;

// canvas.addEventListener

function mouseDragged(){
    thresholdXPosition = mouseX;
    thresholdX = map(thresholdXPosition, 0, width, 0, 255);
    thresholdYPosition = mouseY;
    thresholdY = map(thresholdYPosition, 0, height, 0, 255);
}

function draw(){
    background(250);
//colombina wrangling
    if (page===1){

    //MODE WRANGLING
        //normal
        if (mode===1) {
            clearRiso();
            firstLayer.image(imgC, 0,30);
            secondLayer.image(imgM, 0,30);
            thirdLayer.image(imgY, 0,30);
            drawRiso();
        }
        //bayer dithering
        else if (mode===2) {
            clearRiso();
            clicknDragText.style.display = "inline";
            modeButton.style.backgroundImage = 'url("media/normalEye.png")';
            let ditheredC = ditherImage(imgC, bayer, thresholdY);
            firstLayer.image(ditheredC, 0,30);
            let ditheredM = ditherImage(imgM, bayer, thresholdX);
            secondLayer.image(ditheredM, 0,30);
            let ditheredY = ditherImage(imgY, bayer, 135);
            thirdLayer.image(ditheredY, 0,30);
            drawRiso();
        //atkinson dithering
        // } else if (mode===3) {
        //     clearRiso();
        //     let ditheredC = ditherImage(imgC, atkinson, thresholdY);
        //     firstLayer.image(ditheredC, 0,30);
        //     let ditheredM = ditherImage(imgM, atkinson, thresholdX);
        //     secondLayer.image(ditheredM, 0,30);
        //     let ditheredY = ditherImage(imgY, atkinson, 255);
        //     thirdLayer.image(ditheredY, 0,30);
        //     console.log('threshold:', thresholdX, thresholdY);
        //     drawRiso();
        // } 
//pierrot wrangling
    } else if (page===2){
        myCanvas.parent(pierrot);

        if (mode===1) {
            clearRiso();
            thirdLayer.image(pY,0,-10);
            fourthLayer.image(pM,5,0);
            firstLayer.image(pC,0,0);
            drawRiso();
        }
        if (mode===2) {
            clearRiso();
            clicknDragText.style.display = "inline";
            let ditheredC = ditherImage(pC, ditherType, thresholdY);
            firstLayer.image(ditheredC, 0,0);
            let ditheredM = ditherImage(pM, ditherType, thresholdX);
            fourthLayer.image(ditheredM, 5,0);
            let ditheredY = ditherImage(pY, ditherType2, 255);
            thirdLayer.image(ditheredY, 0,-10);
            drawRiso();
        }
    }
  }
}

//creating color picker dropdown menus
function createColorDropdown(dropdownID){
    const dropdown = document.getElementById(dropdownID);
    dropdown.innerHTML = '';
    
    const defaultText = document.createElement('option');
    defaultText.text = 'Color';
    dropdown.add(defaultText);
//dropdown menu contents
    RISOCOLORS.forEach(color => {
        const select = document.createElement('option');
        select.value = color.name;
        select.text = color.name;
        select.style.color = `rgb(${color.color.join(',')})`;
        dropdown.add(select);
    });
//dropdown menu changing colors
    dropdown.addEventListener('change', () => {
        if(dropdownID == 'color1Dropdown'){
            const selectedColor = dropdown.value;
            firstLayer = new Riso(`${selectedColor}`);
        } else if(dropdownID == 'color2Dropdown'){
            const selectedColor = dropdown.value;
            secondLayer = new Riso(`${selectedColor}`);   
        } else if (dropdownID == 'color3Dropdown') {
            const selectedColor = dropdown.value;
            thirdLayer = new Riso(`${selectedColor}`);
        } else if(dropdownID == 'color4Dropdown') {
            const selectedColor = dropdown.value;
            fourthLayer = new Riso(`${selectedColor}`);
        }
    });
}

createColorDropdown('color1Dropdown');
createColorDropdown('color2Dropdown');
createColorDropdown('color3Dropdown');
createColorDropdown('color4Dropdown');

window.addEventListener('resize', () => {
    setup();
    draw();
});

window.addEventListener('load', () => {
    setup();
    draw();
});