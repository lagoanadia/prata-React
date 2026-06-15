import '../App.css'
import { useState } from 'react'
   type Message = {
        text:string
        sender : 'user'|'ai'
    }
export default function ChatScreen() {
 

    let [message, setMessage] = useState('')
    let [chatHistory, setChatHistory] = useState<Message[]>([])

    async function sendMessage() {
        if (message.trim() === '') return
        const userMsg = message
        setChatHistory(prev => [...prev, { text: userMsg, sender: 'user' }])
        setMessage('')
        const aiResponse = await sendToAI(userMsg)
        setChatHistory(prev => [...prev, { text: aiResponse, sender: 'ai' }])
    }
    
async function sendToAI(userMessage: string): Promise<string> {
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        return data.reply ?? 'Error reading response from backend';
    } catch (error) {
        console.error('Connection failed:', error);
        return 'Kunde inte ansluta till servern. (Could not connect to the server.)';
    }
}
    
    

    
     return (
        <>
 <div className="chat-container">
        <div className="chat-header">
            <p className="chat-header-title">SAMTAL · CHAT</p>
            <span className="chat-level">A1 · Beginner</span>
        </div>

        <div className="messages">
            {chatHistory.map((msg, i) => (
                <div key={i}>
                    <p className="sender-label">{msg.sender === 'ai' ? 'LÄRARE' : 'DU'}</p>
                    <div className={msg.sender === 'user' ? 'bubble bubble-user' : 'bubble bubble-ai'}>
                        <p>{msg.text}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="chat-input-area">
            <input
                className="chat-input"
                type="text"
                placeholder="Skriv på svenska eller engelska..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="sendMsg" onClick={sendMessage}>↲</button>
        </div>
    </div>
        </>
     )
}