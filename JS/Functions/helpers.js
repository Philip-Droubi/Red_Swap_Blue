// CREATED BY PHILIP DROUBI
import * as Timer from "./timer.js";
import { clearPage } from "../Get_Second_Page.js";
import { Graph } from "../classes/Graph.js"
import { Board, swapUI, printBoard, deepCopy, printSteps, deepEqual } from "../classes/board.js";
import * as Music from "./music.js"
import { Node } from "../classes/Node.js";


export let movesNum = 0;
export let win = false;
let printGraphBtn = document.querySelector(".print-graph");


export function addMoveNum() {
    document.querySelector(".NOMoves .number").innerHTML = movesNum;
    if (movesNum > 24 && movesNum < 39) {
        document.querySelector(".NOMoves .emoji").innerHTML = '😃';
    }
    else if (movesNum > 39 && movesNum < 65) {
        document.querySelector(".NOMoves .emoji").innerHTML = '🤔';
    }
    else if (movesNum > 64 && movesNum < 80) {
        document.querySelector(".NOMoves .emoji").innerHTML = '🙄';
    }
    else if (movesNum > 80 && movesNum < 100) {
        document.querySelector(".NOMoves .emoji").innerHTML = '😦';
    }
    else if (movesNum > 100 && movesNum < 125) {
        document.querySelector(".NOMoves .emoji").innerHTML = '😰';
    }
    else if (movesNum > 124 && movesNum < 140) {
        document.querySelector(".NOMoves .emoji").innerHTML = '🥵';
    }
    else if (movesNum > 139 && movesNum < 161) {
        document.querySelector(".NOMoves .emoji").innerHTML = '🤕';
    }
    else if (movesNum > 160 && movesNum < 201) {
        document.querySelector(".NOMoves .emoji").innerHTML = '☠️';
    }
    else if (movesNum > 200) {
        document.querySelector(".NOMoves .emoji").innerHTML = '⚰️';
    }
}

export function getGameReady() {
    Timer.startTime();
    movesNum = 0;
    document.querySelector(".NOMoves .number").innerHTML = 0;
    document.querySelector(".NOMoves .emoji").innerHTML = '😎';
    document.querySelector(".NOMoves").classList.remove("hidden");
    document.querySelector(".dev-view").classList.remove("hidden");
    win = false;
    clearPage();
}

export function addOneMove() {
    movesNum++;
}

export function winTrue() {
    win = true;
}

export function printConsoleUser(oldBoard, newBoard, nextStates, avMoves, time, graph) {
    console.log("%c#####################################", "color:red");
    console.log("Old Board (Befor your move)");
    console.log(oldBoard);
    console.log("New Board (After your move)");
    console.log(newBoard);
    console.log("%c#####################################", "color:red");
    console.log(`The Avilable moves can be done now : [ ${avMoves} ]`);
    console.log("%c#####################################", "color:red");
    console.log(`Total Nodes Number In Graph: [ ${Node.id} ]`);
    console.log("%c#####################################", "color:red");
    console.log(`The Next Avilable States you wil got : `);
    console.log(nextStates);
    console.log("%c#####################################", "color:red");
    console.log("Current Graph : ");
    console.log(graph);
    console.log("%c#####################################", "color:red");
    console.log(`Proccessing Time Spent for this move : ${time.toFixed(2)} milliseconds.`);
}

export function printConsoleAI(oldBoard, newBoard, pathCost, parentArray, time, graph) {
    document.querySelector(".time").innerHTML = `${time.toFixed(1)} ms`
    console.log("%c#####################################", "color:red");
    console.log("Old Board (Befor your move)");
    console.log(oldBoard);
    console.log("New Board (After your move)");
    console.log(newBoard);
    console.log("%c#####################################", "color:red");
    console.log(`Solution Cost : [ ${Graph.numOfMoves} ]`);
    console.log("%c#####################################", "color:red");
    console.log(`Path Cost : [ ${pathCost} ]`);
    console.log("%c#####################################", "color:red");
    console.log(`Total Nodes Number In Graph: [ ${Node.id} ]`);
    console.log("%c#####################################", "color:red");
    console.log(`Parent Array : [ ${parentArray} ]`);
    console.log("%c#####################################", "color:red");
    console.log("Current Graph : ");
    console.log(graph);
    console.log("%c#####################################", "color:red");
    console.log(`Proccessing Time Spent for this move : ${time.toFixed(2)} milliseconds.`);
}

export function makeWin() {
    win = true;
}

export function showWinUser() {
    if (win) {
        printGraphBtn.classList.remove("hidden");
        Timer.pauseTime();
        document.querySelector(".win").style.right = "0"
        Music.winSound();
        console.log("You win");
    }
}

export function showWin(graph, board, timeSpent) {
    if (win) {
        printGraphBtn.classList.remove("hidden");
        Timer.pauseTime();
        document.querySelector(".win").style.right = "0"
        Music.winSound();
        console.log("You win");
        let parentArray = [];
        parentArray.push(graph.AdjList.get(Graph.lastNodeIndex).board.index);
        addOneMove();
        let parentNode = graph.AdjList.get(Graph.lastNodeIndex).parent;
        while (parentNode != 0) {
            parentArray.push(parentNode);
            parentNode = graph.AdjList.get(parentNode).parent;
            addOneMove();
        }
        addMoveNum();
        parentArray.reverse().forEach((e) => {
            printSteps(graph.AdjList.get(e).board);
        });
        printConsoleAI(board, graph.AdjList.get(graph.size() - 1), parentArray.length, parentArray, timeSpent, graph);
    }
    else showLoss(graph, board, timeSpent);
}

function showLoss(graph, board, timeSpent) {
    Timer.pauseTime();
    document.querySelector(".time").innerHTML = `${timeSpent.toFixed(1)} ms`
    console.log("%c🚨ATTENTION🚨", "color:purple;font-weight:600;font-size:36px");
    console.log("%cBecause of determining the depth of the graph, it is not possible to get a solution for this level... But you can still apply the algorithm to the first level.", "color:#151554;font-weight:600;font-size:18px; background-color : #ffb0b03f");
    console.log("%cTHANKS 😄", "color:#151554;font-weight:600;font-size:18px;");
    console.log("%c#####################################", "color:red");
    console.log("Old Board (Befor your move)");
    console.log(board);
    console.log("New Board (Last one we get)");
    console.log(graph.AdjList.get(graph.size() - 1));
    console.log("%c#####################################", "color:red");
    console.log(`Solution Cost Without Finding A Solution: [ ${Graph.numOfMoves} ]`);
    console.log("%c#####################################", "color:red");
    console.log(`Nodes Number : [ ${Node.id} ]`);
}

export function getNextStateNoIndex(board) {
    let nextStates = board.getNextStats();
    // nextStates.forEach((next) => {
    //     // next.index -= nextStates.length;
    // });
    return nextStates;
}

export function getChosenState(boardAfter, moves, graph) {
    for (let i = 0; i < moves.length; i++) {
        if (deepEqual(boardAfter, moves[i])) {
            for (let key of graph.AdjList.keys()) {
                if (deepEqual(graph.AdjList.get(key).board, moves[i])) {
                    return graph.AdjList.get(key).board;
                }
            }
        }
    }
    return false;
}

export function pushGraphChilds(board, graph) {
    let childs = board.getNextStats();
    childs.forEach((child) => {
        let childBoard = hashCode(child.board.toString());
        if (!graph.checkExistInGraph(childBoard, graph.size())) {
            graph.addVertex(child);
            Graph.nodeHashCodeList.set(childBoard, child.index);
            graph.addEdge(board, child);
        }
    });
}

export function GraphNum(number) {
    return number - parseInt(number / 2)
}

export function checkBelongToNextState(oldObjectNextStatesArray, newObject) {
    let ret = false;
    oldObjectNextStatesArray.forEach((e) => {
        if (deepEqual(e, newObject)) {
            console.log("there is deep equal");
            ret = true;
        }
    });
    return ret;
}

/**
* @param {String} str - The hashCode string
*/
export function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}