import {Equality} from "../utils/GeneralSet";

export class Vertex implements Equality {
    private readonly name: string;
    constructor(name: string) {
        this.name = name;
    }

    toJSON() {
        return {
            firstName: this.name
        }
    }

    toIdString(): string {
        return this.name;
    }
}


export class Destination {
    private readonly _endVertex: Vertex;
    private readonly _weight: number;
    constructor(endVertex: Vertex, weight: number) {
        this._endVertex = endVertex;
        this._weight = weight;
    }


    get endVertex(): Vertex {
        return this._endVertex;
    }

    get weight(): number {
        return this._weight;
    }
}