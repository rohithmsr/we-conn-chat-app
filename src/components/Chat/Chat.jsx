import { useChat } from '../../hooks/useChat';
import { useEffect } from 'react';
import { getChats, ChatEngine } from 'react-chat-engine';
import LeftRail from '../Rail/LeftRail';

export const Chat = () => {
  const { myChats, setMyChats, chatConfig, selectedChat } = useChat();

  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

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
        />
      )}

      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <></>
          ) : (
            <div className="no-chat-selected">
              <img
                src="look-arrow.png"
                className="no-chat-selected-icon"
                alt="no-chat-selected-icon"
              />
              Select A Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
