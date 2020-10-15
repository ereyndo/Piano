import {audio_links} from "./sounds.js";
import {play_the_melody} from "./melody.js";
export {music, pressed, released, container, switch_btn};

//an object for logging key pressing
let press_check = {};

//element that contains the piano
const container = document.querySelector(".whole-container");

//element that contains the switch
const switch_btn = document.querySelector(".switch-btn");

container.onpointerdown = function(event) {
    event.preventDefault();
    if (switch_btn.classList.contains("user-events-off")) return false;// to stop user pressing when switch button is on
    let currentTarget;
    if (event.target.nodeName === "DIV") {
        currentTarget = event.target;
    } else {
        currentTarget = event.target.parentNode;
    }
    pressed(currentTarget);
    music(currentTarget.dataset.key.toUpperCase());
    function onPointerMove(event) {
        let prevTarget = currentTarget;
        if (event.target.nodeName === "DIV") {
            currentTarget = event.target;
        } else {
            currentTarget = event.target.parentNode;
        }
        if (currentTarget !== prevTarget) {
            pressed(currentTarget);
            music(currentTarget.dataset.key.toUpperCase());
            released(prevTarget);
        }
    }
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", function () {
        container.removeEventListener("pointermove", onPointerMove);
        released(currentTarget);
    });
};


document.onkeydown = function(event) {
    if (switch_btn.classList.contains("user-events-off")) return false;// to stop user pressing when switch button is on
    const keyTarget = event.key.toUpperCase();
    if (audio_links.hasOwnProperty(keyTarget) && !press_check.hasOwnProperty(keyTarget)) {
        let htmlTarget = container.querySelector(`div[data-key="${keyTarget}"]`);
        pressed(htmlTarget);
        music(keyTarget);
        press_check[keyTarget] = true;
    } else if(keyTarget === "1" && !press_check.hasOwnProperty(keyTarget)) {
        let button_event = new Event("click");
        switch_btn.dispatchEvent(button_event);
    }
};

document.onkeyup = function(event) {
    if (switch_btn.classList.contains("user-events-off")) return false;// to stop user pressing when switch button is on
    const keyTarget = event.key.toUpperCase();
    if (press_check.hasOwnProperty(keyTarget)) {
        delete press_check[keyTarget];
        if (event.key !== "1") {
            let htmlTarget = container.querySelector(`div[data-key="${keyTarget}"]`);
            released(htmlTarget);
        }
    }
};

function music(keyTarget) {
    let audio = new Audio();
    audio.src = audio_links[keyTarget];
    audio.autoplay = true;
}

function pressed(currentTarget) {
    currentTarget.style.background = "deepskyblue";
    currentTarget.style.boxShadow = "inset 2px 3px 5px rgba(154, 147, 140, 0.5)";
}

function released(target) {
    target.style.background = "";
    target.style.boxShadow = "";
}

// for autoplaying
switch_btn.onclick = async function() {
    switch_btn.classList.toggle("switch-on");
    if (switch_btn.classList.contains("switch-on")) {
        switch_btn.classList.toggle("user-events-off"); // to stop user pressing
        await play_the_melody();
        switch_btn.classList.toggle("user-events-off"); // to enable user pressing
        switch_btn.classList.remove("switch-on");
    }
}