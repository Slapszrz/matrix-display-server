const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
// class LedMatrix {
//     constructor(height, width) {
//     }
// }

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

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

    brightness(brightness) {
        if (brightness < 0 || brightness > 100) return

        this.matrix.brightness(brightness)
    }

    fill(color) {
        this.matrix.fill(color.r, color.g, color.b);
        this.update()
    }

    pixel(position, color) {
        this.matrix.setPixel(position.x, position.y, color.r, color.g, color.b);
        this.update()
    }

    setUint8Array(rgbArray, width, height) {
        for (let i=0; i < width * height; i++) {
            const j = i * 3

            this.matrix.setPixel(
                i%width /* x-position */,
                Math.floor(i / width) /* y-position */,
                rgbArray[j],
                rgbArray[j+1],
                rgbArray[j+2])
        }
    }
}

module.exports.Display=Display