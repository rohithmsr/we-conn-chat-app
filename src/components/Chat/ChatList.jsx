import { useChat } from '../../hooks/useChat';
import { ChatAvatar } from './ChatAvatar';
import { Icon } from 'semantic-ui-react';
import { notMe, getGroupChatNames } from '../../utils';
import { useEffect } from 'react';

const ChatList = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    deleteChatClick,
  } = useChat();

  useEffect(() => {}, [myChats, selectedChat]);

  const getMessagePreview = msg => {
    let preview = msg.slice(0, 25);
    preview += msg.length > 25 ? '...' : '';
    return preview;
  };

  return (
    <div className="chat-list">
      {myChats.map((c, index) => (
        <div
          onClick={() => selectChatClick(c)}
          className={`chat-list-item ${
            selectedChat?.id === c.id ? 'selected-chat-item' : ''
          }`}
          key={index}
        >
          <div className="chat-list-item-content">
            {c.people.length === 1 ? (
              <>
                <Icon circular inverted color="violet" name="user cancel" />
                <div className="chat-list-preview">
                  <div className="preview-username">No One Added Yet</div>
                </div>
              </>
            ) : c.people.length === 2 ? (
              <>
                <ChatAvatar username={notMe(chatConfig, c)} chat={c} />

                <div className="chat-list-preview">
                  <div className="preview-username">{notMe(chatConfig, c)}</div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : getMessagePreview(c.last_message.text)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users" />
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {getGroupChatNames(c.people, chatConfig.userName).slice(
                      0,
                      50,
                    )}
                  </div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : getMessagePreview(c.last_message.text)}
                  </div>
                </div>
              </>
            )}
          </div>

          <div onClick={() => deleteChatClick(c)} className="chat-item-delete">
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
