import { Hero } from './hero.model';
import { IDice } from './dice.model';

export enum Order {
    Forward = 'forward',
    Reverse = 'reverse',
    Random = 'random'
}

export interface IGameParams {
    config: {
        order: Order;
    }
}

type Winner = Hero;

export class Game {
    constructor(
        private params: IGameParams,
        private dice: IDice,
    ) {}

    play(heroes: Hero[]): Winner {
        const directionMap: {[order in Order]: (heroes: Hero[]) => Winner} = {
            [Order.Forward]: this.forwardDirection,
            [Order.Reverse]: this.reverseDirection,
            [Order.Random]: this.randomDirection,
        };

        return directionMap[this.params.config.order](heroes);
    }

    private forwardDirection(heroes: Hero[]): Winner {
        let strikerNumber = 0;

        const nextStep = (currentStep: number, lastCollectionIndex: number) =>
            (currentStep === lastCollectionIndex) ? 0 : (currentStep + 1);

        while (heroes.length !== 1) {
            const defenderNumber = nextStep(strikerNumber, (heroes.length - 1));
            const damage = this.dice.roll();
            const striker = heroes[strikerNumber];
            const defender = heroes[defenderNumber];

            striker.attack(defender, damage);
            defender.isDead && heroes.splice(defenderNumber, 1);
            strikerNumber = defenderNumber;
        }

        return heroes[0];
    }

    private reverseDirection(heroes: Hero[]): Winner {
        let strikerNumber = heroes.length - 1;

        const previousStep = (currentStep: number, lastCollectionIndex: number) =>
            (currentStep === 0) ? lastCollectionIndex : (currentStep - 1);

        while (heroes.length !== 1) {
            const defenderNumber = previousStep(strikerNumber, (heroes.length - 1));
            const damage = this.dice.roll();
            const striker = heroes[strikerNumber];
            const defender = heroes[defenderNumber];

            striker.attack(defender, damage);
            defender.isDead && heroes.splice(defenderNumber, 1);
            strikerNumber = (defender.isDead && heroes.length > 1)
                ? previousStep(defenderNumber - 1, (heroes.length - 1))
                : defenderNumber;
        }

        return heroes[0];
    }

    private randomDirection(heroes: Hero[]): Winner {
        let strikerNumber = 0;

        const randomStep = (min: number, max: number, exceptValue: number): number => {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            return (num === exceptValue) ? randomStep(min, max, exceptValue) : num;
        };

        while (heroes.length !== 1) {
            const defenderNumber = randomStep(0, (heroes.length - 1), strikerNumber);
            const damage = this.dice.roll();
            const striker = heroes[strikerNumber];
            const defender = heroes[defenderNumber];

            striker.attack(defender, damage);
            defender.isDead && heroes.splice(defenderNumber, 1);
            strikerNumber = (defender.isDead && heroes.length > 1)
                ? randomStep(0, (heroes.length - 1), strikerNumber)
                : defenderNumber;
            strikerNumber = defenderNumber;
        }

        return heroes[0];
    }
}