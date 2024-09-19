const express = require("express");
const bodyParser = require('body-parser')
const {Display} = require("./src/classes/Display");
const {FrameManager} = require("./src/classes/FrameManager");
// const pixels = require('image-pixels');
const decodeGif = require("decode-gif");
const {Frame} = require("./src/classes/Frame");
const rgba2rgb = require("./src/functions/rgba2rgb")

const app = express();
const PORT = 8000;

let display = new Display(64, 128);
let frameManager = new FrameManager(display, null);

display.fill({r: 50, g: 50, b: 50})
display.brightness(0)

app.use( bodyParser({ limit: "64mb" }) );

app.listen(
    PORT,
    () => console.log("Server started on http://localhost:" + PORT)
)

app.post("/clear", (req, res) => {
    display.clear();

    res.send({})
})

app.post("/brightness", (req, res) => {
    const { brightness } = req.body

    if (!brightness) {
        res.status(400).send({message: "Missing field 'brightness'."})
        return
    }

    display.brightness( brightness );

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

    // display.image(image)

    res.send({})
})

app.post("/gif", async (req, res) => {
    const { gif } = req.body;

    if (!gif) {
        res.status(400).send({message: "Missing field 'gif'."})
        return
    }

    const { width, height, frames } = decodeGif(Buffer.from(gif, "base64"));

    console.log("received gif with " + frames.length + " frames")

    for (let i=0; i<frames.length; i++) {
        const { data, timeCode } = frames[i]
        frameManager.addQueueFrame(new Frame(new Uint8Array(rgba2rgb(data)), width, height), timeCode)
    }

    frameManager.startNextFrame()


    res.send({})
})
