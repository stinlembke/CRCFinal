//home page
const cover = document.getElementById('cover');
const canvas = document.querySelectorAll('canvas');
const body = document.querySelector('body');
const clicknDragText = document.querySelector('h3');
clicknDragText.style.display = "none";

const colombina = document.getElementById('colombina');
const pierrot = document.getElementById('pierrot');
const color1Dropdown = document.getElementById('color1Dropdown');
const color2Dropdown = document.getElementById('color2Dropdown');
const color3Dropdown = document.getElementById('color3Dropdown');
const color4Dropdown = document.getElementById('color4Dropdown');
// const cCanvas = document.querySelectorAll('canvas');
colombina.style.display = "none";
pierrot.style.display = "none";
let myCanvas;

const saveButton = document.getElementById('saveButton');
const modeButton = document.getElementById('modeButton');
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
        page = 1;
        mode=1;
        setup();
        draw();
        console.log('removed');
        clearRiso();
    }, 1000);
});

//tracking dithering & halftone
modeButton.addEventListener('click', () => {
    mode++;
    if (mode==3) {
        mode = 1;
    }
    console.log(mode);
});

//exporting image
saveButton.addEventListener('click', () => {
    exportRiso();
});

colombina.addEventListener('pointerdown', () => {
    colombina.classList.add('transformCover');
    window.setTimeout(() => {
        colombina.remove();
        pierrot.style.display = "inherit";
        page = 2;
        mode=1;
        changeSecondLayerColorBtn.style.display = "none";
        changeFourthLayerColorBtn.style.display = "inline";
        console.log('removed 2');
        clearRiso();
    }, 2000);
});

//creating color picker dropdown menus
function createColorDropdown(dropdownID){
    const dropdown = document.getElementById(dropdownID);
    dropdown.innerHTML = '';
    
    const defaultText = document.createElement('option');
    defaultText.text = 'Color';
    dropdown.add(defaultText);

    RISOCOLORS.forEach(color => {
        const select = document.createElement('option');
        select.value = color.name;
        select.text = color.name;
        select.style.color = `rgb(${color.color.join(',')})`;
        dropdown.add(select);
    });
}

createColorDropdown('color1Dropdown');
createColorDropdown('color2Dropdown');
createColorDropdown('color3Dropdown');
createColorDropdown('color4Dropdown');

//RISO VARIABLES
let imgY, imgM, imgC;
let ditherType = 'bayer';
let ditherType2 = 'atkinson';

// GUI TIME
// const gui = new dat.gui.GUI();

// // gui fields
// let guiFields = {
//     color1: 'yellow',
//     color2: 'fluorescentpink',
//     color3: 'blue',

//     mode: 'normal',
// };

// //gui visible
// gui.remember(guiFields);

// gui.addChoice(guiFields, 'color1');


// gui layers folder
// const layersFolder = gui.addFolder('Layers');
// layersFolder.addColor()


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

// color (from the RISOCOLORS array)

// function getRisoColor(colorName) {
//     return RISOCOLORS.find(n => n.name === colorName);
// }

let thresholdY, thresholdX;
let thresholdXPosition, thresholdYPosition;

function mouseDragged(){
    thresholdXPosition = mouseX;
    thresholdX = map(thresholdXPosition, 0, width, 0, 255);
    thresholdYPosition = mouseY;
    thresholdY = map(thresholdYPosition, 0, height, 0, 255);
}

function draw(){
 
    background(250);

    if (page===1){
        //for dithering & halftone intensity

        //MODE WRANGLING
        if (mode===1) {
            clearRiso();
            firstLayer.image(imgC, 0,30);
            secondLayer.image(imgM, 0,30);
            thirdLayer.image(imgY, 0,30);
            drawRiso();
        }
        else if (mode===2) {
            clearRiso();
            clicknDragText.style.display = "inline";
            let ditheredC = ditherImage(imgC, ditherType, thresholdY);
            firstLayer.image(ditheredC, 0,30);
            let ditheredM = ditherImage(imgM, ditherType, thresholdX);
            secondLayer.image(ditheredM, 0,30);
            let ditheredY = ditherImage(imgY, ditherType2, 255);
            thirdLayer.image(ditheredY, 0,30);
            drawRiso();
        }
        //     clearRiso();
        //     let halftoneC = halftoneImage(imgC, 'circle', 2, 45, thresholdY);
        //     firstLayer.image(halftoneC, 0,30);
        //     let halftoneM = halftoneImage(imgM, 'circle', 3, 75, thresholdX);
        //     secondLayer.image(halftoneM, 0,30);
        //     let halftoneY = halftoneImage(imgY, 'circle', 2, 45, 250);
        //     thirdLayer.image(halftoneY, 0,30);
        //     drawRiso();
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
        // } else if (mode===3) { 
        //     clearRiso();
        //     let halftoneC = halftoneImage(pC, 'circle', 2, 45, thresholdY);
        //     firstLayer.image(halftoneC, 0,0);
        //     let halftoneM = halftoneImage(pM, 'circle', 2, 45, thresholdX);
        //     fourthLayer.image(halftoneM, 5,0);
        //     let halftoneY = halftoneImage(pY, 'circle', 2, 45, 250);
        //     thirdLayer.image(halftoneY,0,-10);
        //     drawRiso();
        // } 
    }
}

// Iterate first layer color, until its hit the end of the array. Then reset to 0
const getNextIndex = currentIndex => {
    if (currentIndex + 1 > RISOCOLORS.length) {
        return 0;
    }
    return currentIndex + 1;
};

//Color buttons
const changeFirstLayerColorBtn = document.getElementById('layer1Color');
const changeSecondLayerColorBtn = document.getElementById('layer2Color');
const changeThirdLayerColorBtn = document.getElementById('layer3Color');
const changeFourthLayerColorBtn = document.getElementById('layer2x2Color');

changeFirstLayerColorBtn.addEventListener('click', () => {
    const firstLayerColor = RISOCOLORS[firstLayerIndex];
    console.log('Changing first layer color to ', firstLayerColor);
    firstLayer = new Riso(firstLayerColor.name);
    firstLayerIndex = getNextIndex(firstLayerIndex);
});

changeSecondLayerColorBtn.addEventListener('click', () => {
    const secondLayerColor = RISOCOLORS[secondLayerIndex];
    secondLayer = new Riso(secondLayerColor.name);
    secondLayerIndex = getNextIndex(secondLayerIndex);    
});

changeThirdLayerColorBtn.addEventListener('click', () => {
    const thirdLayerColor = RISOCOLORS[thirdLayerIndex];
    thirdLayer = new Riso(thirdLayerColor.name);
    thirdLayerIndex = getNextIndex(thirdLayerIndex);
});

changeFourthLayerColorBtn.addEventListener('click', () => {
    const fourthLayerColor = RISOCOLORS[fourthLayerIndex];
    fourthLayer = new Riso(fourthLayerColor.name);
    fourthLayerIndex = getNextIndex(fourthLayerIndex);
});


window.addEventListener('resize', () => {
    setup();
    draw();
});

window.addEventListener('load', () => {
    changeFourthLayerColorBtn.style.display = "none";
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