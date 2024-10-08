const {createCanvas} = require("canvas");
const {Frame} = require("./Frame");

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
        console.log(this.displayDimensions)
        const canvas = createCanvas(this.displayDimensions.x, this.displayDimensions.y);
        const context = canvas.getContext("2d", { alpha: false,  });

        context.fillStyle = "#764abc";
        context.fillRect(0, 0, this.displayDimensions.x, this.displayDimensions.y);

        context.font = "bold 10pt 'PT Sans'";
        context.textAlign = "center";
        context.fillStyle = "#fff";
        context.fillText("Text", 0, 0);


        // const buffer = canvas.toBuffer("image/png").buffer;
        const frame = new Frame(
            canvas.toBuffer("image/png").buffer,
            1000,
            canvas.height,
            canvas.width,
            false
        );

        this.frameManager.addQueueFrame(frame)
        console.log(frame)
        this.frameManager.start()
    }
}

module.exports.ModeManager = ModeManager