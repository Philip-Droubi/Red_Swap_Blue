import { Board, swapUI, printBoard, deepCopy, printSteps } from "./classes/board.js";
import { clearPage } from "./Get_Second_Page.js"
import { Graph } from "./classes/Graph.js"
import { Node } from "./classes/Node.js";
import * as Timer from "./Functions/timer.js"
import * as Music from "./Functions/music.js"
import * as helper from "./Functions/helpers.js"

let graph
let n;
let choice;
let choices = document.querySelectorAll(".how-to-solve .container div");
let printGraphBtn = document.querySelector(".print-graph");
printGraphBtn.addEventListener('click', () => graph.printGraphUI());

choices.forEach((e) => {
    e.addEventListener('click', () => {
        document.body.style.overflowX = "auto";
        n = +e.dataset.n;
        choice = e.dataset.choice;
        helper.getGameReady(); // return every thing to 0
        switch (choice) {
            case "UP":
                userPlayMode();
                break;
            case "DFS":
                DFSPlayMode();
                break;
            case "BFS":
                BFSPlayMode();
                break;
            case "UCS":
                UCSPlayMode();
                break;
            case "A*":
                APlayMode();
                break;
            default:
                console.log("%cDont Play With Code", "color:purple");
                break;
        }
        //End init the page
    });
});

function userPlayMode() {
    let board = new Board(n); //declare new board object
    graph = new Graph();      //declare new graph
    board.initGame();
    graph.addVertex(deepCopy(board));
    helper.pushGraphChilds(board, graph);
    printBoard(board); //Print UI
    let cells = document.querySelectorAll('.cell');
    console.log("Initial Graph");
    console.log(graph);
    //
    cells.forEach((c) => {
        c.addEventListener('click', () => {
            if (!board.isFinal()) {
                const t0 = performance.now();
                let moves = board.checkMoves(); //get avilable moves as array of indexes
                if (moves.includes(+c.dataset.id)) {
                    console.clear();
                    let boardBefor = deepCopy(board); //before we move 
                    boardBefor.index = board.index;
                    let BefornextState = board.getNextStats(); // get before next states without effecting indexes
                    board.move(+c.dataset.id);
                    swapUI(+c.dataset.id);
                    helper.addOneMove();
                    helper.addMoveNum();
                    //Start adding nodes to graph
                    let chosenState = helper.getChosenState(board, BefornextState, graph);
                    board = deepCopy(chosenState);
                    board.index = chosenState.index;
                    printSteps(board); // TODO: print each step 
                    helper.pushGraphChilds(board, graph);
                    const t1 = performance.now();
                    const timeSpent = t1 - t0;
                    //print in console
                    helper.printConsoleUser(boardBefor, board, board.getNextStats(), board.checkMoves(), timeSpent, graph);
                }
            }
            if (board.isFinal() && !helper.win) {
                helper.makeWin();
                helper.showWinUser();
            }
        });
    });
}

function DFSPlayMode() {
    const t0 = performance.now();
    let board = new Board(n); //declare new board object
    graph = new Graph();      //declare new graph
    board.initGame();
    graph.addVertex(deepCopy(board));
    Graph.nodeHashCodeList.set(helper.hashCode(board.board.toString()), board.index);

    printBoard(board); //Print UI

    graph.dfs(board);

    const t1 = performance.now();
    const timeSpent = t1 - t0;

    helper.showWin(graph, board, timeSpent);
}

function BFSPlayMode() {
    const t0 = performance.now();
    let board = new Board(n); //declare new board object
    graph = new Graph();      //declare new graph
    board.initGame();
    graph.addVertex(deepCopy(board));
    Graph.nodeHashCodeList.set(helper.hashCode(board.board.toString()), board.index);
    printBoard(board); //Print UI

    graph.bfs(board);

    const t1 = performance.now();
    const timeSpent = t1 - t0;

    helper.showWin(graph, board, timeSpent);
}

function UCSPlayMode() {
    const t0 = performance.now();
    let board = new Board(n); //declare new board object
    graph = new Graph();      //declare new graph
    board.initGame();
    graph.addVertex(deepCopy(board));
    Graph.nodeHashCodeList.set(helper.hashCode(board.board.toString()), board.index);
    printBoard(board); //Print UI

    graph.UCS(board);

    const t1 = performance.now();
    const timeSpent = t1 - t0;

    helper.showWin(graph, board, timeSpent);
}

function APlayMode() {
    const t0 = performance.now();
    let board = new Board(n); //declare new board object
    graph = new Graph();      //declare new graph
    board.initGame();
    graph.addVertex(deepCopy(board));
    Graph.nodeHashCodeList.set(helper.hashCode(board.board.toString()), board.index);

    graph.AStar(board);

    const t1 = performance.now();
    const timeSpent = t1 - t0;
    printBoard(board); //Print UI

    helper.showWin(graph, board, timeSpent);
}
