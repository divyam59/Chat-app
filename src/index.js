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


//socketio will be fired if socketiowill get a new connection
//socket is object which consist infor connected client
//we send event in socket.io i.e. to communicate with app and server, socket.io send events
io.on('connection',(socket)=>{
    console.log('new Websocket connection')
    io.emit('message','Welcome')
    socket.on('sendMessage',(message)=>{
        io.emit('message',message)
    })
})

//2 syntax to print port name on console
// app.listen(port,()=> console.log(`server is at ${port}`))
server.listen(port,()=> console.log('server is at '+ port))
