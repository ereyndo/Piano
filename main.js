const audio_links = {
    Q: "music/1.mp3",
    W: "music/3.mp3",
    E: "music/5.mp3",
    2: "music/2.mp3",
    3: "music/4.mp3",
    R: "music/6.mp3",
    T: "music/8.mp3",
    Y: "music/10.mp3",
    U: "music/12.mp3",
    5: "music/7.mp3",
    6: "music/9.mp3",
    7: "music/11.mp3",
    I: "music/13.mp3",
    O: "music/15.mp3",
    P: "music/17.mp3",
    9: "music/14.mp3",
    0: "music/16.mp3",
    Z: "music/18.mp3",
    X: "music/20.mp3",
    C: "music/22.mp3",
    V: "music/24.mp3",
    S: "music/19.mp3",
    D: "music/21.mp3",
    F: "music/23.mp3",
    B: "music/25.mp3"
};

let press_check = {};

const container = document.querySelector(".whole-container");

container.onpointerdown = function(event) {
    event.preventDefault();
    let currentTarget;
    if (event.target.nodeName === "DIV") {
        currentTarget = event.target;
    } else {
        currentTarget = event.target.parentNode;
    }
    new_view(currentTarget);
    music(currentTarget.dataset.key.toUpperCase());
    function onPointerMove(event) {
        let prevTarget = currentTarget;
        if (event.target.nodeName === "DIV") {
            currentTarget = event.target;
        } else {
            currentTarget = event.target.parentNode;
        }
        if (currentTarget !== prevTarget) {
            new_view(currentTarget);
            music(currentTarget.dataset.key.toUpperCase());
            prev_view(prevTarget);
        }
    }
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", function (event) {
        container.removeEventListener("pointermove", onPointerMove);
        prev_view(currentTarget);
    });
};


document.onkeydown = function(event) {
    const keyTarget = event.key.toUpperCase();
    if (audio_links.hasOwnProperty(keyTarget) && !press_check.hasOwnProperty(keyTarget)) {
        press_check[keyTarget] = true;
        let htmlTarget = container.querySelector(`div[data-key="${keyTarget}"]`);
        new_view(htmlTarget);
        music(keyTarget);
    }
};

document.onkeyup = function(event) {
    const keyTarget = event.key.toUpperCase();
    if (press_check.hasOwnProperty(keyTarget)) {
        delete press_check[keyTarget];
        let htmlTarget = container.querySelector(`div[data-key="${keyTarget}"]`);
        prev_view(htmlTarget);
    }
};

function music(keyTarget) {
    let audio = new Audio();
    audio.src = audio_links[keyTarget];
    audio.autoplay = true;
}

function new_view(currentTarget) {
    currentTarget.style.background = "deepskyblue";
    if (currentTarget.querySelector(`.black-blocks`)) {
        currentTarget.style.boxShadow = "inset 1px 1px 5px rgba(154, 147, 140, 0.5)";
    } else {
        currentTarget.style.boxShadow = "inset 2px 3px 5px rgba(154, 147, 140, 0.5)";
    }
}

function prev_view(target) {
    target.style.background = "";
    target.style.boxShadow = "";
}