
export interface Equality {
    toIdString():string;
}

export class GeneralSet<T extends Equality> {
    private readonly map;

    constructor() {
        this.map = new Map<string, T>();
    }

    add(item: T) {
        this.map.set(item.toIdString(), item);
    }

    values() {
        return this.map.values();
    }

    delete(item: T) {
        return this.map.delete(item.toIdString());
    }

    contains(item: T) {
        return this.map.get(item.toIdString()) !== undefined
    }

}