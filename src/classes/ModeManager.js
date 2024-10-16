const {createCanvas} = require("canvas");
const {Frame} = require("./Frame");
const {rgba2rgb} = require("../functions/rgba2rgb");

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
        const context = canvas.getContext("2d", { alpha: false });

        context.fillStyle = "#764abc";
        context.fillRect(0, 0, this.displayDimensions.x, this.displayDimensions.y);

        context.fillStyle = "#fff";
        context.textAlign = "right"

        const date = new Date();

        function getHoursAndMinutes(date) {
            return date.getHours().toString() + ":" + date.getMinutes().toString()
        }

        function getSeconds(date) {
            return date.getSeconds()
        }

        function getDateString(date) {
            return date.getDay().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()
        }


        context.font = "bold 20pt 'PT Sans'";
        context.textAlign = "left";
        context.fillText(getDateString(date), 0, 22);
        context.fillText(getHoursAndMinutes(date), 0, 46);
        context.font = "bold 10pt 'PT Sans'";
        context.fillText(getSeconds(date), 84, 46);

        const frame = new Frame(
            rgba2rgb(context.getImageData(0, 0, this.displayDimensions.x, this.displayDimensions.y).data),
            1000,
            canvas.height,
            canvas.width,
            false
        );

        this.frameManager.addQueueFrame(frame)
        this.frameManager.start()
    }
}

module.exports.ModeManager = ModeManager