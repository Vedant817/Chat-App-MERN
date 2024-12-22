import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import AddFriendDialog from './AddFriendDialog'

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between bg-background p-4 shadow w-screen">
      <div className="flex items-center gap-4">
        <a href='/dashboard'>
          <h1 className="text-2xl font-bold">HelloHub</h1>
        </a>
        <span className="text-sm text-muted-foreground">Welcome, {username}</span>
      </div>
      <Button onClick={() => setIsAddFriendOpen(true)}>Add Friend</Button>
      <AddFriendDialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen} />
    </nav>
  )
}

export default Navbar

