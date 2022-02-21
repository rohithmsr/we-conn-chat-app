import { fb } from '../service';
import { createContext, useEffect, useState } from 'react';
import {
  newChat,
  leaveChat,
  deleteChat,
  getMessages,
  sendMessage,
} from 'react-chat-engine';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [selectedChat, setSelectedChat] = useState();

  const createChatClick = () => {
    newChat(chatConfig, { title: '' });
  };

  const deleteChatClick = chat => {
    const isAdmin = chat.admin.username === chatConfig.userName;

    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this chat?')
    ) {
      deleteChat(chatConfig, chat.id);
    } else if (
      !isAdmin &&
      window.confirm('Are you sure you want to leave this chat?')
    ) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };

  const selectChatClick = chat => {
    getMessages(chatConfig, chat.id, (_, messages) => {
      setSelectedChat({
        ...chat,
        messages,
      });
    });
  };

  // Set the chat config once the
  // authUser has initialized.
  useEffect(() => {
    if (authUser) {
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          setChatConfig({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          });
        });
    }
  }, [authUser, setChatConfig]);

  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        createChatClick,
        deleteChatClick,
        selectChatClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// export const useChat = () => {
//   const {
//     myChats,
//     setMyChats,
//     chatConfig,
//     selectedChat,
//     setChatConfig,
//     setSelectedChat,
//     selectChatClick,
//     deleteChatClick,
//     createChatClick,
//   } = useContext(ChatContext);

//   return {
//     myChats,
//     setMyChats,
//     chatConfig,
//     selectedChat,
//     setChatConfig,
//     setSelectedChat,
//     selectChatClick,
//     deleteChatClick,
//     createChatClick,
//   };
// };
