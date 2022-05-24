import { Hero, HeroType, IMainCharacteristic, Knight, Witch } from './hero.model';
import { Logger } from './logger.model';
import { Dice } from './dice.model';
import { Game, IGameParams, Order } from './game.model';

type MapHeroesType = {[type in HeroType]: typeof Hero};

const heroesData: IMainCharacteristic[] = [
    { energy: 100, name: 'Knight 1', type: HeroType.Knight },
    { energy: 100, name: 'Knight 2', type: HeroType.Knight },
    { energy: 100, name: 'Knight 3', type: HeroType.Knight },
    { energy: 100, name: 'Knight 4', type: HeroType.Knight },
    { energy: 100, name: 'Knight 5', type: HeroType.Knight },
    { energy: 50, name: 'Witch 1', type: HeroType.Witch },
    { energy: 50, name: 'Witch 2', type: HeroType.Witch },
];

const heroesMap: MapHeroesType = {
    [HeroType.Knight]: Knight,
    [HeroType.Witch]: Witch
};

const logger = new Logger();

const createHeroes = (
    logger: Logger,
    heroesMap: MapHeroesType,
    heroesData: IMainCharacteristic[]) =>
        heroesData.map((heroData: IMainCharacteristic) =>
            new heroesMap[heroData.type](heroData, logger));

const dice = new Dice();

const gameParams: IGameParams = {
    config: {
        order: Order.Reverse
    }
};

const game = new Game(gameParams, dice);

game.play(createHeroes(logger, heroesMap, heroesData));




