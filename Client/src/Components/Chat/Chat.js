import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import './chat.css';

const socket = io("http://localhost:7777");

function Chat(){
    const [message, setMessage] = useState("");
    const [recibir, setRecibir] = useState([]);

    const handMessage = (e) =>{
        e.preventDefault();
        const newMessage = {
            body: message,
            from: 'Me',
            timestamp: new Date() 
        };
        setRecibir([...recibir, newMessage]);
        socket.emit('message', {
            body: message,
            from: 'Me',
            timestamp: new Date(),
            senderName: 'Otro'
        });
    };

    useEffect(() =>{
        socket.on('message', receiveMessage);
        return () =>{
            socket.off('message', receiveMessage);
        };
    }, []);

    const receiveMessage = (message) => 
        setRecibir((state) => [...state, message]);

    return (
        <div className="chat-container bg-zinc-800 text-white h-screen flex flex-col justify-between items-center">
                    <div className="contenedorModalChat">
                        <div className="encabezadoModalChat">
                            <h3>Chat</h3>
                        </div>
                        <div className="chat-wrapper" style={{ backgroundColor: 'white'}}>
                            <ul className="chat-messages">
                                {recibir.map((message, i) => (
                                    <li key={i} className={`chat-message ${message.from === 'Me' ? 'sent-message' : 'received-message'}`}>
                                        <span>{message.from}:</span> {message.body}
                                        <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                                    </li>
                                ))}
                            </ul>
                            <form onSubmit={handMessage} className="chat-form">
                                <input
                                    type="text"
                                    placeholder="Escribir mensaje.."
                                    className="chat-input"
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button className="chat-button"><ion-icon name="send-outline"></ion-icon></button>
                            </form>
                        </div>
                    </div>
                </div>
    );
}

export default Chat;