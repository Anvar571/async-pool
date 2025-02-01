import { CallStack } from "./call-backs";
import { IO } from "./io";
import { MicroTaskQueue } from "./mirotask";
import { TaskQueue } from "./task-queue";
import { Timers } from "./timers";

export class EventLoop {
    constructor() {
        this.callStack = new CallStack();
        this.taskQueue = new TaskQueue();
        this.microTaskQueue = new MicroTaskQueue();
        this.io = new IO();
        this.timers = new Timers();
    }

    run() {
        while (true) {
            // 1. CallStack ni boshqarish
            while (!this.callStack.isEmpty()) {
                const task = this.callStack.pop();
                task();
            }

            // 2. MicroTaskQueue ni boshqarish
            while (!this.microTaskQueue.isEmpty()) {
                const microTask = this.microTaskQueue.dequeue();
                this.callStack.push(microTask);
            }

            // 3. TaskQueue ni boshqarish
            if (!this.taskQueue.isEmpty()) {
                const task = this.taskQueue.dequeue();
                this.callStack.push(task);
            }

            // 4. IO ni boshqarish
            this.io.runCallbacks();

            // 5. Timers ni boshqarish
            this.timers.checkTimers();

            // 6. Agar hech narsa qilinmasa, tsiklni to'xtatish
            if (
                this.callStack.isEmpty() &&
                this.taskQueue.isEmpty() &&
                this.microTaskQueue.isEmpty() &&
                this.io.callbacks.length === 0 &&
                this.timers.timers.length === 0
            ) {
                break;
            }
        }
    }
}