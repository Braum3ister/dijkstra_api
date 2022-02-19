"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryHeap = void 0;
const Exceptions_1 = require("../../../exceptions/Exceptions");
class BinaryHeap {
    constructor(maxSize) {
        this.maxSize = maxSize + 1;
        this.heapArray = new Array(this.maxSize);
        this.currentSize = 0;
    }
    getMin() {
        if (this.currentSize <= 0) {
            throw new Exceptions_1.InvalidArgumentException("Heap is empty");
        }
        return this.heapArray[1];
    }
    deleteMin() {
        let result = this.getMin();
        this.heapArray[1] = this.heapArray[this.currentSize];
        this.currentSize--;
        this.siftDown(1, this.heapArray, this.currentSize + 1);
        return result;
    }
    insert(elementToInsert) {
        if (this.currentSize >= this.maxSize - 1) {
            throw new Exceptions_1.InvalidArgumentException("Heap is full");
        }
        this.currentSize++;
        this.heapArray[this.currentSize] = elementToInsert;
        this.siftUp(this.currentSize, this.heapArray);
    }
    getSize() {
        return this.currentSize;
    }
    siftUp(index, heapArray) {
        let parentIndex = Math.floor(index / 2);
        if (index === 1 || heapArray[parentIndex].compareTo(heapArray[index]) <= 0)
            return;
        this.swap(index, parentIndex, heapArray);
        this.siftUp(parentIndex, heapArray);
    }
    swap(firstIndex, secondIndex, heapArray) {
        let temp = heapArray[firstIndex];
        heapArray[firstIndex] = heapArray[secondIndex];
        heapArray[secondIndex] = temp;
    }
    siftDown(index, heapArray, currentSize) {
        if (2 * index > currentSize)
            return;
        let childIndex;
        if (2 * index + 1 > currentSize || heapArray[2 * index].compareTo(heapArray[2 * index + 1]) <= 0) {
            childIndex = 2 * index;
        }
        else {
            childIndex = 2 * index + 1;
        }
        if (heapArray[index].compareTo(heapArray[childIndex]) > 0) {
            this.swap(index, childIndex, heapArray);
            this.siftDown(childIndex, heapArray, currentSize);
        }
    }
}
exports.BinaryHeap = BinaryHeap;
