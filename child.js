// console.log("In child")

// console.log(process.argv)  // to get array value

// process.on("message", (msg) => {
//     console.log("Message from parent", msg)
//     process.exit(0)
// })

// process.send({message : "Child message to parent"})


// ---- for example.js file ---

process.on("message", (msg) => {
    let  counter = 0
    while(counter<900000000){
        counter++
    }
    process.send(`${counter} iteration completed \n`)
})
