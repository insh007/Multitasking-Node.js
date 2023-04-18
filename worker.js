const workerpool = require('workerpool')

const complexCalc = () => {
    let  counter = 0
    workerpool.workerEmit("Worker will now start the computation.") // to give some message
    while(counter<900000000){
        counter++
    }
    workerpool.workerEmit("Worker is done wiht the computation.")
    return counter
}

workerpool.worker({
    complexCalc : complexCalc
})
