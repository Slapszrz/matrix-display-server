const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
const pixels = require('image-pixels');
const decodeGif = require("decode-gif");

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
        this.matrix.fill(...color);
        this.update()
    }

    pixel(position, color) {
        this.matrix.setPixel(...position, ...color);
        this.update()
    }

    async image(base64Data) {
        const { data, width, height } = await pixels(base64Data)

        const rgbArray = new Uint8Array(data.filter((item, index) => ((index+1)%4 != 0)))

        for (let i=0; i < width * height; i++) {
            const j = i * 3

            const position = {
                x: i%width,
                y: Math.floor(i / width)
            }

            this.matrix.setPixel(...position, rgbArray[j], rgbArray[j+1], rgbArray[j+2])
        }
        this.update()
    }
}

module.exports.Display=Display