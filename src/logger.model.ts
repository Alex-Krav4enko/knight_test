export interface ILogger {
    log(message: string): void;
}

export class Logger implements ILogger {
    constructor () {}

    log(message: string) {
        console.log(message);
    }
}