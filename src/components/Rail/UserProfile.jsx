import { Icon, IconGroup, Image, Loader } from 'semantic-ui-react';
import { fb } from '../../service';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { useResolved } from '../../hooks/useResolved';
import { useRef, useState } from 'react';
import { logoName } from '../../utils/getFiles';

const UserProfile = () => {
  const inputRef = useRef(null);
  const { chatConfig } = useChat();
  const configResolved = useResolved(chatConfig);

  const { authUser } = useAuth();
  const [email, setEmail] = useState('');

  if (authUser) {
    fb.firestore
      .collection('chatUsers')
      .doc(authUser.uid)
      .onSnapshot(snap => {
        setEmail(authUser.email);
      });
  }

  const onFileAttach = async image => {
    const storageRef = fb.storage.ref();
    const uploadRef = storageRef.child(`${chatConfig.userSecret}_avatar.jpg`);
    uploadRef.put(image).then(() => {
      uploadRef.getDownloadURL().then(url => {
        fb.firestore
          .collection('chatUsers')
          .doc(chatConfig.userSecret)
          .update({ avatar: url });
      });
    });
  };

  const onRemoveFile = e => {
    const storageRef = fb.storage;
    const fileRef = storageRef.refFromURL(chatConfig.avatar);

    if (window.confirm('Are you sure you want to delete your profile pic?')) {
      fileRef
        .delete()
        .then(() => {
          console.log('File Deleted');

          fb.firestore
            .collection('chatUsers')
            .doc(chatConfig.userSecret)
            .update({ avatar: '' });
        })
        .catch(error => {
          console.log('Error in deleting the file');
        });
    }
  };

  const fileChangeHandler = e => {
    const file = e.target?.files?.[0];
    if (file) {
      if (
        window.confirm('Are you sure you want to update you profile picture?')
      ) {
        onFileAttach(file);
      }
    }
  };

  return (
    <div className="profile-box-item">
      <Image
        src={`${process.env.PUBLIC_URL}/${logoName}`}
        alt="we-conn-logo"
        size="mini"
        avatar={true}
        inline={true}
        floated="left"
      />
      <div className="profile-box-icon">
        <Icon
          fitted={true}
          name="sign out"
          onClick={() => fb.auth.signOut()}
          className="sign-out"
          color="teal"
        />
        <span>Sign Out</span>
      </div>
      {configResolved && !!chatConfig ? (
        <div className="profile-box-content">
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            accept="image/jpeg,image/png"
            onChange={fileChangeHandler}
          />

          <IconGroup className="profile-box-avatar" size="large">
            {chatConfig.avatar ? (
              <Image alt="user-avatar" src={chatConfig.avatar} avatar />
            ) : (
              <div className="empty-avatar">
                {chatConfig.userName[0].toUpperCase()}
              </div>
            )}

            <Icon
              className="profile-box-avatar___icon"
              onClick={() => {
                const input = inputRef.current;
                if (input) {
                  // if user cancels the pic, but want to add again, it wont be detected! To avoid this set = null
                  input.value = '';
                  input.click();
                }
              }}
              corner
              name="camera"
              inverted
              circular
            />
            {chatConfig.avatar && (
              <Icon
                className="profile-box-avatar___icon"
                onClick={onRemoveFile}
                corner="bottom left"
                name="trash"
                inverted
                circular
              />
            )}
          </IconGroup>

          <div className="profile-box-preview">
            <div className="profile-box-username">@{chatConfig.userName}</div>
            <div className="profile-box-email">{email}</div>
          </div>
        </div>
      ) : (
        <div className="user-loading">
          <Loader active size="small" />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
