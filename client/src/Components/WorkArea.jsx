
import React from 'react'
import { useState,useEffect } from 'react';

function WorkArea() {

  const [message, setmessage] = useState('');
  const [chat, setchat] = useState([]);

  return (
    <div className='work-area border-5 border-black flex-70'>
      <h1>WorkArea</h1>
      <input type='text' name='chat' placeholder='send text' value={message} onChange={(e)=>{
        setmessage(e.target.value)
      }}/>

      

    </div>
  )
}

export default WorkArea