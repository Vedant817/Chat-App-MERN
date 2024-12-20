import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import AddFriendDialog from './AddFriendDialog'

const Navbar: React.FC = () => {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between bg-background p-4 shadow w-screen">
      <a href='/dashboard'>
        <h1 className="text-2xl font-bold">HelloHub</h1>
      </a>
      <Button onClick={() => setIsAddFriendOpen(true)}>Add Friend</Button>
      <AddFriendDialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen} />
    </nav>
  )
}

export default Navbar

