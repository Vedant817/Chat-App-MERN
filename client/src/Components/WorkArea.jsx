import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';


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
        <input type='text' placeholder='Enter your text' className='type-box'/>
        <IconButton>
          <SendIcon/>
        </IconButton>
      </div>
    </div>
  )
}

export default WorkArea