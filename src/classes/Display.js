const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
// class LedMatrix {
//     constructor(height, width) {
//     }
// }

const pixels = require('image-pixels');
const decodeGif = require("decode-gif");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Display {
    constructor(height, width) {
        this.matrix = new LedMatrix(height, width);
    }

    update() {
        this.matrix.update();
    }

    clear() {
        this.matrix.clear();
        this.update()
    }

    fill(color) {
        this.matrix.fill(color.r, color.g, color.b);
        this.update()
    }

    pixel(position, color) {
        this.matrix.setPixel(position.x, position.y, color.r, color.g, color.b);
        this.update()
    }

    async image(base64Data) {
        const { data, width, height } = await pixels(base64Data)

        const rgbArray = new Uint8Array(data.filter((item, index) => ((index+1)%4 != 0)))

        this.displayUint8Array(rgbArray, width, height)
    }

    async gif(base64Data) {
        const { width, height, frames } = decodeGif(Buffer.from(base64Data, "base64"));

        for (const frame in frames) {
            this.displayUint8Array(frame, width, height)
            await sleep(frame.timeCode)
        }

        console.log(frames[0].data[0])
    }

    displayUint8Array(rgbArray, width, height) {
        for (let i=0; i < width * height; i++) {
            const j = i * 3

            const position = {
                x: i%width,
                y: Math.floor(i / width)
            }

            this.matrix.setPixel(position.x, position.y, rgbArray[j], rgbArray[j+1], rgbArray[j+2])
        }
        this.update()
    }

}

module.exports.Display=Display