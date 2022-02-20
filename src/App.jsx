import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <Switch>
      <Chat exact path="/" component={Chat} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
};

export default App;
