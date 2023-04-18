const express = require('express')
const workerpool = require('workerpool')
const pool = workerpool.pool('./worker.js')
const app = express()

/* we can move this file to a separate file like here worker.js
const complexCalc = () => {
    let  counter = 0
    while(counter<900000000){
        counter++
    }
    return counter
}
*/

app.get('/light', (req, res) => {
    res.send("Resolved ligth request, easy peasy")
})

// without using worker pool
// app.get("/heavy", (req, res) => {
//     complexCalc()
//     res.send("Resolved heavy reques, phew!")
// })

// with using worker pool
app.get("/heavy", (req, res) => {
    //(The second argument is an empty array because our complex calculation function has no arguments) and we
    //are using it for message otherwise we can simply use pool.exec("complexCalc")
    pool.exec("complexCalc", [], {
        on: (message) => console.log(message)
    })
    .then((result) => {
        res.send(`Resolved heavy request. ${result} iterations completed!!!`)
    })
    .catch((err) => {
        console.log(err)
    })
    .then(() => {
        pool.terminate()
    })
})


app.listen(3000, () => console.log("app is running on PORT 3000"))
