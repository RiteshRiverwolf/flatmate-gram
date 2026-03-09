import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Send, ArrowLeft } from 'lucide-react';
import API from "../api";
import { io } from "socket.io-client";

const socket = io(API, {
  transports: ["websocket"],
  withCredentials: true
});

const Chat = () => {
    const { id: matchId } = useParams(); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [matchName, setMatchName] = useState('Loading...');

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const res = await axios.get(`${API}/api/users/matches`);
                const currentMatch = res.data.find(m => m._id === matchId);
                if (currentMatch) setMatchName(currentMatch.name);
            } catch (err) {
                console.error("Error fetching match name", err);
            }
        };

        fetchMatchDetails();
        socket.emit('join_room', matchId);

        socket.on('receive_message', (data) => {
            setMessages((list) => [...list, data]);
        });

        return () => socket.off('receive_message');
    }, [matchId]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const messageData = {
                roomId: matchId,
                senderId: user._id,
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            socket.emit('send_message', messageData);
            setMessages((list) => [...list, messageData]);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 pb-24">

            {/* Chat Header */}
            <div className="bg-white p-4 flex items-center gap-4 shadow-sm border-b sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="font-bold text-lg text-gray-800">{matchName} Chat</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                            msg.senderId === user._id 
                            ? 'bg-teal-600 text-white rounded-tr-none' 
                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                        }`}>
                            <p className="text-sm">{msg.text}</p>
                            <span className="text-[10px] opacity-70 block text-right mt-1 font-medium">
                                {msg.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex gap-2 sticky bottom-0">
                <input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-teal-200 transition-all text-sm"
                />
                <button
                    onClick={sendMessage}
                    className="bg-teal-600 text-white p-3 rounded-2xl hover:bg-teal-700 shadow-md transition-transform active:scale-95"
                >
                    <Send size={20} />
                </button>
            </div>

        </div>
    );
};

export default Chat;