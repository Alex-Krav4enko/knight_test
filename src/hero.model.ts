import { ILogger } from './logger.model';

export enum HeroType {
    Knight = 'knight',
    Witch = 'witch'
}

export interface IMainCharacteristic {
    energy: number;
    name: string;
    type: HeroType;
}

export class Hero {
    isDead: boolean = false;

    constructor(
        private characteristic: IMainCharacteristic,
        private logger: ILogger,
    ) {
        this.logger.log(`${this.name} is active`);
    }

    get energy(): number {
        return this.characteristic.energy;
    }

    set energy(level: number) {
        this.characteristic.energy = level;
    }

    get name(): string {
        return this.characteristic.name;
    }

    attack(purpose: Hero, damage: number): void {
        purpose.setDamage(damage);
        this.logger.log(`${this.name} attacks ${purpose.name} with ${damage} damage`);
    }

    private setDamage(damage: number): void {
        if (this.energy > 0) {
            this.energy -= damage;

            if (this.energy <= 0) {
                this.isDead = true;
                this.logger.log(`${this.name} is dead`);
            }
        }
    }
}

export class Knight extends Hero {}

export class Witch extends Hero {
    attack(purpose: Hero, damage: number) {
        if (purpose instanceof Knight) {
            damage *= 2;
        }

        super.attack(purpose, damage);
    }
}
