import { EventLoop } from "./event-loop.js";

const eventLoop = new EventLoop();

eventLoop.timers.setTimeout(() => {
    console.log("Timer 1");
}, 1000);

eventLoop.timers.setInterval(() => {
    console.log("Interval 1");
}, 2000);

eventLoop.taskQueue.enqueue(() => {
    console.log("Task 1");
});

eventLoop.microTaskQueue.enqueue(() => {
    console.log("MicroTask 1");
});

eventLoop.io.addCallback(() => {
    console.log("IO Callback");
});

eventLoop.taskQueue.enqueue(() => {
    console.log("Task 2");
});

eventLoop.run();