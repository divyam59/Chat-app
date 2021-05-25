//here will be client side code
//to connect client to server
//return value of io will be store in a variable to access it
//it will be used for both sending and receiving event from server or to client
const socket = io()

socket.on('message',(message)=>{
    console.log(message);
    })

    //enable and disable form buton
    //to prevent same message sent twice or if one message is not sent and you
    //start writing other and click on send, anomly is there
    
    //So here we will disable button until message is sent


document.querySelector('#send').addEventListener('click',(e)=>{
    //to prevent the automatic behaviour of button to refresh the page
    e.preventDefault()
    //disable button until message is delivered
    document.querySelector('#send').setAttribute('disabled','disabled')
    const message = document.querySelector('#mess').value;

    //here the concept of acknowledgement comes
    //previously there was no confirmation that event deliverd is acknowledged by 
    //client/server or not, now we are adding call back to acknowledge this 
    socket.emit('sendMessage',message,(error)=>{
        //enable send button
        document.querySelector('#send').removeAttribute('disabled')
        document.querySelector('#mess').value =''
        document.querySelector('#mess').focus()
        if(error) //if profanity found then this else print real message
        return console.log(error)
        
        console.log('Message Delivered!');
    })
})

//to send location to different clients on clicking send location button
document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation)
    {
        return alert('Geolocation not supported on your browser')
    }
    //diabling button till location data is fetched
    document.querySelector('#send-location').setAttribute('disabled','disabled')

    //if it works then we will fetch location using below code
    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(`Latitude : ${position.coords.latitude}\nLongitude : ${position.coords.longitude}`);
        const data = {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }
        socket.emit('sendLocation',data,(message_from_server)=>{
            document.querySelector('#send-location').removeAttribute('disabled')
            console.log(message_from_server);
        })
    })

})
