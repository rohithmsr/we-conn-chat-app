import { fb } from '../service';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  // undefined (only during initial mounting, didn't check anything)
  // firebase.user
  // (after checking, found that not logged in) null
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return {
    authUser,
  };
};
