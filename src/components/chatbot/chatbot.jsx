"use client";
import { Bot, X } from 'lucide-react';
import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    const newMessages = [...messages, { user: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { bot: data.message }]);
  };

  const handleOpenChat = () => {
    if (isOpen) {
      setIsOpen(false);  // Close the chat
    } else {
      setIsOpen(true);   // Open the chat
      if (messages.length === 0) {
        setMessages([{ bot: "Hello! I'm Tiba Helper, how can I help you today?" }]);
      }
    }
  };
  
  

  return (
    <>
      {/* Chatbot Button */}
      <div
  onClick={handleOpenChat}
  className="fixed bottom-4 right-4 bg-blue-700 text-white p-4 rounded-full cursor-pointer shadow-lg"
>
  <Bot />
</div>


      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-gray-100 border border-gray-300 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="flex flex-col h-full">

            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-blue-700 text-white">
              <span className="font-semibold">Tiba Helper</span>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-red-600">
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className={msg.user ? 'text-right' : 'text-left'}>
                  <div
                    className={`py-2 px-4 ${msg.user ? 'bg-blue-200' : 'bg-gray-200'} rounded-lg`}
                  >
                    {msg.user || msg.bot}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-300 flex">
            <input
  className="border bg-white text-black p-2 w-full rounded-l-lg"
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      sendMessage(); // Send the message when Enter is pressed
    }
  }}
  placeholder="Type a message"
/>

              <button
                onClick={sendMessage}
                className="ml-2 bg-blue-700 text-white p-2 rounded-r-lg"
              >
                Send
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
