const express = require("express");
const bodyParser = require('body-parser')
const {Display} = require("./src/classes/Display");

const app = express();
const PORT = 8000;

let display = new Display(64, 128);

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
    const { brightness } = req
    console.log(brightness)
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

    // display.gif(gif)

    res.send({})
})