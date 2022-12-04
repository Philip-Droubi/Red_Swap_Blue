//CREATED BY PHILIP DROUBI
export let uiState = 0;
let devView = document.querySelector(".dev-view");
devView.addEventListener("click", uiDev)

function uiDev() {
    let cells = document.querySelectorAll('.cell');
    let game = document.querySelectorAll('.game');
    if (uiState == 0) {
        uiState = 1;
        devView.lastElementChild.innerHTML = "DEV";
        game.forEach(g => g.style.transform = 'rotate(0)');
        cells.forEach((c) => {
            c.dataset.after = c.dataset.id
        });
    }
    else if (uiState == 1) {
        uiState = 2;
        devView.lastElementChild.innerHTML = "Dev2";
        document.querySelectorAll(".blank").forEach(c => { c.style.backgroundColor = "gray"; c.style.borderColor = "black" });
    }
    else {
        uiState = 0;
        devView.lastElementChild.innerHTML = "UI";
        game.forEach(g => g.style.transform = 'rotate(-45deg)');
        document.querySelectorAll(".blank").forEach(c => { c.style.backgroundColor = "transparent"; c.style.borderColor = "transparent" });
        cells.forEach((c) => {
            if (c.classList.contains("rCell")) {
                c.dataset.after = ">"
            }
            else if (c.classList.contains("bCell")) {
                c.dataset.after = "<"
            }
        });
    }
}

document.querySelector(".back").onclick = () => {
    uiState = 0;
    devView.lastElementChild.innerHTML = "UI";
}