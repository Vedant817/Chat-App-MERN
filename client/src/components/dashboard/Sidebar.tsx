import React, { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Chat } from '../../types/chat'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
    onSelectChat: (chat: Chat) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectChat }) => {
    const [recentChats, setRecentChats] = useState<Chat[]>([])
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

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

    const fetchRecentChats = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/getFriends?username=${encodeURIComponent(userName)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message);
                throw new Error(data.message)
            }

            setRecentChats(data);
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'An unknown error occurred')
        }
    }

    useEffect(() => {
        const initialize = async () => {
            await checkUser();
        };
        initialize();
    }, []);

    useEffect(() => {
        if (userName) {
            fetchRecentChats();
        }
    }, [userName]);

    return (
        <>
            <ToastContainer />
            <div className="w-64 border-r bg-muted">
                <ScrollArea className="h-full">
                    <div className="p-4">
                        <h2 className="mb-4 text-lg font-semibold">Recent Chats</h2>
                        <ul className="space-y-2">
                            {recentChats?.map((chat, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer rounded-sm p-2 hover:bg-accent border-b-2"
                                    onClick={() => onSelectChat(chat)}
                                >
                                    <h3 className="font-medium">{chat.fullName}</h3>
                                    <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}

export default Sidebar

