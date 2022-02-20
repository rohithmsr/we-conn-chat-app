import { Loader } from 'semantic-ui-react';
import { useChat } from '../../hooks/useChat';
import { useResolved } from '../../hooks/useResolved';
import ChatList from '../Chat/ChatList';

const LeftRail = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);

  return (
    <div className="left-rail">
      {chatsResolved ? (
        <>
          {!!myChats.length ? (
            <div className="chat-list-container">
              <ChatList />
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>No Chats Yet</h3>
            </div>
          )}
          <button className="create-chat-button" onClick={createChatClick}>
            Create Chat
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader inverted={true} active size="huge" />
        </div>
      )}
    </div>
  );
};

export default LeftRail;
