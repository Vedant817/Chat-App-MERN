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
    <div className='sidebar flex-30 flex flex-col'>
      <div className="sb-header bg-gray-700 rounded-20 p-5 m-5 flex justify-between">
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>


        <IconButton>
          <PersonAddIcon />
        </IconButton>

        <IconButton>
          <GroupAddIcon />
        </IconButton>

        <IconButton>
          <AddCircleIcon />
        </IconButton>

        <IconButton>
          <NightlightIcon />
        </IconButton>



      </div>
      <div className="sb-search bg-white rounded-20 p-5 m-5 flex items-center">
        <IconButton>
          <SearchIcon />
        </IconButton>

        <input placeholder='search' className='search-box' />
      </div>
      <div className="sb-convo bg-white rounded-20 p-5 m-5 flex-1">
        <ConversationsItem />
      </div>
    </div>
  )
}

export default Sidebar