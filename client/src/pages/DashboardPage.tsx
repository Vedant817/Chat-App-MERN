import { useState, useEffect } from 'react'
import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import ChatArea from '@/components/dashboard/ChatArea'
import { Chat } from '@/types/chat'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const DashboardPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const navigate = useNavigate();

  const handleResetChat = () => {
    setSelectedChat(null)
  }

  const handleSendMessage = (message: string) => {
    console.log(`Sending message: ${message}`)
    //TODO: Here you would typically send the message to your backend
  }

  useEffect(() => {
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
      } catch (error) {
        console.error('Error verifying user:', error);
        toast.error('Something went wrong. Please login again');
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <ToastContainer />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onSelectChat={setSelectedChat} />
        <ChatArea
          selectedChat={selectedChat}
          onResetChat={handleResetChat}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default DashboardPage