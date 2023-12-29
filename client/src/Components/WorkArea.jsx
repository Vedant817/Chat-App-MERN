import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');
const messageForm = document.getElementById('send-container');

socket.on('chat-message',data =>{
  console.log(data);
})

messageForm.addEventListener('submit',e=>{
  e.preventDefault();
  
})


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