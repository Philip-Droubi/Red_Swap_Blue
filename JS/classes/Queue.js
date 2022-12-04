// CREATED BY PHILIP DROUBI
export class Queue {
    /**
     * Create new Queue (LIFO)
     * @return Queue Object
     */

    constructor() {
        this.items = [];
    }
    enqueue(element) {
        this.items.push(element);
    }
    dequeue() {
        if (this.isEmpty())
            return false;
        return this.items.shift();
    }
    front() {
        if (this.isEmpty())
            return false;
        return this.items[0];
    }
    rear() {
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length == 0;
    }
    printQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}