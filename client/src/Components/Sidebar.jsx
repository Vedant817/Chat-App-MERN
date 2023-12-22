import './myStyle.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ConversationsItem from './ConversationsItem';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sb-header">
        <div>
        <IconButton>
        <AccountCircleIcon/>
        </IconButton>
        </div>
        

        <IconButton>
        <PersonAddIcon/>
        </IconButton>

        <IconButton>
        <GroupAddIcon/>
        </IconButton>

        <IconButton>
        <AddCircleIcon/>
        </IconButton>

        <IconButton>
        <NightlightIcon/>
        </IconButton>
        
        
        
      </div>
      <div className="sb-search">
        <IconButton>
        <SearchIcon/>
        </IconButton>
        
        <input placeholder='search' className='search-box'/>
      </div>
      <div className="sb-convo">
        <ConversationsItem/>
      </div>
    </div>
  )
}

export default Sidebar