const {createCanvas} = require("canvas");

class ModeManager {
    constructor(displayDimensions, frameManager, mode) {
        this.displayDimensions = displayDimensions;
        this.frameManager = frameManager;
        this.mode = mode;

        this.startMode()
    }

    async changeMode(mode) {
        this.mode = mode;
        this.startMode()
    }

    async startMode() {
        this.frameManager.clearAll()

        switch (this.mode) {
            case "NONE":
                return;
            case "CLOCK":
                this.clock()
                break;
            default:
                return;
        }
    }

    async clock() {
        const canvas = createCanvas(this.displayDimensions.x, this.displayDimensions.y);
        const context = canvas.getContext("2d");

        context.fillStyle = "#764abc";
        context.fillRect(0, 0, this.displayDimensions.x, this.displayDimensions.y);

        context.font = "bold 10pt 'PT Sans'";
        context.textAlign = "center";
        context.fillStyle = "#fff";
        context.fillText("Text", 0, 0);

        const buffer = canvas.toBuffer("image/png");
        this.frameManager.addQueueFrame(buffer)
        this.frameManager.start()
    }
}

module.exports.ModeManager = ModeManager