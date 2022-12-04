import { Queue } from "./Queue.js";

// CREATED BY PHILIP DROUBI
export class priorityQueue extends Queue {
    /**
    * @param {String} type - The priorityQueue realeted algorithm type
    * - Could be UCS, A* or HC (hill climbing)
    * - UCS is default
    */
    constructor(type = 'UCS') {
        super([])
        this.type = type;
    }

    enqueue(element) {
        // creating object from queue element
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        if (this.type == 'UCS') {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].cost > element.cost) {
                    // Once the correct location is found it is
                    // enqueued
                    this.items.splice(i, 0, element);
                    contain = true;
                    break;
                }
            }
        } else if (this.type == 'A*') {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].totalCost > element.totalCost) {
                    // Once the correct location is found it is
                    // enqueued
                    this.items.splice(i, 0, element);
                    contain = true;
                    break;
                } else if (this.items[i].totalCost == element.totalCost && this.items[i].h > element.h) {
                    // Once the correct location is found it is
                    // enqueued
                    this.items.splice(i, 0, element);
                    contain = true;
                    break;
                }
            }
        } else if (this.type == 'HC') {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].h > element.h) {
                    // Once the correct location is found it is
                    // enqueued
                    this.items.splice(i, 0, element);
                    contain = true;
                    break;
                }
            }
        }
        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(element);
        }
    }
}