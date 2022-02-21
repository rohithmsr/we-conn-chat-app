import { useChat } from '../../hooks/useChat';
import { ChatAvatar } from '../Chat/ChatAvatar';
import { groupMessages } from '../../utils';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import CodeMessage from '../Code/CodeMessage';

const MessageList = () => {
  const { selectedChat } = useChat();
  useScrollToBottom(selectedChat, 'chat-messages');

  return (
    <div className="chat-messages">
      {selectedChat.people.length === 1 && (
        <div className="empty-room">
          Chat room empty!! Please add new users. #WeConn
        </div>
      )}
      {!!selectedChat.messages.length ? (
        groupMessages(selectedChat.messages).map((m, index) => (
          <div key={index} className="chat-message">
            <div className="chat-message-header">
              <ChatAvatar
                className="message-avatar"
                username={m[0].sender.username}
                chat={selectedChat}
              />
              <div className="message-author">{m[0].sender.username}</div>
            </div>

            <div className="message-content">
              {m.map((individualMessage, index) =>
                individualMessage?.text.startsWith('<code>') ? (
                  <CodeMessage key={index} message={individualMessage.text} />
                ) : (
                  <div key={index}>
                    <div className="message-text">{individualMessage.text}</div>
                  </div>
                ),
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="no-messages-yet">No messages yet</div>
      )}
    </div>
  );
};

export default MessageList;
