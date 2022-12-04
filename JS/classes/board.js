// CREATED BY PHILIP DROUBI
import { createArray } from "./create2DArray.js";
import { uiState } from "../Functions/UI.js"
import { Node } from "./Node.js";
import * as helper from "../Functions/helpers.js"
export class Board {
    #fs;
    #fsHash;
    static nuu = 10000
    constructor(n) {
        Board.nuu--;
        if (n <= 0) n = 2;
        this.index = 0;
        this.n = n;
        this.cost = 0;
        this.h = 0;
        this.totalCost = 0;
        this.length = (n + (n - 1));
        this.board = createArray(this.length, this.length);
        this.#fs = createArray(this.length, this.length);
        this.#fsHash = 0;
    }

    initGame() {
        let row = this.length;
        let n = this.n;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < row; j++) {
                if (i < n - 1) {
                    j < n ? this.board[i][j] = 1 : this.board[i][j] = -1
                }
                else if (i == n - 1) {
                    j < n - 1 ? this.board[i][j] = 1 : j == n - 1 ? this.board[i][j] = 0 : this.board[i][j] = 2
                }
                else if (i > n - 1) {
                    j >= n - 1 ? this.board[i][j] = 2 : this.board[i][j] = -1
                }
            }
        }
        this.#fs = this.#finalState(deepCopyArray(this.board));
        this.#fsHash = helper.hashCode(this.#fs.toString())
    }

    checkMoves() { // return array of avilable moves ids NEW
        let moves = [];
        let white = getWhiteCell(this.board, this.length);
        let i = white[0];
        let j = white[1];
        if ((this.board[i][j + 1] ? true : false) && !checkBlank(this.board, getElementIndex(i, j + 1, this.length), this.length))
            moves.push(+ getElementIndex(i, j + 1, this.length)); //Right
        if ((this.board[i][j + 2] ? true : false) && !checkBlank(this.board, getElementIndex(i, j + 2, this.length), this.length))
            moves.push(+ getElementIndex(i, j + 2, this.length)); //dRight
        if ((this.board[i][j - 1] ? true : false) && !checkBlank(this.board, getElementIndex(i, j - 1, this.length), this.length))
            moves.push(+ getElementIndex(i, j - 1, this.length)); //Left
        if ((this.board[i][j - 2] ? true : false) && !checkBlank(this.board, getElementIndex(i, j - 2, this.length), this.length))
            moves.push(+ getElementIndex(i, j - 2, this.length)); //dLeft
        if ((this.board[i - 1] ? true : false) && !checkBlank(this.board, getElementIndex(i - 1, j, this.length), this.length))
            moves.push(+ getElementIndex(i - 1, j, this.length)); //Top
        if ((this.board[i - 2] ? true : false) && !checkBlank(this.board, getElementIndex(i - 2, j, this.length), this.length))
            moves.push(+ getElementIndex(i - 2, j, this.length)); //dTop
        if ((this.board[i + 1] ? true : false) && !checkBlank(this.board, getElementIndex(i + 1, j, this.length), this.length))
            moves.push(+ getElementIndex(i + 1, j, this.length)); //Bottom
        if ((this.board[i + 2] ? true : false) && !checkBlank(this.board, getElementIndex(i + 2, j, this.length), this.length))
            moves.push(+ getElementIndex(i + 2, j, this.length)); //dBottom
        return moves;
    }

    getNextStats() { // return array of objects
        let moves = this.checkMoves();
        let nextStates = [];
        moves.forEach((id) => {
            let newBorad = deepCopy(this);
            newBorad.move(id);
            nextStates.push(newBorad);
        });
        return nextStates;
    }

    move(id) {
        let cell = getElementCordinate(id, this.length);
        let wCell = getWhiteCell(this.board, this.length);
        this.board[wCell[0]][wCell[1]] = this.board[cell[0]][cell[1]];
        this.board[cell[0]][cell[1]] = 0;
        return true;
    }

    printState() {
        console.log(this);
    }

    #finalState(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].reverse();
        }
        return arr.reverse();
    }

    isFinal() {
        return helper.hashCode(this.board.toString()) == this.#fsHash;
    }

    visited() {
        this.visited++;
        return true;
    }

    /**
     * calc h value for A* algorithm
     * @returns h value
     */
    heuristic(q) {
        let h = 0;
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (!(this.board[i][j] == this.#fs[i][j]) && this.board[i][j] != 0)
                    h++;
            }
        }
        let whiteManhattan = this.whiteManhattan();
        let boardManhattan = this.boardManhattan();
        return h * 7 - Math.min(whiteManhattan, boardManhattan);
        return h * 7 - boardManhattan;   // another way to get the heuristic value
    }

    whiteManhattan() {
        let wCord = getWhiteCell(this.board, this.length);
        let n = this.n;
        let allDists = [];
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (i < n - 1 && j < n && this.board[i][j] == 1) {
                    allDists.push(this.manhattanDistance(wCord[0], wCord[1], i, j));
                }
                else if (i == n - 1 && j == n - 1 && this.board[i][j] != 0) {
                    allDists.push(this.manhattanDistance(wCord[0], wCord[1], i, j));
                }
                else if (i > n - 1 && j >= n - 1 && this.board[i][j] == 2) {
                    allDists.push(this.manhattanDistance(wCord[0], wCord[1], i, j));
                }
            }
        }
        return allDists.length > 0 ? Math.min(...allDists) : 0;
    }

    boardManhattan() {
        let allDists = [];
        let arr = [];
        let n = this.n;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
                if (this.board[i][j] == 1) {
                    for (let k = n; k < this.board.length; k++) {
                        for (let h = n; h < this.board.length; h++) {
                            if (this.board[k][h] == 2) {
                                arr.push(this.manhattanDistance(i, j, k, h));
                            }
                        }
                    }
                    allDists.push(Math.min(...arr))
                    arr = [];
                }
            }
            let bh = Math.min(...allDists);
            return bh == Infinity ? 1000000000 : bh;
        }
    }

    manhattanDistance(x1, y1, x2, y2) {
        return Math.abs(x2 - x1) + Math.abs(y2 - y1);
    }

}

export function printBoard(Board, Class = "grid") { //object
    let game = createGrid(Board.length, Class);
    let id = 0;
    for (let i = 0; i < Board.length; i++) {
        for (let j = 0; j < Board.length; j++) {
            let cell = Board.board[i][j];
            createCell(cell, i, j, id, game);
            id++;
        }
    }
}

function createGrid(length, Class = "grid") {
    let grid = document.createElement("div");
    grid.classList.add(`${Class}`);

    let container = document.createElement("div");
    container.classList.add("container");
    grid.appendChild(container);

    let game = document.createElement("div");
    game.classList.add("game");
    game.setAttribute("style", `grid-template-columns: repeat(${length} , 50px);`);
    if (length > 10) {
        game.setAttribute("style", `grid-template-columns: repeat(${length} , 50px);transform: rotate(0);margin :auto;width:fit-content `);
        container.setAttribute("style", `display:block`);
    }
    container.appendChild(game);

    let main = document.querySelector('main');
    main.appendChild(grid);

    return game;
}

function createCell(cell, x, y, id, game) {
    switch (cell) {
        case 0:
            var c = document.createElement('div');
            c.classList.add("cell", "wCell");
            c.setAttribute('data-after', '');
            game.appendChild(c);
            break;
        case 1:
            var c = document.createElement('div');
            c.classList.add("cell", "rCell");
            c.setAttribute('data-after', '>');
            game.appendChild(c);
            break;
        case 2:
            var c = document.createElement('div');
            c.classList.add("cell", "bCell");
            c.setAttribute('data-after', '<');
            game.appendChild(c);
            break;
        case -1:
            var c = document.createElement('div');
            c.classList.add("cell", "blank");
            game.appendChild(c);
            break;
        default:
            break;
    }
    c.setAttribute('data-x', x);
    c.setAttribute('data-y', y);
    c.setAttribute('data-id', id);
    c.setAttribute('data-type', cell);
}

export function deepCopy(obj) {
    let obj2 = new Board(obj.n);
    obj2.initGame();
    obj2.board = JSON.parse(JSON.stringify(obj.board));
    // obj2.cost = obj.cost;
    // obj2.index = obj.index;
    return obj2;
}

export function deepCopyArray(arr) {
    return JSON.parse(JSON.stringify(arr));
}

function checkBlank(arr, id, length) {
    let cell = getElementCordinate(id, length);
    return arr[cell[0]][cell[1]] == -1 ? true : false;
}

export function swapUI(id) {
    let cell = document.querySelector(`div[data-id = "${id}"]`);
    let wCell = document.querySelector(`.wCell`);
    let cellType = cell.dataset.type;
    if (cellType == 1) {
        if (uiState == 0)
            wCell.dataset.after = ">";
        cell.classList.remove("rCell");
        wCell.classList.remove("wCell");
        wCell.classList.add("rCell");
        wCell.dataset.type = 1;
    }
    else if (cellType == 2) {
        if (uiState == 0)
            wCell.dataset.after = "<";
        cell.classList.remove("bCell");
        wCell.classList.remove("wCell");
        wCell.classList.add("bCell");
        wCell.dataset.type = 2;
    }
    cell.dataset.type = 0;
    cell.classList.add("wCell");

}

export function getElementIndex(i, j, length) {
    return (i * length + j);
}

function getElementCordinate(index, length) {
    return [Math.floor(index / length), index % length];
}

/**
 * @param {Array} arr -Borad array
 * @param {Number} length -Row length
 * @returns [x,y]
 */
export function getWhiteCell(arr, length) {
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (arr[i][j] == 0) {
                return [i, j];
            }
        }
    }
    return false;
}

export function printSteps(board) {
    printBoard(board, "step");
}

export function deepEqual(obj1, obj2) {
    if (obj1.n === obj2.n) {
        for (let i = 0; i < obj1.length; i++) {
            for (let j = 0; j < obj1.length; j++) {
                if (obj1.board[i][j] != obj2.board[i][j])
                    return false;
            }
        }
        return true;
    }
    return false;
}

export function deepEqualTow(obj1, obj2) {
    return obj2 === obj1;
}