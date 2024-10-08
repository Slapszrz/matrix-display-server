const express = require("express");
const bodyParser = require('body-parser')
const {Display} = require("./src/classes/Display");
const {FrameManager} = require("./src/classes/FrameManager");
const pixels = require('image-pixels');
const decodeGif = require("decode-gif");
const {Frame} = require("./src/classes/Frame");
const {rgba2rgb} = require("./src/functions/rgba2rgb")
const {ModeManager} = require("./src/classes/ModeManager");
const {createCanvas} = require("canvas");

const app = express();
const PORT = 8000;
const displayDimension = { x: 128, y: 64 }

let display = new Display(displayDimension.y, displayDimension.x);
let frameManager = new FrameManager(display, null);
let modeManager = new ModeManager(displayDimension, frameManager, "CLOCK");

// display.fill({r: 50, g: 50, b: 50})

app.use( bodyParser({ limit: "64mb" }) );

app.listen(
    PORT,
    () => console.log("Server started on http://localhost:" + PORT)
)

app.post("/clear", (req, res) => {
    frameManager.clearAll()

    res.send({})
})

app.post("/brightness", (req, res) => {
    const { brightness } = req.body

    if (!brightness) {
        res.status(400).send({message: "Missing field 'brightness'."})
        return
    }

    display.brightness( brightness );

    display.update();

    res.send({})
})

app.post("/fill", (req, res) => {
    const { color } = req.body;

    if (!color) {
        res.status(400).send({message: "Missing field 'color'."})
        return
    }

    display.fill(color);

    res.send({
        color
    })
})

app.post("/pixel", (req, res) => {
    const { color, position } = req.body;

    if (!color) {
        res.status(400).send({message: "Missing field 'color'."})
        return
    }
    if (!position) {
        res.status(400).send({message: "Missing field 'position'."})
        return
    }

    display.pixel(position, color)

    res.send({
        color,
        position
    })
})


app.post("/image", async (req, res) => {
    const { image } = req.body;

    if (!image) {
        res.status(400).send({message: "Missing field 'image'."})
        return
    }

    const { data, width, height } = await pixels(image)

    const rgbArray = new Uint8Array(rgba2rgb(data))

    display.setUint8Array( rgbArray, width, height );

    display.update()

    res.send({})
})

app.post("/gif", (req, res) => {
    const { gif } = req.body;

    if (!gif) {
        res.status(400).send({message: "Missing field 'gif'."})
        return
    }

    const { width, height, frames } = decodeGif(Buffer.from(gif, "base64"));

    let frameTime = 100

    if (frames.length > 0) {
        frameTime = frames[1].timeCode
    }

    for (let i=0; i<frames.length; i++) {
        const { data } = frames[i]

        frameManager.addQueueFrame(
            new Frame(
                new Uint8Array(rgba2rgb(data)),
                frameTime,
                height,
                width,
                true
            ),
        )
    }

    frameManager.start()

    res.send({})
})

app.post("/mode", async (req, res) => {
    const { mode } = req.body;

    if (!mode) {
        res.status(400).send({message: "Missing field 'mode'."})
    }

    modeManager.changeMode(mode)

    res.send({})
})