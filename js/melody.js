import {music, pressed, released, container, switch_btn} from "./main.js";
export {play_the_melody};

const melody_key = ["S", "S", "O", "U", "U", "P", "P", "P", "D", "D", "C", "V", "C", "C", "C", "P", "O", "S", "S", "S", "P", "P", "S", "P"];

const melody_value = [200, 200, 200, 400, 400, 400, 400, 200, 200, 200, 200, 200, 200, 200, 250, 400, 400, 400, 400, 200, 200, 200, 200, 500];

async function play_the_melody() {
    await new Promise(resolve => setTimeout(resolve, 300));
    for (let i = 0; i < melody_key.length; i++) {
        if (switch_btn.classList.contains("switch-on")) {
            await play_a_sound(melody_key[i], melody_value[i]);
            released(container.querySelector(`div[data-key="${melody_key[i]}"]`));
        }
    }
}

function play_a_sound(keyTarget, delay) {
    music(keyTarget);
    pressed(container.querySelector(`div[data-key="${keyTarget}"]`));
    return new Promise(resolve => setTimeout(resolve, delay));
}