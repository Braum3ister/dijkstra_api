"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toIdString() {
        return `${this.x},${this.y}`;
    }
    getValidNeighbours(height, width) {
        const output = [];
        output.push(new Position(this.x + 1, this.y));
        output.push(new Position(this.x - 1, this.y));
        output.push(new Position(this.x, this.y + 1));
        output.push(new Position(this.x, this.y - 1));
        return output.filter((pos) => {
            return !(pos.x < 0 || pos.y < 0 || pos.x >= height || pos.y >= width);
        });
    }
}
exports.Position = Position;
