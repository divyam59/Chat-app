//here will be client side code
//to connect client to server
//return value of io will be store in a variable to access it
//it will be used for both sending and receiving event from server or to client
const socket = io()
socket.on('countUpdated',(count)=>{
    console.log('the count hase been updated and it is : '+count);
})
socket.on('message',(message)=>{
console.log(message);
})

document.querySelector('#increment').addEventListener('click',()=>{
    console.log('clicked');
    //now we emit event from client and send it to server
    socket.emit('increment')
})