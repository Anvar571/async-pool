export class IO {
    constructor() {
        this.callbacks = [];
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }

    runCallbacks() {
        while (this.callbacks.length > 0) {
            const callback = this.callbacks.shift();
            callback();
        }
    }
}