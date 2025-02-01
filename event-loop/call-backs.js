export class CallStack {
    constructor() {
        this.stack = [];
    }

    push(task) {
        this.stack.push(task);
    }

    pop() {
        return this.stack.pop();
    }

    isEmpty() {
        return this.stack.length === 0;
    }
}