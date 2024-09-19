
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
        console.log(this.queue.length)
        const currentFrame = this.queue[0]
        const onFrameEnd = currentFrame ? this.startNextFrame : this.clearAll

        console.log("starting next frame")
        console.log(onFrameEnd)
        new Promise(resolve => setTimeout(resolve, currentFrame.frameTime)).then(() => {
            console.log("frame ended")
            onFrameEnd()
        }).catch(console.error)

        this.playCurrentFrame()
    }

    playCurrentFrame() {
        const { data, width, height } = this.queue[0]

        console.log("start current frame")

        this.display.displayUint8Array(data, width, height)

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