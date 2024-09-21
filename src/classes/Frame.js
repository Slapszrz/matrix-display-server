class Frame {
    constructor(data, frameTime, height, width, loopFrame) {
        this.data = data
        this.frameTime = frameTime
        this.height = height
        this.width = width
        this.loopFrame = loopFrame
    }
}

module.exports.Frame = Frame