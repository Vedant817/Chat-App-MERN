import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import io from 'socket.io-client';


document.addEventListener('DOMContentLoaded', function () {

const socket = io('http://localhost:4000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('type-box');

const appendMessage = (message) =>{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

const name = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new-user',name);


socket.on('chat-message',data =>{
  appendMessage(`${data.name}:${data.message}`);
})

socket.on('user-connected',name =>{
  appendMessage(`${name} connected`);
})

  messageForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message',message);
    messageInput.value = '';
  })

  
});





function WorkArea() {

  return (

    <div className='work-area'>
      <div className="head">
        <IconButton>
          <AccountCircleIcon className='acc'/>
        </IconButton>
        <p className='c-title'>Chat Title</p>
      </div>
      <div className="mid">mid</div>
      <div className="bottom">
        <div className="message-container"></div>
        <form className='send-container'>
        <input type='text' placeholder='Enter your text' className='type-box'/>
        <IconButton className='send' type='submit'>
          <SendIcon/>
        </IconButton>
        </form>
      </div>
    </div>
  )
}

export default WorkArea