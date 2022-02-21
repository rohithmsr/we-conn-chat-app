import { useState } from 'react';
import { sendMessage } from 'react-chat-engine';
import { Icon } from 'semantic-ui-react';

import { useChat } from '../../hooks/useChat';
import CodeModal from '../Code/CodeModal';

const ChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState('');
  const [codeModalOpen, setCodeModalOpen] = useState(false);

  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };

  const codeSubmitHandler = (
    { filename, codes, language },
    { setSubmitting },
  ) => {
    if (filename.length > 0 && codes.length > 0) {
      const sendingFileName = filename.replace('$', '_');
      const sendingCode = encodeURIComponent(`<pre>${codes}</pre>`);
      const sendingText = `<code>${sendingFileName}.${language} = Code snippet..........................</code>$${sendingFileName}$${language}$${sendingCode}`;

      if (selectedChat) {
        sendMessage(chatConfig, selectedChat.id, {
          text: sendingText,
          files: [],
        });
      }
    }

    setSubmitting(false);
    setCodeModalOpen(false);
  };

  const openModal = () => {
    setCodeModalOpen(true);
  };

  const closeModal = () => {
    setCodeModalOpen(false);
  };

  return (
    <>
      {codeModalOpen && (
        <CodeModal onExit={closeModal} onSubmit={codeSubmitHandler} />
      )}
      <div className="chat-controls">
        <div onClick={openModal} className="attachment-icon">
          <Icon name="code" color="grey" />
        </div>
        <input
          value={chatInputText}
          className="chat-input"
          placeholder="Send a message"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendChatMessage();
            }
          }}
          onChange={e => setChatInputText(e.target.value)}
        />
        <div onClick={sendChatMessage} className="send-message-icon">
          <Icon name="send" color="grey" />
        </div>
      </div>
    </>
  );
};

export default ChatInput;
