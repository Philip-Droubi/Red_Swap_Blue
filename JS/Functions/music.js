// CREATED BY PHILIP DROUBI

let musicStart = false;
let music = false
let gameMusic = new Audio('../Sounds/game.webm');
gameMusic.valume = 0.1;
gameMusic.loop = true;
let movesNum = 0;
let musicBtn = document.querySelector(".music");

window.onclick = function () {
    if (!musicStart) {
        gameMusic.play();
        musicStart = true;
        musicBtn.innerHTML = `<p> <i class="fa fa-volume-up" aria-hidden="true"></i></p>`;
    }
}

musicBtn.onclick = () => {
    if (music === true && musicStart) {
        gameMusic.play();
        music = false;
        musicBtn.innerHTML = `<p> <i class="fa fa-volume-up" aria-hidden="true"></i></p>`;
    }
    else if (music === false && musicStart) {
        gameMusic.pause();
        music = true;
        musicBtn.innerHTML = `<p><i class="fas fa-volume-mute    "></i></i></p>`;
    }
}

export function winSound() {
    let winSound = new Audio('https://github.com/Philip-Droubi/Red_Swap_Blue/blob/main/win.mp3')
    winSound.play();
}
