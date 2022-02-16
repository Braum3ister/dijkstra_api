import {InvalidArgumentException} from "../../../exceptions/Exceptions";

export interface Comparable<T> {
    /**
     * Should simulate the Comparable Interface of Java
     * @param obj1 fistObject to Compare
     * @return 0 -> if they are equal
     *         1 -> if obj1 is bigger
     *        -1 -> if obj2 is bigger
     */
    compareTo(obj1: T): number;

}

export interface Heap<T> {
    getMin(): T;
    insert(elementToInsert: T): void;
    deleteMin(): T;
    getSize(): number;

}

export class BinaryHeap<T extends Comparable<T>> implements Heap<T> {
    private readonly heapArray: T[];
    private currentSize: number;
    private readonly maxSize: number;

    constructor(maxSize: number) {
        this.maxSize = maxSize + 1;
        this.heapArray = new Array(this.maxSize)
        this.currentSize = 0
    }

    getMin(): T {
        if (this.currentSize <= 0) {
            throw new InvalidArgumentException("Heap is empty")
        }
        return this.heapArray[1];
    }

    deleteMin(): T {
        let result = this.getMin();
        this.heapArray[1] = this.heapArray[this.currentSize]
        this.currentSize--;
        this.siftDown(1, this.heapArray, this.currentSize + 1)


        return result;
    }


    insert(elementToInsert: T): void {
        if (this.currentSize >= this.maxSize - 1) {
            throw new InvalidArgumentException("Heap is full")
        }
        this.currentSize++;
        this.heapArray[this.currentSize] = elementToInsert;
        this.siftUp(this.currentSize, this.heapArray)
    }

    getSize(): number {
        return this.currentSize
    }

    private siftUp(index: number, heapArray: T[]): void {
        let parentIndex = Math.floor(index / 2);
        if (index === 1 || heapArray[parentIndex].compareTo(heapArray[index]) <= 0) return;
        this.swap(index, parentIndex, heapArray)
        this.siftUp(parentIndex, heapArray)


    }

    private swap(firstIndex: number, secondIndex: number, heapArray: T[]) {
        let temp = heapArray[firstIndex];
        heapArray[firstIndex] = heapArray[secondIndex]
        heapArray[secondIndex] = temp
    }

    private siftDown(index: number, heapArray: T[], currentSize: number) {
        if (2 * index > currentSize) return;
        let childIndex;
        if (2 * index + 1 > currentSize || heapArray[2 * index].compareTo(heapArray[2 * index + 1]) <= 0) {
            childIndex = 2 * index;
        } else {
            childIndex = 2 * index + 1;
        }
        if (heapArray[index].compareTo(heapArray[childIndex]) > 0) {
            this.swap(index, childIndex, heapArray)
            this.siftDown(childIndex, heapArray, currentSize)
        }
    }

}