const cluster = require("cluster")
const OS = require('os')

if (cluster.isMaster) {
    const totalCores = OS.cpus().length

    for (let i = 0; i < totalCores; i++) {
        cluster.fork()
    }

    cluster.on("online", (worker) => {
        console.log("Worker " + worker.process.pid + ' is online.');
    })

    cluster.on('exit',  (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' exited with code: ' + code);
        console.log('Starting a new worker');
        cluster.fork();
    });

} else {

    const express = require('express')
    const app = express()

    app.get("/heavy", (req, res) => {
        let counter = 0;
        while (counter < 900000000) {
            counter++;
        }
        res.send(`${process.pid}: ${counter} iterations completed! \n`);
    })

    app.get("/light", (req, res) => {
        res.send(`${process.pid}: Done \n`);
    })
    
    app.listen(3000, () => console.log("Listening to port 3000"));
}




// const express = require('express')
// const app = express()

// app.get("/he", (req, res) => {
//     let counter = 0;
//     while (counter < 900000000) {
//         counter++;
//     }
//     res.send(`${counter} iterations completed! \n`);
// })
// app.listen(3000, () => console.log("Listening to port 3000"));