/**
 * PLAYER SELECTION
 */

const playerEngineOptions = {
    aamp: "aamp",
    videtag: "videtag",
    shaka: "shaka"
};

const playerEngine = playerEngineOptions.videtag;


/**
 * KEY PRESS HANDLING
 */

function keyLeft() {
    //goto Previous button
    removeFocus();
    if (currentPos > 0) {
        currentPos--;
    } else {
        currentPos = components.length - 1;
    }
    currentObj = components[currentPos];
    addFocus();
}

function keyRight() {
    //goto Next button
    removeFocus();
    if (currentPos < components.length - 1) {
        currentPos++;
    } else {
        currentPos = 0;
    }
    currentObj = components[currentPos];
    addFocus();
}

function keyUp() {
    if ((components[currentPos] == dropdownA) && (dropDownAListVisible)) {
        prevVideoASelect();
    } else if ((components[currentPos] == dropdownB) && (dropDownBListVisible)) {
        prevVideoBSelect();
    }
}

function keyDown() {
    if ((components[currentPos] == dropdownA) && (dropDownAListVisible)) {
        nextVideoASelect();
    } else if ((components[currentPos] == dropdownB) && (dropDownBListVisible)) {
        nextVideoBSelect();
    }
}

// Move to previous video url in the selection list A
function prevVideoASelect() {
    if (listAIndex > 0) {
        listAIndex--;
    } else {
        listAIndex = dropdownA.options.length - 1;
    }
    this.dropdownA.options[listAIndex].selected = true;
}

// Move to next video url in the selection list A
function nextVideoASelect() {
    if (listAIndex < dropdownA.options.length - 1) {
        listAIndex++;
    } else {
        listAIndex = 0;
    }
    dropdownA.options[listAIndex].selected = true;
}

// Move to previous video url in the selection list B
function prevVideoBSelect() {
    if (listBIndex > 0) {
        listBIndex--;
    } else {
        listBIndex = dropdownB.options.length - 1;
    }
    dropdownB.options[listBIndex].selected = true;
}

// Move to next video url in the selection list B
function nextVideoBSelect() {
    if (listBIndex < dropdownB.options.length - 1) {
        listBIndex++;
    } else {
        listBIndex = 0;
    }
    dropdownB.options[listBIndex].selected = true;
}


function showDropDownA() {
    dropDownAListVisible = true;
    var n = dropdownA.options.length;
    dropdownA.size = n;
}

function hideDropDownA() {
    dropDownAListVisible = false;
    dropdownA.size = 1;
    startStreamPlayback(dropdownA.options[listAIndex].value, true, "A");
}

function showDropDownB() {
    dropDownBListVisible = true;
    var n = this.dropdownB.options.length;
    dropdownB.size = n;
}

function hideDropDownB() {
    dropDownBListVisible = false;
    dropdownB.size = 1;
    startStreamPlayback(dropdownB.options[listBIndex].value, true, "B");
}

function startStreamPlayback(url, multiView, screen) {
    console.log("Playing URL: " + url  + " multiView: " + multiView);
    console.log("Current screen: " + screen);
    // According to screen load the player instance
    if(screen === "A") {
        if (playerEngine === playerEngineOptions.videotag) {
            var videoA = document.getElementById('videoA');
            videoA.src = url;
            videoA.autoplay = true;
            videoA.muted = true;
            videoA.play();
        } else if (playerEngine === playerEngineOptions.aamp) {
            playerA.load(url, true, "", multiView);
            drawVideoRectHelper("A");
        } else if (playerEngine === playerEngineOptions.shaka) {
            shaka.polyfill.installAll();
            var videoA = document.getElementById('videoA');
            videoA.autoplay = true;
            console.log(" Loading " + url + " using SHAKA");
            var playerSA = new shaka.Player(videoA);
            playerSA.load(url);
        }
    } else if(screen === "B") {
        if (playerEngine === playerEngineOptions.videotag) {
            var videoB = document.getElementById('videoB');
            videoB.src = url;
            videoB.autoplay = true;
            videoB.muted = true;
            videoB.play();
        } else if (playerEngine === playerEngineOptions.aamp) {
            playerB.load(url, true, "", multiView);
            drawVideoRectHelper("B");
        } else if (playerEngine === playerEngineOptions.shaka) {
            shaka.polyfill.installAll();
            var videoB = document.getElementById('videoB');
            videoB.autoplay = true;
            videoB.muted = true;
            console.log(" Loading " + url + " using SHAKA");
            var playerSB = new shaka.Player(videoB);
            playerSB.load(url);
        }
    }
}

// helper function to set video position
function drawVideoRectHelper(screenName) {
    let video = document.getElementById(screenName === "A" ? "videoA" : "videoB");
    let w = 192; // width
    let h = 108; // height
    let x = 300; // align left
    let y = 400; // place at 80% of screen height
    video.style.width = w + "px";
    video.style.height = h + "px";
	video.style.top = y + "px";

    if (screenName === "A") {
        video.style.left = x + "px";
        playerA.setVideoRect(x, y, w, h ); // place video using graphics plane coordinates
    } else if (screenName === "B") {
        let x = 600; // add first div width
        video.style.left = x + "px";
        playerB.setVideoRect(x, y, w, h ); // place video using graphics plane coordinates    
    }
}


function ok() {
    switch (currentPos) {
        case 0:
            if (dropDownAListVisible) {
                hideDropDownA();
            } else {
                showDropDownA();
            }
            break;
        case 1:
            if (dropDownBListVisible) {
                hideDropDownB();
            } else {
                showDropDownB();
            }
            break;
        default:
            break;
    }
}

function addFocus() {
    if (currentObj) {
        currentObj.classList.add("focus");
    } else {
        currentObj.focus();
    }
}

function removeFocus() {
    if (currentObj) {
        currentObj.classList.remove("focus");
    } else {
        currentObj.blur();
    }
}


keyEventHandler = function(e) {
    var keyCode = e.which || e.keyCode;
    //e.preventDefault();
    switch (keyCode) {
        case 37: // Left Arrow
            keyLeft();
            break;
        case 38: // Up Arrow
            keyUp();
            break;
        case 39: // Right Arrow
            keyRight();
            break;
        case 40: // Down Arrow
            keyDown();
            break;
        case 13: // Enter
        case 32:
            ok();
            break;
        default:
            break;
    }
    return false;
}


if (playerEngine === playerEngineOptions.aamp) {
    // Create AAMP Player instances
    let playerA = new AAMPMediaPlayer();
    let playerB = new AAMPMediaPlayer();
}

window.onload = function() {
    // HTML elements
    const dropdownA = document.getElementById("dropdownA");
    const dropdownB = document.getElementById("dropdownB");
    const videoA = document.getElementById("videoA");
    const videoB = document.getElementById("videoB");


    if (playerEngine === playerEngineOptions.shaka) {
        shaka.polyfill.installAll();
        console.log("Loading using SHAKA");
        // Create Shaka Player instances
        shakaPlayerA = new shaka.Player(videoA);
        shakaPlayerB = new shaka.Player(videoB);
    }


    document.addEventListener("keydown", keyEventHandler);

    currentObj = dropdownA;
    components = [ dropdownA, dropdownB ];
    currentPos = 0;

    dropDownAListVisible = false;
    dropDownBListVisible = false;
    listAIndex = 0;
    listBIndex = 0;
    // Focus screen A by default
    addFocus();
}