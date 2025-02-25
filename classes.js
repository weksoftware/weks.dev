export class Botik {
    type;
    lastMove = 0;
    
    constructor(type, lastMove) {
        this.type = type;
        this.lastMove = lastMove;
    }

    move(n) {
        this.lastMove = n;
    }
}