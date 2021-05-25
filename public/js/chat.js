//here will be client side code
//to connect client to server
//return value of io will be store in a variable to access it
//it will be used for both sending and receiving event from server or to client
const socket = io()

socket.on('message',(message)=>{
    console.log(message);
    })
document.querySelector('#send').addEventListener('click',(e)=>{
    //to prevent the automatic behaviour of button to refresh the page
    e.preventDefault()
    const message = document.querySelector('#mess').value;
    socket.emit('sendMessage',message)
})
