import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import { useParams } from 'react-router-dom';

function App() {
  const { userName } = useParams();
  const socket = useRef(null);
  const messageInput = useRef(null);
  const [messages, setMessages] = useState([]);

  socket.current = io("http://localhost:3000/", {
    transports: ['websocket'],
  });

  const handleSend = () => {
    const text = messageInput.current.value;

    if (text.trim()) {
      const newMessage = { user: userName, text:text };
      socket.current.emit('message', newMessage);
      messageInput.current.value = '';
    }
  };

  useEffect(() => {
  
    socket.current.on("connect", () => {
      console.log("New user connected:", userName);
      socket.current.emit("joined", { name: userName, id: socket.current.id });
    });

    const joinedOtherUserListener = (user) => {
      setMessages((prevMessages) => [...prevMessages, { user, text: 'Joined the chat' }]);
    };

    const sendListener = ({ user, text }) => {
      setMessages((prevMessages) => [...prevMessages, { user, text }]);
    };

    socket.current.on('joined-other-user', joinedOtherUserListener);
    socket.current.on('send', sendListener);

    return () => {
      socket.current.emit("disconnect", userName);
      socket.current.off('welcome', welcomeListener);
      socket.current.off('joined-other-user', joinedOtherUserListener);
      socket.current.off('send', sendListener);
    };
  }, [userName]);

  return (
    <div className='chat-box'>
      <div className='chat-header'>
        <h1>Group Chat</h1>
      </div>
      <div className='chat-body'>
        {messages.map((msg, index) => (
          <div key={index} className={`messagebox ${msg.user === userName ? 'right' : 'left'}`}>
            {msg.user}: {msg.text}
          </div>
        ))}
      </div>
      <div className='chat-footer'>
        <input
          ref={messageInput}
          className='sendInput'
          placeholder='Enter Message'
          type="text"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className='send-btn'>Send</button>
      </div>
    </div>
  );
}

export default App;
