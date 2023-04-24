const express = require('express')
const app = express()
const { fork } = require("child_process")

app.get('/light', (req, res) => {
    res.send("Resolved ligth request, easy peasy")
    console.log("Light request");
})


app.get("/heavy", (req, res) => {
    const child = fork('./child.js')
    child.send("Start")
    child.on("message", (msg) => {
        return res.send(msg)
    })
    console.log("Heavy request")
})

app.listen(3000, () => console.log("app is running on PORT 3000"))

