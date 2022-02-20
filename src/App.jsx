import { useEffect } from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import { useResolved } from './hooks/useResolved';
import { ChatProvider } from './context/ChatContext';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Chat from './components/Chat/Chat';

const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(authUser ? '/' : '/login');
    }
  }, [authUser, authResolved, history]);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Chat exact path="/" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <>Loading...</>
  );
};

export default App;
