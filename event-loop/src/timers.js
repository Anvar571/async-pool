export class Timers {
    constructor() {
        this.timers = [];
    }

    setTimeout(callback, delay) {
        const timer = {
            callback,
            time: Date.now() + delay,
        };
        this.timers.push(timer);
        this.timers.sort((a, b) => a.time - b.time);
    }

    setInterval(callback, interval) {
        const timer = {
            callback,
            interval,
            time: Date.now() + interval,
        };
        this.timers.push(timer);
        this.timers.sort((a, b) => a.time - b.time);
    }

    checkTimers() {
        const now = Date.now();
        while (this.timers.length > 0 && this.timers[0].time <= now) {
            const timer = this.timers.shift();
            timer.callback();
            if (timer.interval) {
                this.setInterval(timer.callback, timer.interval);
            }
        }
    }
}
