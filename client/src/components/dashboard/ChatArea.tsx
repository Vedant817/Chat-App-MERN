import React, { useState, useEffect } from 'react'
import { Chat } from '@/types/chat'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

interface Message {
    receiver: string
    sender: string
    message: string
    timestamp: Date
}

interface ChatAreaProps {
    selectedChat: Chat | null
    onResetChat: () => void
    onSendMessage: (message: string) => void
    messages: Message[]
    loading: boolean
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedChat, onResetChat, onSendMessage, messages, loading }) => {
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message.trim())
            setMessage('')
        }
    }

    const checkUser = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Please login first');
                navigate('/login');
                return;
            }

            const response = await fetch(`http://localhost:5000/api/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!data.user) {
                toast.error('Session expired. Please login again');
                navigate('/login');
                return;
            }
            setUserName(data.user.fullName);
        } catch (error) {
            console.error('Error verifying user:', error);
            toast.error('Something went wrong. Please login again');
            navigate('/login');
        }
    };

    useEffect(() => {
        checkUser();
    }, [selectedChat, userName]);

    if (!selectedChat) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-xl text-muted-foreground">Select a chat to start messaging</p>
            </div>
        )
    }

    return (
        <>
            <ToastContainer />
            <div className="flex flex-1 flex-col">
                {/* Chat Header */}
                <div className="border-b p-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{selectedChat.fullName}</h2>
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
                    {loading ? (
                        <p className="text-center">Loading messages...</p>
                    ) : messages.length === 0 ? (
                        <p className="text-muted-foreground text-center">
                            No messages yet.
                        </p>
                    )
                        : (messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded-lg ${
                                    msg.sender === selectedChat.fullName ? 'bg-gray-200' : 'bg-blue-500 text-white'
                                }`}
                                style={{
                                    alignSelf: msg.sender === selectedChat.fullName ? 'flex-start' : 'flex-end',
                                    maxWidth: '70%',
                                }}
                            >
                                <p>{msg.message}</p>
                                <small className="block text-xs text-gray-600">
                                    {msg.timestamp.toLocaleTimeString()}
                                </small>
                            </div>
                        )))}
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
        </>
    )
}

export default ChatArea;