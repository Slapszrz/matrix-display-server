const express = require("express");
const {Display} = require("./src/classes/Display");

const app = express();
const PORT = 8000;

let display = new Display(64, 128);

app.use( express.json() );

app.listen(
    PORT,
    () => console.log("Server started on http://localhost:" + PORT)
)

app.post("/clear", (req, res) => {
    display.clear();

    res.send({})
})

app.post("/fill", (req, res) => {
    const { color } = req.body;

    if (!color) res.status(400).send({ message: "Missing field 'color'." })

    display.fill(color);

    res.send({
        color
    })
})

app.post("/pixel", (req, res) => {
    const { color, position } = req.body;

    if (!color) res.status(400).send({ message: "Missing field 'color'." })
    if (!position) res.status(400).send({ message: "Missing field 'position'." })

    display.pixel(position, color)

    res.send({
        color,
        position
    })
})

app.post("/image", async (req, res) => {
    const { image } = req.body;

    if (!image) res.status(400).send({ message: "Missing field 'image'." })

    display.image(image)

    res.send({})
})

app.post("/gif", async (req, res) => {
    const { gif } = req.body;

    if (!gif) res.status(400).send({ message: "Missing field 'gif'." })

    display.gif(gif)

    res.send({})
})