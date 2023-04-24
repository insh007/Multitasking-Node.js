// const {spawn } = require("child_process")

// /*
//     /b -> to get the only file names like here : index.html, package.json and so on.
//     shell : true it used to tell spawn to list files in a shell without using we get an error
// */

// let listFiles = spawn("dir", ['/b'] ,{shell:true})

// // to catch the error if occur while listing the files with dir 
// listFiles.stderr.on("data", (error) => {
//     console.log(error)
// })

// // to get the data
// listFiles.stdout.on("data", (data) => {
//     console.log(data.toString())
// })

// // to catch the error if occur in spawn method 
// listFiles.on("error", (error) => {
//     console.error(`some error occured: ${error.message}`)
// })

//================================================================//
const { fork } = require("child_process")

const child = fork('./child.js', ["hello", 1, "Carter"])

// child.send({ message: "Hello child, from parent"})

// child.on('exit', (code) => {
//     console.log('Child process exited with code', code)
// })

child.on("message", (msg) => {
    console.log("Message from child", msg)
})