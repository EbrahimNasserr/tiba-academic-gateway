"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Subjects", href: "/subjects" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="max-w-screen-xl mx-auto mt-6">
      <div className="custom-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" title="Tiba Academic Gateway" className="flex">
              <Image
                className="w-auto"
                src={logo}
                alt="logo"
                width={50}
                height={50}
                loading="lazy"
              />
            </Link>
          </div>

          {/* Mobile toggle button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex p-2 transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            <svg
              className={`${menuOpen ? "hidden" : "block"} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
            <svg
              className={`${menuOpen ? "block" : "hidden"} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="text-base transition-all duration-200 hover:text-opacity-80"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Links */}
        {menuOpen && (
          <div className="mt-4 space-y-2 lg:hidden absolute right-0 bg-[#060606] w-full z-40 text-center dark:bg-white">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="block text-base px-4 py-2 rounded hover:bg-gray-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}









// "use client";
// import { Bot, X } from 'lucide-react';
// import { useState } from 'react';

// export default function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isOpen, setIsOpen] = useState(false);

//   const sendMessage = async () => {
//     const newMessages = [...messages, { user: input }];
//     setMessages(newMessages);
//     setInput('');

//     const res = await fetch('/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message: input }),
//     });

//     const data = await res.json();
//     setMessages([...newMessages, { bot: data.message }]);
//   };

//   const handleOpenChat = () => {
//     if (isOpen) {
//       setIsOpen(false);  // Close the chat
//     } else {
//       setIsOpen(true);   // Open the chat
//       if (messages.length === 0) {
//         setMessages([{ bot: "Hello! I'm Tiba Helper, how can I help you today?" }]);
//       }
//     }
//   };
  
  

//   return (
//     <>
//       {/* Chatbot Button */}
//       <div
//   onClick={handleOpenChat}
//   className="fixed bottom-4 right-4 bg-blue-700 text-white p-4 rounded-full cursor-pointer shadow-lg"
// >
//   <Bot />
// </div>


//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-20 right-4 w-80 h-96 bg-gray-100 border border-gray-300 rounded-lg shadow-lg overflow-hidden z-50">
//           <div className="flex flex-col h-full">

//             {/* Header with Close Button */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-blue-700 text-white">
//               <span className="font-semibold">Tiba Helper</span>
//               <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-red-600">
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-2">
//               {messages.map((msg, index) => (
//                 <div key={index} className={msg.user ? 'text-right' : 'text-left'}>
//                   <div
//                     className={`py-2 px-4 ${msg.user ? 'bg-blue-200' : 'bg-gray-200'} rounded-lg`}
//                   >
//                     {msg.user || msg.bot}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Message Input */}
//             <div className="p-4 border-t border-gray-300 flex">
//             <input
//   className="border bg-white text-black p-2 w-full rounded-l-lg"
//   type="text"
//   value={input}
//   onChange={(e) => setInput(e.target.value)}
//   onKeyDown={(e) => {
//     if (e.key === 'Enter') {
//       sendMessage(); // Send the message when Enter is pressed
//     }
//   }}
//   placeholder="Type a message"
// />

//               <button
//                 onClick={sendMessage}
//                 className="ml-2 bg-blue-700 text-white p-2 rounded-r-lg"
//               >
//                 Send
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }
