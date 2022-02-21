import { Icon, Image } from 'semantic-ui-react';
import { fb } from '../../service';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const UserProfile = () => {
  const { authUser } = useAuth();
  const [username, setUsername] = useState('0');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');

  if (authUser) {
    fb.firestore
      .collection('chatUsers')
      .doc(authUser.uid)
      .onSnapshot(snap => {
        setUsername(snap.data().userName);
        setAvatar(snap.data().avatar);
        setEmail(authUser.email);
      });
  }

  return (
    <div className="profile-box-item">
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
      <div className="profile-box-content">
        {avatar ? (
          <Image className={'chat-list-avatar'} src={avatar} />
        ) : (
          <div className={'empty-avatar'}>{username[0].toUpperCase()}</div>
        )}

        <div className="profile-box-preview">
          <div className="profile-box-username">{username}</div>
          <div className="profile-box-email">{email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
