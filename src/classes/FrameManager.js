
class FrameManager {
    constructor(display, initialFrames) {
        this.display = display;
        this.setupQueue(initialFrames)
    }

    setupQueue(initialFrames) {
        console.log(initialFrames)
        this.queue = initialFrames ? initialFrames : []
        console.log(this.queue)
    }

    addQueueFrame(frame) {
        this.queue.push(frame)
    }

    startNextFrame() {
        const currentFrame = this.queue[0]

        const onFrameEnd = (() => {
            if (currentFrame) this.startNextFrame()
            else this.clearAll()
        }).bind(this)

        new Promise(resolve => setTimeout(resolve, currentFrame.frameTime)).then(onFrameEnd).catch(console.error)

        this.playCurrentFrame()
    }

    playCurrentFrame() {
        const { data, width, height } = this.queue[0]

        this.display.displayUint8Array(data, width, height)

        this.removeCurrentFrame()
    }

    removeCurrentFrame() {
        this.queue.shift()
    }

    clearAll() {
        this.queue = []
        this.display.clear()
    }
}

module.exports.FrameManager=FrameManager