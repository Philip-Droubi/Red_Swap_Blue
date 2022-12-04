//CREATED BY PHILIP DROUBI
export class Node {
    static id = 0;
    constructor(board) {
        board.index = Node.id;
        this.board = board;
        this.childs = [];
        this.parent = -1;
        this.depth = 0;
        Node.id++;
    }
    addChilds(child) {
        this.childs.push(child)
    }
}