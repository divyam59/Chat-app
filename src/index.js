const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
//we create server explicitly because it will be used 
//as parametre for socketio function to create server
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT||3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

// a count variable
let count = 0
//socketio will be fired if socketiowill get a new connection
//socket is object which consist infor connected client
//we send event in socket.io i.e. to communicate with app and server, socket.io send events
io.on('connection',(socket)=>{
    console.log('new Websocket connection')

    //to send info from server to client
    io.emit('countUpdated',count)
    io.emit('message','Welcome')

    socket.on('increment',()=>{
        count++;
        //to emit changes to single client
        // socket.emit('countUpdated',count)
        //to emit the event to every single connection that's
        //currently available and we are going to emit
        io.emit('countUpdated',count)

    })

})

//2 syntax to print port name on console
// app.listen(port,()=> console.log(`server is at ${port}`))
server.listen(port,()=> console.log('server is at '+ port))
