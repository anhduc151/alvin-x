import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import './chat.css';

const { TextArea } = Input;

interface Message {
  text: string;
  fromMe: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [showChat, setShowChat] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = { text: inputValue, fromMe: true };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      {showChat && (
        <div className="chat-container">
          <div className="chat-messages">
            <List
              dataSource={messages}
              renderItem={(message: Message, index: number) => (
                <List.Item style={{ textAlign: message.fromMe ? 'right' : 'left' }}>
                  {message.text}
                </List.Item>
              )}
            />
          </div>
          <div className="chat-input">
            <TextArea
              value={inputValue}
              onChange={handleInputChange}
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder="Type your message here..."
            />
            <Button type="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </div>
      )}
      <div className="chat-toggle" onClick={toggleChat}>
        {/* <img src="chat-icon.png" alt="Chat Icon" /> */}
        <p>X</p>
      </div>
    </div>
  );
};

export default Chat;
