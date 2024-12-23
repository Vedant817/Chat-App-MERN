import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import AddFriendDialog from './AddFriendDialog'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav className="flex items-center justify-between bg-background p-4 shadow w-screen">
      <div className="flex items-center gap-4">
        <a href='/dashboard'>
          <h1 className="text-2xl font-bold">HelloHub</h1>
        </a>
        <span className="text-sm text-muted-foreground">Welcome, {username}</span>
      </div>
      <div className='flex space-x-1'>
        <Button onClick={() => setIsAddFriendOpen(true)}>Add Friend</Button>
        <AddFriendDialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen} />
        <Button className='bg-red-500' onClick={() =>logout()}>Logout</Button>
      </div>
    </nav>
  )
}

export default Navbar

