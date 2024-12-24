import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import ChatArea from '@/components/dashboard/ChatArea';
import { Chat } from '@/types/chat';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import io, { Socket } from 'socket.io-client';

interface Message {
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
}

interface MessageResponse {
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
}

const DashboardPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
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

  const fetchMessages = useCallback(async (receiver: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/message/${userName}/${receiver}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const formattedMessages = data.map((msg: MessageResponse) => ({
          sender: msg.sender,
          receiver: msg.receiver,
          message: msg.message,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      } else {
        toast.error(data.message || 'Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Error loading messages');
    } finally {
      setLoading(false);
    }
  }, [userName, navigate]);

  const handleSendMessage = useCallback((message: string) => {
    if (!selectedChat || !socket) {
      toast.error('Cannot send message at this time');
      return;
    }

    const newMessage = {
      sender: userName,
      receiver: selectedChat.fullName,
      message,
      timestamp: new Date(),
    };

    // First update the UI optimistically
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Then emit to server
    socket.emit('chat message', newMessage, (error: { message: string } | null) => {
      if (error) {
        toast.error('Failed to send message');
        // Rollback the optimistic update
        setMessages((prevMessages) => prevMessages.slice(0, -1));
        return;
      }
    });
  }, [selectedChat, socket, userName]);

  const handleResetChat = useCallback(() => {
    setSelectedChat(null);
    setMessages([]);
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: localStorage.getItem('token')
      }
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error('Chat server connection failed');
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      // toast.error('Chat error occurred');
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Message receiving effect
  useEffect(() => {
    if (!socket || !selectedChat) return;

    const handleNewMessage = (newMessage: Message) => {
      // Check if the message belongs to the current chat
      if (
        (newMessage.sender === userName && newMessage.receiver === selectedChat.fullName) ||
        (newMessage.sender === selectedChat.fullName && newMessage.receiver === userName)
      ) {
        setMessages((prevMessages) => [...prevMessages, {
          ...newMessage,
          timestamp: new Date(newMessage.timestamp)
        }]);
      }
    };

    socket.on('chat message', handleNewMessage);

    return () => {
      socket.off('chat message', handleNewMessage);
    };
  }, [socket, selectedChat, userName]);

  // Fetch messages when chat is selected
  useEffect(() => {
    checkUser();
    if (selectedChat) {
      fetchMessages(selectedChat.fullName);
    }
  }, [selectedChat, fetchMessages]);

  return (
    <div className="flex h-screen flex-col">
      <Navbar username={userName} />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onSelectChat={(chat) => {
            setSelectedChat(chat);
            setMessages([]);
          }}
        />
        <ChatArea
          selectedChat={selectedChat}
          messages={messages || []}
          onResetChat={handleResetChat}
          onSendMessage={handleSendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DashboardPage;