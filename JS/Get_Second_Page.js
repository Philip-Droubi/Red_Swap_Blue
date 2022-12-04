// CREATED BY PHILIP DROUBI
import { Graph } from './classes/Graph.js';
import { Node } from './classes/Node.js'
let playBtn = document.querySelector(".links .play");
let htpBtn = document.querySelector(".links .how");
const back = document.querySelector(".back");
const links = document.querySelector(".links");
const levelsPage = document.querySelector(".levels");
const levels = document.querySelectorAll(".level");
const howToPlay = document.querySelector(".htp");
const NOMoves = document.querySelector(".NOMoves");
const howToSolvePage = document.querySelector(".how-to-solve");

back.style.marginRight = "-60px";
levelsPage.style.marginRight = "-300px";
howToPlay.style.marginRight = "-300px";
howToSolvePage.style.marginRight = "-300px";


playBtn.addEventListener("click", GLP);
back.addEventListener("click", GMP);
htpBtn.addEventListener("click", GHP);

function GLP() { //GET LEVELS PAGE
    back.classList.remove("hidden");
    links.classList.add("hidden");
    levelsPage.classList.remove("hidden");
    setTimeout(() => {
        back.style.marginRight = "0";
        levelsPage.style.marginRight = "0";
    }, 40);
    links.style.marginLeft = "-300px"
}

levels.forEach((l) => {
    l.addEventListener("click", () => {
        GHTSP(l.dataset.n);
    })
});

function GHTSP(n) {//how to solve page
    levelsPage.classList.add("hidden");
    howToSolvePage.classList.remove("hidden");
    let solves = document.querySelectorAll(".how-to-solve div");
    solves.forEach((s) => {
        s.dataset.n = n;
    });
    setTimeout(() => {
        howToSolvePage.style.marginRight = "0";
    }, 40);
    levelsPage.style.marginRight = "-300px";
}

function GMP() { //GET Main PAGE
    console.clear();
    Node.id = 0;
    Graph.CN = 0;
    Graph.lastNodeIndex = 0;
    Graph.numOfMoves = 0;
    Graph.nodeHashCodeList = new Map();
    document.querySelector(".time").innerHTML =
        `
    <span id="minute">00</span>:<span id="second">00</span>:<span id="millisecond">0</span>
    `

    back.classList.add("hidden");
    links.classList.remove("hidden");
    levelsPage.classList.add("hidden");
    howToPlay.classList.add("hidden");
    NOMoves.classList.add("hidden");
    howToSolvePage.classList.add("hidden")
    document.querySelector(".print-graph").classList.add("hidden");
    let hr = document.querySelector(".hr");
    if (hr) hr.remove();
    document.querySelector(".dev-view").classList.add("hidden");
    let grid = document.querySelector(".grid");
    if (grid) {
        grid.remove();
    }
    let steps = document.querySelectorAll(".step");
    steps.forEach((step) => {
        step.remove();
    });
    document.querySelector(".win").style.right = "-245px";
    document.body.style.overflowX = "hidden";

    setTimeout(() => {
        links.style.marginLeft = "0";
        back.style.marginRight = "-60px";
        levelsPage.style.marginRight = "-300px";
        howToPlay.style.marginRight = "-300px";
    }, 40);
}

function GHP() { //GET HOW TO PLAY PAGE
    back.classList.remove("hidden");
    links.classList.add("hidden");
    howToPlay.classList.remove("hidden");
    setTimeout(() => {
        back.style.marginRight = "0";
        howToPlay.style.marginRight = "0";
    }, 40);
    links.style.marginLeft = "-300px"
}

export function clearPage() {
    links.classList.add("hidden");
    howToPlay.classList.add("hidden");
    levelsPage.classList.add("hidden");
    howToSolvePage.style.marginRight = "-300px";
    howToSolvePage.classList.add("hidden");
    setTimeout(() => {
        links.style.marginLeft = "0";
        levelsPage.style.marginRight = "-300px";
        howToPlay.style.marginRight = "-300px";
    }, 40);
    links.style.marginLeft = "-300px"
}

///////////////
const linksHight = document.querySelector(".links .container");
const levelsPageHight = document.querySelector(".levels .container");
const HowHight = document.querySelector(".htp .container");
const choicesHight = document.querySelector(".how-to-solve .container");
levelsPageHight.style.minHeight = `${window.innerHeight - 215}px`;
linksHight.style.minHeight = `${window.innerHeight - 185}px`;
HowHight.style.minHeight = `${window.innerHeight - 185}px`;
HowHight.style.minHeight = `${window.innerHeight - 185}px`;
choicesHight.style.minHeight = `${window.innerHeight - 185}px`;
///////////////