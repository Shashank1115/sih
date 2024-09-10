// src/Chatbot.js
import React, { useState } from 'react';


const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hi! How can I help you today?", sender: "bot" }]);
  const [userInput, setUserInput] = useState('');

  const handleSend = async () => {
    if (userInput.trim() === '') return;
  
    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
  
    try {
      const response = await fetch('http://localhost:5000/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      setMessages([...newMessages, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching the chatbot response:', error);
      setMessages([...newMessages, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
    }
  
    setUserInput('');
  };
  
  return (
    <div style={styles.chatWindow}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <input 
        style={styles.inputBox}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} style={styles.sendButton}>Send</button>
    </div>
  );
};

// Simple styles for chat
const styles = {
  chatWindow: { width: '300px', height: '400px', border: '1px solid #ccc', padding: '10px', display: 'flex', flexDirection: 'column' },
  chatBox: { flex: 1, overflowY: 'auto', marginBottom: '10px' },
  botMessage: { backgroundColor: '#f1f1f1', margin: '5px', padding: '8px', borderRadius: '5px' },
  userMessage: { backgroundColor: '#add8e6', margin: '5px', padding: '8px', borderRadius: '5px', alignSelf: 'flex-end' },
  inputBox: { padding: '10px', width: 'calc(100% - 20px)', marginBottom: '10px' },
  sendButton: { padding: '10px', backgroundColor: '#008cba', color: 'white', border: 'none', cursor: 'pointer' }
};

export default Chatbot;
