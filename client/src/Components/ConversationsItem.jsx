import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Icon, IconButton } from '@mui/material';
import axios from 'axios';






function ConversationsItem() {


  async function fetchData() {
    try {
      const response = await axios.get('/api/data');
      const usernamesList = document.getElementById('usernamesList');
        response.data.username.forEach(username => {
        const listItem = document.createElement('li');
        listItem.textContent = username;
        usernamesList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  }

  fetchData();

  
  return (
    <div>
      <IconButton>
      <AccountCircleIcon/>
      Shresth
      </IconButton>

      

      <br/>

      <IconButton>
      <AccountCircleIcon/>
      <ul id="usernamesList"></ul>
      </IconButton>
      
    </div>
  )
}

export default ConversationsItem