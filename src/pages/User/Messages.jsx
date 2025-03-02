import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Search, Send, MessageSquare, MoreVertical, Clock } from 'lucide-react';

export default function Messages() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for contacts
  const contacts = [
    {
      id: 1,
      name: "Support Team",
      role: "Employee",
      lastMessage: "How can we help you today?",
      timestamp: "10:30 AM",
      unread: 0
    },
    {
      id: 2,
      name: "Rental Manager",
      role: "Employee",
      lastMessage: "Your rental request is being processed",
      timestamp: "Yesterday",
      unread: 1
    },
    {
      id: 3,
      name: "Car Owner",
      role: "Owner",
      lastMessage: "Thank you for choosing our vehicle",
      timestamp: "2 days ago",
      unread: 0
    }
  ];

  // Mock data for messages
  const mockMessages = {
    1: [
      { id: 1, sender: "support", text: "Hello! How can we help you today?", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Hi, I have a question about my rental", time: "10:31 AM" },
    ],
    2: [
      { id: 1, sender: "employee", text: "Your rental request is being processed", time: "Yesterday" },
    ],
    3: [
      { id: 1, sender: "owner", text: "Thank you for choosing our vehicle", time: "2 days ago" },
    ]
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    console.log("Sending message:", messageText);
    setMessageText("");
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="mt-2 text-gray-600">Contact support, managers, or car owners</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[700px]">
            {/* Contacts List */}
            <div className="border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent py-2.5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-73px)]">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full p-4 text-left hover:bg-white transition-colors duration-150 ${
                      selectedContact?.id === contact.id ? 'bg-white shadow-sm' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                          {getInitials(contact.name)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {contact.timestamp}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">{contact.role}</p>
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {contact.lastMessage}
                        </p>
                      </div>
                      {contact.unread > 0 && (
                        <span className="ml-2 flex-shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-medium">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-2 flex flex-col bg-gray-50">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                          {getInitials(selectedContact.name)}
                        </div>
                      </div>
                      <div>
                        <h2 className="font-medium text-gray-900">{selectedContact.name}</h2>
                        <p className="text-sm text-gray-500">{selectedContact.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages[selectedContact.id].map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-sm rounded-2xl p-4 ${
                            message.sender === 'me'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-900 shadow-sm'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === 'me' ? 'text-blue-200' : 'text-gray-500'
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-150 flex items-center space-x-2 font-medium"
                      >
                        <Send className="h-4 w-4" />
                        <span>Send</span>
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                      <MessageSquare className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No conversation selected
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-sm">
                      Choose a contact from the list to start messaging. You can communicate with support, managers, or car owners.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 