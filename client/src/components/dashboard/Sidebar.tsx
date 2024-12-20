import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Chat } from '../../types/chat'

interface SidebarProps {
    onSelectChat: (chat: Chat) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectChat }) => {
    //TODO: Mock data for recent chats, fetch the friends from the mongoDB
    const recentChats: Chat[] = [
        { id: '1', name: 'Alice', lastMessage: 'Hey there!' },
        { id: '2', name: 'Bob', lastMessage: 'How are you?' },
        { id: '3', name: 'Charlie', lastMessage: 'See you later!' },
    ]

    return (
        <div className="w-64 border-r bg-muted">
            <ScrollArea className="h-full">
                <div className="p-4">
                    <h2 className="mb-4 text-lg font-semibold">Recent Chats</h2>
                    <ul className="space-y-2">
                        {recentChats.map((chat) => (
                            <li
                                key={chat.id}
                                className="cursor-pointer rounded-lg p-2 hover:bg-accent"
                                onClick={() => onSelectChat(chat)}
                            >
                                <h3 className="font-medium">{chat.name}</h3>
                                <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </ScrollArea>
        </div>
    )
}

export default Sidebar

