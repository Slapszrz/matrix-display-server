
class FrameManager {
    constructor(display, initialFrames) {
        this.display = display;
        this.setupQueue(initialFrames)
    }

    setupQueue(initialFrames) {
        this.queue = initialFrames ? initialFrames : []
    }

    addQueueFrame(frame) {
        console.log("adding frame to queue")
        this.queue.push(frame)
    }

    startNextFrame() {
        const currentFrame = this.queue[0]
        const onFrameEnd = currentFrame ? this.startNextFrame : this.clearAll

        console.log("starting next frame")
        new Promise(resolve => setTimeout(currentFrame.frameTime)).then(onFrameEnd)

        this.playCurrentFrame()
    }

    playCurrentFrame() {
        const currentFrame = this.queue[0]

        console.log("start current frame")

        this.display.displayUint8Array(currentFrame.data)

        this.removeCurrentFrame()
    }

    removeCurrentFrame() {
        console.log("removing current frame from queue")
        this.queue.shift()
    }

    clearAll() {
        this.queue = []
        this.display.clear()
    }
}

module.exports.FrameManager=FrameManager