const {Worker ,isMainThread, workerData, parentPort } = require('worker_threads')

if(isMainThread){
    const express = require('express')
    const app = express()

    app.get("/light", (req, res) => {
        res.send(`Request completed`);
    })

    app.get("/heavy", (req, res) => {
        //__filename will use the current file itself
        const worker = new Worker(__filename, { workerData: "workerOne" })
        worker.on("message", (data) => {
            res.send(data)
        })
    })

    app.listen(3000, () => console.log("Listening to port 3000"))
}else{
    let counter = 0;
    while (counter < 9000000000) {
        counter++;
    }
    parentPort.postMessage(`${counter} iterations completed by ${workerData}`)
}