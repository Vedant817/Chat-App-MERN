import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Icon, IconButton } from '@mui/material';


function ConversationsItem({props}) {

  
  return (
    <div className='conversation-container'>
      <p className="con-icon">{props.name[0]}</p>
      <p className="con-title">{props.name}</p>
      <p className="con-lastMessage">{props.lastMessage}</p>
      <p className="con-timeStamp">{props.timeStamp}</p>
    </div>
  )
}

export default ConversationsItem