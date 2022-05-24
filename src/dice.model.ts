export interface IDice {
    roll(): number;
}

export class Dice implements IDice {
    private MAX_NUMBER: number = 6;
    static instance: Dice;

    constructor() {
        if (Dice.instance) {
            return Dice.instance;
        }

        Dice.instance = this;
    }

    roll(): number {
        return Math.round(Math.random() * this.MAX_NUMBER);
    }
}