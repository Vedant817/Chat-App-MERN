import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Icon, IconButton } from '@mui/material';



function ConversationsItem({props}) {

  
  return (
    <div className='conversation-container'>
      <p className="con-icon">
        <IconButton className='acc-icon'>
          <AccountCircleIcon/>
          {props.name}
        </IconButton>
    </p>

      {/* <p className="con-title">{props.name}</p> */}
    </div>
  )
}

export default ConversationsItem