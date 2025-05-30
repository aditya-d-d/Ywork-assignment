import React, { useState, useEffect, useRef } from 'react';
import { Send, Menu, X, Sun, Moon, User, Bot, Check, CheckCheck } from 'lucide-react';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot', timestamp: new Date(), status: 'delivered' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const botResponses = [
    "That's interesting! Tell me more about that.",
    "I understand. How does that make you feel?",
    "Thanks for sharing that with me!",
    "That's a great question. Let me think about it...",
    "I see what you mean. Have you considered other perspectives?",
    "That sounds challenging. What do you think would help?",
    "Fascinating! I'd love to hear more details.",
    "That makes perfect sense to me.",
    "I appreciate you bringing that up.",
    "What an intriguing way to look at it!"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Update message status to delivered after a short delay
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    // Simulate bot typing and response
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 2000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Top Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <Menu size={20} />
            </button>
            <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              ChatBot Pro
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`p-2 rounded-lg transition-colors md:hidden ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
          <div className="p-4">
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Recent Chats
            </h2>
            <div className="space-y-2">
              {['General Chat', 'Project Discussion', 'Help & Support', 'Random Questions'].map((chat, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    index === 0 
                      ? (darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800')
                      : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700')
                  }`}
                >
                  {chat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                <Bot className="text-white" size={20} />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  AI Assistant
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl`}>
                  <div
                    className={`rounded-2xl px-4 py-2 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : darkMode
                        ? 'bg-gray-800 text-gray-100 border border-gray-700'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="break-words">{message.text}</p>
                  </div>
                  <div className={`flex items-center mt-1 space-x-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </span>
                    {message.sender === 'user' && (
                      <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {message.status === 'sent' ? <Check size={12} /> : <CheckCheck size={12} />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className={`max-w-xs rounded-2xl px-4 py-2 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '0ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '150ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t p-4`}>
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`w-full resize-none rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === ''}
                className={`p-3 rounded-lg transition-all ${
                  inputText.trim() === ''
                    ? (darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400')
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className={`${rightPanelOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-l hidden md:block`}>
          <div className="p-4">
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Chat Info
            </h2>
            <div className="space-y-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className={`w-full text-left p-2 rounded ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`}>
                    Clear Chat
                  </button>
                  <button className={`w-full text-left p-2 rounded ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`}>
                    Export Chat
                  </button>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Statistics
                </h3>
                <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>Messages: {messages.length}</p>
                  <p>Session: {Math.floor(Math.random() * 30)} min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'} border-t px-6 py-3 text-center text-sm`}>
        <p>ChatBot Pro v1.0 - Built with React</p>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatApp;