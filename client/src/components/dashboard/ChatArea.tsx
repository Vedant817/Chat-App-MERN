import React, { useState } from 'react'
import { Chat } from '@/types/chat'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ChatAreaProps {
    selectedChat: Chat | null
    onResetChat: () => void
    onSendMessage: (message: string) => void
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedChat, onResetChat, onSendMessage }) => {
    const [message, setMessage] = useState('')

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message.trim())
            setMessage('')
        }
    }

    if (!selectedChat) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-xl text-muted-foreground">Select a chat to start messaging</p>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="border-b p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
                <Button
                    onClick={onResetChat}
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary text-white"
                >
                    Close
                </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Chat messages rendering */}
                <p>Chat with {selectedChat.name}</p>
            </div>

            {/* Chat Input */}
            <div className="border-t p-4">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatArea

