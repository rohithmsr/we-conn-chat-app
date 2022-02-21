import { useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { joinUsernames } from '../../utils';
import { Icon } from 'semantic-ui-react';

import { SearchUsers } from '../Messaging/SearchUser';

const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {joinUsernames(selectedChat.people, chatConfig.userName).slice(
            0,
            100,
          )}
        </div>

        <div className="add-user-icon">
          <Icon
            color="black"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};

export default ChatToolbar;
