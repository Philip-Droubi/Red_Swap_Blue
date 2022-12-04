// CREATE BY PHILIP DROUBI
import { Node } from "./Node.js"
import { Stack } from "./Stack.js";
import { Queue } from "./Queue.js";
import { priorityQueue } from "./PriorityQueue.js";
import { Board, swapUI, printBoard, deepCopy, printSteps, deepEqual, deepCopyArray, deepEqualTow, getWhiteCell, getElementIndex } from "./board.js";
import * as helper from "../Functions/helpers.js"

export class Graph {
    static numOfMoves = 0
    static CN = 0;
    static lastNodeIndex = 0;
    static nodeHashCodeList = new Map()
    constructor() {
        this.AdjList = new Map();
    }

    addVertex(v) {
        this.AdjList.set(Node.id, new Node(v));
    }

    addEdge(v, w) {
        Graph.CN += 2
        this.AdjList.get(v.index).childs.push(w.index);
        this.AdjList.get(w.index).childs.push(v.index);
    }

    printGraph() {
        var get_keys = this.AdjList.keys();

        for (var i of get_keys) {
            var get_values = this.AdjList.get(i);
            var conc = "";

            for (var j of get_values)
                conc += j + " ";
            console.log(i + " -> " + conc);
        }
    }

    printGraphUI() {
        let hrr = document.querySelector(".hr");
        if (hrr) hrr.remove();
        let hr = document.createElement("div");
        hr.classList.add("hr");
        hr.innerHTML =
            `
        <hr>
        <hr>
        <hr>
        <hr>
        `;
        let main = document.querySelector('main');
        main.appendChild(hr);
        document.querySelectorAll(".step").forEach((s) => s.remove());
        let size = this.size();
        for (let i = 0; i < size; i++) {
            printBoard(this.AdjList.get(i).board, "step");
        }
    }

    size() {
        return this.AdjList.size;
    }

    dfs(startingNode) {
        var visited = new Map();
        this.DFSUtil(startingNode, visited);
    }

    DFSUtil(node, visited) {
        let stack = new Stack();
        stack.push(node);
        const limit = 2600; //2600 / 2580 / 201 /161 / 153 /146
        while (!stack.isEmpty()) {
            Graph.numOfMoves++;
            if (Graph.numOfMoves % 10000 == 0)
                console.log(`Number of Moves (Cost) : ${Graph.numOfMoves}`);

            node = deepCopy(stack.pop());
            let nodeHashCode = helper.hashCode(node.board.toString());
            if (!this.checkInVisited2(visited, nodeHashCode)) {
                node.index = getNodeIndex(node);
                // console.log(`node depth : ${this.AdjList.get(node.index).depth}`);
                if (node.isFinal() && !helper.win) {
                    helper.makeWin();
                    Graph.lastNodeIndex = node.index;
                    console.log(`Number of Moves (Cost) : ${Graph.numOfMoves}`);
                    break;
                }
                visited.set(nodeHashCode, true);
                helper.pushGraphChilds(node, this);

                let neighbours = this.AdjList.get(node.index).childs;
                neighbours.forEach(e => {
                    if (!this.checkInVisited2(visited, helper.hashCode(this.AdjList.get(e).board.board.toString()))) {
                        let neighbour = this.AdjList.get(e);
                        neighbour.parent = node.index;
                        neighbour.depth = this.AdjList.get(node.index).depth + 1;
                        if (neighbour.depth <= limit)
                            stack.push(neighbour.board);
                    }
                });
            }
        }
    }

    bfs(startingNode) {
        var visited = new Map();
        var q = new Queue();
        q.enqueue(deepCopy(startingNode));
        const limit = 100;

        while (!q.isEmpty()) {
            Graph.numOfMoves++;
            let getQueueElement = deepCopy(q.dequeue());
            let eleHashCode = helper.hashCode(getQueueElement.board.toString());
            getQueueElement.index = getNodeIndex(getQueueElement);
            helper.pushGraphChilds(getQueueElement, this);

            if (!this.checkInVisited2(visited, eleHashCode)) {
                if (getQueueElement.isFinal() && !helper.win) {
                    helper.makeWin();
                    Graph.lastNodeIndex = getQueueElement.index;
                    console.log(`Number of Moves (Cost) : ${Graph.numOfMoves}`);
                    console.log(`node depth : ${this.AdjList.get(getQueueElement.index).depth}`);
                    break;
                }
                if (Graph.numOfMoves % 10000 == 0) {
                    console.log(`Number of Moves (Cost) : ${Graph.numOfMoves}`);
                    console.log(`node depth : ${this.AdjList.get(getQueueElement.index).depth}`);
                }
                visited.set(eleHashCode, true);

                let neighbours = this.AdjList.get(getQueueElement.index).childs;
                neighbours.forEach(e => {
                    if (!this.checkInVisited2(visited, helper.hashCode(this.AdjList.get(e).board.board.toString()))) {
                        let neighbour = this.AdjList.get(e);
                        neighbour.parent = getQueueElement.index;
                        neighbour.depth = this.AdjList.get(getQueueElement.index).depth + 1;
                        if (neighbour.depth <= limit)
                            q.enqueue(neighbour.board);
                    }
                });
            }
        }
    }

    UCS(startingNode) {
        var visited = new Map();
        var q = new priorityQueue();
        q.enqueue(deepCopy(startingNode));
        const limit = 100;

        while (!q.isEmpty()) {
            Graph.numOfMoves++;
            let getQueueElement = deepCopy(q.dequeue());
            let eleHashCode = helper.hashCode(getQueueElement.board.toString());
            getQueueElement.index = getNodeIndex(getQueueElement);
            helper.pushGraphChilds(getQueueElement, this);
            if (!this.checkInVisited2(visited, eleHashCode)) {
                if (getQueueElement.isFinal() && !helper.win) {
                    helper.makeWin();
                    Graph.lastNodeIndex = getQueueElement.index;
                    console.log(`Number of Moves (Cost) : ${Graph.numOfMoves}`);
                    console.log(`node depth : ${this.AdjList.get(getQueueElement.index).depth}`);
                    break;
                }
                if (Graph.numOfMoves % 10000 == 0) {
                    console.log(`Number of Moves (Cost) : ${Graph.numOfMoves}`);
                    console.log(`node depth : ${this.AdjList.get(getQueueElement.index).depth}`);
                }
                visited.set(eleHashCode, true);

                let neighbours = this.AdjList.get(getQueueElement.index).childs;
                neighbours.forEach(e => {
                    if (!this.checkInVisited2(visited, helper.hashCode(this.AdjList.get(e).board.board.toString()))) {
                        let neighbour = this.AdjList.get(e);
                        neighbour.parent = getQueueElement.index;
                        neighbour.depth = this.AdjList.get(getQueueElement.index).depth + 1;
                        neighbour.board.cost = this.AdjList.get(getQueueElement.index).board.cost + 1;
                        if (neighbour.depth <= limit) {
                            q.enqueue(neighbour.board);
                        }
                    }
                });
            }
        }
    }

    AStar(startingNode) {
        var visited = new Map();
        var q = new priorityQueue('A*');
        q.enqueue(deepCopy(startingNode));
        const limit = 3800;
        while (!q.isEmpty()) {
            Graph.numOfMoves++;
            let getQueueElement = deepCopy(q.dequeue());
            let eleHashCode = helper.hashCode(getQueueElement.board.toString());
            getQueueElement.index = getNodeIndex(getQueueElement);
            let graphNode = this.AdjList.get(getQueueElement.index);
            helper.pushGraphChilds(getQueueElement, this);
            if (!this.checkInVisited3(visited, getQueueElement.index)) {
                // if (!this.checkInVisited2(visited, eleHashCode)) {
                if (getQueueElement.isFinal() && !helper.win) {
                    helper.makeWin();
                    Graph.lastNodeIndex = getQueueElement.index;
                    break;
                }
                if (Graph.numOfMoves % 1000 == 0) {
                    console.log(`Number of Moves (Cost) : ${Graph.numOfMoves}`);
                    console.log(`node depth : ${graphNode.depth}`);
                }
            }
            visited.set(eleHashCode, getQueueElement.index);
            // visited.set(eleHashCode, true);
            let neighbours = graphNode.childs;
            neighbours.forEach(e => {
                // if (!this.checkInVisited2(visited, helper.hashCode(this.AdjList.get(e).board.board.toString()))) {
                if (!this.checkInVisited3(visited, e)) {
                    if (e % 8 == 0) return Graph.numOfMoves -= helper.GraphNum(getQueueElement.n);
                    let neighbour = this.AdjList.get(e);
                    neighbour.parent = getQueueElement.index;
                    neighbour.depth = graphNode.depth + 1;
                    neighbour.board.cost = graphNode.board.cost + 1;
                    neighbour.board.h = neighbour.board.heuristic();
                    neighbour.board.totalCost = neighbour.board.cost + neighbour.board.h;
                    if (neighbour.depth <= limit) {
                        q.enqueue(neighbour.board);
                    }
                }
            });
        }
    }

    checkExistInGraph(v) {
        return Graph.nodeHashCodeList.get(v);
    }

    checkInVisited2(arr, board) {
        return arr.get(board);
    }

    checkInVisited3(arr, e) {
        let element = this.AdjList.get(e);
        let visitedNode = arr.get(helper.hashCode(element.board.board.toString()));
        if (visitedNode) {
            if (this.AdjList.get(visitedNode).parent == element.parent) return true;
        }
        return false
    }
}

function getNodeIndex(node, graph) {
    return Graph.nodeHashCodeList.get(helper.hashCode(node.board.toString())) ?? 0;
}