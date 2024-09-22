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
        console.log("adding new frame to queue")
        this.queue.push(frame)
    }

    start() {
        console.log("starting playback")
        const currentFrame = this.queue[0]

        this.display.setUint8Array(currentFrame.data, currentFrame.width, currentFrame.height)

        if (currentFrame.loopFrame) {
            console.log("current frame will be looped, adding to queue")
            this.addQueueFrame(currentFrame)
        }

        this.startNextFrame(currentFrame.frameTime)
    }

    startNextFrame(lastFrameTime) {
        this.removeCurrentFrameFromQueue()
        this.display.update()

        console.log("starting next frame")

        const currentFrame = this.queue[0]

        if (!currentFrame) {
            console.log("no next frame could be found, ending playback")
            return
        }

        this.display.setUint8Array(currentFrame.data, currentFrame.width, currentFrame.height)

        if (currentFrame.loopFrame) {
            this.addQueueFrame(currentFrame)
        }

        const onFrameEnd = (this.startNextFrame).bind(this)

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