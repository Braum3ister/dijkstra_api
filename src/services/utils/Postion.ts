import {Equality} from "./GeneralSet";


export class Position implements Equality {
    x: number;
    y: number;

    constructor(x:number, y: number) {
        this.x = x;
        this.y = y
    }

    toIdString(): string {
        return `${this.x},${this.y}`
    }

    getValidNeighbours(height: number, width: number): Position[] {
        const output = [];
        output.push(new Position(this.x + 1, this.y))
        output.push(new Position(this.x - 1, this.y))
        output.push(new Position(this.x, this.y + 1))
        output.push(new Position(this.x, this.y - 1))

        return output.filter((pos) => {
            return !(pos.x < 0 || pos.y < 0 || pos.x >= height || pos.y >= width);
        })
    }
}