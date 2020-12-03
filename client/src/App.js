import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/sub/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Users from './components/Users';
import Logout from './components/Logout';
import Signup from './components/Signup';
import NotFound from './components/404';

function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>
      <div id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
