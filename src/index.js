const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
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

//io.on will be only used for connection
//socket.on will be used for disconnect
io.on('connection',(socket)=>{
    console.log('new Websocket connection')
    socket.emit('message','Welcome')
    //it will send message to every client other than the newly joint client
    socket.broadcast.emit('message','A new user joined')
    socket.on('sendMessage',(message,callback)=>{
        const filter = new Filter()
        if(filter.isProfane(message))
        {
            return callback('Profanity is not allowed')
        }
        io.emit('message',message)
        callback()
    })

    socket.on('sendLocation',(location,callback)=>{
        //to send longitude and latitude
        // io.emit('message',`Location : ${location.latitude}, ${location.longitude}`)

        //To send google map link
        io.emit('locationMessage',`https://google.com/maps?q=${location.latitude},${location.longitude}`)
        callback('Location shared')
    })
    socket.on('disconnect',()=>{
        io.emit('message','a user has left')
    })
})

//2 syntax to print port name on console
// app.listen(port,()=> console.log(`server is at ${port}`))
server.listen(port,()=> console.log('server is at '+ port))
