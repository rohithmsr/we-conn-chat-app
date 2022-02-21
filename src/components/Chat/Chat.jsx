import { useChat } from '../../hooks/useChat';
import { getChats, ChatEngine } from 'react-chat-engine';
import LeftRail from '../Rail/LeftRail';
import ChatToolbar from './ChatToolbar';
import ChatInput from './ChatInput';
import MessageList from '../Messaging/MessageList';

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setSelectedChat,
    selectChatClick,
  } = useChat();

  return (
    <>
      <LeftRail />
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={chat => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
            }
            setMyChats([chat, ...myChats]);
          }}
          onDeleteChat={chat => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(myChats.filter(c => c.id !== chat.id));
          }}
          onNewMessage={(chatId, message) => {
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats([updatedChat, ...filteredChats]);
          }}
        />
      )}

      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <div className="no-chat-selected">
              <img
                src="look-arrow.png"
                className="no-chat-selected-icon"
                alt="no-chat-selected-icon"
              />
              #WeConn <br />
              <br />
              SELECT A CHAT
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
