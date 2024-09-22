const {Frame} = require("./Frame");

class FrameManager {
    constructor(display, initialFrames) {
        this.display = display;
        this.setupQueue(initialFrames)
    }

    setupQueue(initialFrames) {
        this.queue = initialFrames ? initialFrames : []
    }

    addQueueFrame(frame) {
        this.queue.push(frame)
    }

    start() {
        const currentFrame = this.queue[0]

        this.display.setUint8Array(currentFrame.data, currentFrame.width, currentFrame.height)

        if (currentFrame.loopFrame) {
            this.addQueueFrame(currentFrame)
        }

        this.startNextFrame(currentFrame.frameTime)
    }

    startNextFrame(lastFrameTime) {
        this.removeCurrentFrameFromQueue()
        this.display.update()

        const currentFrame = this.queue[0]

        if (!currentFrame) {
            return
        }

        this.display.setUint8Array(currentFrame.data, currentFrame.width, currentFrame.height)

        if (currentFrame.loopFrame) {
            this.addQueueFrame(currentFrame)
        }

        const onFrameEnd = (this.startNextFrame).bind(this)

        console.log("last frame time: " + lastFrameTime)

        new Promise(resolve => setTimeout(resolve, lastFrameTime)).then(onFrameEnd).catch(console.error)
    }

    // playCurrentFrame() {
    //     const { data, width, height, loopFrame } = this.queue[0]
    //
    //     this.display.displayUint8Array(data, width, height)
    //
    //     this.removeCurrentFrameFromQueue()
    //
    //     if (loopFrame) {
    //         this.addQueueFrame(new Frame( data, width, height, loopFrame ))
    //     }
    // }

    removeCurrentFrameFromQueue() {
        this.queue.shift()
    }

    clearAll() {
        this.queue = []
        this.display.clear()
    }
}

module.exports.FrameManager=FrameManager