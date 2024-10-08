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
        console.log(this.displayDimensions)
        const canvas = createCanvas(this.displayDimensions.x, this.displayDimensions.y);
        const context = canvas.getContext("2d", { alpha: false });

        context.fillStyle = "#764abc";
        context.fillRect(0, 0, this.displayDimensions.x, this.displayDimensions.y);

        context.fillStyle = "#fff";
        context.textAlign = "right"

        const date = new Date();

        console.log(getHoursAndMinutes(date))
        console.log(getSeconds(date))
        console.log(getDateString(date))

        function getHoursAndMinutes(date) {
            return date.getHours().toString() + ":" + date.getMinutes().toString()
        }

        function getSeconds(date) {
            return date.getSeconds()
        }

        function getDateString(date) {
            return date.getDay().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()
        }


        context.font = "bold 10pt 'PT Sans'";
        context.textAlign = "left";
        context.fillText(getHoursAndMinutes(date), 0, 12);
        context.fillText(getSeconds(date), 0, 26);
        context.fillText(getDateString(date), 0, 40);

        const frame = new Frame(
            rgba2rgb(context.getImageData(0, 0, this.displayDimensions.x, this.displayDimensions.y).data),
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