const socket=io('https://chatapp-5-go23.onrender.com');
const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageInp');
const messagecontainer=document.querySelector(".container");
var audio=new Audio('ting.mp3');
const name=prompt("Enter your Name to join");
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position=='left')
    {
    audio.play();
    }

}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message=messageinput.value;
  append(`You: ${message}`,'right');
  socket.emit('send',message);
  messageinput.value='';
})
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
  append(`${name} joined the chat`,'right')
})

socket.on('recieve',data=>{
  append(`${data.name}:${data.message}`,'left')
})

socket.on('left',name=>{
  append(`${name} left the chat`,'right')
})
