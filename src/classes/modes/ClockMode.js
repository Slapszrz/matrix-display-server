class ClockMode {
    constructor() {
        this.initContext()
        this.start()
    }

    initContext() {

    }

    start() {}

    buildNextSecondFrame() {
        const date = new Date()
        date.setSeconds(date.getSeconds() + 1)

        this.buildFrame(date)
    }

    buildFrame(date) {}

    stop() {}
}

module.exports.ClockMode = ClockMode