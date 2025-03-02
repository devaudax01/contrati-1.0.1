import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Search, Send, MoreVertical, Phone, Video, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Load chat messages when selecting a chat
  useEffect(() => {
    if (selectedChat) {
      // If no messages exist for this chat, initialize with sample messages
      if (!chatMessages[selectedChat.id]) {
        setChatMessages(prev => ({
          ...prev,
          [selectedChat.id]: [
            {
              id: Date.now(),
              sender: selectedChat.name,
              content: `Hello! This is ${selectedChat.name}.`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isSender: false
            }
          ]
        }));
      }
    }
  }, [selectedChat]);

  // Sample data for chats
  const chats = [
    {
      id: 1,
      name: 'John Manager',
      role: 'Manager',
      lastMessage: 'Please check the maintenance schedule',
      time: '2m ago',
      unread: 2,
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Tech',
      role: 'Technician',
      lastMessage: 'Vehicle inspection completed',
      time: '1h ago',
      unread: 0,
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Support',
      role: 'Support',
      lastMessage: 'New task assigned to you',
      time: '3h ago',
      unread: 1,
      avatar: null
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      content: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true
    };

    // Update messages for the current chat
    setChatMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));

    // Update last message in chat list
    const updatedChat = {
      ...selectedChat,
      lastMessage: message.trim(),
      time: 'Just now'
    };
    setSelectedChat(updatedChat);

    // Clear input
    setMessage('');

    // Simulate response after 1-2 seconds
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: selectedChat.name,
        content: `Thanks for your message. This is an automated response from ${selectedChat.name}.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: false
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), response]
      }));

      toast.success('New message received!');
    }, Math.random() * 1000 + 1000);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-64px)] flex bg-gray-100">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r bg-white shadow-sm">
          {/* Search Header */}
          <div className="p-4 border-b bg-gray-50">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl 
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  placeholder:text-gray-400 text-sm transition-all"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Chat List */}
          <div className="overflow-y-auto h-[calc(100vh-132px)]">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b cursor-pointer transition-all
                  ${selectedChat?.id === chat.id 
                    ? 'bg-indigo-50 border-l-4 border-l-indigo-500' 
                    : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                  }`}
              >
                <div className="flex items-center gap-3">
                  {chat.avatar ? (
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="h-12 w-12 rounded-full ring-2 ring-gray-100"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 
                      flex items-center justify-center ring-2 ring-gray-100">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{chat.role}</p>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                      text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center
                      shadow-sm">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b bg-white shadow-sm">
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="flex items-center gap-3">
                  {selectedChat.avatar ? (
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      className="h-10 w-10 rounded-full ring-2 ring-gray-100"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 
                      flex items-center justify-center ring-2 ring-gray-100">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
                    <p className="text-sm text-gray-500">{selectedChat.role}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4 max-w-3xl mx-auto">
                {selectedChat && chatMessages[selectedChat.id]?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 shadow-sm
                        ${msg.isSender 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                          : 'bg-white text-gray-900'
                        }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1.5 
                        ${msg.isSender ? 'text-indigo-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t">
              <form onSubmit={handleSendMessage} 
                className="flex items-center gap-2 max-w-3xl mx-auto">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    placeholder:text-gray-400 text-sm transition-all"
                />
                <button
                  type="submit"
                  disabled={!message.trim() || !selectedChat}
                  className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                    rounded-xl hover:opacity-90 focus:ring-2 focus:ring-indigo-500 
                    focus:ring-offset-2 transition-all shadow-sm
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 rounded-2xl bg-white shadow-sm">
              <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-500 
                rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No chat selected</h3>
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 